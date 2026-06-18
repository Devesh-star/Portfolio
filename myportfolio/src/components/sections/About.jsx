import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.165, 0.84, 0.44, 1] }
    }
  };

  return (
    <section className="about-section" id="about">
      <div className="container">
        
        <div className="planet-card-container">
          {/* Energy Waves Behind Planet */}
          <div className="energy-waves">
            <div className="energy-wave wave-1"></div>
            <div className="energy-wave wave-2"></div>
            <div className="energy-wave wave-3"></div>
          </div>

          {/* The Massive Planet Card */}
          <motion.div 
            className="planet-surface"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div className="planet-header" variants={itemVariants}>
              <h2 className="engraved-text">MISSION LOG</h2>
            </motion.div>

            <div className="data-grid">
              {/* Details Column 1 */}
              <motion.div className="data-block" variants={itemVariants}>
                <h3 className="data-title">WHO I AM</h3>
                <p className="data-text engraved-text">
                  I am Devesh Malik, a Full Stack Developer and Cyber Security student from India. 
                  With over a year of hands-on experience, I bridge the gap between design and 
                  engineering, crafting digital experiences that are both visually stunning and 
                  architecturally robust.
                </p>
              </motion.div>

              {/* Details Column 2 */}
              <motion.div className="data-block" variants={itemVariants}>
                <h3 className="data-title">WHAT I BUILD</h3>
                <p className="data-text engraved-text">
                  My focus is on AI-powered web applications and high-performance platforms. 
                  Whether it's building a smart GitHub Debugger, a Resume Builder, or a complete 
                  booking platform like QuickTicket, I prioritize clean code and scalable architecture.
                </p>
              </motion.div>

              {/* Details Column 3 */}
              <motion.div className="data-block wide" variants={itemVariants}>
                <h3 className="data-title">THE VISION</h3>
                <p className="data-text engraved-text">
                  I believe the web should feel alive. By combining technologies like React, Next.js, 
                  and advanced AI models, I strive to create products that don't just 
                  function—they engage, delight, and solve real-world problems elegantly.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default About;
