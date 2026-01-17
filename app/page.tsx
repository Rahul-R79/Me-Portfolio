"use client";

import Scene from "./components/Scene";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main>
      <Scene>
        <Hero />
        <div className="h-screen" /> {/* Space for scroll transition */}
        <About />
      </Scene>
      <Skills />
      <Projects />
      <Achievements />
      <Contact />
    </main>
  );
}
