'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { Rocket, BookOpen, FlaskConical, Users, LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { SiDiscord, SiLinkedin, SiInstagram, SiGithub } from 'react-icons/si'
import { FaXTwitter } from 'react-icons/fa6'

type Activity = {
    title: string;
    description: string;
    icon: LucideIcon;
};

const activities: Activity[] = [
    {
        title: "Explore Cutting Edge Tech",
        description: "Master industry-standard tools and stay ahead in the evolving technology landscape.",
        icon: Rocket,
    },
    {
        title: "Open Source Contributions",
        description: "Contribute to free and open source projects and make a meaningful impact in the tech community.",
        icon: BookOpen,
    },
    {
        title: "Research Driven Activities",
        description: "Explore and advance in your field of interest through research papers and innovative projects.",
        icon: FlaskConical,
    },
    {
        title: "Networking",
        description: "Connect with like-minded people, because your network is your net worth in the tech industry.",
        icon: Users,
    }
];

// Extracted for cleaner animation logic
const ActivityItem = ({ step, index, progress }: { step: Activity; index: number; progress: MotionValue<number> }) => {
    // Determine when this specific step is "active" based on scroll progress
    const rangeStart = index * 0.25;
    // Create a local active state transform
    const opacity = useTransform(progress, [rangeStart, rangeStart + 0.1], [0.3, 1]); // Reduced initial opacity for contrast
    const scale = useTransform(progress, [rangeStart, rangeStart + 0.1], [0.95, 1]);
    const glow = useTransform(progress, [rangeStart, rangeStart + 0.1], ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 30px rgba(45,212,191,0.3)"]); // Cyan glow
    const border = useTransform(progress, [rangeStart, rangeStart + 0.1], ["rgba(255,255,255,0.05)", "rgba(45,212,191,0.3)"]); // Cyan border

    const isEven = index % 2 === 0;

    return (
        <motion.div
            style={{ opacity, scale }}
            className={`relative flex items-center md:gap-16 gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
        >
            {/* Center Node on the Line */}
            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border border-white/20 z-20 overflow-hidden flex items-center justify-center">
                <motion.div
                    style={{ opacity: useTransform(progress, [rangeStart, rangeStart + 0.05], [0, 1]) }}
                    className="w-full h-full bg-cyan-400 shadow-[0_0_10px_rgba(45,212,191,1)]"
                />
            </div>

            {/* Content Card */}
            <div className="flex-1 pl-20 md:pl-0">
                <motion.div
                    className={`p-8 rounded-2xl bg-white/5 backdrop-blur-sm relative overflow-hidden group transition-colors duration-500`}
                    style={{ boxShadow: glow, border: `1px solid`, borderColor: border }}
                >
                    {/* Number Watermark */}
                    <div className="absolute -right-4 -top-4 text-9xl font-display font-bold text-white/5 pointer-events-none select-none">
                        0{index + 1}
                    </div>

                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                            <step.icon size={24} />
                        </div>
                        <h3 className="text-2xl font-bold font-display mb-3 text-slate-100">{step.title}</h3>
                        <p className="text-neutral-400 leading-relaxed">{step.description}</p>
                    </div>
                </motion.div>
            </div>

            {/* Empty Spacer to balance the grid */}
            <div className="flex-1 hidden md:block" />
        </motion.div>
    )
}

// Reusable Social Button Component
const SocialButton = ({ href, icon: Icon, label, hoverColor, hoverBorder }: any) => (
    <Link href={href} target='_blank'>
        <button className={`
            flex items-center justify-center gap-3 
            w-[160px] md:w-[180px] py-3 rounded-lg
            bg-neutral-900/80 border border-neutral-800 
            text-neutral-300 font-bold text-lg
            transition-all duration-300 ease-out
            hover:-translate-y-1 hover:scale-105 hover:text-white hover:shadow-lg
            ${hoverColor} ${hoverBorder}
        `}>
            <Icon className="text-xl md:text-2xl" />
            {label}
        </button>
    </Link>
);

export default function Overview() {
    const containerRef = useRef(null);
    const timelineRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start center", "end center"]
    });

    return (
        <section id="process" ref={containerRef} className="py-20 md:py-32 relative overflow-hidden bg-black">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-900/20 to-transparent" />
                <div className="absolute bottom-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-900/20 to-transparent" />
            </div>

            <div className="w-full max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20 md:mb-32"
                >
                    <div className="inline-block mb-4 px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-mono uppercase tracking-widest">
                        What We Do
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Crafting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Future</span>
                    </h2>
                    <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                        Join us in our journey to explore, contribute, research, and network in the world of technology.
                    </p>
                </motion.div>

                <div ref={timelineRef} className="relative max-w-5xl mx-auto">
                    {/* Animated SVG Path for Desktop */}
                    <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] hidden md:block">
                        <div className="absolute inset-0 bg-white/5 w-full h-full" /> {/* Track */}
                        <motion.div
                            style={{ scaleY: scrollYProgress }}
                            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-500 via-purple-500 to-cyan-500 origin-top shadow-[0_0_15px_rgba(45,212,191,0.6)]"
                        />
                    </div>

                    {/* Mobile Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-white/5 md:hidden">
                        <motion.div
                            style={{ scaleY: scrollYProgress }}
                            className="absolute top-0 left-0 w-full h-full bg-cyan-500 origin-top"
                        />
                    </div>

                    <div className="space-y-24">
                        {activities.map((step, i) => {
                            return (
                                <ActivityItem
                                    key={i}
                                    step={step}
                                    index={i}
                                    progress={scrollYProgress}
                                />
                            )
                        })}
                    </div>
                </div>

                {/* Footer / Connect Section */}
                <div className="mt-32 w-full border-t border-white/10 bg-neutral-950/50 backdrop-blur-sm rounded-xl overflow-hidden">
                    <div className='py-16 px-4 text-center'>
                        <div className="mb-8">
                            <span className="text-4xl">🤝</span>
                            <h3 className='mt-4 text-2xl font-bold text-white'>Connect with C³</h3>
                            <p className='text-neutral-500'>Join our growing community</p>
                        </div>

                        <div className='flex flex-wrap gap-4 justify-center'>
                            <SocialButton
                                href='https://discord.gg/dBNXWDKhrD'
                                icon={SiDiscord}
                                label="Discord"
                                hoverColor="hover:bg-[#5865F2]"
                                hoverBorder="hover:border-[#5865F2]"
                            />
                            <SocialButton
                                href='https://www.linkedin.com/company/cloud-community-club'
                                icon={SiLinkedin}
                                label="LinkedIn"
                                hoverColor="hover:bg-[#0077b5]"
                                hoverBorder="hover:border-[#0077b5]"
                            />
                            <SocialButton
                                href='https://www.instagram.com/c3.snist/'
                                icon={SiInstagram}
                                label="Instagram"
                                hoverColor="hover:bg-[#E4405F]"
                                hoverBorder="hover:border-[#E4405F]"
                            />
                            <SocialButton
                                href='https://github.com/C3Snist'
                                icon={SiGithub}
                                label="GitHub"
                                hoverColor="hover:bg-neutral-800"
                                hoverBorder="hover:border-white"
                            />
                            <SocialButton
                                href='https://x.com/C3Snist'
                                icon={FaXTwitter}
                                label="X / Twitter"
                                hoverColor="hover:bg-black"
                                hoverBorder="hover:border-white"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};