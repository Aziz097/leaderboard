"use client";

export type DonorDisplay = {
    id: string;
    name: string;
    totalDonasi: number;
};

interface SimpleLeaderboardProps {
    donors?: DonorDisplay[];
    isLoading?: boolean;
}

const defaultDonors: DonorDisplay[] = [
    { id: "1", name: "Dito Rifki", totalDonasi: 10000000 },
    { id: "2", name: "Juan Putra", totalDonasi: 8500000 },
    { id: "3", name: "Elkana Juanro", totalDonasi: 7000000 },
    { id: "4", name: "Fedana Padang", totalDonasi: 5000000 },
    { id: "5", name: "Fadil Malaysia", totalDonasi: 4500000 },
    { id: "6", name: "Juragan Matcha", totalDonasi: 3000000 },
    { id: "7", name: "Anak Kades", totalDonasi: 2500000 },
    { id: "8", name: "Budi Ganteng", totalDonasi: 2000000 },
    { id: "9", name: "Arief NMax", totalDonasi: 1500000 },
    { id: "10", name: "Bos GPT", totalDonasi: 1000000 },
];

function SkeletonCard({ rank }: { rank: number }) {
    return (
        <div className={`relative flex flex-col items-center ${rank === 1 ? 'order-1 md:order-2 md:-mt-12 scale-110 z-20' : rank === 2 ? 'order-2 md:order-1 z-10' : 'order-3 z-10'}`}>
            <div className="w-64 rounded-[20px] overflow-hidden bg-white/5 border border-white/10">
                <div className="flex flex-col items-center gap-2 w-full py-8">
                    <div className="w-12 h-12 md:w-14 md:h-14 mb-2 rounded-full bg-white/10 animate-pulse" />
                    <div className="w-40 h-6 rounded bg-white/10 animate-pulse mb-2" />
                    <div className="w-32 h-6 rounded bg-white/10 animate-pulse" />
                </div>
            </div>
        </div>
    );
}

function SkeletonList() {
    return (
        <div className="max-w-4xl mx-auto space-y-3 md:space-y-4 pb-10">
            {[4, 5, 6, 7, 8, 9, 10].map((i) => (
                <div key={i} className="h-16 rounded-xl bg-white/5 border border-white/10 animate-pulse" />
            ))}
        </div>
    );
}

export function SimpleLeaderboard({ donors: propDonors, isLoading }: SimpleLeaderboardProps) {
    const donors = propDonors || [];
    const hasRealData = donors.length > 0;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const displayDonors = hasRealData ? donors : defaultDonors;
    const sortedDonors = displayDonors.sort((a, b) => b.totalDonasi - a.totalDonasi).slice(0, 10);
    const top3 = sortedDonors.length >= 3 ? [sortedDonors[1], sortedDonors[0], sortedDonors[2]] : sortedDonors;
    const others = sortedDonors.slice(3);

    return (
        <section className="py-20 px-4 relative z-10 w-full max-w-7xl mx-auto">
            <div className="text-center mb-5">
                <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-white inline-block drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                    Leaderboard Donatur
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-transparent via-accent-primary to-transparent mx-auto mt-4 rounded-full shadow-[0_0_10px_var(--color-accent-primary)]" />
            </div>

            {isLoading ? (
                <>
                    <div className="flex flex-col md:flex-row justify-center items-center md:items-end gap-8 mb-18 min-h-[270px]">
                        <SkeletonCard rank={2} />
                        <SkeletonCard rank={1} />
                        <SkeletonCard rank={3} />
                    </div>
                    <SkeletonList />
                </>
            ) : !hasRealData ? (
                <p className="text-white/50 text-center py-10">Belum ada donatur</p>
            ) : (
                <>
                    <div className="flex flex-col md:flex-row justify-center items-center md:items-end gap-8 mb-18 min-h-[270px]">
                        {top3.map((donor, index) => {
                            const rank = index === 1 ? 1 : index === 0 ? 2 : 3;
                            const isFirst = rank === 1;

                            return (
                                <div key={donor.id}
                                    className={`relative flex flex-col items-center animate-fade-in ${isFirst ? 'order-1 md:order-2 md:-mt-12 scale-110 z-20' : rank === 2 ? 'order-2 md:order-1 z-10' : 'order-3 z-10'}`}
                                    style={{ animationDelay: `${index * 100}ms`, contain: 'layout style' }}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-b ${isFirst ? 'from-accent-primary/30' : 'from-accent-secondary/20'} to-transparent blur-2xl -z-10 rounded-full opacity-50`} />
                                    <div className={`relative transition-all duration-300 w-64 rounded-[20px] overflow-hidden ${isFirst ? 'border border-accent-primary/30' : ''}`}
                                        style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                                    >
                                        <div className="flex flex-col items-center gap-2 md:gap-4 w-full py-4 md:py-8">
                                            <div className="relative w-12 h-12 md:w-14 md:h-14 mb-1 md:mb-2 flex items-center justify-center">
                                                <div className="relative z-10 w-full h-full rounded-full flex items-center justify-center text-lg md:text-xl font-bold bg-black/50 backdrop-blur-sm text-white border border-white/10">
                                                    <span>#{rank}</span>
                                                </div>
                                            </div>
                                            <div className="text-center w-full px-2 md:px-4">
                                                <h3 className="text-sm md:text-xl font-bold text-white truncate">{donor.name}</h3>
                                                <p className={`text-sm md:text-xl mt-1 font-bold ${isFirst ? 'text-white drop-shadow-[0_0_5px_rgba(0,123,255,0.5)]' : 'text-white'}`}>{formatCurrency(donor.totalDonasi)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="max-w-4xl mx-auto space-y-3 md:space-y-4 pb-10">
                        {others.map((donor, i) => (
                            <div key={donor.id} className="animate-fade-in" style={{ animationDelay: `${(i + 3) * 50}ms`, contain: 'layout style' }}>
                                <div className="group transition-all duration-300 hover:scale-[1.01] rounded-xl overflow-hidden"
                                    style={{ background: 'rgba(255, 255, 255, 0.05)', border: '0.5px solid rgba(255, 255, 255, 0.1)' }}
                                >
                                    <div className="flex items-center justify-between w-full px-4 py-3 md:px-6 md:py-4">
                                        <div className="flex items-center gap-3 md:gap-6 overflow-hidden">
                                            <span className="font-bold text-white text-sm md:text-xl w-6 md:w-8 shrink-0">#{i + 4}</span>
                                            <span className="font-bold text-sm md:text-lg text-white truncate">{donor.name}</span>
                                        </div>
                                        <span className="font-bold text-white text-sm md:text-xl whitespace-nowrap ml-2">{formatCurrency(donor.totalDonasi)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}

export default SimpleLeaderboard;
