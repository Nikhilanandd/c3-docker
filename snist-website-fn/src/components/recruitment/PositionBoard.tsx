'use client';

import React, { useState } from 'react';
import FlowingMenu, { MenuItemData } from './FlowingMenu';
import { AnimatePresence, motion } from 'framer-motion';
import { RECRUITMENT_CATEGORIES } from '@/dispositions/recruitment';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import { PositionCategory, ProblemStatement } from '@/types/recruitment';

interface PositionBoardProps {
    categories: PositionCategory[];
    onSelectProblem: (problem: ProblemStatement) => void;
}

export default function PositionBoard({ categories = RECRUITMENT_CATEGORIES, onSelectProblem }: PositionBoardProps) {
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

    const handleBack = () => {
        setExpandedCategory(null);
    };

    const recruitmentItems: MenuItemData[] = [
        {
            link: '#',
            text: 'Documentation',
            image: '/assets/recruitment/recruitment_documentation.png',
            onClick: () => setExpandedCategory('documentation')
        },
        {
            link: '#',
            text: 'Designing',
            image: '/assets/recruitment/recruitment_designing.png',
            onClick: () => setExpandedCategory('designing')
        },
        {
            link: '#',
            text: 'Organizing',
            image: '/assets/recruitment/recruitment_organizing.png',
            onClick: () => setExpandedCategory('organizing')
        },
        {
            link: '#',
            text: 'Technical',
            image: '/assets/recruitment/recruitment_technical.png',
            onClick: () => setExpandedCategory('technical')
        },
        {
            link: '#',
            text: 'Social Media',
            image: '/assets/recruitment/recruitment_socialmedia.png',
            onClick: () => setExpandedCategory('socialmedia')
        },
        {
            link: '#',
            text: 'Publicity',
            image: '/assets/recruitment/recruitment_publicity.png',
            onClick: () => setExpandedCategory('publicity')
        }
    ];

    const activeCategoryData = categories.find(c => c.id === expandedCategory);

    return (
        <section className="relative w-full h-[900px] bg-black overflow-hidden flex flex-col" id="positions">
            {/* Header */}
            <div className="w-full text-center z-20 pt-20 pb-10 bg-black shrink-0 relative">
                <AnimatePresence mode="wait">
                    {expandedCategory ? (
                        <motion.div
                            key="back-button"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute left-10 top-20 flex items-center gap-2 cursor-pointer text-white/40 hover:text-cyan-400 transition-colors duration-300"
                            onClick={handleBack}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="uppercase tracking-widest text-xs font-mono">Back to Tracks</span>
                        </motion.div>
                    ) : null}
                </AnimatePresence>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
                        {expandedCategory ? 'Track Details' : 'Open Positions'}
                    </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white uppercase title-main tracking-tight">
                    {expandedCategory ? activeCategoryData?.title : 'Choose Your Track'}
                </h3>
            </div>

            {/* Content Area */}
            <div className="flex-1 min-h-0 relative">
                <AnimatePresence mode="wait">
                    {!expandedCategory ? (
                        <motion.div
                            key="menu"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-10"
                        >
                            <FlowingMenu
                                items={recruitmentItems}
                                speed={20}
                                textColor="#ffffff"
                                bgColor="#000000"
                                marqueeBgColor="#22d3ee"
                                marqueeTextColor="#000000"
                                borderColor="rgba(255,255,255,0.06)"
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="details"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            className="absolute inset-0 z-20 overflow-y-auto px-6 pb-20"
                        >
                            <div className="max-w-7xl mx-auto">
                                <p className="text-gray-500 max-w-2xl mx-auto text-center mb-16 text-base font-light leading-relaxed">
                                    {activeCategoryData?.description}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {activeCategoryData?.problems.map((problem) => (
                                        <div
                                            key={problem.id}
                                            className="group relative p-7 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-cyan-500/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_40px_-12px_rgba(6,182,212,0.1)]"
                                        >
                                            <div className="flex justify-between items-start mb-5">
                                                <span className="font-mono text-[11px] text-cyan-400/80 bg-cyan-950/20 px-2.5 py-1 rounded-full border border-white/[0.06]">
                                                    {problem.id}
                                                </span>
                                                <a
                                                    href={problem.githubIssueUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-white/20 hover:text-cyan-400 transition-colors duration-300"
                                                >
                                                    <Github className="w-4 h-4" />
                                                </a>
                                            </div>

                                            <h4 className="text-lg font-bold text-white mb-2.5 leading-tight title-main group-hover:text-cyan-300 transition-colors duration-500">
                                                {problem.title}
                                            </h4>

                                            <p className="text-sm text-gray-500 leading-relaxed mb-6 font-light">
                                                {problem.description}
                                            </p>

                                            <div
                                                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/30 group-hover:text-cyan-400 transition-colors duration-500 cursor-pointer"
                                                onClick={() => onSelectProblem(problem)}
                                            >
                                                View Challenge <ArrowUpRight className="w-3 h-3" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
