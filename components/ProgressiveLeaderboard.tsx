"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { SimpleLeaderboard } from "./SimpleLeaderboard";

// Lazy load the rich Leaderboard component AFTER initial render
const RichLeaderboard = lazy(() => import("./Leaderboard").then(mod => ({ default: mod.Leaderboard })));

/**
 * ProgressiveLeaderboard - Shows simple leaderboard for fast LCP, then upgrades to rich version
 */
export function ProgressiveLeaderboard() {
    const [showRich, setShowRich] = useState(false);

    useEffect(() => {
        // Wait until page is interactive, then load rich components
        const timer = setTimeout(() => {
            if ('requestIdleCallback' in window) {
                (window as any).requestIdleCallback(() => {
                    setShowRich(true);
                }, { timeout: 3000 });
            } else {
                setShowRich(true);
            }
        }, 2500); // Wait 2.5 seconds after mount (after hero loads)

        return () => clearTimeout(timer);
    }, []);

    if (!showRich) {
        return <SimpleLeaderboard />;
    }

    return (
        <Suspense fallback={<SimpleLeaderboard />}>
            <RichLeaderboard />
        </Suspense>
    );
}

export default ProgressiveLeaderboard;
