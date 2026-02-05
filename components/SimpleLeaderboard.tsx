"use client";

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

// OPTIMIZED: Static leaderboard without heavy animations for fast LCP
// Uses CSS-only effects instead of Framer Motion and complex SVG filters
export function SimpleLeaderboard() {
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

            {/* Top 3 Podium - Static CSS glass effect */}
            <div className="flex flex-col md:flex-row justify-center items-center md:items-end gap-8 mb-18 min-h-[270px]">
                {top3.map((donor, index) => {
                    const rank = index === 1 ? 1 : index === 0 ? 2 : 3;
                    const isFirst = rank === 1;

                    return (
                        <div
                            key={donor.name}
                            className={`relative flex flex-col items-center animate-fade-in ${isFirst
                                    ? 'order-1 md:order-2 md:-mt-12 scale-110 z-20'
                                    : rank === 2
                                        ? 'order-2 md:order-1 z-10'
                                        : 'order-3 z-10'
                                }`}
                            style={{
                                animationDelay: `${index * 100}ms`,
                                contain: 'layout style'
                            }}
                        >
                            {/* Glowing Background */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-b ${isFirst ? 'from-accent-primary/30' : 'from-accent-secondary/20'
                                    } to-transparent blur-2xl -z-10 rounded-full opacity-50`}
                            />

                            {/* Simple Glass Card - CSS only */}
                            <div
                                className={`relative transition-all duration-300 w-64 rounded-[20px] overflow-hidden ${isFirst ? 'border border-accent-primary/30' : ''
                                    }`}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    backdropFilter: 'blur(8px)',
                                    WebkitBackdropFilter: 'blur(8px)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
                                }}
                            >
                                <div className="flex flex-col items-center gap-2 md:gap-4 w-full py-4 md:py-8">
                                    {/* Rank Badge */}
                                    <div className="relative w-12 h-12 md:w-14 md:h-14 mb-1 md:mb-2 flex items-center justify-center">
                                        <div className="relative z-10 w-full h-full rounded-full flex items-center justify-center text-lg md:text-xl font-bold bg-black/50 backdrop-blur-sm text-white overflow-visible border border-white/10">
                                            <span>#{rank}</span>
                                        </div>
                                    </div>

                                    <div className="text-center w-full px-2 md:px-4">
                                        <h3 className="text-sm md:text-xl font-bold text-white truncate">
                                            {donor.name}
                                        </h3>
                                        <p className={`text-sm md:text-xl mt-1 font-bold ${isFirst
                                                ? 'text-white drop-shadow-[0_0_5px_rgba(0,123,255,0.5)]'
                                                : 'text-white'
                                            }`}>
                                            {donor.amount}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* List 4-10 - Simple CSS glass cards */}
            <div className="max-w-4xl mx-auto space-y-3 md:space-y-4 pb-10">
                {others.map((donor, i) => (
                    <div
                        key={donor.name}
                        className="animate-fade-in"
                        style={{
                            animationDelay: `${(i + 3) * 50}ms`,
                            contain: 'layout style'
                        }}
                    >
                        <div
                            className="group transition-all duration-300 hover:scale-[1.01] rounded-xl overflow-hidden"
                            style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)',
                                border: '0.5px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
                            }}
                        >
                            <div className="flex items-center justify-between w-full px-4 py-3 md:px-6 md:py-4">
                                <div className="flex items-center gap-3 md:gap-6 overflow-hidden">
                                    <span className="font-bold text-white text-sm md:text-xl w-6 md:w-8 shrink-0">
                                        #{i + 4}
                                    </span>
                                    <span className="font-bold text-sm md:text-lg text-white group-hover:text-white transition-colors truncate">
                                        {donor.name}
                                    </span>
                                </div>
                                <span className="font-bold text-white text-sm md:text-xl whitespace-nowrap ml-2">
                                    {donor.amount}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default SimpleLeaderboard;
