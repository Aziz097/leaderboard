"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Lazy load the heavy ColorBends component with no SSR
const ColorBends = dynamic(() => import("./ColorBends"), {
    ssr: false,
    loading: () => <ColorBendsFallback />,
});

// Lightweight CSS fallback that matches the visual style
function ColorBendsFallback() {
    return (
        <div
            className="absolute inset-0 animate-pulse"
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

// Re-export with same props interface
export type LazyColorBendsProps = React.ComponentProps<typeof ColorBends>;

export default function LazyColorBends(props: LazyColorBendsProps) {
    return (
        <Suspense fallback={<ColorBendsFallback />}>
            <ColorBends {...props} />
        </Suspense>
    );
}
