import React, { useEffect } from 'react';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import CosmicBackground from './components/WebGLBackground';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import StarshipBlueprint from './components/sections/SkillsGalaxy';
import Projects from './components/sections/Projects';
import Timeline from './components/sections/Timeline';
import Certifications from './components/sections/Certifications';
import Contact from './components/sections/Contact';

function App() {
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches || ('ontouchstart' in window);
    
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <CosmicBackground />
      <Navbar />

      <main style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        <About />
        <StarshipBlueprint />
        <Certifications />
        <Projects />
        <Timeline />
        <Contact />
      </main>

      <footer style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-tertiary)', fontSize: '0.9rem' }}>
        <p>© {new Date().getFullYear()} Devesh Malik. The Developer Galaxy Mission.</p>
      </footer>
    </>
  );
}

export default App;
