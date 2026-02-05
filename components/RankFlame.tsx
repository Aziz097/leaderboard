"use client";

import React, { useMemo } from "react";

interface RankFlameProps {
    rank: 1 | 2 | 3;
}

export default function RankFlame({ rank }: RankFlameProps) {
    // Colors configuration based on user request:
    const theme = {
        1: {
            // White Fire
            start: "rgba(0, 0, 0, 1)",
            end: "rgba(0, 0, 0, 0)",
        },
        2: {
            // Blue Fire
            start: "rgba(0, 100, 255, 1)",
            end: "rgba(0, 100, 255, 0)",
        },
        3: {
            // Yellow Fire
            start: "rgba(255, 200, 0, 1)",
            end: "rgba(255, 50, 0, 0)",
        }
    }[rank];

    // Generate random particles
    // heavily increased size and count for "bombastic" look
    const [particles, setParticles] = React.useState<{ id: number, left: string, delay: string, duration: string, size: string }[]>([]);

    React.useEffect(() => {
        setParticles([...Array(65)].map((_, i) => ({
            id: i,
            // Concentrate in center but width depends on particle size
            // We want a solid core
            left: (15 + Math.random() * 70) + "%",
            delay: Math.random() * 0.8 + "s",
            duration: 0.8 + Math.random() * 0.6 + "s",
            size: 20 + Math.random() * 40 + "px", // MUCH larger particles
        })));
    }, []);

    return (
        <div className="absolute inset-x-0 bottom-[-10%] h-[120%] w-full pointer-events-none overflow-visible flex justify-center z-[-1]">
            <style jsx>{`
                @keyframes rise {
                    from {
                        opacity: 0;
                        transform: translateY(0) scale(1);
                    }
                    25% {
                        opacity: 1;
                    }
                    to {
                        opacity: 0;
                        transform: translateY(-200%) scale(0);
                    }
                }
            `}</style>

            <div className="relative w-full h-full">
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className="absolute bottom-0 rounded-full blur-[1px]"
                        style={{
                            left: p.left,
                            width: p.size,
                            height: p.size,
                            backgroundImage: `radial-gradient(${theme.start} 20%, ${theme.end} 70%)`,
                            mixBlendMode: "screen",
                            animation: `rise ${p.duration} ease-in infinite`,
                            animationDelay: p.delay,
                            opacity: 0,
                            transformOrigin: "bottom center",
                            transform: "translateX(-50%)"
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
