"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Link from "next/link";
import { MouseEvent } from "react";
import { HiArrowRight } from "react-icons/hi";

export default function Hero() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <section
            className="relative flex min-h-screen flex-col items-center justify-end overflow-hidden px-4 pb-12 md:px-8 md:pb-24"
            onMouseMove={handleMouseMove}
        >

            {/* Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.06),
              transparent 80%
            )
          `,
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex max-w-5xl flex-col items-center text-center pointer-events-none">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-md pointer-events-auto"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </span>
                    Available for work
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-6 text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 sm:text-7xl md:text-8xl pointer-events-auto"
                >
                    Software Engineer.
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-10 max-w-2xl text-lg text-white/60 md:text-xl pointer-events-auto"
                >
                    I'm Rahul, a Software Engineer specializing in MERN Stack Development and building full-stack web applications with a focus on performance, scalability, and user experience.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col gap-4 sm:flex-row pointer-events-auto"
                >
                    <Link
                        href="#work"
                        className="group flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition-all hover:bg-white/90 hover:scale-105"
                    >
                        View My Work
                        <HiArrowRight className="transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                        href="#contact"
                        className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10 hover:scale-105"
                    >
                        Contact Me
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
