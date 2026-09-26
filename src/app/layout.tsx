import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { SessionProvider } from "@/lib/session";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

/**
 * Three faces, each doing one job.
 *
 * <p>Loaded through `next/font` rather than a `<link>` to Google: the files are fetched at build
 * time and served from this origin, so there is no second DNS lookup and no render-blocking
 * stylesheet on the critical path. It also generates a local fallback metric-matched to each
 * face, which is what stops the page reflowing when the real font arrives.
 *
 * <p>Bricolage Grotesque carries the headlines - it has actual character, which is the point when
 * the first screen has a few seconds to be interesting. Plus Jakarta Sans does the reading:
 * rounder and warmer than the usual neutral grotesque, and still completely plain at 13px in a
 * table cell, which is where most of this app lives.
 */
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display-loaded",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans-loaded",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-loaded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SWITCH — your job search, tracked",
  description:
    "Track applications, interviews, assignments and screening calls in one place, so nothing goes quiet without you noticing.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#5b2fe8",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="min-h-screen bg-canvas text-ink antialiased">
        <SessionProvider>
          <ToastProvider>{children}</ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
