import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScrolling } from "@/components/SmoothScrolling";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Leaderboard - Inlineer 2022",
  description: "A Legacy in Orbit",
};

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
        <SmoothScrolling>
          <div className="noise-overlay" />
          <main className="relative z-10 min-h-screen flex flex-col">
            {children}
          </main>
        </SmoothScrolling>
      </body>
    </html>
  );
}
