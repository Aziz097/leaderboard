"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import BlurText from "./BlurText";

const sentences = [
    "CUKUP BERJALAN JANGAN BERLARI KARENA HIDUP INI PERJALANAN BUKAN PELARIAN.",
    "SEMUA ORANG BISA BELI JAM ROLEX, TAPI GA SEMUA ORANG BISA BELI JAM TERBANG.",
    "BELUM SAATNYA UNTUK DI PERLIHATKAN TETAP TENANG NANTI KITA KASIH KEJUTAN.",
    "DUNIA INI HANYA PERMAINAN, JIKA KAMU TIDAK BISA BERMAIN MAKA KAMU YANG AKAN DIPERMAINKAN.",
    "CUKUP TAU, JANGAN CARI TAU, KALO UDAH TAU, PURA PURA TIDAK TAU."
];

export function Hero() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [mounted, setMounted] = useState(false);
    const [textIndex, setTextIndex] = useState(0);

    const springConfig = { damping: 30, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const titleX = useTransform(springX, [-1, 1], [-20, 20]);
    const titleY = useTransform(springY, [-1, 1], [-20, 20]);

    // PERFORMANCE: Generate particle positions only once on mount
    const particleData = useMemo(() => {
        if (typeof window === 'undefined') return [];
        return [...Array(8)].map((_, i) => ({
            id: i,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            duration: 4 + Math.random() * 3,
            delay: Math.random() * 2
        }));
    }, []);

    useEffect(() => {
        setMounted(true);
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth) * 2 - 1;
            const y = (e.clientY / innerHeight) * 2 - 1;
            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const handleAnimationComplete = () => {
        setTimeout(() => {
            setTextIndex((prev) => (prev + 1) % sentences.length);
        }, 3000);
    };

    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-6">
            <div className="z-10 text-center max-w-3xl md:max-w-6xl mx-auto space-y-6 relative">

                <BlurText
                    key={textIndex}
                    text={sentences[textIndex]}
                    delay={200}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className="text-[3rem] md:text-7xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] justify-center flex-wrap mt-20 md:mt-30 mb-20 md:mb-10"
                />

                <span className="inline-block px-4 py-1.5 rounded-full border border-accent-secondary/30 bg-accent-secondary/10 text-accent-secondary text-sm font-mono tracking-wider mb-5 backdrop-blur-md shadow-[0_0_15px_-5px_var(--color-accent-secondary)]">
                    INLINEER 2022
                </span>

            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none z-10">
                {mounted && particleData.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute w-1 h-1 bg-white/60 rounded-full shadow-[0_0_10px_white]"
                        initial={{ x: p.x, y: p.y }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.8, 0.2]
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: p.delay
                        }}
                        style={{ willChange: "transform, opacity" }}
                    />
                ))}
            </div>
        </section>
    );
}

