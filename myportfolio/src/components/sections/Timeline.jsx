import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { education } from '../../constants';
import './Timeline.css';

const SupernovaNode = ({ item, index, isLast }) => {
  const nodeRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: nodeRef,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  
  // Assuming earlier education items are fully complete/active if they are scrolled into view
  const isActive = useTransform(scrollYProgress, pos => pos > 0.8);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      className={`supernova-node ${isEven ? 'left' : 'right'}`}
      ref={nodeRef}
      style={{ opacity, scale, y }}
    >
      {/* The Central Star */}
      <motion.div 
        className="supernova-core"
        style={{
          boxShadow: isActive ? "0 0 30px #00E5FF, 0 0 60px #8A2BE2" : "none",
          backgroundColor: isActive ? "#fff" : "#000",
          borderColor: isActive ? "#00E5FF" : "#333"
        }}
      ></motion.div>

      {/* Content Box */}
      <div className="supernova-content">
        <div className="milestone-date">{item.date}</div>
        <h3 className="school-name">{item.school}</h3>
        <h4 className="degree-name">{item.degree}</h4>
        <p className="milestone-desc">{item.desc}</p>
        {item.grade && <div className="milestone-grade">Grade: {item.grade}</div>}
      </div>
    </motion.div>
  );
};

const Timeline = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const glowHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="supernova-section container" id="education" ref={containerRef}>
      
      <motion.div 
        className="supernova-header"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2>TIMELINE OF STARS</h2>
      </motion.div>

      <div className="timeline-cosmos">
        {/* The Glowing Path */}
        <div className="cosmic-path-container">
          <motion.div className="cosmic-path-glow" style={{ height: glowHeight }}></motion.div>
        </div>

        {/* Supernova Nodes */}
        {education.map((item, index) => (
          <SupernovaNode 
            key={item.id} 
            item={item} 
            index={index} 
            isLast={index === education.length - 1} 
          />
        ))}
      </div>

    </section>
  );
};

export default Timeline;
