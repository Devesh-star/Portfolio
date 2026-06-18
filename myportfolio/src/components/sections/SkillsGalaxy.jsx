import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SkillsInfo } from '../../constants';
import './SkillsGalaxy.css';

const getSystemConfig = (title) => {
  switch (title) {
    case 'Frontend': return { label: 'FRONTEND SYSTEMS', id: 'frontend', position: 'top' };
    case 'Backend': return { label: 'BACKEND ENGINE', id: 'backend', position: 'right' };
    case 'Languages': return { label: 'LANGUAGE PROCESSOR', id: 'languages', position: 'left' };
    case 'Tools': return { label: 'MISSION SUPPORT', id: 'tools', position: 'bottom' };
    default: return { label: 'AUXILIARY SYSTEM', id: 'aux', position: 'center' };
  }
};

const StarshipBlueprint = () => {
  const [activeSystem, setActiveSystem] = useState(null);

  // SVG Paths for the spaceship
  const hullPath = "M 500 50 L 600 300 L 950 550 L 800 700 L 650 900 L 350 900 L 200 700 L 50 550 L 400 300 Z";
  
  const connectors = {
    frontend: "M 500 450 L 500 180",
    backend: "M 550 500 L 820 500",
    languages: "M 450 500 L 180 500",
    tools: "M 500 550 L 500 820"
  };

  return (
    <section className="starship-section" id="skills">
      <div className="blueprint-overlay"></div>
      
      <motion.div 
        className="starship-container"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        
        {/* SVG Blueprint Layer */}
        <div className="svg-layer">
          <svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="coreGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8A2BE2" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Main Hull */}
            <motion.path 
              d={hullPath} 
              className="hull-path"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            
            {/* Inner Structural Lines */}
            <motion.path 
              d="M 500 50 L 500 900 M 50 550 L 950 550" 
              className="structural-grid"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
            />

            {/* Connectors */}
            {Object.entries(connectors).map(([id, path]) => (
              <motion.path 
                key={id}
                d={path} 
                className={`connector-line ${activeSystem === id ? 'active' : ''}`}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 1 }}
              />
            ))}
          </svg>
        </div>

        {/* Core Reactor */}
        <div className="core-reactor">
          <div className="core-pulse"></div>
          <div className="core-label">
            <span className="telemetry-text">SYS.CORE.01</span>
            TECHNICAL REACTOR
          </div>
        </div>

        {/* System Modules */}
        {SkillsInfo.map((category) => {
          const { label, id, position } = getSystemConfig(category.title);
          const isActive = activeSystem === id;

          return (
            <div 
              key={id} 
              className={`system-module pos-${position} ${isActive ? 'active' : ''}`}
              onMouseEnter={() => setActiveSystem(id)}
              onMouseLeave={() => setActiveSystem(null)}
            >
              <div className="module-anchor">
                <div className="anchor-point"></div>
                <div className="anchor-label">
                  <span className="telemetry-id">SEC-{id.substring(0, 2).toUpperCase()}</span>
                  <h4>{label}</h4>
                </div>
              </div>

              <div className="skills-hologram">
                <div className="hologram-grid">
                  {category.skills.map(skill => (
                    <div key={skill.name} className="hologram-chip">
                      <img src={skill.logo} alt={skill.name} />
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Micro Telemetry Details */}
        <div className="telemetry top-left">
          COORD: 45.21.99<br/>
          STATUS: ONLINE<br/>
          POWER: 100%
        </div>
        <div className="telemetry bottom-right">
          ENG.VER: 2.0.4<br/>
          FWD.THRUST: NOMINAL
        </div>

      </motion.div>
    </section>
  );
};

export default StarshipBlueprint;
