import "server-only";

/**
 * Minimal structured server logger. One JSON line per event so Vercel log search and drains
 * can filter by `scope`. Never pass secrets or full form submissions as context.
 */

type LogLevel = "info" | "warn" | "error";

type LogContext = Readonly<Record<string, string | number | boolean | null | undefined>>;

function write(level: LogLevel, scope: string, message: string, context?: LogContext): void {
  const line = JSON.stringify({ level, scope, message, ...context, at: new Date().toISOString() });
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.info(line);
}

export const logger = {
  info: (scope: string, message: string, context?: LogContext) =>
    write("info", scope, message, context),
  warn: (scope: string, message: string, context?: LogContext) =>
    write("warn", scope, message, context),
  error: (scope: string, message: string, context?: LogContext) =>
    write("error", scope, message, context),
};
