import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import profilePic from '../../assets/Profile_pic.png';
import './Hero.css';

const Hero = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Scroll parallax for left side
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // 3D Tilt Logic for Profile Frame
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }
    }
  };

  return (
    <section className="hero-section" ref={containerRef}>
      <div className="container hero-container">
        {/* Left Side: Massive Typography */}
        <motion.div
          className="hero-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y: isMobile ? 0 : y1, opacity }}
        >
          <motion.span variants={itemVariants} className="hero-greeting">
            HELLO, I'M DEVESH MALIK
          </motion.span>

          <motion.h1 variants={itemVariants} className="hero-title">
            BUILDING <br />
            <span className="text-gradient-primary">DIGITAL</span> <br />
            EXPERIENCES
          </motion.h1>

          <motion.div variants={itemVariants} className="hero-roles">
            <div className="role-item">
              <span className="role-highlight">FULL STACK ENGINEER</span>
            </div>
            <div className="role-item">
              <span>CYBER SECURITY STUDENT</span>
            </div>
            <div className="role-item">
              <span>AI BUILDER</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="hero-cta">
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-primary">
              <span className="btn-content">VIEW RESUME</span>
            </a>
            <a 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="btn-secondary"
            >
              <span className="btn-content">INITIATE COMMS</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side: Holographic Profile Frame */}
        <motion.div
          className="hero-right"
          style={{ y: isMobile ? 0 : y2, opacity, perspective: 1000 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        >
          <motion.div 
            className="hologram-profile-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            <div className="hologram-frame">
              <img src={profilePic} alt="Devesh Malik" className="hologram-img" />
              
              {/* Aesthetic Overlay Elements */}
              <div className="scanline"></div>
              <div className="corner-bracket top-left"></div>
              <div className="corner-bracket top-right"></div>
              <div className="corner-bracket bottom-left"></div>
              <div className="corner-bracket bottom-right"></div>
              <div className="frame-glow"></div>
            </div>
            
            {/* Floating 3D Telemetry UI */}
            <div className="floating-badge badge-top" style={{ transform: "translateZ(60px)" }}>
              ID: DEV-01
            </div>
            <div className="floating-badge badge-bottom" style={{ transform: "translateZ(90px)" }}>
              STATUS: ONLINE
            </div>
            
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
