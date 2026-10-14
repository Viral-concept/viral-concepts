import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ViewTransition } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { PreviewBanner } from "@/components/layout/PreviewBanner";
import { RevealController } from "@/components/motion/RevealController";
import { JsonLd } from "@/components/seo/JsonLd";
import { brandColors } from "@/config/brand";
import { siteUrl } from "@/config/env.public";
import { isIndexable, isVercel } from "@/config/env.server";
import { site } from "@/content/site";
import { getContentMode } from "@/lib/content";
import { DEFAULT_TITLE, OG_LOCALE, SITE_TITLE_TEMPLATE } from "@/lib/metadata";
import { organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";

import "./globals.css";

/*
 * Self-hosted fonts (SIL OFL, licences in src/assets/fonts); builds never depend on a font CDN.
 * - Archivo (variable weight + width): condensed poster headlines, expanded labels.
 * - Instrument Serif (roman + italic): the editorial accent words in headlines.
 * - Inter (variable): body copy and UI.
 */
const inter = localFont({
  src: "../assets/fonts/inter-latin-variable.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
});
const archivo = localFont({
  src: "../assets/fonts/archivo-latin-variable.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-archivo",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});
const instrumentSerif = localFont({
  src: [
    { path: "../assets/fonts/instrument-serif-latin-400.woff2", weight: "400", style: "normal" },
    {
      path: "../assets/fonts/instrument-serif-latin-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: DEFAULT_TITLE, template: SITE_TITLE_TEMPLATE },
  description: site.description,
  applicationName: site.name,
  // No canonical or og:url here: they would be inherited by every page that forgot its own and
  // point search engines at the homepage. Each page sets them through buildMetadata().
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: OG_LOCALE,
    title: DEFAULT_TITLE,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: DEFAULT_TITLE, description: site.description },
  // Deployment-wide policy: only the production deployment may be indexed.
  robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: brandColors.night,
  colorScheme: "light",
  // Lets env(safe-area-inset-*) work so the mobile action bar clears the iOS home indicator.
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const isPreview = getContentMode() === "preview";

  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} ${archivo.variable} ${instrumentSerif.variable}`}
    >
      <body className="flex min-h-dvh flex-col pb-action-bar antialiased md:pb-0">
        <a
          href="#main-content"
          className="sr-only z-50 rounded-input bg-yellow-400 px-4 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to main content
        </a>
        {isPreview ? <PreviewBanner /> : null}
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {/* Pages cross-fade on navigation (View Transitions; instant where unsupported). */}
          <ViewTransition>{children}</ViewTransition>
        </main>
        <Footer />
        <MobileActionBar />
        <RevealController />
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        {/* Cookieless; its script only exists on Vercel deployments. */}
        {isVercel ? <Analytics /> : null}
      </body>
    </html>
  );
}
