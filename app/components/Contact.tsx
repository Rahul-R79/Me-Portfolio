"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { FiMail, FiLinkedin, FiGithub, FiArrowRight } from "react-icons/fi";
import emailjs from '@emailjs/browser';

export default function Contact() {
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState("");

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        if (!formRef.current) return;

        emailjs
            .sendForm(
                process.env.NEXT_PUBLIC_SERVICE_ID || '',
                process.env.NEXT_PUBLIC_TEMPLATE_ID || '',
                formRef.current,
                {
                    publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY || '',
                }
            )
            .then(
                () => {
                    setIsSubmitting(false);
                    setIsSent(true);
                    if (formRef.current) formRef.current.reset();
                    setTimeout(() => setIsSent(false), 5000);
                    alert("Message sent successfully!");
                },
                (error) => {
                    console.error('FAILED...', error.text);
                    setIsSubmitting(false);
                    setError("Failed to send message. Please try again.");
                },
            );
    };

    return (
        <section className="relative bg-white text-black pt-32 pb-24 px-4 md:px-8 overflow-hidden" id="contact">
            {/* Wave Transition from Dark to White */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[150px] fill-black">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
                {/* Left Column: Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            Let's work <br /> <span className="text-gray-400">together.</span>
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                            I'm always open to discussing product design work or partnership opportunities. Let's create something meaningful.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <a href="mailto:rahul.devworks@gmail.com" className="flex items-center gap-4 text-xl font-medium hover:text-gray-600 transition-colors group">
                            <div className="p-4 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors">
                                <FiMail className="w-6 h-6" />
                            </div>
                            <span>rahul.devworks@gmail.com</span>
                        </a>
                        <div className="flex gap-4 pt-4">
                            <a href="https://linkedin.com/in/rahulqwe" target="_blank" rel="noopener noreferrer" className="p-4 bg-gray-100 rounded-full hover:bg-black hover:text-white transition-all duration-300">
                                <FiLinkedin className="w-6 h-6" />
                            </a>
                            <a href="https://github.com/Rahul-R79" target="_blank" rel="noopener noreferrer" className="p-4 bg-gray-100 rounded-full hover:bg-black hover:text-white transition-all duration-300">
                                <FiGithub className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Contact Form */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <form ref={formRef} onSubmit={sendEmail} className="space-y-6 bg-gray-50 p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="user_name" className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Name</label>
                                <input
                                    type="text"
                                    id="user_name"
                                    name="user_name"
                                    required
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="user_email" className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Email</label>
                                <input
                                    type="email"
                                    id="user_email"
                                    name="user_email"
                                    required
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                required
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                                placeholder="Project Proposal"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={4}
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all resize-none"
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-black text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {isSent ? "Message Sent!" : isSubmitting ? "Sending..." : "Send Message"}
                                {!isSent && !isSubmitting && <FiArrowRight className="group-hover:translate-x-1 transition-transform" />}
                            </span>
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
