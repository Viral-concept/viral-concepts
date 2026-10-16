"use client";

import Script from "next/script";
import { useEffect } from "react";

// Google Analytics 4 measurement ID (public, safe to keep in code). Set NEXT_PUBLIC_GA_ID in Vercel to override.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-Z168RYKJJ0";
// Optional Google Tag Manager container. If GTM also fires a GA4 tag, remove that tag to avoid double counting.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

// Loads GA4 (gtag.js) and, when configured, GTM. Every WhatsApp and phone click, the site's main
// conversions, is sent to GA4 as an event and pushed to the dataLayer for GTM.
export default function Analytics() {
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.("a[href]");
      if (!a) return;
      const href = a.getAttribute("href");
      const event = href.startsWith("https://wa.me/")
        ? "whatsapp_click"
        : href.startsWith("tel:")
          ? "call_click"
          : null;
      if (!event) return;
      const params = { link_url: href, page_path: window.location.pathname };
      if (typeof window.gtag === "function") window.gtag("event", event, params);
      if (GTM_ID) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event, ...params });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config',${JSON.stringify(GA_ID)});`}
          </Script>
        </>
      )}
      {GTM_ID && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(GTM_ID)});`}
        </Script>
      )}
    </>
  );
}
