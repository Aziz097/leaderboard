"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { useMemo } from "react";

type BlurTextProps = {
    text: string;
    delay?: number;
    animateBy?: "words" | "letters";
    direction?: "top" | "bottom";
    onAnimationComplete?: () => void;
    className?: string;
};

export default function BlurText({
    text,
    delay = 200,
    animateBy = "words",
    direction = "top",
    onAnimationComplete,
    className,
}: BlurTextProps) {
    const words = useMemo(() => text.split(" "), [text]);
    const letters = useMemo(() => text.split(""), [text]);
    const elements = animateBy === "words" ? words : letters;

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: delay / 1000, delayChildren: 0.05 * i },
        }),
    };

    const child = {
        hidden: {
            opacity: 0,
            filter: "blur(10px)",
            y: direction === "top" ? 20 : -20,
        },
        visible: {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as any, // Custom "gravity-defying" ease
            },
        },
    };

    return (
        <motion.div
            className={clsx("flex flex-wrap justify-center", className)}
            variants={container}
            initial="hidden"
            animate="visible"
            onAnimationComplete={onAnimationComplete}
        >
            {elements.map((el, index) => (
                <motion.span
                    key={index}
                    variants={child}
                    className={clsx(animateBy === "words" && "mr-[0.25em] last:mr-0", "inline-block")}
                >
                    {/* If animating by letters, we need to preserve spaces. 
                However, 'letters' based split removes spaces usually or treats them as chars.
                If text.split('') is used, space is a character ' '. 
                Framer Motion handles layout well.
            */}
                    {el === " " ? "\u00A0" : el}
                </motion.span>
            ))}
        </motion.div>
    );
}
