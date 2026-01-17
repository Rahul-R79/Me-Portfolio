"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import GithubGraph from "./GithubGraph";
import LeetCodeStats from "./LeetCodeStats";
import LeetCodeGraph from "./LeetCodeGraph";

const achievements = [
    {
        id: 1,
        title: "Hackathon Winner",
        organization: "Brototype Hackathon",
        description: "Secured a major victory by building 'C.L.A.U.S. Console', a MERN-based solution featuring GenAI 3D previews and AR visualization for modernizing logistics.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-yellow-400">
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
            </svg>
        ),
        date: "2026",
        image: "/images/hackathon.jpg",
        link: "https://www.linkedin.com/feed/update/urn:li:activity:7414531233730289664/"
    }
];

export default function Achievements() {
    const [contributions, setContributions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchContributions() {
            try {
                const res = await fetch('/api/github');
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    setContributions(data);
                }
            } catch (error) {
                console.error("Failed to fetch contributions:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchContributions();
    }, []);

    return (
        <section className="relative z-10 mx-auto max-w-7xl px-4 py-24 md:px-8 text-white">
            <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">Impact & Contributions.</h2>
                <p className="mt-4 text-lg text-gray-400">Beyond the code: Awards, Open Source, and Activity Stats.</p>
            </div>

            {/* Top Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">

                {/* Left Column: Github Focus */}
                <div className="space-y-6">
                    {/* 1. Github Graph */}
                    <GithubGraph />

                    {/* 2. Open Source Feed */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="group relative z-0 h-[300px] w-full overflow-hidden rounded-2xl p-[2px] bg-white/5"
                        style={{
                            maskImage: 'linear-gradient(white, white)',
                            WebkitMaskImage: 'linear-gradient(white, white)',
                            contain: 'paint',
                            transform: 'translateZ(0)'
                        }}
                    >
                        {/* Spinning Beam */}
                        <span className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_50%,#4ade80_100%)]" />

                        {/* Inner Content */}
                        <div className="relative h-full w-full rounded-2xl bg-[#161616] backdrop-blur-md overflow-hidden flex flex-col">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5 shrink-0">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                    <span className="ml-2 text-xs font-mono text-gray-500">gh-contributions</span>
                                </div>
                                {loading && <span className="text-xs text-green-400 animate-pulse">Fetching...</span>}
                            </div>

                            <div className="divide-y divide-white/5 overflow-y-auto custom-scrollbar flex-1 pr-1">
                                {contributions.length === 0 && !loading ? (
                                    <div className="p-4 text-xs font-mono text-gray-600">_ no public PRs found...</div>
                                ) : (
                                    contributions.map((pr) => (
                                        <a
                                            key={pr.id}
                                            href={pr.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block p-4 transition-colors hover:bg-white/5 group"
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="flex items-center gap-2 overflow-hidden">
                                                    <span className="text-sm font-mono text-purple-400 truncate max-w-[140px]">{pr.repo}</span>
                                                </div>
                                                <span className="text-[10px] font-mono text-gray-600 shrink-0">
                                                    {pr.date}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-300 font-medium group-hover:text-white transition-colors line-clamp-2">
                                                {pr.pr}
                                            </p>
                                        </a>
                                    ))
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: LeetCode Focus */}
                <div className="space-y-6">
                    {/* 3. LeetCode Graph */}
                    <LeetCodeGraph />

                    {/* 4. LeetCode Stats */}
                    <div className="h-[300px]">
                        <LeetCodeStats />
                    </div>
                </div>
            </div>

            {/* Bottom Section: Achievements List */}
            <div className="space-y-8">
                <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400 w-8 h-8">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                        <path d="M4 22h16" />
                        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                    </svg>
                    <h3 className="text-2xl font-bold">Achievements</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {achievements.map((item, index) => (
                        <motion.a
                            key={item.id}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="block group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] cursor-pointer"
                        >
                            {item.image && (
                                <div className="w-full h-48 overflow-hidden relative">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />

                                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                        <span className="text-xs font-mono text-yellow-400">{item.date}</span>
                                    </div>
                                </div>
                            )}

                            <div className="p-6 relative">
                                <div className="absolute -top-8 left-6 p-3 rounded-xl bg-[#1a1a1a] border border-white/10 shadow-xl">
                                    {item.icon}
                                </div>

                                <div className="mt-4 space-y-3">
                                    <div>
                                        <h4 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">{item.title}</h4>
                                        <p className="text-sm text-gray-400 font-mono mt-1">{item.organization}</p>
                                    </div>
                                    <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
