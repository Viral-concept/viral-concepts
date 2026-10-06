import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { LeadFormConfig } from "@/config/env.server";
import { composeAutoReply, composeTeamEmail, escapeHtml, sendWithResend } from "@/lib/leads/email";
import { handleLead, type LeadContext, type LeadDeps } from "@/lib/leads/handle-lead";
import { createRateLimiter } from "@/lib/leads/rate-limit";
import { parseLead, type Lead } from "@/lib/leads/schema";
import { verifyTurnstile } from "@/lib/leads/turnstile";

/**
 * The lead form is the site's only server code and its only way to send email, so every
 * branch is covered: validation, spam defences, delivery, and what is (not) logged.
 */

const SERVICES = new Map([
  ["exhibitions", "Exhibitions"],
  ["other", "Something else / not sure yet"],
]);
const ALLOWED = [...SERVICES.keys()];

const VALID = {
  name: "Aisha Rahman",
  company: "Gulf Expo Partners",
  email: "Aisha@GulfExpo.ae",
  phone: "+971 50 123 4567",
  service: "exhibitions",
  eventDate: "2026-11-20",
  message: "We need a 6x9 m custom stand for a trade show at the World Trade Centre.",
};

function formData(values: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(values)) data.set(key, value);
  return data;
}

const LIVE: LeadFormConfig = {
  mode: "live",
  env: {
    RESEND_API_KEY: "re_secret_value",
    LEAD_TO_EMAIL: ["desk@viralconcepts.co"],
    LEAD_FROM_EMAIL: "Viral Concepts Website <website@viralconcepts.co>",
    TURNSTILE_SECRET_KEY: "turnstile_secret_value",
    LEAD_AUTO_REPLY: true,
  },
};

function context(config: LeadFormConfig = LIVE): LeadContext {
  return {
    config,
    services: SERVICES,
    ip: "203.0.113.7",
    phoneDisplay: "+971 58 854 7620",
    now: new Date("2026-10-02T08:00:00Z"),
  };
}

function deps(overrides: Partial<LeadDeps> = {}): LeadDeps & {
  send: ReturnType<typeof vi.fn>;
  verifyTurnstile: ReturnType<typeof vi.fn>;
} {
  return {
    verifyTurnstile: vi.fn(async () => ({ ok: true as const })),
    send: vi.fn(async () => ({ ok: true as const })),
    ipLimiter: createRateLimiter({ limit: 5, windowMs: 60_000 }),
    emailLimiter: createRateLimiter({ limit: 3, windowMs: 60_000 }),
    randomId: () => "id-1",
    ...overrides,
  } as never;
}

let logs: string[] = [];
beforeEach(() => {
  logs = [];
  for (const method of ["info", "warn", "error"] as const) {
    vi.spyOn(console, method).mockImplementation((line: unknown) => {
      logs.push(String(line));
    });
  }
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe("lead schema", () => {
  it("accepts a complete enquiry and normalises the email", () => {
    const result = parseLead(VALID, ALLOWED);
    expect(result.success).toBe(true);
    if (result.success) expect(result.lead.email).toBe("aisha@gulfexpo.ae");
  });

  it("needs only name, email, service and message", () => {
    const { name, email, service, message } = VALID;
    expect(parseLead({ name, email, service, message }, ALLOWED).success).toBe(true);
  });

  it("explains each problem in plain words", () => {
    const result = parseLead(
      { name: "A", email: "not-an-email", phone: "call me", service: "", message: "Hi" },
      ALLOWED,
    );
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(Object.keys(result.fieldErrors).sort()).toEqual([
        "email",
        "message",
        "name",
        "phone",
        "service",
      ]);
      expect(result.fieldErrors.message).toMatch(/at least 20 characters/);
    }
  });

  it("rejects a service that is not offered (forged or unpublished)", () => {
    const result = parseLead({ ...VALID, service: "google-ads" }, ALLOWED);
    expect(result.success).toBe(false);
  });

  it("rejects control characters and bidirectional overrides in single-line fields", () => {
    expect(parseLead({ ...VALID, name: "Aisha\u0007" }, ALLOWED).success).toBe(false);
    expect(parseLead({ ...VALID, name: "Aisha\u202Egnp.exe" }, ALLOWED).success).toBe(false);
    expect(parseLead({ ...VALID, company: "Gulf\u2028Expo" }, ALLOWED).success).toBe(false);
    expect(parseLead({ ...VALID, name: "عائشة الرحمن" }, ALLOWED).success).toBe(true);
  });

  it("rejects line breaks in single-line fields, impossible dates and oversized input", () => {
    expect(parseLead({ ...VALID, name: "Aisha\r\nBcc: x@y.z" }, ALLOWED).success).toBe(false);
    expect(parseLead({ ...VALID, phone: "+971 50\nService: x" }, ALLOWED).success).toBe(false);
    expect(parseLead({ ...VALID, eventDate: "2026-13-45" }, ALLOWED).success).toBe(false);
    expect(parseLead({ ...VALID, eventDate: "2026-02-30" }, ALLOWED).success).toBe(false);
    expect(parseLead({ ...VALID, message: "x".repeat(5001) }, ALLOWED).success).toBe(false);
  });
});

describe("rate limiter", () => {
  it("allows the limit within a window, then blocks until the window passes", () => {
    const limiter = createRateLimiter({ limit: 2, windowMs: 1_000 });
    expect(limiter.hit("a", 0)).toBe(true);
    expect(limiter.hit("a", 10)).toBe(true);
    expect(limiter.hit("a", 20)).toBe(false);
    expect(limiter.hit("b", 20)).toBe(true);
    expect(limiter.hit("a", 1_000)).toBe(true);
  });

  it("keeps memory bounded", () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 60_000, maxKeys: 2 });
    limiter.hit("a", 0);
    limiter.hit("b", 0);
    limiter.hit("c", 0); // evicts "a"
    expect(limiter.hit("a", 1)).toBe(true);
  });
});

describe("emails", () => {
  const lead = (parseLead(VALID, ALLOWED) as { success: true; lead: Lead }).lead;

  it("escapes HTML", () => {
    expect(escapeHtml(`<img src=x onerror="alert(1)">&'`)).toBe(
      "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;&amp;&#39;",
    );
  });

  it("sends the team every detail, with the visitor as reply-to", () => {
    const email = composeTeamEmail(lead, "Exhibitions", new Date("2026-10-02T08:00:00Z"), {
      from: "Website <website@viralconcepts.co>",
      to: ["desk@viralconcepts.co"],
    });
    expect(email.replyTo).toBe("aisha@gulfexpo.ae");
    expect(email.subject).toBe("New enquiry: Exhibitions — Aisha Rahman");
    expect(email.text).toContain("Event or launch date: 20 November 2026");
    expect(email.text).toContain("2 Oct 2026, 12:00"); // Dubai time
    expect(email.text).toContain(lead.message);
  });

  it("never puts raw visitor input into the HTML", () => {
    const hostile = { ...lead, name: "<b>x</b>", message: "<script>alert(1)</script> hello there" };
    const email = composeTeamEmail(hostile, "Exhibitions", new Date(), { from: "a", to: ["b"] });
    expect(email.html).not.toContain("<script>");
    expect(email.html).not.toContain("<b>x</b>");
    expect(email.html).toContain("&lt;script&gt;");
  });

  it("confirms receipt with a fixed text that echoes nothing the visitor typed", () => {
    const hostile = {
      ...lead,
      name: "Click evil.example now",
      message: "Visit http://evil.example",
    };
    const reply = composeAutoReply(hostile, "Exhibitions", {
      from: "a",
      phone: "+971 58 854 7620",
    });
    expect(reply.to).toEqual(["aisha@gulfexpo.ae"]);
    expect(reply.text).toContain("Hello,");
    expect(reply.text + reply.html).not.toContain("evil.example");
    expect(reply.text).not.toMatch(/\b(hours?|minutes?|days?)\b/i);
  });

  it("calls Resend with the key in the header only, and reports failures", async () => {
    const fetchImpl = vi.fn(async () => new Response("{}", { status: 200 }));
    const message = composeAutoReply(lead, "Exhibitions", { from: "a" });
    expect(await sendWithResend("re_key", message, "id", fetchImpl as never)).toEqual({ ok: true });
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    expect((init.headers as Record<string, string>).Authorization).toBe("Bearer re_key");
    expect(String(init.body)).not.toContain("re_key");

    const failing = vi.fn(async () => new Response("{}", { status: 422 }));
    expect(await sendWithResend("re_key", message, "id", failing as never)).toEqual({
      ok: false,
      status: 422,
    });
  });
});

describe("turnstile", () => {
  it("rejects a missing token without calling Cloudflare", async () => {
    const fetchImpl = vi.fn();
    const result = await verifyTurnstile({ secret: "s", token: undefined }, fetchImpl as never);
    expect(result).toEqual({ ok: false, reason: "missing-token" });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("accepts a valid token for the lead action and rejects other actions", async () => {
    const ok = vi.fn(async () => Response.json({ success: true, action: "lead" }));
    expect(await verifyTurnstile({ secret: "s", token: "t" }, ok as never)).toEqual({ ok: true });
    const other = vi.fn(async () => Response.json({ success: true, action: "login" }));
    expect(await verifyTurnstile({ secret: "s", token: "t" }, other as never)).toEqual({
      ok: false,
      reason: "rejected",
    });
  });

  it("rejects a token without the lead action, or from another hostname", async () => {
    const noAction = vi.fn(async () => Response.json({ success: true }));
    expect((await verifyTurnstile({ secret: "s", token: "t" }, noAction as never)).ok).toBe(false);
    const elsewhere = vi.fn(async () =>
      Response.json({ success: true, action: "lead", hostname: "phish.example" }),
    );
    const pinned = { secret: "s", token: "t", expectedHostname: "www.viralconcepts.co" };
    expect((await verifyTurnstile(pinned, elsewhere as never)).ok).toBe(false);
    const bareDomain = vi.fn(async () =>
      Response.json({ success: true, action: "lead", hostname: "viralconcepts.co" }),
    );
    expect((await verifyTurnstile(pinned, bareDomain as never)).ok).toBe(true);
  });

  it("treats a network failure as unreachable", async () => {
    const down = vi.fn(async () => {
      throw new Error("offline");
    });
    expect(await verifyTurnstile({ secret: "s", token: "t" }, down as never)).toEqual({
      ok: false,
      reason: "unreachable",
    });
  });
});

describe("lead pipeline", () => {
  const submission = { ...VALID, "cf-turnstile-response": "token" };

  it("verifies, emails the team, sends the confirmation and reports success", async () => {
    const d = deps();
    const state = await handleLead(formData(submission), context(), d);
    expect(state).toEqual({ status: "success", firstName: "Aisha", serviceLabel: "Exhibitions" });
    expect(d.verifyTurnstile).toHaveBeenCalledWith({
      secret: "turnstile_secret_value",
      token: "token",
      remoteIp: "203.0.113.7",
    });
    expect(d.send).toHaveBeenCalledTimes(2);
  });

  it("pretends success for a filled honeypot and sends nothing", async () => {
    const d = deps();
    const state = await handleLead(formData({ ...submission, website: "spam" }), context(), d);
    expect(state.status).toBe("success");
    expect(d.send).not.toHaveBeenCalled();
    expect(d.verifyTurnstile).not.toHaveBeenCalled();
  });

  it("returns field errors and the typed values without calling Cloudflare", async () => {
    const d = deps();
    const state = await handleLead(formData({ ...submission, email: "nope" }), context(), d);
    expect(state.status).toBe("error");
    if (state.status === "error") {
      expect(state.fieldErrors?.email).toBeDefined();
      expect(state.values?.message).toBe(VALID.message);
    }
    expect(d.verifyTurnstile).not.toHaveBeenCalled();
  });

  it("stops at a failed security check", async () => {
    const d = deps({ verifyTurnstile: async () => ({ ok: false, reason: "rejected" }) });
    const state = await handleLead(formData(submission), context(), d);
    expect(state.status === "error" && state.message).toMatch(/security check/);
    expect(d.send).not.toHaveBeenCalled();
  });

  it("limits repeated valid submissions per IP and per email address", async () => {
    const d = deps({ emailLimiter: createRateLimiter({ limit: 1, windowMs: 60_000 }) });
    expect((await handleLead(formData(submission), context(), d)).status).toBe("success");
    const second = await handleLead(formData(submission), context(), d);
    expect(second.status === "error" && second.message).toMatch(/already received/);

    const ipLimited = deps({ ipLimiter: createRateLimiter({ limit: 1, windowMs: 60_000 }) });
    await handleLead(formData(submission), context(), ipLimited);
    const other = { ...submission, email: "someone.else@example.org" };
    const blocked = await handleLead(formData(other), context(), ipLimited);
    expect(blocked.status === "error" && blocked.message).toMatch(/short time/);
  });

  it("does not let unverified submissions use up a real visitor's allowance", async () => {
    const emailLimiter = createRateLimiter({ limit: 1, windowMs: 60_000 });
    const bot = deps({
      emailLimiter,
      verifyTurnstile: async () => ({ ok: false, reason: "missing-token" }),
    });
    for (let i = 0; i < 3; i += 1) await handleLead(formData(submission), context(), bot);
    const human = deps({ emailLimiter });
    expect((await handleLead(formData(submission), context(), human)).status).toBe("success");
  });

  it("does not count invalid attempts against the visitor", async () => {
    const d = deps({ ipLimiter: createRateLimiter({ limit: 1, windowMs: 60_000 }) });
    for (let i = 0; i < 3; i += 1) {
      await handleLead(formData({ ...submission, message: "short" }), context(), d);
    }
    expect((await handleLead(formData(submission), context(), d)).status).toBe("success");
  });

  it("reports a delivery failure and keeps the visitor's text", async () => {
    const d = deps({ send: vi.fn(async () => ({ ok: false as const, status: 500 })) });
    const state = await handleLead(formData(submission), context(), d);
    expect(state.status).toBe("error");
    if (state.status === "error") expect(state.values?.name).toBe(VALID.name);
  });

  it("still succeeds when only the confirmation email fails", async () => {
    const send = vi
      .fn()
      .mockResolvedValueOnce({ ok: true })
      .mockResolvedValueOnce({ ok: false, status: 500 });
    const state = await handleLead(formData(submission), context(), deps({ send }));
    expect(state.status).toBe("success");
  });

  it("skips the confirmation when auto-reply is off", async () => {
    const config: LeadFormConfig = { mode: "live", env: { ...LIVE.env, LEAD_AUTO_REPLY: false } };
    const d = deps();
    await handleLead(formData(submission), context(config), d);
    expect(d.send).toHaveBeenCalledTimes(1);
  });

  it("in test mode accepts the enquiry without Cloudflare or email", async () => {
    const d = deps();
    const state = await handleLead(formData(VALID), context({ mode: "test" }), d);
    expect(state.status).toBe("success");
    expect(d.verifyTurnstile).not.toHaveBeenCalled();
    expect(d.send).not.toHaveBeenCalled();
  });

  it("fails safely when the form is not configured", async () => {
    const state = await handleLead(
      formData(submission),
      context({ mode: "disabled", missing: ["RESEND_API_KEY"] }),
      deps(),
    );
    expect(state.status).toBe("error");
  });

  it("never logs the visitor's details or any secret", async () => {
    await handleLead(formData(submission), context(), deps());
    await handleLead(formData({ ...submission, website: "x" }), context(), deps());
    await handleLead(
      formData(submission),
      context(),
      deps({ send: vi.fn(async () => ({ ok: false as const })) }),
    );
    const output = logs.join("\n");
    expect(logs.length).toBeGreaterThan(0);
    for (const secret of [
      VALID.name,
      "aisha@gulfexpo.ae",
      VALID.phone,
      VALID.message,
      VALID.company,
      "re_secret_value",
      "turnstile_secret_value",
      "203.0.113.7",
    ]) {
      expect(output).not.toContain(secret);
    }
  });
});
