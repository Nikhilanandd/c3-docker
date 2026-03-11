'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const steps = [
    {
        id: '01',
        title: 'Target Lock',
        desc: 'Pick an open challenge below that matches your skills.',
        icon: '/assets/recruitment/icon-target.webp', // Also updating to webp
    },
    {
        id: '02',
        title: 'Claim Issue',
        desc: 'Open the linked GitHub issue, assign it to yourself, and comment that you are starting.',
        icon: '/assets/recruitment/icon-zap.webp', // Also updating to webp
    },
    {
        id: '03',
        title: 'Deploy Skills',
        desc: 'Work on the task. Post all your progress and final submission directly in the issue comments. No PRs required.',
        icon: '/assets/recruitment/icon-rocket.webp', // Also updating to webp
    },
    {
        id: '04',
        title: 'System Upgrade',
        desc: 'We review your activity on the issue. Show your capability to join the core team.',
        icon: '/assets/recruitment/icon-core.webp', // Also updating to webp
    },
];

export default function Roadmap() {
    return (
        <section className="relative w-full py-28 md:py-36 bg-black overflow-hidden" id="roadmap">
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[40%] h-[40%] bg-cyan-900/5 blur-[140px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-[40%] h-[40%] bg-purple-900/5 blur-[140px] rounded-full" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
                {/* ── Header ──────────────────────────────────── */}
                <div className="mb-20 md:mb-28 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
                                Recruitment Pipeline
                            </span>
                        </div>
                        <h3 className="text-4xl md:text-6xl font-bold text-white title-main tracking-tight">
                            Path to the{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                Core
                            </span>
                        </h3>
                        <p className="mt-5 max-w-lg mx-auto text-gray-500 text-base md:text-lg font-light leading-relaxed">
                            Four stages between you and the inner circle. No shortcuts.
                        </p>
                    </motion.div>
                </div>

                {/* ── Timeline ────────────────────────────────── */}
                <div className="relative">
                    {/* Desktop connecting line */}
                    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px -translate-y-1/2">
                        <div className="w-full h-full border-t border-dashed border-white/[0.06]" />
                        {/* Animated gradient overlay on the line */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-purple-500/0 h-px opacity-40" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-5">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                                className="group relative"
                            >
                                {/* Timeline node dot (desktop) */}
                                <div className="hidden md:flex absolute -top-3 left-1/2 -translate-x-1/2 z-10 items-center justify-center">
                                    <span className="w-2.5 h-2.5 rounded-full bg-black border border-white/10 group-hover:border-cyan-400 group-hover:bg-cyan-400/20 transition-all duration-500 shadow-[0_0_0_4px_rgba(0,0,0,1)]" />
                                </div>

                                {/* Card */}
                                <div className="relative h-full flex flex-col items-center text-center px-6 py-10 rounded-2xl bg-white/[0.02] border border-white/[0.04] backdrop-blur-sm transition-all duration-500 group-hover:border-cyan-500/20 group-hover:bg-white/[0.04] group-hover:-translate-y-1.5 group-hover:shadow-[0_8px_40px_-12px_rgba(6,182,212,0.12)]">
                                    {/* Step number — top-right */}
                                    <span className="absolute top-4 right-5 font-mono text-[11px] text-white/10 group-hover:text-cyan-400/60 transition-colors duration-500">
                                        {step.id}
                                    </span>

                                    {/* Icon */}
                                    <div className="relative mb-7">
                                        {/* Glow ring on hover */}
                                        <div className="absolute -inset-3 rounded-2xl bg-cyan-500/0 group-hover:bg-cyan-500/[0.06] blur-xl transition-all duration-700" />
                                        <div className="relative bg-black/60 border border-white/[0.06] rounded-xl p-3.5 group-hover:border-cyan-500/20 transition-all duration-500 group-hover:scale-105">
                                            <Image
                                                src={step.icon}
                                                alt={step.title}
                                                width={52}
                                                height={52}
                                                className="relative z-10 drop-shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                                            />
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h4 className="text-sm font-bold text-white uppercase tracking-[0.15em] title-main mb-2.5 group-hover:text-cyan-300 transition-colors duration-500">
                                        {step.title}
                                    </h4>

                                    {/* Description */}
                                    <p className="text-[13px] text-gray-600 leading-relaxed font-light max-w-[200px]">
                                        {step.desc}
                                    </p>
                                </div>

                                {/* Mobile connector */}
                                {index !== steps.length - 1 && (
                                    <div className="md:hidden flex flex-col items-center py-3">
                                        <div className="w-px h-8 border-l border-dashed border-white/[0.08]" />
                                        <span className="w-1.5 h-1.5 rounded-full border border-white/10 bg-black" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
