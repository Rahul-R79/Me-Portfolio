"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const skillsData = [
    {
        category: "Frontend",
        items: [
            "HTML", "CSS", "SCSS", "Tailwind", "Bootstrap",
            "JavaScript", "TypeScript", "React", "Next.js", "Redux",
            "Three.js", "Framer Motion", "EJS", "Figma",
        ]
    },
    {
        category: "Backend",
        items: [
            "Node.js", "Express.js", "Fastify", "REST API",
            "gRPC", "Microservices", "Passport", "JWT", "WebSockets", "Firebase"
        ]
    },
    {
        category: "Database",
        items: [
            "MongoDB", "PostgreSQL", "Redis", "Prisma",
        ]
    },
    {
        category: "DevOps & Cloud",
        items: [
            "Docker", "Kubernetes", "AWS EC2", "Nginx", "CI/CD",
            "Vercel", "Render", "Buf"
        ]
    },
    {
        category: "Gen AI & Tools",
        items: [
            "OpenAI", "Gemini", "Hugging Face", "Cursor",
            "GitHub", "Postman", "n8n", "Canva"
        ]
    },
    {
        category: "Architecture & Design",
        items: [
            "Data Structures (DSA)", "OOP", "System Design",
            "MVC", "Clean Architecture", "SOLID Principles",
            "Hexagonal Architecture", "Repository Pattern", "SEO"
        ]
    }
];

export default function Skills() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

    //skills icons animation Row 1: Moves Right
    const x1Raw = useTransform(scrollYProgress, [0, 1], [-100, 100]);
    const x1 = useSpring(x1Raw, springConfig);

    // Row 2: Moves Left
    const x2Raw = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const x2 = useSpring(x2Raw, springConfig);

    // Row 3: Moves Right
    const x3Raw = useTransform(scrollYProgress, [0, 1], [-100, 100]);
    const x3 = useSpring(x3Raw, springConfig);

    // Row 4: Moves Left
    const x4Raw = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const x4 = useSpring(x4Raw, springConfig);

    // Row 5: Moves Right
    const x5Raw = useTransform(scrollYProgress, [0, 1], [-100, 100]);
    const x5 = useSpring(x5Raw, springConfig);

    return (
        <section className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-white px-4 py-24 text-black md:px-8 snap-start" id="skills">

            {/* Parallax Background Icons */}
            <div ref={containerRef} className="absolute inset-x-0 bottom-0 top-24 md:top-40 z-0 flex flex-col justify-between md:justify-center gap-0 md:gap-20 py-20 md:py-20 opacity-20 pointer-events-none">
                {/* Row 1 */}
                <motion.div style={{ x: x1 }} className="flex gap-8 md:gap-12 whitespace-nowrap">
                    {["html", "css", "js", "ts", "react", "nextjs"].map((slug) => (
                        <img
                            key={slug}
                            src={`https://skillicons.dev/icons?i=${slug}`}
                            alt={slug}
                            className="h-16 w-16 md:h-24 md:w-24 object-contain"
                        />
                    ))}
                    {["html", "css", "js", "ts", "react", "nextjs"].map((slug) => (
                        <img
                            key={`dup-${slug}`}
                            src={`https://skillicons.dev/icons?i=${slug}`}
                            alt={slug}
                            className="h-24 w-24 object-contain"
                        />
                    ))}
                </motion.div>

                {/* Row 2 */}
                <motion.div style={{ x: x2 }} className="flex gap-8 md:gap-12 whitespace-nowrap">
                    {["tailwind", "bootstrap", "sass", "figma", "threejs"].map((slug) => (
                        <img
                            key={slug}
                            src={`https://skillicons.dev/icons?i=${slug}`}
                            alt={slug}
                            className="h-24 w-24 object-contain"
                        />
                    ))}
                    {["tailwind", "bootstrap", "sass", "figma", "threejs"].map((slug) => (
                        <img
                            key={`dup-${slug}`}
                            src={`https://skillicons.dev/icons?i=${slug}`}
                            alt={slug}
                            className="h-24 w-24 object-contain"
                        />
                    ))}
                </motion.div>

                {/* Row 3 */}
                <motion.div style={{ x: x3 }} className="flex gap-8 md:gap-12 whitespace-nowrap">
                    {["nodejs", "express", "mongodb", "postgres", "redis", "firebase"].map((slug) => (
                        <img
                            key={slug}
                            src={`https://skillicons.dev/icons?i=${slug}`}
                            alt={slug}
                            className="h-24 w-24 object-contain"
                        />
                    ))}
                    {["nodejs", "express", "mongodb", "postgres", "redis", "firebase"].map((slug) => (
                        <img
                            key={`dup-${slug}`}
                            src={`https://skillicons.dev/icons?i=${slug}`}
                            alt={slug}
                            className="h-24 w-24 object-contain"
                        />
                    ))}
                </motion.div>

                {/* Row 4 */}
                <motion.div style={{ x: x4 }} className="flex gap-8 md:gap-12 whitespace-nowrap self-end pr-8 md:pr-12">
                    {["docker", "kubernetes", "aws", "nginx", "git", "github", "vercel"].map((slug) => (
                        <img
                            key={slug}
                            src={`https://skillicons.dev/icons?i=${slug}`}
                            alt={slug}
                            className="h-24 w-24 object-contain"
                        />
                    ))}
                </motion.div>

                {/* Row 5 */}
                <motion.div style={{ x: x5 }} className="flex gap-8 md:gap-12 whitespace-nowrap">
                    {["python", "java", "cpp", "linux", "vscode", "vite", "graphql"].map((slug) => (
                        <img
                            key={slug}
                            src={`https://skillicons.dev/icons?i=${slug}`}
                            alt={slug}
                            className="h-24 w-24 object-contain"
                        />
                    ))}
                    {["python", "java", "cpp", "linux", "vscode", "vite", "graphql"].map((slug) => (
                        <img
                            key={`dup-${slug}`}
                            src={`https://skillicons.dev/icons?i=${slug}`}
                            alt={slug}
                            className="h-24 w-24 object-contain"
                        />
                    ))}
                </motion.div>
            </div>

            {/* Header */}
            <div className="relative z-10 mx-auto mb-32 md:mb-48 w-full max-w-6xl text-left">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold tracking-tight sm:text-6xl "
                >
                    Technical <span className="text-gray-400">Skills.</span>
                </motion.h2>
            </div>

            {/* Skills Grid */}
            <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {skillsData.map((section, index) => (
                    <motion.div
                        key={section.category}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex flex-col gap-4 backdrop-blur-sm bg-white/50 p-6 rounded-2xl border border-white/20 shadow-sm"
                    >
                        <h3 className="text-2xl font-semibold">{section.category}</h3>
                        <div className="flex flex-wrap gap-2">
                            {section.items.map((skill) => (
                                <span
                                    key={skill}
                                    className="rounded-full border border-black/10 bg-white px-3 py-1 text-sm font-medium text-black/80 transition-colors hover:bg-black hover:text-white"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
