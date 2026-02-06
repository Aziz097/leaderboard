"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import LazyGlassSurface from "./LazyGlassSurface";
import RankFlame from "./RankFlame";
import { getLeaderboard } from "@/app/actions/donatur";

export type DonorDisplay = {
  id: string;
  name: string;
  totalDonasi: number;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } as const },
};

function Top3Section({ donors }: { donors: DonorDisplay[] }) {
  const sorted = [...donors].sort((a, b) => b.totalDonasi - a.totalDonasi);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRank = (index: number) => {
    if (sorted.length === 1) return 1;
    if (sorted.length === 2) return index + 1;
    if (sorted.length >= 3) {
      if (index === 0) return 1;
      if (index === 1) return 2;
      return 3;
    }
    return index + 1;
  };

  const getPosition = (index: number) => {
    if (sorted.length === 1) return "order-1";
    if (sorted.length === 2) return index === 0 ? "order-1" : "order-2";
    if (sorted.length >= 3) {
      if (index === 0) return "order-1 md:order-2 md:-mt-12 scale-110 z-20";
      if (index === 1) return "order-2 md:order-1 z-10";
      return "order-3 z-10";
    }
    return "";
  };

  const getDelay = (index: number) => {
    if (sorted.length >= 3) {
      if (index === 0) return 0;
      if (index === 1) return 1;
      return 2;
    }
    return index * 0.2;
  };

  const getFloatDuration = (index: number) => {
    if (sorted.length >= 3) {
      const rank = getRank(index);
      if (rank === 1) return 6;
      if (rank === 2) return 7;
      return 5;
    }
    return 6;
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:items-end gap-8 mb-18 min-h-[270px]">
      {sorted.slice(0, 3).map((donor, index) => {
        const rank = getRank(index);
        const isFirst = rank === 1;
        const delay = getDelay(index);
        const floatDuration = getFloatDuration(index);

        return (
          <motion.div
            key={donor.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: delay * 0.2 }}
            className={`relative flex flex-col items-center ${getPosition(index)}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-b ${isFirst ? 'from-accent-primary/30' : 'from-accent-secondary/20'} to-transparent blur-2xl -z-10 rounded-full opacity-50`} />

            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut", delay }}
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
                <div className="flex flex-col items-center gap-2 md:gap-4 w-full py-4 md:py-8">
                  <div className="relative w-12 h-12 md:w-14 md:h-14 mb-1 md:mb-2 flex items-center justify-center">
                    <RankFlame rank={rank as 1 | 2 | 3} />
                    <div className="relative z-10 w-full h-full rounded-full flex items-center justify-center text-lg md:text-xl font-bold bg-black/50 backdrop-blur-sm text-white overflow-visible border border-white/10">
                      <span>#{rank}</span>
                    </div>
                  </div>

                  <div className="text-center w-full px-2 md:px-4">
                    <h3 className="text-sm md:text-xl font-bold text-white truncate">{donor.name}</h3>
                    <p className={`text-sm md:text-xl mt-1 font-bold ${isFirst ? 'text-white drop-shadow-[0_0_5px_rgba(0,123,255,0.5)]' : 'text-white'}`}>{formatCurrency(donor.totalDonasi)}</p>
                  </div>
                </div>
              </LazyGlassSurface>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

function OthersSection({ donors }: { donors: DonorDisplay[] }) {
  const sorted = [...donors].sort((a, b) => b.totalDonasi - a.totalDonasi);
  const others = sorted.slice(3);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl mx-auto space-y-3 md:space-y-4 pb-10">
      {others.map((donor, i) => (
        <motion.div key={donor.id} variants={item}>
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
                <span className="font-bold text-sm md:text-lg text-white truncate">{donor.name}</span>
              </div>
              <span className="font-bold text-white text-sm md:text-xl whitespace-nowrap ml-2">{formatCurrency(donor.totalDonasi)}</span>
            </div>
          </LazyGlassSurface>
        </motion.div>
      ))}
    </motion.div>
  );
}

export function Leaderboard() {
  const { data: donors = [], isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => getLeaderboard(),
  });

  const hasRealData = donors.length > 0;

  return (
    <section className="py-20 px-4 relative z-10 w-full max-w-7xl mx-auto">
      <div className="text-center mb-5">
        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-white inline-block drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          Leaderboard Donatur
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-transparent via-accent-primary to-transparent mx-auto mt-4 rounded-full shadow-[0_0_10px_var(--color-accent-primary)]" />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin h-8 w-8 border-2 border-accent-primary border-t-transparent rounded-full" />
        </div>
      ) : !hasRealData ? (
        <p className="text-white/50 text-center py-10">Belum ada donatur</p>
      ) : (
        <>
          <Top3Section donors={donors} />
          <OthersSection donors={donors} />
        </>
      )}
    </section>
  );
}
