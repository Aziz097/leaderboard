"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { SimpleHero } from "./SimpleHero";

// Lazy load the rich Hero component AFTER initial render
const RichHero = lazy(() => import("./Hero").then(mod => ({ default: mod.Hero })));

/**
 * ProgressiveHero - Shows simple hero for fast LCP, then upgrades to rich version
 * 
 * Strategy:
 * 1. Render SimpleHero immediately (fast LCP)
 * 2. After page is interactive (2 seconds), load the rich version
 * 3. Fade transition between them
 */
export function ProgressiveHero() {
    const [showRich, setShowRich] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Wait until page is interactive, then load rich components
        const timer = setTimeout(() => {
            // Use requestIdleCallback if available, otherwise setTimeout
            if ('requestIdleCallback' in window) {
                (window as any).requestIdleCallback(() => {
                    setShowRich(true);
                }, { timeout: 3000 });
            } else {
                setShowRich(true);
            }
        }, 2000); // Wait 2 seconds after mount

        return () => clearTimeout(timer);
    }, []);

    // If not showing rich yet, show simple version
    if (!showRich) {
        return <SimpleHero />;
    }

    // Show rich version with Suspense fallback to simple
    return (
        <Suspense fallback={<SimpleHero />}>
            <div
                className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                onAnimationEnd={() => setIsLoaded(true)}
            >
                <RichHero />
            </div>
            {/* Keep simple visible while rich loads */}
            {!isLoaded && (
                <div className="absolute inset-0">
                    <SimpleHero />
                </div>
            )}
        </Suspense>
    );
}

export default ProgressiveHero;
