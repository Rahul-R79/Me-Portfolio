"use client";

import Scene from "./components/Scene";
import Hero from "./components/Hero";
import About from "./components/About";

export default function Home() {
  return (
    <main>
      <Scene>
        <Hero />
        <div className="h-screen" /> {/* Space for scroll transition */}
        <About />
      </Scene>
    </main>
  );
}
