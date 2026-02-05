"use client";

import dynamic from "next/dynamic";
import { Suspense, ReactNode } from "react";

// Lazy load Lenis smooth scrolling - not critical for initial render
const SmoothScrollingComponent = dynamic(
    () => import("./SmoothScrolling").then((mod) => ({ default: mod.SmoothScrolling })),
    {
        ssr: false,
        loading: () => null,
    }
);

interface LazySmoothScrollingProps {
    children: ReactNode;
}

// Provides smooth scrolling only after initial paint
// Falls back to native scroll immediately for better FCP/LCP
export function LazySmoothScrolling({ children }: LazySmoothScrollingProps) {
    return (
        <Suspense fallback={<>{children}</>}>
            <SmoothScrollingComponent>{children}</SmoothScrollingComponent>
        </Suspense>
    );
}
