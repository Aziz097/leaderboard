import { Hero } from "@/components/Hero";
import { Leaderboard } from "@/components/Leaderboard";
import { ProgressiveBackground } from "@/components/ProgressiveBackground";
import { FooterCTA } from "@/components/FooterCTA";
import { Footer } from "@/components/Footer";

// Full Visual Experience - Restored to original "Bombastic" state
export default function Home() {
  return (
    <div className="flex flex-col relative min-h-screen">
      {/* Progressive Background - CSS first, WebGL after 4s */}
      <ProgressiveBackground />

      {/* Hero - Full version immediately for BlurText animations */}
      <Hero />

      {/* Leaderboard - Full version immediately for bombastic RankFlame */}
      <Leaderboard />

      {/* FooterCTA - Using original component (only loads when scrolled to) */}
      <FooterCTA />

      <Footer />
    </div>
  );
}
