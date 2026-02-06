"use client";

import { useState, useEffect, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { SimpleLeaderboard } from "./SimpleLeaderboard";
import { Leaderboard, type DonorDisplay } from "./Leaderboard";
import { getLeaderboard } from "@/app/actions/donatur";

interface ProgressiveLeaderboardProps {
  initialDonors?: DonorDisplay[];
}

export function ProgressiveLeaderboard({ initialDonors = [] }: ProgressiveLeaderboardProps) {
  const [showRich, setShowRich] = useState(false);

  const { data: donors, isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => getLeaderboard(),
    initialData: initialDonors,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRich(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const LeaderboardComponent = showRich ? Leaderboard : SimpleLeaderboard;

  return (
    <Suspense fallback={<SimpleLeaderboard donors={donors || []} isLoading={isLoading} />}>
      <LeaderboardComponent donors={donors || []} isLoading={isLoading} />
    </Suspense>
  );
}

export default ProgressiveLeaderboard;
