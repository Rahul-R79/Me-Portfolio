"use client";

import { useState, useEffect } from "react";
import { Syne } from "next/font/google";
import { motion } from "framer-motion";

const syne = Syne({
    subsets: ["latin"],
    weight: ["800"],
    variable: "--font-syne",
});

interface CustomLoaderProps {
    isLoaded: boolean;
    progress: number;
    onComplete?: () => void;
}

export default function CustomLoader({ isLoaded, progress, onComplete }: CustomLoaderProps) {
    const [localProgress, setLocalProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let startTime: number | null = null;
        let animationFrameId: number;
        const duration = 7000; 

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progressTime = timestamp - startTime;

            const t = Math.min(progressTime / duration, 1);

            const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

            const currentProgress = ease * 100;

            setLocalProgress(currentProgress);

            if (t < 1) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                setLocalProgress(100);
                setIsComplete(true);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const shouldExit = isLoaded && isComplete;

    useEffect(() => {
        if (shouldExit && onComplete) {
            onComplete();
        }
    }, [shouldExit, onComplete]);

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-700 ${shouldExit ? "opacity-0 pointer-events-none delay-500" : "opacity-100 pointer-events-auto"
                }`}
        >
            <motion.div
                className={`relative flex flex-col items-center justify-center w-full max-w-5xl px-4 ${syne.className}`}
                initial={{ scale: 1 }}
                animate={
                    shouldExit
                        ? { scale: 50, opacity: 0 }
                        : { scale: 1, opacity: 1 }
                }
                transition={
                    shouldExit
                        ? { duration: 2.5, ease: "easeInOut" }
                        : { duration: 0 }
                }
            >
                <div className="relative w-full aspect-[600/130]">
                    <svg className="w-full h-full" viewBox="0 0 600 130">
                        <defs>
                            {/* Define the text mask */}
                            <pattern id="water" width=".25" height="1.1" patternContentUnits="objectBoundingBox">
                                <path fill="#fff" d="M0.25,1H0c0,0,0-0.659,0-0.916c0.083-0.303,0.158,0.334,0.25,0C0.25,0.327,0.25,1,0.25,1z" />
                            </pattern>

                            {/* Complex Wave Path */}
                            <clipPath id="text-mask">
                                <text x="50%" y="54%" dy=".35em" textAnchor="middle" className="font-extrabold uppercase" fontSize="90">
                                    Rahul
                                </text>
                            </clipPath>
                        </defs>

                        {/* Background Text */}
                        <text x="50%" y="54%" dy=".35em" textAnchor="middle" className="font-extrabold uppercase fill-[#1a1a1a]" fontSize="90">
                            Rahul
                        </text>

                        {/* Clean SVG Wave */}
                        <g clipPath="url(#text-mask)">
                            {/* The rising liquid level */}
                            <motion.g
                                animate={{ y: -(localProgress * 1.2) }}
                                transition={{ duration: 0, ease: "linear" }}
                            >
                                <motion.path
                                    fill="#fff"
                                    d="M0,110 C200,130 400,90 600,110 C800,130 1000,90 1200,110 L1200,300 L0,300 Z"
                                    animate={{ x: [-600, 0] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 7,
                                        ease: "linear",
                                    }}
                                    y="0"
                                />
                            </motion.g>
                        </g>
                    </svg>
                </div>

                {/* Percentage Loading Text */}
                <motion.p
                    className="mt-8 font-sans text-sm font-medium text-white/50"
                    animate={shouldExit ? { opacity: 0 } : { opacity: 1 }}
                >
                    Loading {Math.round(localProgress)}%
                </motion.p>
            </motion.div>
        </div>
    );
}
