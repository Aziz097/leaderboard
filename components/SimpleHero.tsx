"use client";

import { useState, useEffect, useCallback } from "react";

const sentences = [
    "CUKUP BERJALAN JANGAN BERLARI KARENA HIDUP INI PERJALANAN BUKAN PELARIAN.",
    "SEMUA ORANG BISA BELI JAM ROLEX, TAPI GA SEMUA ORANG BISA BELI JAM TERBANG.",
    "BELUM SAATNYA UNTUK DI PERLIHATKAN TETAP TENANG NANTI KITA KASIH KEJUTAN.",
    "DUNIA INI HANYA PERMAINAN, JIKA KAMU TIDAK BISA BERMAIN MAKA KAMU YANG AKAN DIPERMAINKAN.",
    "CUKUP TAU, JANGAN CARI TAU, KALO UDAH TAU, PURA PURA TIDAK TAU."
];

// OPTIMIZED: Minimal Hero component for fast LCP
// Uses CSS animations instead of Framer Motion for initial render
export function SimpleHero() {
    const [textIndex, setTextIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger fade in after hydration
        requestAnimationFrame(() => {
            setIsVisible(true);
        });
    }, []);

    // Cycle text
    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % sentences.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-6">
            <div className="z-10 text-center max-w-3xl md:max-w-6xl mx-auto space-y-6 relative">
                {/* CSS-only animated text - much lighter than Framer Motion */}
                <div
                    className={`text-[3rem] md:text-7xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] justify-center flex-wrap mt-20 md:mt-30 mb-20 md:mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                    style={{
                        willChange: 'opacity, transform',
                        contain: 'layout style'
                    }}
                >
                    <p
                        key={textIndex}
                        className="animate-fade-in"
                    >
                        {sentences[textIndex]}
                    </p>
                </div>

                <span className="inline-block px-4 py-1.5 rounded-full border border-accent-secondary/30 bg-accent-secondary/10 text-accent-secondary text-sm font-mono tracking-wider mb-5 backdrop-blur-md shadow-[0_0_15px_-5px_var(--color-accent-secondary)]">
                    INLINEER 2022
                </span>
            </div>
        </section>
    );
}

export default SimpleHero;
