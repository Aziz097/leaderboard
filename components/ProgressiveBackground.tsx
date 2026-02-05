"use client";

import { useState, useEffect, lazy, Suspense } from "react";

// Lazy load the WebGL ColorBends component
const LazyColorBends = lazy(() => import("./LazyColorBends"));

// Simple CSS gradient fallback
function SimpleBackground() {
    return (
        <div
            className="absolute inset-0"
            style={{
                background: `
                    radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0, 123, 255, 0.15) 0%, transparent 50%),
                    radial-gradient(ellipse 60% 40% at 80% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
                    radial-gradient(ellipse 70% 50% at 20% 80%, rgba(30, 144, 255, 0.12) 0%, transparent 50%),
                    linear-gradient(180deg, transparent 0%, rgba(0, 8, 20, 0.8) 100%)
                `,
            }}
        />
    );
}

/**
 * ProgressiveBackground - Shows CSS gradient first, then upgrades to WebGL ColorBends
 * 
 * The WebGL shader is the heaviest component, so we load it last
 */
export function ProgressiveBackground() {
    const [showWebGL, setShowWebGL] = useState(false);

    useEffect(() => {
        // Wait until page is fully interactive before loading WebGL
        const timer = setTimeout(() => {
            if ('requestIdleCallback' in window) {
                (window as any).requestIdleCallback(() => {
                    setShowWebGL(true);
                }, { timeout: 5000 });
            } else {
                setShowWebGL(true);
            }
        }, 4000); // Wait 4 seconds - load this LAST

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 -z-10 bg-background" style={{ contain: 'strict' }}>
            {/* Always show simple background first */}
            <SimpleBackground />

            {/* Overlay WebGL on top when ready */}
            {showWebGL && (
                <Suspense fallback={null}>
                    <div className="absolute inset-0 animate-fade-in">
                        <LazyColorBends
                            className="absolute inset-0"
                            colors={["#007bff", "#ffd700", "#1e90ff"]}
                            rotation={120}
                            speed={0.2}
                            scale={1}
                            frequency={1}
                            warpStrength={1}
                            mouseInfluence={1}
                            parallax={0.5}
                            noise={0.1}
                            transparent={true}
                            autoRotate={0}
                        />
                    </div>
                </Suspense>
            )}

            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />
            {/* Gradient Mask */}
            <div className="absolute top-[80vh] bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-background/90 pointer-events-none" />
        </div>
    );
}

export default ProgressiveBackground;
