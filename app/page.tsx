import { Hero } from "@/components/Hero";
import { Leaderboard } from "@/components/Leaderboard";
import { FooterCTA } from "@/components/FooterCTA";
import { Footer } from "@/components/Footer";
import ColorBends from "@/components/ColorBends";

export default function Home() {
  return (
    <div className="flex flex-col relative min-h-screen">
      {/* Global Background */}
      <div className="fixed inset-0 -z-10 bg-background">
        <ColorBends
          className="absolute inset-0"
          colors={["#007bff", "#ffd700", "#1e90ff"]} // Blue and Gold theme
          rotation={120} // Changed rotation to try to get different colors at bottom
          speed={0.2}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1}
          parallax={0.5}
          noise={0.1}
          transparent={true} // Changed to true to blend with bg
          autoRotate={0}
        />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        {/* Gradient Mask to ensure bottom is readable regardless of scroll */}
        <div className="absolute top-[80vh] bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-background/90 pointer-events-none" />
      </div>

      <Hero />
      <Leaderboard />
      <FooterCTA />
      <Footer />
    </div>
  );
}
