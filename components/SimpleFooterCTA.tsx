"use client";

import { useState } from "react";
import Image from "next/image";

// OPTIMIZED: Simplified FooterCTA without heavy GlassSurface
export function SimpleFooterCTA() {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");

    const handleDonateClick = () => {
        setIsOpen(!isOpen);
    };

    const handleConfirm = () => {
        const message = `Halo, saya baru saja melakukan donasi dengan detail berikut:%0A%0ANama: ${name}%0A%0ASaya akan mengirimkan bukti transfer di chat ini. Mohon dikonfirmasi. Terima kasih!`;
        window.open(`https://wa.me/6287751861137?text=${message}`, '_blank');
    };

    return (
        <section className="py-24 px-4 relative flex flex-col items-center justify-center text-center overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-accent-primary/5 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-accent-primary/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

            <div className="z-10 max-w-2xl mx-auto w-full animate-fade-in">
                <h2 className="pb-2 text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-4 drop-shadow-md">
                    Pengen kelihatan di website?
                </h2>
                <p className="text-white/60 mb-10 text-lg">
                    Donasi sekarang dan jadilah bagian dari sejarah Inlineer 2022!
                </p>

                <button
                    onClick={handleDonateClick}
                    className="group relative px-10 py-5 bg-accent-primary text-white font-bold text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-5px_var(--color-accent-primary)] cursor-pointer"
                >
                    <span className="relative z-10">{isOpen ? "Tutup Donasi" : "Donasi Sekarang"}</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>

                {isOpen && (
                    <div
                        className="mt-10 overflow-hidden w-full animate-fade-in"
                        style={{ contain: 'layout style' }}
                    >
                        {/* Simple CSS Glass Panel */}
                        <div
                            className="p-6 md:p-8 w-full rounded-3xl"
                            style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                backdropFilter: 'blur(12px)',
                                WebkitBackdropFilter: 'blur(12px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
                            }}
                        >
                            <div className="flex flex-col gap-8 w-full">
                                {/* Steps Timeline */}
                                <div className="w-full bg-black/20 p-6 rounded-xl border border-white/5 backdrop-blur-sm">
                                    <h4 className="text-white font-semibold mb-6 text-sm text-center">Cara Donasi:</h4>
                                    <div className="relative flex items-center justify-between w-full">
                                        <div className="absolute top-[14px] left-0 right-0 h-[2px] bg-white/10 -z-10" />
                                        {[
                                            { id: 1, label: "Scan QRIS", icon: "📱" },
                                            { id: 2, label: "Input Nominal", icon: "💰" },
                                            { id: 3, label: "Bayar", icon: "✅" },
                                            { id: 4, label: "Screenshot", icon: "📸" },
                                            { id: 5, label: "Konfirmasi", icon: "💬" }
                                        ].map((step) => (
                                            <div key={step.id} className="flex flex-col items-center gap-2 group cursor-default">
                                                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-accent-primary/20 border border-accent-primary text-accent-primary flex items-center justify-center text-xs md:text-sm font-bold shadow-[0_0_10px_-2px_var(--color-accent-primary)] z-10 group-hover:scale-110 transition-transform bg-black">
                                                    {step.id}
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <span className="text-[10px] md:text-xs text-white/50 font-medium text-center whitespace-nowrap leading-tight group-hover:text-white transition-colors">
                                                        {step.label}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Grid: QRIS + Form */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-start">
                                    {/* QRIS */}
                                    <div className="flex flex-col items-center justify-center gap-4 w-full">
                                        <div
                                            className="relative w-full aspect-square max-w-[280px] bg-white rounded-xl overflow-hidden p-2 shadow-2xl shadow-accent-primary/20 cursor-pointer group"
                                            onDoubleClick={() => {
                                                const link = document.createElement('a');
                                                link.href = '/qris.jpeg';
                                                link.download = 'QRIS-Gerai-Miku.jpeg';
                                                link.click();
                                            }}
                                            title="Double click to download QRIS"
                                        >
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src="/qris.jpeg"
                                                    alt="QRIS Code"
                                                    fill
                                                    className="object-contain"
                                                    sizes="(max-width: 768px) 280px, 280px"
                                                    loading="lazy"
                                                    quality={75}
                                                />
                                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <p className="text-white text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                                                        Double click to download
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-white font-bold text-lg">a.n Gerai Miku</p>
                                            <p className="text-white/70 text-sm">Double click to download QRIS</p>
                                        </div>
                                    </div>

                                    {/* Form */}
                                    <div className="flex flex-col gap-8 w-full max-w-md mx-auto md:mx-0">
                                        <div className="text-center md:text-left">
                                            <h3 className="text-2xl font-bold text-white mb-2">Konfirmasi Donasi</h3>
                                            <p className="text-white/60 text-sm">
                                                Terima kasih atas dukungan Anda! Silakan isi nama Anda untuk konfirmasi.
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex flex-col gap-4">
                                                <label className="text-sm font-medium text-white text-center md:text-left">
                                                    Nama Donatur
                                                </label>
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    placeholder="Contoh: Orang Baik"
                                                    className="w-full px-4 py-4 rounded-xl bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-accent-primary/50 transition-colors"
                                                />
                                            </div>
                                            <button
                                                onClick={handleConfirm}
                                                className="w-full mt-8 px-6 py-3.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 group"
                                            >
                                                <span>Konfirmasi ke WhatsApp</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default SimpleFooterCTA;
