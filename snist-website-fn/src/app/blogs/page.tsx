'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Hash, Calendar, Clock, ChevronRight, User, Terminal } from 'lucide-react'

// Blog Data (Mock)
const blogPosts = [
    {
        id: 1,
        title: "The Future of Cloud Computing: Serverless & Beyond",
        excerpt: "Exploring how serverless architecture is reshaping the way we build and deploy applications, focusing on cost-efficiency and scalability.",
        author: "Sathwiik B",
        date: "Oct 15, 2025",
        readTime: "5 min read",
        category: "Cloud",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
        tags: ["Serverless", "AWS", "Architecture"]
    },
    {
        id: 2,
        title: "Building Microservices with Go and gRPC",
        excerpt: "A deep dive into constructing high-performance microservices using GoLang and gRPC, specifically geared towards students entering the backend field.",
        author: "Nithin K",
        date: "Nov 02, 2025",
        readTime: "8 min read",
        category: "DevOps",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
        tags: ["Golang", "Microservices", "Backend"]
    },
    {
        id: 3,
        title: "AI Agents: The Next Frontier in Automation",
        excerpt: "Understanding the rise of autonomous AI agents and how they differ from traditional chatbots. A look into practical use cases and implementation.",
        author: "C³ R&D Team",
        date: "Dec 10, 2025",
        readTime: "6 min read",
        category: "AI/ML",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2664&auto=format&fit=crop",
        tags: ["AI", "Automation", "Agents"]
    },
    {
        id: 4,
        title: "Open Source: Your Gateway to Big Tech",
        excerpt: "Why contributing to open source is the single best way to improve your coding skills and get noticed by top tech companies.",
        author: "Community Lead",
        date: "Jan 05, 2026",
        readTime: "4 min read",
        category: "Community",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
        tags: ["Open Source", "Career", "Git"]
    }
]

const categories = ["All", "Cloud", "AI/ML", "DevOps", "Community", "Security"]

export default function BlogsPage() {
    const [activeCategory, setActiveCategory] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    const filteredPosts = blogPosts.filter(post => {
        const matchesCategory = activeCategory === "All" || post.category === activeCategory
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
            {/* Background */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/assets/home/spaces.webp"
                    alt="Space Background"
                    fill
                    className="object-cover opacity-20"
                    priority
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent opacity-50" />
            </div>

            <div className="relative z-10 pt-32 pb-20 px-4 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/20 border border-blue-500/30 text-xs font-mono text-blue-300 mb-6"
                    >
                        <Terminal size={12} /> INCOMING TRANSMISSION
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
                    >
                        Mission
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 ml-4">
                            Logs
                        </span>
                    </motion.h1>

                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Insights, tutorials, and updates from the C³ engineering deck.
                    </p>
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeCategory === cat
                                    ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Decipher logs..."
                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-600"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {filteredPosts.map((post, idx) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] flex flex-col md:flex-row h-full md:h-64"
                        >
                            <div className="w-full md:w-2/5 relative h-48 md:h-full overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay" />
                            </div>

                            <div className="p-6 md:p-8 flex flex-col justify-between w-full md:w-3/5">
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">{post.category}</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-600" />
                                        <span className="text-xs text-gray-500 flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors leading-tight">
                                        <Link href={`#`} className="focus:outline-none">
                                            {post.title}
                                        </Link>
                                    </h3>

                                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                                        {post.excerpt}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between mt-auto border-t border-white/5 pt-4">
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <User size={12} className="text-purple-500" /> {post.author}
                                        <span className="text-gray-700">•</span>
                                        {post.date}
                                    </div>
                                    <div className="p-2 rounded-full bg-white/5 text-gray-400 group-hover:bg-purple-500 group-hover:text-white transition-all">
                                        <ChevronRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {filteredPosts.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-block p-4 rounded-full bg-white/5 border border-white/10 mb-4">
                            <Hash className="text-gray-500" size={32} />
                        </div>
                        <h3 className="text-xl text-gray-300 font-medium">System malfunction</h3>
                        <p className="text-gray-500">No logs found matching your query.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
