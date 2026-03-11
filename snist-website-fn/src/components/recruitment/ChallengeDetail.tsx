'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ExternalLink, CheckCircle2 } from 'lucide-react';
import { ProblemStatement } from '@/types/recruitment';

interface ChallengeDetailProps {
    problem: ProblemStatement;
    onBack: () => void;
}

const instructions = [
    {
        step: '01',
        title: 'Claim the Issue',
        command: 'Comment: "Assigning to myself"',
        description: 'Visit the GitHub issue and claim it by commenting.',
    },
    {
        step: '02',
        title: 'Read & Research',
        command: 'Analyze the requirements',
        description: 'Understand the expected outcome and prepare your approach.',
    },
    {
        step: '03',
        title: 'Implement Solution',
        command: 'Code, design, or write internally',
        description: 'Work on your solution locally or using your preferred tools.',
    },
    {
        step: '04',
        title: 'Submit Progress',
        command: 'Comment: Upload links, files, or screenshots',
        description: 'Post your final solution directly in the issue comments. No PR required.',
    },
];

export default function ChallengeDetail({ problem, onBack }: ChallengeDetailProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="py-12 px-6 md:px-12 lg:px-20"
        >
            {/* Back Button */}
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-white/40 hover:text-cyan-400 transition-colors duration-300 mb-8 group"
            >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="font-mono text-xs uppercase tracking-widest">Return to Board</span>
            </button>

            {/* Terminal View Container */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-5 py-3.5 bg-white/[0.03] border-b border-white/[0.06]">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <span className="ml-4 font-mono text-white/20 text-xs">challenge://mission-brief</span>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 mb-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase">Classified Challenge</span>
                        </div>
                        <h1 className="text-white font-bold text-2xl md:text-3xl tracking-tight mb-4 title-main">
                            {problem.title}
                        </h1>
                        <p className="text-gray-500 text-base leading-relaxed font-light">
                            {problem.description}
                        </p>
                    </div>

                    {/* Primary Action */}
                    <a
                        href={problem.githubIssueUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-white/5 border border-white/[0.08] text-white font-bold uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-white/[0.08] hover:border-cyan-500/30 hover:text-cyan-400 transition-all duration-300 group hover:shadow-[0_0_20px_-6px_rgba(6,182,212,0.15)]"
                    >
                        <span className="text-sm">Access Classified Issue</span>
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>

                    {/* Divider */}
                    <div className="my-10 border-t border-white/[0.04]" />

                    {/* Instructions Checklist */}
                    <div>
                        <h2 className="font-mono text-white/30 text-xs uppercase tracking-widest mb-6">
                            Mission Protocol
                        </h2>
                        <div className="space-y-6">
                            {instructions.map((item, index) => (
                                <motion.div
                                    key={item.step}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex gap-4"
                                >
                                    <div className="flex-shrink-0 mt-0.5">
                                        <CheckCircle2 className="w-4 h-4 text-cyan-400/60" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium text-sm mb-1.5 title-main">
                                            {item.step}. {item.title}
                                        </p>
                                        <code className="block font-mono text-cyan-400/70 text-xs bg-black/40 border border-white/[0.04] px-3 py-2 rounded-lg mb-2">
                                            {item.command}
                                        </code>
                                        <p className="text-gray-600 text-sm font-light">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
