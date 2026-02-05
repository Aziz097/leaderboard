"use client";

import { motion } from "framer-motion";
import LazyGlassSurface from "./LazyGlassSurface";
import RankFlame from "./RankFlame";

type Donor = {
    name: string;
    amount: string;
    avatar?: string;
};

const donors: Donor[] = [
    { name: "Dito Rifki", amount: "Rp 10.000.000" },
    { name: "Juan Putra", amount: "Rp 8.500.000" },
    { name: "Elkana Juanro", amount: "Rp 7.000.000" },
    { name: "Fedana Padang", amount: "Rp 5.000.000" },
    { name: "Fadil Malaysia", amount: "Rp 4.500.000" },
    { name: "Juragan Matcha", amount: "Rp 3.000.000" },
    { name: "Anak Kades", amount: "Rp 2.500.000" },
    { name: "Budi Ganteng", amount: "Rp 2.000.000" },
    { name: "Arief NMax", amount: "Rp 1.500.000" },
    { name: "Bos GPT", amount: "Rp 1.000.000" },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } as const },
};

export function Leaderboard() {
    const top3 = [donors[1], donors[0], donors[2]]; // 2, 1, 3 arrangement
    const others = donors.slice(3);

    return (
        <section className="py-20 px-4 relative z-10 w-full max-w-7xl mx-auto">
            <div className="text-center mb-5">
                <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-white inline-block drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                    Leaderboard Donatur
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-transparent via-accent-primary to-transparent mx-auto mt-4 rounded-full shadow-[0_0_10px_var(--color-accent-primary)]" />
            </div>

            {/* Top 3 Podium */}
            <div className="flex flex-col md:flex-row justify-center items-center md:items-end gap-8 mb-18 min-h-[270px]">
                {top3.map((donor, index) => {
                    const rank = index === 1 ? 1 : index === 0 ? 2 : 3;
                    // Different float animations for each
                    const floatDuration = rank === 1 ? 6 : rank === 2 ? 7 : 5;
                    const delay = rank === 1 ? 0 : rank === 2 ? 1 : 2;

                    // Custom Glass Effect Props based on rank
                    const isFirst = rank === 1;

                    return (
                        <motion.div
                            key={donor.name}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: delay * 0.2 }}
                            className={`relative flex flex-col items-center ${isFirst ? 'order-1 md:order-2 md:-mt-12 scale-110 z-20' : rank === 2 ? 'order-2 md:order-1 z-10' : 'order-3 z-10'}`}
                        >
                            {/* Glowing Background for Card */}
                            <div className={`absolute inset-0 bg-gradient-to-b ${isFirst ? 'from-accent-primary/30' : 'from-accent-secondary/20'} to-transparent blur-2xl -z-10 rounded-full opacity-50`} />

                            <motion.div
                                animate={{ y: [-10, 10, -10] }}
                                transition={{
                                    duration: floatDuration,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: delay
                                }}
                            >
                                <LazyGlassSurface
                                    width={256}
                                    height="auto"
                                    borderRadius={20}
                                    borderWidth={1}
                                    mixBlendMode="screen"
                                    opacity={isFirst ? 0.2 : 0.15}
                                    brightness={100}
                                    displace={0.3}
                                    distortionScale={50}
                                    className={`relative transition-all duration-300 ${isFirst && 'border-accent-primary/30'}`}
                                >
                                    {/* Additional inner content structure required for proper flex layout inside GlassSurface */}
                                    <div className="flex flex-col items-center gap-2 md:gap-4 w-full py-4 md:py-8">
                                        {/* Wrapper for layering: Fire behind, Badge on top */}
                                        <div className="relative w-12 h-12 md:w-14 md:h-14 mb-1 md:mb-2 flex items-center justify-center">
                                            <RankFlame rank={rank as 1 | 2 | 3} />
                                            <div className="relative z-10 w-full h-full rounded-full flex items-center justify-center text-lg md:text-xl font-bold bg-black/50 backdrop-blur-sm text-white overflow-visible border border-white/10">
                                                <span>#{rank}</span>
                                            </div>
                                        </div>

                                        <div className="text-center w-full px-2 md:px-4">
                                            <h3 className="text-sm md:text-xl font-bold text-white truncate">{donor.name}</h3>
                                            <p className={`text-sm md:text-xl mt-1 font-bold ${isFirst ? 'text-white drop-shadow-[0_0_5px_rgba(0,123,255,0.5)]' : 'text-white'}`}>{donor.amount}</p>
                                        </div>
                                    </div>
                                </LazyGlassSurface>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            {/* List 4-10 */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="max-w-4xl mx-auto space-y-3 md:space-y-4 pb-10"
            >
                {others.map((donor, i) => (
                    <motion.div
                        key={donor.name}
                        variants={item}
                    >
                        <LazyGlassSurface
                            width="100%"
                            height="auto"
                            borderRadius={12}
                            borderWidth={0.5}
                            opacity={0.1}
                            mixBlendMode="overlay"
                            className="group transition-all duration-300 hover:scale-[1.01]"
                        >
                            <div className="flex items-center justify-between w-full px-4 py-3 md:px-6 md:py-4">
                                <div className="flex items-center gap-3 md:gap-6 overflow-hidden">
                                    <span className="font-bold text-white text-sm md:text-xl w-6 md:w-8 shrink-0">#{i + 4}</span>
                                    <span className="font-bold text-sm md:text-lg text-white group-hover:text-white transition-colors truncate">
                                        {donor.name}
                                    </span>
                                </div>
                                <span className="font-bold text-white text-sm md:text-xl whitespace-nowrap ml-2">
                                    {donor.amount}
                                </span>
                            </div>
                        </LazyGlassSurface>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
