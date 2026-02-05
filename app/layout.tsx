import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// Viewport configuration for mobile optimization
export const viewport: Viewport = {
  themeColor: "#000814",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Leaderboard - Last Frame",
  description: "A Legacy in Orbit - Inlineer 2022 Donor Leaderboard",
  keywords: ["leaderboard", "donation", "inlineer", "2022"],
  authors: [{ name: "Inlineer Team" }],
  robots: "index, follow",
  // Open Graph for social sharing
  openGraph: {
    title: "Leaderboard - Last Frame",
    description: "A Legacy in Orbit - Inlineer 2022 Donor Leaderboard",
    type: "website",
    locale: "id_ID",
  },
};

// PERFORMANCE OPTIMIZED: Removed LazySmoothScrolling to reduce main thread blocking
// Native scroll behavior is faster and works better with CSS scroll-behavior: smooth
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body
        className={`antialiased bg-background text-foreground font-sans`}
        suppressHydrationWarning
      >
        <div className="noise-overlay" />
        <main className="relative z-10 min-h-screen flex flex-col">
          {children}
        </main>

        {/* Vercel Analytics & Speed Insights - automatically activated on Vercel */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}


