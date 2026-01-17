"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";
import { SiLeetcode } from "react-icons/si";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md"
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
                {/* name */}
                <Link href="/" className="text-xl font-bold tracking-tight text-white">
                    Rahul.
                </Link>

                {/* Desktop Links */}
                <div className="hidden items-center gap-8 md:flex">
                    <Link
                        href="#home"
                        className="text-sm font-medium text-white/70 transition-colors hover:text-white"
                    >
                        Home
                    </Link>
                    <Link
                        href="#skills"
                        className="text-sm font-medium text-white/70 transition-colors hover:text-white"
                    >
                        Skills
                    </Link>
                    <Link
                        href="#work"
                        className="text-sm font-medium text-white/70 transition-colors hover:text-white"
                    >
                        Work
                    </Link>
                    <Link
                        href="#contact"
                        className="text-sm font-medium text-white/70 transition-colors hover:text-white"
                    >
                        Contact
                    </Link>
                </div>

                {/* Social */}
                <div className="flex items-center gap-4">
                    <a
                        href="https://github.com/Rahul-R79"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/70 transition-colors hover:text-white"
                        aria-label="GitHub"
                    >
                        <FaGithub size={20} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/rahulqwe"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/70 transition-colors hover:text-white"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin size={20} />
                    </a>
                    <a
                        href="https://leetcode.com/Rahul_dev_LC/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/70 transition-colors hover:text-white"
                        aria-label="LeetCode"
                    >
                        <SiLeetcode size={20} />
                    </a>
                    <a
                        href="/Rahul_Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/70 transition-colors hover:text-white"
                        aria-label="Resume"
                    >
                        <HiDocumentText size={22} />
                    </a>
                </div>
            </div>
        </motion.nav>
    );
}
