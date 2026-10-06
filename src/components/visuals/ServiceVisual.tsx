import type { CSSProperties, ReactNode } from "react";

import { Icon, type IconName } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";

/**
 * Animated, on-brand illustrations for the digital service pages — one composition per
 * service (a browser and code editor for web, a search page for SEO, a chat for AI agents …).
 *
 * Built from HTML and CSS only: no image files to ship, sharp at every size, and every moving
 * part animates transform/opacity on the compositor (see "Service visuals" in globals.css).
 * The root is `data-ambient`, so loops pause off screen; reduced motion shows a still frame.
 * Decorative: hidden from assistive technology, and nothing in it is a claim or a number.
 */

type Style = CSSProperties & Record<`--${string}`, string | number>;

const PANEL =
  "absolute overflow-hidden rounded-media border border-white/12 bg-night-soft shadow-raised";

/** A text placeholder line. */
function Line({ w, className }: { readonly w: string; readonly className?: string }) {
  return (
    <span
      className={cx("block h-2 shrink-0 rounded-full bg-white/15", className)}
      style={{ width: w }}
    />
  );
}

function WindowBar({ label }: { readonly label?: string }) {
  return (
    <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
      <span className="size-2 rounded-full bg-white/25" />
      <span className="size-2 rounded-full bg-white/25" />
      <span className="size-2 rounded-full bg-white/25" />
      <span className="ml-2 flex h-4 flex-1 items-center rounded-full bg-white/8 px-2 text-[9px] text-white/75">
        {label}
      </span>
    </div>
  );
}

function Chip({
  icon,
  children,
  tone = "glass",
  className,
  style,
}: {
  readonly icon?: IconName;
  readonly children: ReactNode;
  readonly tone?: "glass" | "yellow" | "cyan";
  readonly className?: string;
  readonly style?: Style;
}) {
  return (
    <span
      style={style}
      className={cx(
        "absolute inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold whitespace-nowrap shadow-raised",
        tone === "yellow" && "bg-yellow-400 text-ink",
        tone === "cyan" && "bg-cyan-300 text-ink",
        tone === "glass" && "border border-white/15 bg-night text-white",
        className,
      )}
    >
      {icon ? <Icon name={icon} className="size-3.5" /> : null}
      {children}
    </span>
  );
}

const delay = (seconds: number): Style => ({ animationDelay: `${seconds}s` });
const step = (index: number): Style => ({ "--i": index });

/* -------------------------------------------------------------------------- */
/* Web & app                                                                   */
/* -------------------------------------------------------------------------- */

function WebVisual() {
  return (
    <>
      <div className={cx(PANEL, "top-0 left-0 w-[84%]")}>
        <WindowBar label="yourbrand.ae" />
        <div className="flex flex-col gap-3 p-4">
          <div className="flex items-center justify-between">
            <span className="h-2.5 w-14 rounded-full bg-white/40" />
            <span className="flex gap-2">
              <Line w="1.5rem" />
              <Line w="1.5rem" />
              <Line w="1.5rem" />
            </span>
          </div>
          <div className="relative flex flex-col gap-2 overflow-hidden rounded-input bg-linear-to-br from-teal-600 to-night p-4">
            <Line w="70%" className="h-3 bg-white/70" />
            <Line w="48%" className="h-3 bg-white/70" />
            <Line w="60%" className="mt-1 bg-white/30" />
            <span className="mt-2 h-5 w-20 rounded-full bg-yellow-400" />
            <span className="vis-shimmer absolute inset-0" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="vis-pop flex flex-col gap-1.5 rounded-input bg-white/6 p-2.5"
                style={step(i)}
              >
                <span className="size-4 rounded-full bg-cyan-400/50" />
                <Line w="80%" />
                <Line w="55%" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className={cx(PANEL, "vis-float right-0 bottom-0 w-[52%] bg-night p-4")}
        style={delay(1)}
      >
        <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold text-cyan-300">
          <Icon name="code" className="size-3.5" /> page.tsx
        </div>
        <div className="flex flex-col gap-2 font-mono">
          <span className="flex gap-1.5">
            <Line w="18%" className="bg-yellow-400/80" />
            <Line w="40%" className="bg-cyan-300/70" />
          </span>
          <span className="flex gap-1.5 pl-4">
            <Line w="25%" className="bg-white/40" />
            <Line w="30%" className="bg-cyan-300/50" />
          </span>
          <span className="flex gap-1.5 pl-8">
            <Line w="45%" className="bg-white/25" />
          </span>
          <span className="flex gap-1.5 pl-4">
            <Line w="35%" className="bg-yellow-400/60" />
            <span className="vis-caret block h-3 w-0.5 bg-white" />
          </span>
        </div>
      </div>
      <Chip icon="bolt" tone="yellow" className="vis-float top-[46%] -left-2" style={delay(2)}>
        Fast on mobile
      </Chip>
    </>
  );
}

function PhoneShell({
  className,
  style,
  children,
}: {
  readonly className?: string;
  readonly style?: Style;
  readonly children: ReactNode;
}) {
  return (
    <div
      style={style}
      className={cx(
        "absolute flex aspect-[9/18] flex-col gap-2 overflow-hidden rounded-[1.75rem] border-4 border-night bg-night-soft p-3 shadow-raised ring-1 ring-white/15",
        className,
      )}
    >
      <span className="mx-auto mb-1 h-1.5 w-10 rounded-full bg-white/20" />
      {children}
    </div>
  );
}

function AppVisual() {
  return (
    <>
      <PhoneShell className="vis-float top-[4%] left-[10%] w-[38%] -rotate-6">
        <Line w="55%" className="h-2.5 bg-white/50" />
        <div className="aspect-[4/3] rounded-input bg-linear-to-br from-cyan-400/70 to-teal-800" />
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="vis-pop flex items-center gap-2 rounded-input bg-white/6 p-2"
            style={step(i)}
          >
            <span className="size-5 shrink-0 rounded-full bg-yellow-400/80" />
            <span className="flex flex-1 flex-col gap-1">
              <Line w="80%" />
              <Line w="50%" />
            </span>
          </div>
        ))}
        <div className="mt-auto flex justify-around border-t border-white/10 pt-2">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={cx("size-3 rounded-full", i === 0 ? "bg-cyan-300" : "bg-white/20")}
            />
          ))}
        </div>
      </PhoneShell>
      <PhoneShell className="vis-float top-[10%] right-[8%] w-[38%] rotate-6" style={delay(1.4)}>
        <Line w="45%" className="h-2.5 bg-white/50" />
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 21 }, (_, i) => (
            <span
              key={i}
              className={cx(
                "aspect-square rounded-[3px]",
                i === 9 ? "bg-yellow-400" : i % 5 === 0 ? "bg-cyan-400/40" : "bg-white/8",
              )}
            />
          ))}
        </div>
        <Line w="70%" className="mt-1" />
        <Line w="40%" />
        <span className="mt-auto flex h-7 items-center justify-center rounded-full bg-yellow-400 text-[10px] font-semibold text-ink">
          Book now
        </span>
      </PhoneShell>
      <Chip icon="check" tone="cyan" className="vis-pop bottom-[8%] left-[30%]" style={step(3)}>
        Booking confirmed
      </Chip>
    </>
  );
}

function EcommerceVisual() {
  return (
    <>
      <div className={cx(PANEL, "top-0 left-0 w-[74%]")}>
        <WindowBar label="shop.yourbrand.ae" />
        <div className="grid grid-cols-3 gap-2.5 p-4">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="vis-pop flex flex-col gap-1.5" style={step(i % 3)}>
              <div
                className={cx(
                  "aspect-square rounded-input",
                  i % 3 === 0
                    ? "bg-linear-to-br from-teal-500 to-night"
                    : i % 3 === 1
                      ? "bg-linear-to-br from-cyan-300/60 to-teal-800"
                      : "bg-linear-to-br from-yellow-400/70 to-teal-800",
                )}
              />
              <Line w="80%" />
              <Line w="40%" className="bg-yellow-400/60" />
            </div>
          ))}
        </div>
      </div>
      <div
        className={cx(
          PANEL,
          "vis-float right-0 bottom-[2%] flex w-[44%] flex-col gap-3 bg-night p-4",
        )}
        style={delay(0.8)}
      >
        <p className="flex items-center gap-2 text-[11px] font-semibold text-white">
          <Icon name="cart" className="size-4 text-cyan-300" /> Your cart
        </p>
        {[0, 1].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="size-8 shrink-0 rounded-input bg-white/10" />
            <span className="flex flex-1 flex-col gap-1">
              <Line w="85%" />
              <Line w="45%" />
            </span>
          </div>
        ))}
        <span className="flex h-8 items-center justify-center rounded-full bg-yellow-400 text-[11px] font-semibold text-ink">
          Checkout
        </span>
      </div>
      <Chip icon="lock" className="vis-float bottom-[34%] left-[6%]" style={delay(2)}>
        Secure checkout
      </Chip>
    </>
  );
}

function SoftwareVisual() {
  return (
    <>
      <div className={cx(PANEL, "top-0 left-0 flex w-[86%]")}>
        <div className="flex w-12 shrink-0 flex-col items-center gap-3 border-r border-white/10 bg-night py-4">
          <span className="size-6 rounded-input bg-yellow-400" />
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={cx("size-4 rounded-[3px]", i === 1 ? "bg-cyan-300" : "bg-white/20")}
            />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col gap-2 rounded-input bg-white/6 p-2.5">
                <Line w="50%" />
                <div className="flex h-8 items-end gap-1">
                  {[0.5, 0.8, 0.6, 1].map((h, j) => (
                    <span
                      key={j}
                      className="vis-bar flex-1 rounded-t-[3px] bg-cyan-400/70"
                      style={{ height: `${h * 100}%`, ...step(i + j) }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 border-b border-white/8 pb-2">
              <span className="size-3 rounded-full bg-white/20" />
              <Line w="30%" />
              <Line w="20%" className="ml-auto" />
              <span
                className={cx(
                  "h-3 w-10 rounded-full",
                  i === 0 ? "bg-yellow-400/80" : "bg-cyan-400/40",
                )}
              />
            </div>
          ))}
        </div>
      </div>
      <div
        className={cx(PANEL, "vis-float right-0 bottom-0 w-[48%] bg-night p-4")}
        style={delay(1.2)}
      >
        <p className="mb-3 text-[10px] font-semibold text-cyan-300">API</p>
        <div className="relative flex items-center justify-between">
          <span className="absolute inset-x-4 top-1/2 h-px bg-white/20" />
          <span className="absolute inset-x-4 top-1/2 h-px">
            <span className="vis-travel absolute inset-0">
              <span className="absolute -top-1 left-0 size-2 rounded-full bg-yellow-400" />
            </span>
          </span>
          {["CRM", "App", "ERP"].map((label) => (
            <span
              key={label}
              className="relative grid size-10 place-items-center rounded-full border border-white/20 bg-night-soft text-[10px] font-semibold text-white"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Marketing                                                                   */
/* -------------------------------------------------------------------------- */

function SeoVisual() {
  return (
    <>
      <div className={cx(PANEL, "top-0 left-0 w-[86%] p-4")}>
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-3 py-2">
          <Icon name="search" className="size-4 text-cyan-300" />
          <Line w="45%" className="bg-white/40" />
          <span className="vis-caret block h-3 w-0.5 bg-white" />
        </div>
        <ul className="mt-4 flex flex-col gap-2.5">
          {[0, 1, 2, 3].map((i) => (
            <li
              key={i}
              className={cx(
                "flex flex-col gap-1.5 rounded-input p-2.5",
                i === 0 ? "border border-yellow-400/70 bg-yellow-400/10" : "bg-white/4",
              )}
            >
              <span className="flex items-center gap-2">
                <span
                  className={cx("size-3 rounded-full", i === 0 ? "bg-yellow-400" : "bg-white/20")}
                />
                <Line
                  w={i === 0 ? "55%" : "45%"}
                  className={i === 0 ? "bg-cyan-300/80" : "bg-cyan-300/30"}
                />
                {i === 0 ? (
                  <span className="ml-auto rounded-full bg-yellow-400 px-2 py-0.5 text-[9px] font-semibold text-ink">
                    Your site
                  </span>
                ) : null}
              </span>
              <Line w="85%" />
              <Line w="60%" />
            </li>
          ))}
        </ul>
      </div>
      <div
        className={cx(PANEL, "vis-float right-0 bottom-[2%] w-[40%] bg-night p-4")}
        style={delay(1)}
      >
        <p className="mb-2 text-[10px] font-semibold text-cyan-300">Local search</p>
        <div className="relative grid aspect-[4/3] place-items-center rounded-input bg-white/4 bg-hairline-grid">
          <span className="vis-ring absolute size-8 rounded-full border border-yellow-400" />
          <Icon name="map-pin" className="relative size-7 text-yellow-400" />
        </div>
      </div>
      <Chip
        icon="arrow-up-right"
        tone="cyan"
        className="vis-float top-[18%] -right-1"
        style={delay(2.2)}
      >
        Climbing
      </Chip>
    </>
  );
}

function SocialVisual() {
  return (
    <>
      <PhoneShell className="vis-float top-0 left-[12%] w-[40%]">
        <span className="flex items-center gap-2">
          <span className="size-5 rounded-full bg-linear-to-br from-yellow-400 to-cyan-400" />
          <Line w="45%" className="bg-white/40" />
        </span>
        <div className="relative aspect-square overflow-hidden rounded-input bg-linear-to-br from-teal-500 via-teal-800 to-night">
          <span className="absolute right-3 bottom-3 size-10 rounded-full bg-yellow-400/80" />
          <span className="vis-shimmer absolute inset-0" />
        </div>
        <span className="flex items-center gap-3 text-white">
          <Icon name="heart" className="vis-beat size-4 text-yellow-400" />
          <Icon name="chat" className="size-4" />
          <Icon name="send" className="size-4" />
        </span>
        <Line w="80%" />
        <Line w="55%" />
      </PhoneShell>
      <div
        className={cx(PANEL, "vis-float right-0 bottom-[6%] w-[46%] bg-night p-4")}
        style={delay(1.2)}
      >
        <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold text-cyan-300">
          <Icon name="calendar" className="size-3.5" /> Content calendar
        </p>
        <div className="grid grid-cols-7 gap-1.5">
          {Array.from({ length: 28 }, (_, i) => (
            <span
              key={i}
              className={cx(
                "aspect-square rounded-[3px]",
                [2, 9, 16, 23].includes(i)
                  ? "bg-yellow-400"
                  : [5, 12, 19, 26].includes(i)
                    ? "bg-cyan-400/70"
                    : "bg-white/8",
              )}
            />
          ))}
        </div>
      </div>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="vis-rise absolute top-[40%] left-[52%] grid size-7 place-items-center rounded-full bg-yellow-400 text-ink shadow-raised"
          style={{ ...step(i), left: `${50 + i * 5}%` }}
        >
          <Icon name="heart" className="size-3.5" />
        </span>
      ))}
    </>
  );
}

function AdsVisual() {
  return (
    <>
      <div className={cx(PANEL, "top-0 left-0 w-[80%] p-4")}>
        <div className="mb-3 flex items-center justify-between">
          <p className="flex items-center gap-2 text-[10px] font-semibold text-cyan-300">
            <Icon name="chart" className="size-3.5" /> Campaign performance
          </p>
          <span className="flex gap-1">
            <span className="h-4 w-8 rounded-full bg-yellow-400/80" />
            <span className="h-4 w-8 rounded-full bg-white/10" />
          </span>
        </div>
        <div className="flex h-28 items-end gap-2 border-b border-white/10 pb-1">
          {[0.35, 0.5, 0.45, 0.65, 0.6, 0.8, 0.95].map((h, i) => (
            <span
              key={i}
              className="vis-bar flex-1 rounded-t-[3px] bg-linear-to-t from-teal-500 to-cyan-300"
              style={{ height: `${h * 100}%`, ...step(i) }}
            />
          ))}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {["Reach", "Clicks", "Leads"].map((label, i) => (
            <div key={label} className="flex flex-col gap-1.5 rounded-input bg-white/6 p-2">
              <span className="text-[9px] text-white/60">{label}</span>
              <span className="h-2 rounded-full bg-white/10">
                <span
                  className="vis-scan block h-full origin-left rounded-full bg-yellow-400"
                  style={{ width: `${90 - i * 22}%`, ...step(i) }}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
      <div
        className={cx(PANEL, "vis-float right-0 bottom-[4%] w-[44%] bg-night p-3")}
        style={delay(0.6)}
      >
        <span className="mb-2 inline-flex rounded-[3px] bg-white/10 px-1.5 text-[9px] font-semibold text-white">
          Search ad
        </span>
        <Line w="80%" className="bg-cyan-300/70" />
        <Line w="95%" className="mt-1.5" />
        <Line w="70%" className="mt-1.5" />
      </div>
      <div
        className={cx(PANEL, "vis-float bottom-0 left-[4%] w-[40%] bg-night p-3")}
        style={delay(1.8)}
      >
        <span className="mb-2 inline-flex rounded-[3px] bg-white/10 px-1.5 text-[9px] font-semibold text-white">
          Social ad
        </span>
        <div className="aspect-[16/9] rounded-input bg-linear-to-br from-yellow-400/70 to-teal-800" />
      </div>
    </>
  );
}

function ContentVisual() {
  const columns = [
    { title: "Plan", cards: 2 },
    { title: "Write", cards: 3 },
    { title: "Live", cards: 2 },
  ];
  return (
    <>
      <div className={cx(PANEL, "top-0 left-0 grid w-[84%] grid-cols-3 gap-2.5 p-4")}>
        {columns.map((column, c) => (
          <div key={column.title} className="flex flex-col gap-2">
            <p className="text-[10px] font-semibold text-cyan-300">{column.title}</p>
            {Array.from({ length: column.cards }, (_, i) => (
              <div
                key={i}
                className={cx(
                  "vis-pop flex flex-col gap-1.5 rounded-input p-2.5",
                  c === 2 ? "bg-yellow-400/15 ring-1 ring-yellow-400/40" : "bg-white/6",
                )}
                style={step(c + i)}
              >
                <Line w="85%" />
                <Line w="55%" />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div
        className={cx(PANEL, "vis-float right-0 bottom-0 flex w-[50%] flex-col gap-2 bg-night p-4")}
        style={delay(1)}
      >
        <Line w="80%" className="h-3 bg-white/60" />
        <Line w="60%" className="h-3 bg-white/60" />
        <Line w="95%" className="mt-1" />
        <Line w="90%" />
        <Line w="70%" />
        <span className="mt-1 flex flex-wrap gap-1.5">
          {["Local", "Technical", "GEO"].map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-cyan-300/15 px-2 py-0.5 text-[9px] font-semibold text-cyan-300"
            >
              {tag}
            </span>
          ))}
        </span>
      </div>
      <Chip
        icon="map-pin"
        tone="yellow"
        className="vis-float bottom-[34%] left-[2%]"
        style={delay(2)}
      >
        Found nearby
      </Chip>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* AI & automation                                                             */
/* -------------------------------------------------------------------------- */

function AutomationVisual() {
  const nodes: { icon: IconName; label: string }[] = [
    { icon: "mail", label: "New enquiry" },
    { icon: "spark", label: "AI qualifies" },
    { icon: "chart", label: "CRM updated" },
    { icon: "chat", label: "Team notified" },
  ];
  return (
    <>
      <div className={cx(PANEL, "inset-x-[4%] top-[4%] bottom-[16%] p-5")}>
        <p className="mb-4 text-[10px] font-semibold text-cyan-300">Automated workflow</p>
        <ol className="relative flex flex-col gap-4">
          <span className="absolute top-4 bottom-4 left-5 w-px bg-white/15" />
          <span className="absolute top-4 bottom-4 left-5 w-px">
            <span className="vis-travel-y absolute inset-0">
              <span className="absolute top-0 -left-1 size-2.5 rounded-full bg-yellow-400 shadow-[0_0_12px_var(--color-yellow-400)]" />
            </span>
          </span>
          {nodes.map((node, i) => (
            <li key={node.label} className="relative flex items-center gap-3">
              <span
                className="vis-lit grid size-10 shrink-0 place-items-center rounded-full border border-white/20 bg-night text-white"
                style={step(i)}
              >
                <Icon name={node.icon} className="size-4.5" />
              </span>
              <span className="flex flex-1 items-center justify-between gap-2 rounded-input bg-white/6 px-3 py-2">
                <span className="text-[11px] font-semibold text-white">{node.label}</span>
                <Icon name="check" className="vis-pop size-4 text-cyan-300" style={step(i)} />
              </span>
            </li>
          ))}
        </ol>
      </div>
      <Chip
        icon="clock"
        tone="yellow"
        className="vis-float right-[2%] bottom-[4%]"
        style={delay(1.5)}
      >
        Runs 24/7
      </Chip>
    </>
  );
}

function AgentVisual() {
  const messages = [
    { from: "user", width: "w-[52%]", w: ["90%", "60%"] },
    { from: "ai", width: "w-[70%]", w: ["95%", "70%"] },
    { from: "user", width: "w-[38%]", w: ["80%"] },
    { from: "ai", width: "w-[64%]", w: ["90%", "55%"] },
  ] as const;
  return (
    <>
      <div className={cx(PANEL, "inset-x-[6%] top-0 bottom-[6%] flex flex-col")}>
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <span className="relative grid size-8 place-items-center rounded-full bg-yellow-400 text-[10px] font-bold text-ink">
            AI
            <span className="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 border-night-soft bg-cyan-300" />
          </span>
          <span className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-white">Assistant</span>
            <span className="text-[9px] text-white/60">Online · Arabic & English</span>
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2 overflow-hidden px-4 py-3">
          {messages.map((message, i) => (
            <div
              key={i}
              className={cx(
                "vis-pop flex flex-col gap-1.5 rounded-card px-3 py-2",
                message.width,
                message.from === "user"
                  ? "self-end rounded-br-[4px] bg-cyan-300/80"
                  : "self-start rounded-bl-[4px] bg-white/10",
              )}
              style={step(i * 1.2)}
            >
              {message.w.map((w, j) => (
                <Line
                  key={j}
                  w={w}
                  className={message.from === "user" ? "bg-ink/40" : "bg-white/35"}
                />
              ))}
            </div>
          ))}
          <span className="typing-dots flex w-12 shrink-0 gap-1 rounded-full bg-white/10 px-3 py-2">
            <span className="size-1.5 rounded-full bg-white/70" />
            <span className="size-1.5 rounded-full bg-white/70" />
            <span className="size-1.5 rounded-full bg-white/70" />
          </span>
        </div>
        <div className="flex shrink-0 gap-2 border-t border-white/10 px-4 py-2.5">
          {["Book a call", "Prices", "Talk to a person"].map((reply) => (
            <span
              key={reply}
              className="rounded-full border border-white/20 px-2.5 py-1 text-[9px] text-white/80"
            >
              {reply}
            </span>
          ))}
        </div>
      </div>
      <Chip icon="check" tone="yellow" className="vis-float right-0 bottom-0" style={delay(1)}>
        Lead captured
      </Chip>
    </>
  );
}

function GenerativeVisual() {
  return (
    <>
      <div className={cx(PANEL, "top-0 left-0 w-[88%] p-4")}>
        <div className="flex items-center gap-2 rounded-full border border-cyan-300/40 bg-white/6 px-3 py-2.5">
          <Icon name="spark" className="size-4 text-yellow-400" />
          <Line w="55%" className="bg-white/40" />
          <span className="vis-caret block h-3 w-0.5 bg-white" />
          <span className="ml-auto grid size-6 place-items-center rounded-full bg-yellow-400 text-ink">
            <Icon name="arrow-right" className="size-3.5" />
          </span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {[
            "from-cyan-300/70 to-teal-800",
            "from-yellow-400/70 to-teal-800",
            "from-teal-500 to-night",
            "from-cyan-400/50 to-navy",
          ].map((gradient, i) => (
            <div
              key={gradient}
              className={cx(
                "vis-pop relative aspect-[4/3] overflow-hidden rounded-input bg-linear-to-br",
                gradient,
              )}
              style={step(i)}
            >
              <span className="vis-shimmer absolute inset-0" />
            </div>
          ))}
        </div>
      </div>
      <div
        className={cx(PANEL, "vis-float right-0 bottom-0 flex w-[46%] flex-col gap-2 bg-night p-4")}
        style={delay(1.2)}
      >
        <p className="text-[10px] font-semibold text-cyan-300">Draft proposal</p>
        <Line w="90%" className="vis-pop" />
        <Line w="80%" className="vis-pop" />
        <Line w="95%" className="vis-pop" />
        <Line w="55%" className="vis-pop" />
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Digital Solutions overview                                                  */
/* -------------------------------------------------------------------------- */

function OverviewVisual() {
  return (
    <>
      <div className={cx(PANEL, "top-0 left-0 w-[78%]")}>
        <WindowBar label="yourbrand.ae" />
        <div className="flex flex-col gap-3 p-4">
          <div className="relative flex flex-col gap-2 overflow-hidden rounded-input bg-linear-to-br from-teal-600 to-night p-4">
            <Line w="65%" className="h-3 bg-white/70" />
            <Line w="40%" className="h-3 bg-white/70" />
            <span className="mt-2 h-5 w-20 rounded-full bg-yellow-400" />
            <span className="vis-shimmer absolute inset-0" />
          </div>
          <div className="flex h-16 items-end gap-1.5">
            {[0.3, 0.45, 0.4, 0.6, 0.55, 0.75, 0.9, 1].map((h, i) => (
              <span
                key={i}
                className="vis-bar flex-1 rounded-t-[3px] bg-linear-to-t from-teal-500 to-cyan-300"
                style={{ height: `${h * 100}%`, ...step(i) }}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        className={cx(
          PANEL,
          "vis-float right-0 bottom-[4%] flex w-[50%] flex-col gap-2.5 bg-night p-4",
        )}
        style={delay(1)}
      >
        <span className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-full bg-yellow-400 text-[9px] font-bold text-ink">
            AI
          </span>
          <span className="text-[11px] font-semibold text-white">Assistant</span>
        </span>
        <div
          className="vis-pop flex w-[65%] flex-col gap-1.5 self-end rounded-card rounded-br-[4px] bg-cyan-300/80 px-3 py-2"
          style={step(0)}
        >
          <Line w="70%" className="bg-ink/40" />
        </div>
        <div
          className="vis-pop flex w-[85%] flex-col gap-1.5 rounded-card rounded-bl-[4px] bg-white/10 px-3 py-2"
          style={step(1.5)}
        >
          <Line w="90%" className="bg-white/35" />
          <Line w="60%" className="bg-white/35" />
        </div>
      </div>
      <Chip icon="search" tone="yellow" className="vis-float top-[52%] -left-2" style={delay(2)}>
        Found on Google
      </Chip>
      <Chip icon="heart" className="vis-float top-[8%] -right-1" style={delay(0.5)}>
        New followers
      </Chip>
    </>
  );
}

/* -------------------------------------------------------------------------- */

const VISUALS: Record<string, () => ReactNode> = {
  "digital-solutions": OverviewVisual,
  "web-development": WebVisual,
  "application-development": AppVisual,
  "ecommerce-development": EcommerceVisual,
  "custom-software": SoftwareVisual,
  seo: SeoVisual,
  "social-media-management": SocialVisual,
  "performance-marketing": AdsVisual,
  "content-search-strategy": ContentVisual,
  "ai-automation": AutomationVisual,
  "ai-agents": AgentVisual,
  "generative-ai": GenerativeVisual,
};

/** Whether a service has a bespoke visual. */
export function hasServiceVisual(slug: string): boolean {
  return slug in VISUALS;
}

export function ServiceVisual({
  slug,
  className,
}: {
  readonly slug: string;
  readonly className?: string;
}) {
  const Visual = VISUALS[slug];
  if (!Visual) return null;
  return (
    <div
      aria-hidden="true"
      data-ambient=""
      className={cx("service-visual relative aspect-[5/4] w-full select-none", className)}
    >
      {/* Soft light behind the composition. */}
      <span className="absolute inset-[10%] -z-10 rounded-full opacity-70 glow-cyan" />
      <Visual />
    </div>
  );
}
