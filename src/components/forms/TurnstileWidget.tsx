"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

/**
 * Cloudflare Turnstile, rendered explicitly so React controls its lifecycle.
 * The widget adds a hidden `cf-turnstile-response` input to the surrounding form; the Server
 * Action verifies that token with Cloudflare. A token works once, so the parent passes the
 * latest action result as `resetSignal`; each new result resets the widget for a fresh token.
 * The script loads only on pages that render this component (the contact page).
 */
interface TurnstileApi {
  render(element: HTMLElement, options: Record<string, unknown>): string;
  reset(widgetId: string): void;
  remove(widgetId: string): void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

interface TurnstileWidgetProps {
  readonly siteKey: string;
  readonly action: string;
  readonly resetSignal: unknown;
  readonly onTokenChange: (hasToken: boolean) => void;
  /** Shown if the Turnstile script cannot load (offline, blocked by an extension or network). */
  readonly unavailableMessage: string;
}

export function TurnstileWidget({
  siteKey,
  action,
  resetSignal,
  onTokenChange,
  unavailableMessage,
}: TurnstileWidgetProps) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const callback = useRef(onTokenChange);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    callback.current = onTokenChange;
  }, [onTokenChange]);

  useEffect(() => {
    const api = window.turnstile;
    if (!ready || !api || !container.current || widgetId.current) return;
    widgetId.current = api.render(container.current, {
      sitekey: siteKey,
      action,
      theme: "light",
      size: "flexible",
      callback: () => callback.current(true),
      "expired-callback": () => callback.current(false),
      "error-callback": () => callback.current(false),
    });
    return () => {
      if (widgetId.current) api.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [ready, siteKey, action]);

  const firstSignal = useRef(resetSignal);
  useEffect(() => {
    if (resetSignal === firstSignal.current || !widgetId.current) return;
    window.turnstile?.reset(widgetId.current);
    callback.current(false);
  }, [resetSignal]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setReady(true)}
        onError={() => setFailed(true)}
      />
      {failed ? (
        <p role="alert" className="rounded-input border-2 border-danger bg-white p-4 text-ink">
          {unavailableMessage}
        </p>
      ) : null}
      {/* Reserve the widget's height so it does not shift the layout when it appears. */}
      <div ref={container} className="min-h-16.25" />
    </>
  );
}
