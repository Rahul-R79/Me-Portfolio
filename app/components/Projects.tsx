"use client";

import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef, useState } from "react";

const projects = [
    {
        id: 1,
        title: "n8n Automated Lead Management System",
        description: "A robust full-stack solution designed to capture, manage, and automate lead processing. This project integrates a React frontend with a Node.js backend and leverages n8n workflows for advanced automation tasks like data syncing (Google Sheets) and notifications (Discord & Email).",
        tech: ["n8n", "TypeScript", "Tailwind", "React", "Node.js"],
        image: "/images/project-sliding-images/1.png",
        github: "https://github.com/Rahul-R79/n8n-Automated-Lead-Management-System",
        demo: "https://n8n-automated-lead-management-syste.vercel.app/"
    },
    {
        id: 2,
        title: "Porticade Builders",
        description: "Developed a high-performance corporate website for a leading construction firm in Kerala. The platform showcases their portfolio, services, and expertise through a modern, responsive design that enhances brand trust and client engagement.",
        tech: ["React", "Tailwind", "EmailJS", "Framer Motion"],
        image: "/images/project-sliding-images/2.png",
        github: "https://github.com/Rahul-R79/Porticade-Builders",
        demo: "https://porticadebuilders.com/"
    },
    {
        id: 3,
        title: "Dev Blogs",
        description: "A scalable microservices-based blogging platform architected with gRPC for efficient inter-service communication. Containerized with Docker and orchestrated for high availability, demonstrating advanced backend patterns.",
        tech: ["Node.js", "gRPC", "Docker", "Microservices", "TypeScript", "React", "Tailwind", "Nginx", "Kubernetes", "Prisma"],
        image: "/images/project-sliding-images/3.png",
        github: "#",
        demo: "https://blog-v1-dev.vercel.app/"
    },
    {
        id: 4,
        title: "UpsideDown",
        description: "A visually immersive Stranger Things inspired web experience featuring an interactive 'flashlight' reveal effect. Move your cursor to explore the Upside Down and reveal the true face of Vecna.",
        tech: ["html", "tailwind", "javascript"],
        image: "/images/project-sliding-images/4.png",
        github: "https://github.com/Rahul-R79/UpsideDown",
        demo: "https://rahul-r79.github.io/UpsideDown/"
    },
    {
        id: 5,
        title: "FoodSnap AI",
        description: "FoodSnap AI is a smart nutrition tracking application that leverages artificial intelligence to analyze food images, identify dishes, and estimate their nutritional content.",
        tech: ["gemini", "tailwind", "react", "node.js", "mongodb", "typescript", "edamam food api"],
        image: "/images/project-sliding-images/5.png",
        github: "https://github.com/Rahul-R79/foodsnap-ai",
        demo: "https://foodsnap-ai-five.vercel.app/"
    },
    {
        id: 6,
        title: "The C.L.A.U.S. Console",
        description: "The C.L.A.U.S. Console (Command Logic & Authorized User System) is the comprehensive digital transformation initiative for toy logistics (Hackathon Project).",
        tech: ["google model viewer", "tailwind", "react", "node.js", "firebase", "typescript", "three.js", "gemini", "tripo AI", "framer motion"],
        image: "/images/project-sliding-images/6.png",
        github: "https://github.com/Rahul-R79/The-C.L.A.U.S.-Console",
        demo: "https://claus-console.vercel.app/"
    },
    {
        id: 7,
        title: "FlowWell",
        description: "FlowWell is a comprehensive workflow management platform that streamlines project planning, execution, and monitoring.",
        tech: ["bootstrap", "javascript", "react", "node.js", "mongodb", "hugging face", "framer motion"],
        image: "/images/project-sliding-images/7.png",
        github: "https://github.com/Rahul-R79/FlowWell---The-Period-Care",
        demo: "https://flow-well-the-period-care.vercel.app/"
    }
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10"
        >
            {/* Spotlight Gradient */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                          650px circle at ${mouseX}px ${mouseY}px,
                          rgba(255,255,255,0.15),
                          transparent 80%
                        )
                    `,
                }}
            />

            <div className="relative h-48 w-full overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                <p className="mb-4 text-sm text-gray-400 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t) => (
                        <span key={t} className="text-xs font-mono text-gray-500">#{t}</span>
                    ))}
                </div>

                {/* links */}
                <div className="flex gap-4 mt-auto">
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-white"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        GitHub
                    </a>
                    <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-white/10 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Live Demo
                    </a>
                </div>
            </div>
        </motion.div>
    );
}


export default function Projects() {
    const targetRef = useRef<HTMLDivElement>(null);
    const [visibleCount, setVisibleCount] = useState(6);
    const showMore = () => setVisibleCount(prev => prev + 6);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Horizontal Scroll Logic
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-90%"]);

    // Parallax Background Text 
    const bgTextX = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    // Floating Elements 
    const badgeX1 = useTransform(scrollYProgress, [0, 1], ["120%", "-20%"]);
    const badgeX2 = useTransform(scrollYProgress, [0, 1], ["100%", "-80%"]);
    const badgeX3 = useTransform(scrollYProgress, [0, 1], ["-20%", "120%"]);
    const badgeRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

    return (
        <section id="work" className="text-white">
            {/* Part 1: Horizontal Scroll Showcase */}
            <div ref={targetRef} className="relative h-[300vh] bg-[var(--foreground)]">
                <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                    {/* Parallax Background Text */}
                    <motion.div
                        style={{ x: bgTextX }}
                        className="absolute inset-0 flex items-center justify-center opacity-5 select-none pointer-events-none"
                    >
                        <h1 className="text-[20vw] font-black tracking-tighter text-black whitespace-nowrap">
                            PROJECTS
                        </h1>
                    </motion.div>

                    {/* Floating SVGs */}
                    <motion.div
                        style={{ x: badgeX1, y: -150, rotate: -10 }}
                        className="absolute z-20 top-1/2 left-[5%] top-[30%]"
                    >
                        <img
                            src="/images/project-sliding-svg/tv.svg"
                            alt="Retro TV"
                            className="w-30 md:w-32 lg:w-40 drop-shadow-2xl opacity-90"
                        />
                    </motion.div>

                    <motion.div
                        style={{ x: badgeX2, y: 250, rotate: badgeRotate }}
                        className="absolute z-20 top-1/2 left-[60%]"
                    >
                        <img
                            src="/images/project-sliding-svg/disk.svg"
                            alt="Disk"
                            className="w-30 md:w-28 lg:w-36 drop-shadow-2xl opacity-90"
                        />
                    </motion.div>

                    <motion.div
                        style={{ x: badgeX3, y: -250, rotate: 15 }}
                        className="absolute z-20 top-1/2 left-[50%] top-[85%] md:top-[50%] md:left-[70%]"
                    >
                        <img
                            src="/images/project-sliding-svg/circle.svg"
                            alt="Circle"
                            className="w-25 md:w-20 lg:w-24 drop-shadow-xl opacity-40 md:opacity-80"
                        />
                    </motion.div>

                    <motion.div style={{ x }} className="relative z-10 flex gap-6 md:gap-16 lg:gap-32 px-4 md:px-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{
                                    opacity: 0,
                                    y: index % 2 === 0 ? -100 : 100,
                                    rotate: index % 2 === 0 ? 15 : -15
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    rotate: 0
                                }}
                                transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                                viewport={{ margin: "-100px" }} 
                                className="relative h-[250px] w-[85vw] shrink-0 overflow-hidden rounded-3xl border border-white/20 bg-gray-900/5 shadow-2xl backdrop-blur-sm transition-transform hover:scale-105 md:h-[300px] md:w-[450px] lg:h-[380px] lg:w-[600px]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100 z-10" />
                                <div className="absolute inset-0 z-20 pixel-mesh opacity-40" />

                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="h-full w-full object-cover"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Part 2: Project Grid (Detailed View) */}
            <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 md:px-8">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">Project Gallery</h2>
                    <p className="mt-4 text-lg text-gray-400">Deep dive into my technical case studies.</p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {projects.slice(0, visibleCount).map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>

                {visibleCount < projects.length && (
                    <div className="mt-16 flex justify-center">
                        <button
                            onClick={showMore}
                            className="group relative px-8 py-3 rounded-full bg-white text-black font-bold text-lg transition-transform hover:scale-105 active:scale-95"
                        >
                            Show More
                            <span className="absolute inset-0 -z-10 rounded-full bg-purple-500 blur-lg opacity-0 transition-opacity group-hover:opacity-50" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
