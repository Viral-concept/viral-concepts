import { cx } from "@/lib/cx";

/**
 * A stylised website-and-app composition for the digital side (CSS only, decorative): a browser
 * window with a live-looking chart and a phone with an incoming notification, floating gently.
 * Abstract on purpose — no invented numbers, brands or screenshots.
 */
export function InterfaceMock({
  withChat = false,
  className,
}: {
  readonly withChat?: boolean;
  readonly className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      data-ambient=""
      className={cx("relative aspect-[5/4] w-full", className)}
    >
      {/* Browser */}
      <div className="float-slow absolute top-0 left-0 w-[86%] overflow-hidden rounded-media border border-white/12 bg-night-soft shadow-raised">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
          <span className="size-2.5 rounded-full bg-white/25" />
          <span className="size-2.5 rounded-full bg-white/25" />
          <span className="size-2.5 rounded-full bg-white/25" />
          <span className="ml-3 h-5 flex-1 rounded-full bg-white/8" />
        </div>
        <div className="grid grid-cols-5 gap-4 p-5">
          <div className="col-span-3 flex flex-col gap-2.5">
            <span className="h-3 w-3/4 rounded-full bg-white/70" />
            <span className="h-3 w-1/2 rounded-full bg-white/40" />
            <span className="mt-2 h-2 w-full rounded-full bg-white/15" />
            <span className="h-2 w-5/6 rounded-full bg-white/15" />
            <span className="mt-3 h-7 w-28 rounded-input bg-yellow-400" />
          </div>
          <div className="col-span-2 rounded-card bg-linear-to-br from-teal-500/50 to-cyan-400/20" />
          <div className="col-span-5 flex h-24 items-end gap-2 rounded-card border border-white/10 p-3">
            {[38, 52, 44, 63, 58, 76, 88].map((height, index) => (
              <span
                key={index}
                className="mock-bar rounded-t-sm flex-1 bg-linear-to-t from-teal-500 to-cyan-300"
                style={{ height: `${height}%`, animationDelay: `${index * 120}ms` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Phone */}
      <div className="float-slow absolute right-0 bottom-0 w-[34%] [animation-delay:-3s]">
        <div className="relative aspect-[9/18] overflow-hidden rounded-[1.6rem] border border-white/15 bg-night p-2.5 shadow-raised">
          <div className="flex h-full flex-col gap-2 rounded-[1.15rem] bg-night-soft p-3">
            <span className="mx-auto h-1.5 w-10 rounded-full bg-white/20" />
            <span className="mt-2 aspect-video rounded-card bg-linear-to-br from-yellow-400/70 to-teal-500/40" />
            <span className="h-2 w-4/5 rounded-full bg-white/50" />
            <span className="h-2 w-3/5 rounded-full bg-white/25" />
            <span className="h-2 w-2/3 rounded-full bg-white/25" />
            <div className="mock-notify mt-auto flex items-center gap-2 rounded-card bg-white p-2">
              <span className="size-5 shrink-0 rounded-full bg-yellow-400" />
              <span className="h-1.5 flex-1 rounded-full bg-ink/30" />
            </div>
          </div>
        </div>
      </div>

      {withChat ? (
        <div className="float-slow absolute bottom-[10%] left-[4%] w-[52%] [animation-delay:-1.5s]">
          <div className="flex flex-col gap-2 rounded-media border border-white/15 bg-night/90 p-3 shadow-raised backdrop-blur-md">
            <span className="h-2 w-3/4 self-end rounded-full bg-cyan-400/60" />
            <div className="flex items-center gap-2">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-yellow-400 font-display text-[10px] font-bold text-ink">
                AI
              </span>
              <span className="typing-dots flex gap-1 rounded-full bg-white/10 px-3 py-2">
                <span className="size-1.5 rounded-full bg-white/80" />
                <span className="size-1.5 rounded-full bg-white/80" />
                <span className="size-1.5 rounded-full bg-white/80" />
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
