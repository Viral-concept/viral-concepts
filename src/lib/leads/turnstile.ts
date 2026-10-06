import "server-only";

/**
 * Cloudflare Turnstile server-side verification.
 * https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 *
 * The token from the browser proves nothing until Cloudflare confirms it here, with the
 * secret key that never leaves the server.
 */
const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** The widget is rendered with this action; a token minted for anything else is rejected. */
export const TURNSTILE_ACTION = "lead";

export type TurnstileResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly reason: "missing-token" | "rejected" | "unreachable" };

interface SiteverifyResponse {
  readonly success: boolean;
  readonly action?: string;
  readonly hostname?: string;
  readonly "error-codes"?: readonly string[];
}

export async function verifyTurnstile(
  {
    secret,
    token,
    remoteIp,
    expectedHostname,
  }: {
    readonly secret: string;
    readonly token: string | undefined;
    readonly remoteIp?: string;
    /** When set, a token issued on any other hostname is rejected ("www." is ignored). */
    readonly expectedHostname?: string;
  },
  fetchImpl: typeof fetch = fetch,
): Promise<TurnstileResult> {
  if (!token || token.length > 2048) return { ok: false, reason: "missing-token" };

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const response = await fetchImpl(SITEVERIFY_URL, {
      method: "POST",
      body,
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) return { ok: false, reason: "unreachable" };
    const result = (await response.json()) as SiteverifyResponse;
    const actionMatches = result.action === TURNSTILE_ACTION;
    const bare = (host: string | undefined) => host?.replace(/^www\./, "");
    const hostMatches = !expectedHostname || bare(result.hostname) === bare(expectedHostname);
    return result.success && actionMatches && hostMatches
      ? { ok: true }
      : { ok: false, reason: "rejected" };
  } catch {
    return { ok: false, reason: "unreachable" };
  }
}
