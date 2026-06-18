import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 800, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const trailSpringConfig = { damping: 50, stiffness: 400, mass: 0.6 };
  const trailXSpring = useSpring(cursorX, trailSpringConfig);
  const trailYSpring = useSpring(cursorY, trailSpringConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const updateMousePosition = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      
      // Check if hovering a link, button, or specific actionable element
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
        setHoverText('');
      } else if (target.closest('[data-cursor-text]')) {
        const textElem = target.closest('[data-cursor-text]');
        setIsHovering(true);
        setHoverText(textElem.getAttribute('data-cursor-text'));
      } else {
        setIsHovering(false);
        setHoverText('');
      }
    };

    if (!isMobile) {
      window.addEventListener('mousemove', updateMousePosition);
      window.addEventListener('mouseover', handleMouseOver);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isMobile]);

  if (isMobile) return null;

  const variants = {
    default: {
      height: 16,
      width: 16,
      backgroundColor: 'rgba(0, 229, 255, 0.8)',
      mixBlendMode: 'screen',
      border: '0px solid transparent',
      transition: { type: 'spring', mass: 0.1, stiffness: 800, damping: 30 }
    },
    hover: {
      height: 64,
      width: 64,
      backgroundColor: 'rgba(124, 58, 237, 0.2)',
      border: '1px solid rgba(0, 229, 255, 0.5)',
      mixBlendMode: 'normal',
      transition: { type: 'spring', mass: 0.1, stiffness: 800, damping: 30 }
    },
    text: {
      height: 80,
      width: 80,
      backgroundColor: 'rgba(124, 58, 237, 0.9)',
      border: '1px solid rgba(0, 229, 255, 0.8)',
      mixBlendMode: 'normal',
      transition: { type: 'spring', mass: 0.1, stiffness: 800, damping: 30 }
    }
  };

  const getVariant = () => {
    if (hoverText) return 'text';
    if (isHovering) return 'hover';
    return 'default';
  };

  return (
    <>
      <motion.div
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999
        }}
      >
        <motion.div
          className="custom-cursor-dot"
          variants={variants}
          animate={getVariant()}
          style={{ x: '-50%', y: '-50%' }}
        >
          {hoverText && <span className="cursor-text">{hoverText}</span>}
        </motion.div>
      </motion.div>

      <motion.div 
        style={{
          x: trailXSpring,
          y: trailYSpring,
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9998
        }}
      >
        <div className="custom-cursor-trail" style={{ transform: 'translate(-50%, -50%)' }} />
      </motion.div>
    </>
  );
};

export default CustomCursor;
