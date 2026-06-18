import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
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

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      height: 16,
      width: 16,
      backgroundColor: 'rgba(0, 229, 255, 0.8)',
      mixBlendMode: 'screen',
      transition: {
        type: 'spring',
        mass: 0.1,
        stiffness: 800,
        damping: 30,
      }
    },
    hover: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      height: 64,
      width: 64,
      backgroundColor: 'rgba(124, 58, 237, 0.2)',
      border: '1px solid rgba(0, 229, 255, 0.5)',
      mixBlendMode: 'normal',
      transition: {
        type: 'spring',
        mass: 0.1,
        stiffness: 800,
        damping: 30,
      }
    },
    text: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: 'rgba(124, 58, 237, 0.9)',
      border: '1px solid rgba(0, 229, 255, 0.8)',
      mixBlendMode: 'normal',
      transition: {
        type: 'spring',
        mass: 0.1,
        stiffness: 800,
        damping: 30,
      }
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
        className="custom-cursor-dot"
        variants={variants}
        animate={getVariant()}
      >
        {hoverText && <span className="cursor-text">{hoverText}</span>}
      </motion.div>
      <motion.div 
        className="custom-cursor-trail"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        transition={{
          type: 'spring',
          mass: 0.6,
          stiffness: 400,
          damping: 50,
        }}
      />
    </>
  );
};

export default CustomCursor;
