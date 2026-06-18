import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projects } from '../../constants';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import './Projects.css';

// Pre-defined planet colors for projects
const planetColors = [
  "0, 229, 255",   // Cyan
  "138, 43, 226",  // Deep Violet
  "255, 64, 129",  // Pink
  "255, 171, 0",   // Amber
];

const PlanetProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const isReverse = index % 2 !== 0;
  const colorRgb = planetColors[index % planetColors.length];

  return (
    <motion.div 
      className={`planet-project-card ${isReverse ? 'reverse' : ''}`}
      ref={cardRef}
      style={{ y, opacity, '--planet-color-rgb': colorRgb }}
    >
      {/* The Planet Side */}
      <div className="project-planet-container">
        <div className="project-planet">
          <img src={project.image} alt={project.title} />
        </div>
        <div className="planet-atmosphere"></div>
        <div className="project-energy-ring ring-inner"></div>
        <div className="project-energy-ring ring-outer"></div>
      </div>

      {/* The Data Side */}
      <div className="project-data">
        <div className="project-id">ARCHIVE // 0{index + 1}</div>
        <h3 className="project-name">{project.title}</h3>
        
        <div className="project-description">
          <p>{project.description}</p>
        </div>

        <div className="project-techs">
          {project.tags.map(tag => (
            <span key={tag} className="tech-badge">{tag}</span>
          ))}
        </div>

        <div className="project-actions">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="action-link">
              <FiGithub size={20} /> Repository
            </a>
          )}
          {project.webapp && project.webapp !== '/' && (
            <a href={project.webapp} target="_blank" rel="noreferrer" className="action-link">
              <FiExternalLink size={20} /> Live System
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section className="archive-section container" id="projects">
      <div className="archive-header">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          GALACTIC ARCHIVES
        </motion.h2>
      </div>

      <div className="projects-galaxy">
        {projects.map((project, index) => (
          <PlanetProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
