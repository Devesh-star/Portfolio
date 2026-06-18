import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './HyperspaceTransition.css';

const HyperspaceTransition = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleJump = (e) => {
      const targetId = e.detail.targetId;
      const target = document.getElementById(targetId);
      
      if (!target) return;

      setIsActive(true);

      // Scroll happens instantly while the screen is completely white/flashing
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'auto' });
      }, 450);

      // Wait for the animation to end
      setTimeout(() => {
        setIsActive(false);
      }, 1200);
    };

    window.addEventListener('hyperspace-jump', handleJump);
    return () => window.removeEventListener('hyperspace-jump', handleJump);
  }, []);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div 
          className="hyperspace-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Warp lines shooting from center */}
          <div className="warp-core">
             {[...Array(80)].map((_, i) => (
               <div key={i} className="star-streak" style={{
                 '--angle': `${Math.random() * 360}deg`,
                 '--speed': `${0.3 + Math.random() * 0.4}s`,
                 '--delay': `${Math.random() * 0.1}s`
               }}></div>
             ))}
          </div>
          
          {/* Blinding flash to hide the jump */}
          <div className="warp-flash"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HyperspaceTransition;
