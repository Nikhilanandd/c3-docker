'use client';

import dynamic from 'next/dynamic';

const ParticleSphere = dynamic(
    () => import('@/components/recruitment/ParticleSphere'),
    { ssr: false },
);

export default function Hero() {
    return (
        <section className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-[url('/assets/grid.svg')] opacity-10 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-2 items-center h-full">
                <div className="flex flex-col items-start justify-center space-y-8 md:pointer-events-auto">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">Recruitment Protocol v3.0</span>
                    </div>

                    {/* Main Headline */}
                    <div className="space-y-2">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white uppercase leading-[0.95] title-main drop-shadow-2xl">
                            Lead <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500">The Future</span>
                        </h1>
                    </div>

                    {/* Subtitle / Quote */}
                    <p className="max-w-md text-lg md:text-xl text-gray-400 font-light leading-relaxed border-l-2 border-cyan-500/30 pl-6">
                        "This is not for followers. It's for those who define the path."
                    </p>

                    {/* CTA Button */}
                    <a
                        href="#roadmap"
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(45,212,191,0.2)]"
                    >
                        <span className="text-sm font-bold text-white uppercase tracking-widest group-hover:text-cyan-400 transition-colors">Initiate Sequence</span>
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-400 group-hover:text-black transition-all">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:rotate-90 transition-transform">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </div>
                    </a>
                </div>

                {/* Right Column — Interactive Particle Sphere */}
                <div className="hidden md:flex items-center justify-center relative">
                    <div className="w-[500px] h-[500px] relative">
                        <ParticleSphere />
                    </div>
                </div>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none" />
        </section>
    );
}
