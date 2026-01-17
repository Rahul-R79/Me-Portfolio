"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ActivityCalendar } from 'react-activity-calendar';
import { FiExternalLink } from 'react-icons/fi';

export default function LeetCodeGraph() {
    const [data, setData] = useState<any>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/api/leetcode-graph');
                const json = await res.json();

                if (json.contributions) {
                    if (json.total !== undefined) setTotal(json.total);

                    const contributions = json.contributions;
                    const today = new Date();
                    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                    const oneYearAgo = new Date();
                    oneYearAgo.setDate(today.getDate() - 365);

                    const fullYearData = [];
                    const contributionMap = new Map(contributions.map((c: any) => [c.date, c]));

                    for (let d = new Date(oneYearAgo); d <= endOfMonth; d.setDate(d.getDate() + 1)) {
                        const dateStr = d.toISOString().split('T')[0];
                        const existing = contributionMap.get(dateStr);

                        if (existing) {
                            fullYearData.push(existing);
                        } else {
                            fullYearData.push({
                                date: dateStr,
                                count: 0,
                                level: 0
                            });
                        }
                    }

                    setData(fullYearData);
                }
            } catch (error) {
                console.error("Failed to fetch LeetCode Graph:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const todayStr = new Date().toISOString().split('T')[0];

    if (loading) {
        return (
            <div className="w-full h-40 flex items-center justify-center border border-white/10 bg-white/5 rounded-2xl animate-pulse">
                <span className="text-gray-500 font-mono text-sm">Loading LeetCode Graph...</span>
            </div>
        );
    }

    return (
        <motion.a
            href="https://leetcode.com/Rahul_dev_LC/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            viewport={{ once: true }}
            className="group relative block w-full overflow-hidden rounded-2xl p-[1px]"
        >
            {/* Moving Gradient Border */}
            <motion.div
                className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(250,204,21,0.6)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%]"
                animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            {/* Static Border Fallback/Base */}
            <div className="absolute inset-0 bg-white/5 rounded-2xl" />

            {/* Inner Content */}
            <div className="relative h-full w-full bg-[#161616] backdrop-blur-md rounded-xl p-6 flex flex-col items-center justify-center overflow-hidden">
                <div className="w-full flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-200 flex items-center gap-2">
                        <span className="text-green-400">⚡</span> LeetCode Activity
                    </h3>
                    <div className="relative">
                        <span className="text-xs text-gray-500 font-mono transition-opacity duration-300 group-hover:opacity-0">{total} submissions in the last year</span>
                        <span className="text-xs text-green-400 font-mono flex items-center gap-1 absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            View LeetCode <FiExternalLink />
                        </span>
                    </div>
                </div>

                <div className="w-full overflow-x-auto custom-scrollbar pb-2">
                    <div className="min-w-fit">
                        <ActivityCalendar
                            data={data}
                            showWeekdayLabels
                            theme={{
                                light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                                dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                            }}
                            showTotalCount={false}
                            maxLevel={4}
                            blockSize={10}
                            blockMargin={4}
                            fontSize={12}
                            style={{ color: '#9ca3af' }}
                            renderBlock={(block, activity) => {
                                if (activity.date > todayStr) {
                                    return <g style={{ opacity: 0 }}>{block}</g>;
                                }
                                return block;
                            }}
                        />
                    </div>
                </div>
            </div>
        </motion.a>
    );
}
