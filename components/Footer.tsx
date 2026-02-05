"use client";

import { motion } from "framer-motion";

export function Footer() {
    return (
        <footer className="relative z-10 w-full py-8 border-t border-white/5 bg-black/20 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40 font-mono">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2"
                >
                    <span>© 2026 Inline, Linter, Pioneer</span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex gap-6"
                >
                    <a href="https://www.instagram.com/inlineer.22/" target="_blank" rel="noopener noreferrer" className="hover:text-accent-primary transition-colors">Instagram</a>
                </motion.div>
            </div>
        </footer>
    );
}
