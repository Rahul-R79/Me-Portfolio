"use client";

import { motion, useMotionValue, useSpring, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";

export default function Cursor() {
    const [hovered, setHovered] = useState(false);
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - 16);
            mouseY.set(e.clientY - 16);
        };

        const handleHoverStart = () => setHovered(true);
        const handleHoverEnd = () => setHovered(false);

        window.addEventListener("mousemove", moveCursor);

        // Attach listeners to all clickable elements
        const clickables = document.querySelectorAll("a, button");
        clickables.forEach((el) => {
            el.addEventListener("mouseenter", handleHoverStart);
            el.addEventListener("mouseleave", handleHoverEnd);
        });

        // Observer for dynamic content (like if new buttons appear)
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node instanceof HTMLElement) {
                        const newClickables = node.querySelectorAll("a, button");
                        newClickables.forEach((el) => {
                            el.addEventListener("mouseenter", handleHoverStart);
                            el.addEventListener("mouseleave", handleHoverEnd);
                        });
                    }
                });
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            clickables.forEach((el) => {
                el.removeEventListener("mouseenter", handleHoverStart);
                el.removeEventListener("mouseleave", handleHoverEnd);
            });
            observer.disconnect();
        };
    }, [mouseX, mouseY]);

    return (
        <>
            {/* Dot Cursor */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-2 w-2 rounded-full bg-white mix-blend-difference md:block" // Hidden on mobile
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: 12, 
                    translateY: 12, 
                }}
            />

            {/* Trailing Ring */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[9998] hidden h-8 w-8 rounded-full border border-white mix-blend-difference md:block" // Hidden on mobile
                style={{
                    x: springX,
                    y: springY,
                }}
                animate={{
                    scale: hovered ? 2 : 1,
                    opacity: hovered ? 0.5 : 1,
                }}
                transition={{ duration: 0.15 }}
            />
        </>
    );
}
