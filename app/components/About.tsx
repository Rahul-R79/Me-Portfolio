"use client";

import { motion } from "framer-motion";

export default function About() {
    return (
        <section className="relative flex min-h-screen w-full items-center px-4 md:px-8">
            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 md:grid-cols-2">
                {/* Left Side: Text Content */}
                <div className="flex flex-col justify-center text-left">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl"
                    >
                        Beyond the <span className="text-gray-500">Code.</span>
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-6 text-lg text-white/60 md:text-xl"
                    >
                        <p>
                            I am a self-taught MERN stack developer and active open-source contributor with deep expertise in JavaScript, Node.js, Express, MongoDB, and React. I specialize in architecting dynamic, responsive web applications that are as robust as they are beautiful.
                        </p>
                        <p>
                            Beyond engineering, I bring 1.5 years of experience as a Placement Corporate Coordinator, where I managed students relations and strengthened corporate relations. This unique blend of technical mastery and management proficiency drives me to deliver innovative, real-world solutions.
                        </p>
                    </motion.div>
                </div>

                {/* Right Side: Reserved for 3D Model */}
                <div className="hidden h-full min-h-[500px] w-full items-center justify-center md:flex">
                </div>
            </div>
        </section>
    );
}
