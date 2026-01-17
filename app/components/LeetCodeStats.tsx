"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function LeetCodeStats() {
    const [stats, setStats] = useState<{ solved: any[], total: any[] } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch('/api/leetcode');
                const data = await res.json();
                if (data.solved && data.total) {
                    setStats(data);
                }
            } catch (error) {
                console.error("LeetCode fetch error:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    const getSolved = (diff: string) => stats?.solved.find(s => s.difficulty === diff)?.count || 0;
    const getTotal = (diff: string) => stats?.total.find(t => t.difficulty === diff)?.count || 1;

    // Calculate totals
    const solvedTotal = getSolved('All');
    const totalQuestions = getTotal('All');

    // Calculate stroke dashes for the circular gauge
    const radius = 88;  
    const strokeWidth = 12;
    const viewBoxSize = 200; 
    const center = viewBoxSize / 2;
    const circumference = 2 * Math.PI * radius;

    const easyCount = getSolved('Easy');
    const mediumCount = getSolved('Medium');
    const hardCount = getSolved('Hard');

    // Ratios based on total solved questions
    const easyRatio = solvedTotal > 0 ? easyCount / solvedTotal : 0;
    const mediumRatio = solvedTotal > 0 ? mediumCount / solvedTotal : 0;
    const hardRatio = solvedTotal > 0 ? hardCount / solvedTotal : 0;

    const easyDash = easyRatio * circumference;
    const mediumDash = mediumRatio * circumference;
    const hardDash = hardRatio * circumference;

    if (loading) return (
        <div className="h-full p-6 border border-white/10 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center animate-pulse">
            <span className="text-gray-500 font-mono text-sm">Loading Stats...</span>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-full relative z-0 overflow-hidden rounded-2xl p-[2px] group bg-white/5"
            style={{
                maskImage: 'linear-gradient(white, white)',
                WebkitMaskImage: 'linear-gradient(white, white)',
                contain: 'paint',
                transform: 'translateZ(0)'
            }}
        >
            {/* Spinning Beam */}
            <span className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_50%,#00b8a3_100%)]" />

            {/* Inner Content */}
            <div className="relative h-full bg-[#161616] backdrop-blur-md rounded-2xl p-6 flex items-center justify-between overflow-hidden">
                <div className="absolute top-4 left-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest z-20">
                    Problems Solved
                </div>

                {/* Left: Circular Gauge */}
                <div className="relative flex items-center justify-center w-[45%]">
                    <svg width="200" height="200" viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} className="transform -rotate-90">
                        {/* Background Track */}
                        <circle
                            cx={center}
                            cy={center}
                            r={radius}
                            stroke="#2d2d2d"
                            strokeWidth={strokeWidth}
                            fill="transparent"
                        />

                        {/* Easy Segment */}
                        <circle
                            cx={center}
                            cy={center}
                            r={radius}
                            stroke="#00b8a3"
                            strokeWidth={strokeWidth}
                            fill="transparent"
                            strokeDasharray={`${easyDash} ${circumference}`}
                            strokeDashoffset="0"
                            strokeLinecap="butt"
                        />

                        {/* Medium Segment */}
                        <circle
                            cx={center}
                            cy={center}
                            r={radius}
                            stroke="#ffc01e"
                            strokeWidth={strokeWidth}
                            fill="transparent"
                            strokeDasharray={`${mediumDash} ${circumference}`}
                            strokeDashoffset={-easyDash}
                            strokeLinecap="butt"
                        />

                        {/* Hard Segment */}
                        <circle
                            cx={center}
                            cy={center}
                            r={radius}
                            stroke="#ef4743"
                            strokeWidth={strokeWidth}
                            fill="transparent"
                            strokeDasharray={`${hardDash} ${circumference}`}
                            strokeDashoffset={-(easyDash + mediumDash)}
                            strokeLinecap="butt"
                        />
                    </svg>

                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <div className="flex items-baseline gap-0.5">
                            <span className="text-3xl font-bold text-white tracking-tighter">{solvedTotal}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                            <span className="text-[10px] text-gray-500 font-medium tracking-wide border-b border-gray-700 pb-0.5">/{totalQuestions}</span>
                        </div>
                        <div className="text-[10px] text-[#00b8a3] mt-2 font-bold uppercase tracking-widest flex items-center gap-1 bg-[#00b8a3]/10 px-2 py-0.5 rounded-full">
                            <span>Solved</span>
                        </div>
                    </div>
                </div>

                {/* Right: Stats Cards Stack */}
                <div className="flex flex-col gap-3 w-[55%] pl-2 h-full justify-center">

                    {/* Easy Card */}
                    <div className="bg-[#262626]/50 hover:bg-[#262626] rounded-xl p-3 flex flex-col justify-between h-[72px] border border-transparent hover:border-[#00b8a3]/20 transition-all group/card">
                        <span className="text-[10px] font-bold text-[#00b8a3] uppercase tracking-widest">Easy</span>
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-xl font-bold text-white group-hover/card:text-[#00b8a3] transition-colors">{easyCount}</span>
                            <span className="text-[11px] text-gray-600 font-medium">/{getTotal('Easy')}</span>
                        </div>
                    </div>

                    {/* Medium Card */}
                    <div className="bg-[#262626]/50 hover:bg-[#262626] rounded-xl p-3 flex flex-col justify-between h-[72px] border border-transparent hover:border-[#ffc01e]/20 transition-all group/card">
                        <span className="text-[10px] font-bold text-[#ffc01e] uppercase tracking-widest">Med.</span>
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-xl font-bold text-white group-hover/card:text-[#ffc01e] transition-colors">{mediumCount}</span>
                            <span className="text-[11px] text-gray-600 font-medium">/{getTotal('Medium')}</span>
                        </div>
                    </div>

                    {/* Hard Card */}
                    <div className="bg-[#262626]/50 hover:bg-[#262626] rounded-xl p-3 flex flex-col justify-between h-[72px] border border-transparent hover:border-[#ef4743]/20 transition-all group/card">
                        <span className="text-[10px] font-bold text-[#ef4743] uppercase tracking-widest">Hard</span>
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-xl font-bold text-white group-hover/card:text-[#ef4743] transition-colors">{hardCount}</span>
                            <span className="text-[11px] text-gray-600 font-medium">/{getTotal('Hard')}</span>
                        </div>
                    </div>

                </div>

                <a
                    href="https://leetcode.com/Rahul_dev_LC/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10"
                    aria-label="View LeetCode Profile"
                />
            </div>
        </motion.div>
    );
}
