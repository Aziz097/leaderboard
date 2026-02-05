"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import GlassSurface from "./GlassSurface";

export function FooterCTA() {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");


    const handleDonateClick = () => {
        setIsOpen(!isOpen);
    };

    const handleConfirm = () => {
        const message = `Halo, saya baru saja melakukan donasi dengan detail berikut:%0A%0ANama: ${name}%0A%0ASaya melampirkan bukti transfer di chat ini. Mohon dikonfirmasi. Terima kasih!`;
        window.open(`https://wa.me/6287751861137?text=${message}`, '_blank');
    };

    return (
        <section className="py-24 px-4 relative flex flex-col items-center justify-center text-center overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-accent-primary/5 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-accent-primary/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="z-10 max-w-2xl mx-auto w-full"
            >
                <h2 className="pb-2 text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-4 drop-shadow-md">
                    Pengen kelihatan di website?
                </h2>
                <p className="text-white/60 mb-10 text-lg">
                    Donasi sekarang dan jadilah bagian dari sejarah Inlineer 2022!
                </p>

                <button
                    onClick={handleDonateClick}
                    className="group relative px-10 py-5 bg-accent-primary text-background font-bold text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-5px_var(--color-accent-primary)] cursor-pointer"
                >
                    <span className="relative z-10">{isOpen ? "Tutup Donasi" : "Donasi Sekarang"}</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: "auto", marginTop: 40 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="overflow-hidden w-full"
                        >
                            <GlassSurface
                                borderRadius={24}
                                opacity={0.3}
                                className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center text-left"
                            >
                                {/* QRIS Section */}
                                <div className="flex flex-col items-center gap-4 w-full md:w-1/2">
                                    <div className="relative w-full aspect-square max-w-[280px] bg-white rounded-xl overflow-hidden p-2">
                                        {/* Using the image found in public directory */}
                                        <div className="relative w-full h-full">
                                            <Image
                                                src="/qris.jpeg"
                                                alt="QRIS Code"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-white font-bold text-lg">a.n Gerai Miku</p>
                                        <p className="text-white/70 text-sm">Scan QRIS untuk donasi</p>
                                    </div>
                                </div>

                                {/* Form Section */}
                                <div className="flex flex-col gap-4 w-full md:w-1/2">
                                    <h3 className="text-2xl font-bold text-white mb-2">Konfirmasi Donasi</h3>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/80 ml-1">Nama Donatur</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Contoh: Orang Baik"
                                            className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-accent-primary/50 transition-colors"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/80 ml-1">Bukti Transfer</label>
                                        <div className="relative w-full">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white/70 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent-primary/20 file:text-accent-primary hover:file:bg-accent-primary/30 transition-colors cursor-pointer"
                                            />
                                        </div>
                                        <p className="text-xs text-white/40 ml-1">
                                            *Sertakan bukti transfer saat mengirim pesan WhatsApp
                                        </p>
                                    </div>

                                    <button
                                        onClick={handleConfirm}
                                        className="mt-4 px-6 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20"
                                    >
                                        <span>Konfirmasi ke WhatsApp</span>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
                                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.7c.905.5 1.723.764 2.793.765 3.18 0 5.767-2.587 5.767-5.766.001-3.185-2.579-5.781-5.769-5.781zm0 13.891c-3.831 0-6.965-3.104-6.965-6.94 0-3.836 3.111-6.96 6.955-6.96 3.832 0 6.965 3.129 6.965 6.965 0 3.836-3.133 6.935-6.955 6.935z" fillOpacity=".5" />
                                            <path d="M12.063 2C6.476 2 2 6.521 2 12.115a10.026 10.026 0 001.406 5.093L2.096 22l4.908-1.288A10.05 10.05 0 0012.063 22c5.59 0 10.063-4.52 10.063-10.096S17.653 2 12.063 2zm.019 18.067c-1.666-.003-3.12-.489-4.558-1.332l-.435-.247-2.906.762.777-2.825-.262-.48a8.04 8.04 0 01-1.353-4.814c.002-4.485 3.65-8.136 8.138-8.136 4.49 0 8.138 3.65 8.138 8.137-.002 4.485-3.652 8.935-7.539 8.935zm4.493-6.104c-.246-.123-1.454-.717-1.678-.8s-.387-.123-.553.124-.637.8-.781.964-.287.184-.533.061-1.042-.383-1.983-1.222c-.742-.661-1.243-1.478-1.388-1.725s-.015-.38.107-.503c.11-.11.246-.286.37-.43.123-.143.164-.245.246-.409s.041-.286-.021-.409c-.061-.123-.553-1.332-.758-1.824-.2-.492-.403-.425-.553-.433-.144-.008-.307-.009-.472-.009a.911.911 0 00-.656.307c-.226.245-.861.841-.861 2.05s.881 2.378 1.004 2.541c.123.164 1.733 2.646 4.2 3.717.587.254 1.045.408 1.401.522.596.19 1.139.163 1.57.099.479-.071 1.454-.594 1.659-1.168.205-.573.205-1.065.144-1.168-.062-.102-.226-.163-.472-.286z" />
                                        </svg>
                                    </button>
                                </div>
                            </GlassSurface>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}

