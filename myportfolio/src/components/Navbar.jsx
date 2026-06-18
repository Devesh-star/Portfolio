import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Compress navbar on scroll
  const navWidthRaw = useTransform(scrollY, [0, 100], ['100%', '85%']);
  const navBorderRadiusRaw = useTransform(scrollY, [0, 100], ['0px', '24px']);
  const navTopRaw = useTransform(scrollY, [0, 100], ['0px', '24px']);

  // Apply spring physics for buttery smooth expansion/compression
  const navWidth = useSpring(navWidthRaw, { stiffness: 400, damping: 40 });
  const navBorderRadius = useSpring(navBorderRadiusRaw, { stiffness: 400, damping: 40 });
  const navTop = useSpring(navTopRaw, { stiffness: 400, damping: 40 });

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      className="navbar-wrapper"
      style={{
        width: navWidth,
        borderRadius: navBorderRadius,
        top: navTop,
      }}
    >
      <nav className={`navbar glass-panel ${isScrolled ? 'scrolled glow-border' : ''}`}>
        <div className="nav-brand">
          <span className="brand-text" data-cursor-text="HOME">DM</span>
        </div>
        
        <div className="nav-links">
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')} data-cursor-text="ABOUT">About Intel</a>
          <a href="#skills" onClick={(e) => handleNavClick(e, 'skills')} data-cursor-text="SKILLS">Skill Systems</a>
          <a href="#certifications" onClick={(e) => handleNavClick(e, 'certifications')} data-cursor-text="CERTS">Certifications</a>
          <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} data-cursor-text="WORK">Project Archives</a>
          <a href="#education" onClick={(e) => handleNavClick(e, 'education')} data-cursor-text="EDU">Timeline</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} data-cursor-text="CONTACT">Contact Comms</a>
        </div>

        <div className="nav-status">
          <div className="status-indicator"></div>
          <span>Systems Online</span>
        </div>

        <button 
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-menu-overlay glass-panel"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-nav-links">
              <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About Intel</a>
              <a href="#skills" onClick={(e) => handleNavClick(e, 'skills')}>Skill Systems</a>
              <a href="#certifications" onClick={(e) => handleNavClick(e, 'certifications')}>Certifications</a>
              <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')}>Project Archives</a>
              <a href="#education" onClick={(e) => handleNavClick(e, 'education')}>Timeline</a>
              <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact Comms</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;