import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import './Certifications.css';

const certifications = [
  {
    id: 1,
    title: "Full Stack Developer",
    issuer: "One Roadmap",
    date: "May 2026",
    credentialUrl: "https://www.oneroadmap.io/skills/fs/certificate/CERT-50C407AA",
    skillsLearned: ["Full Stack Architecture", "Frontend", "Backend", "System Design"],
    x: 10,
    y: 35,
    alignRight: false
  },
  {
    id: 2,
    title: "Network Architecture",
    issuer: "Google / Coursera",
    date: "Mar 2026",
    credentialUrl: "https://coursera.org/verify/Y1381QE1714M",
    skillsLearned: ["Networking Protocols", "Cloud Infrastructure", "Security"],
    x: 28,
    y: 70,
    alignRight: false
  },
  {
    id: 3,
    title: "Introduction to Databases",
    issuer: "Meta / Coursera",
    date: "Mar 2026",
    credentialUrl: "https://coursera.org/verify/BJ84F2MT3RRO",
    skillsLearned: ["SQL", "Relational Databases", "Data Modeling"],
    x: 45,
    y: 25,
    alignRight: false
  },
  {
    id: 4,
    title: "AI Infrastructure & Operational Fundamentals",
    issuer: "Nvidia / Coursera",
    date: "Feb 2026",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/LJNP4N49B2MG",
    skillsLearned: ["GPU Computing", "Data Center Design", "AI Architecture"],
    x: 62,
    y: 65,
    alignRight: true
  },
  {
    id: 5,
    title: "Hands On Mastery Of React Hooks",
    issuer: "Msit / Devtown",
    date: "Jan 2026",
    credentialUrl: "https://www.cert.devtown.in/verify/Z2ieX4q",
    skillsLearned: ["State Management", "Component Lifecycle", "Custom Hooks"],
    x: 80,
    y: 30,
    alignRight: true
  },
  {
    id: 6,
    title: "Programming With Java",
    issuer: "Aws / Coursera",
    date: "Oct 2025",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/TYFB7G8W4UHD",
    skillsLearned: ["Object-Oriented Programming", "Data Structures", "Algorithms"],
    x: 92,
    y: 75,
    alignRight: true
  }
];

const Certifications = () => {
  const [hoveredNode, setHoveredNode] = useState(null);

  // Define SVG lines connecting the stars to form a constellation
  const lines = [
    { start: 1, end: 2 },
    { start: 2, end: 3 },
    { start: 3, end: 4 },
    { start: 4, end: 5 },
    { start: 5, end: 6 }
  ];

  const getCoordinates = (id) => {
    const cert = certifications.find(c => c.id === id);
    return { x: cert.x, y: cert.y };
  };

  return (
    <section className="constellation-section" id="certifications">
      
      <motion.div 
        className="constellation-header"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2>KNOWLEDGE CONSTELLATION</h2>
      </motion.div>

      <div className="sky-map">
        {/* SVG Constellation Lines */}
        <svg className="constellation-lines" width="100%" height="100%">
          {lines.map((line, index) => {
            const startNode = getCoordinates(line.start);
            const endNode = getCoordinates(line.end);
            
            // Check if either connected node is hovered to light up the path
            const isActive = hoveredNode === line.start || hoveredNode === line.end;

            return (
              <motion.line 
                key={index}
                x1={`${startNode.x}%`} 
                y1={`${startNode.y}%`} 
                x2={`${endNode.x}%`} 
                y2={`${endNode.y}%`} 
                className={`star-path ${isActive ? 'active' : ''}`}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: index * 0.5 }}
                viewport={{ once: true }}
              />
            );
          })}
        </svg>

        {/* Constellation Stars (Nodes) */}
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            className={`star-node ${cert.alignRight ? 'align-right' : ''}`}
            style={{ left: `${cert.x}%`, top: `${cert.y}%` }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: index * 0.4 }}
            onMouseEnter={() => setHoveredNode(cert.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div className="star-core"></div>
            <div className="star-pulse"></div>

            {/* Hover Info Panel */}
            <div className="star-info">
              <h3 className="star-title">{cert.title}</h3>
              <div className="star-issuer">{cert.issuer}</div>
              <div className="star-date">{cert.date}</div>
              
              <div className="star-skills">
                {cert.skillsLearned.map(skill => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>

              <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="star-link">
                View Credential <FiExternalLink />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
};

export default Certifications;
