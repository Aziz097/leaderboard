"use client";

import dynamic from "next/dynamic";
import { Suspense, ReactNode } from "react";
import type { GlassSurfaceProps } from "./GlassSurface";

// Lazy load the heavy GlassSurface component
const GlassSurface = dynamic(() => import("./GlassSurface"), {
    ssr: false,
    loading: () => null,
});

// Lightweight CSS-only glass effect fallback
interface GlassFallbackProps {
    children?: ReactNode;
    className?: string;
    borderRadius?: number;
    style?: React.CSSProperties;
}

function GlassFallback({ children, className = "", borderRadius = 20, style }: GlassFallbackProps) {
    return (
        <div
            className={`relative flex items-center justify-center overflow-hidden ${className}`}
            style={{
                borderRadius: `${borderRadius}px`,
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
                ...style,
            }}
        >
            <div className="w-full h-full relative z-10">{children}</div>
        </div>
    );
}

export default function LazyGlassSurface(props: GlassSurfaceProps) {
    const { children, className, borderRadius, style } = props;

    return (
        <Suspense
            fallback={
                <GlassFallback className={className} borderRadius={borderRadius} style={style}>
                    {children}
                </GlassFallback>
            }
        >
            <GlassSurface {...props} />
        </Suspense>
    );
}
