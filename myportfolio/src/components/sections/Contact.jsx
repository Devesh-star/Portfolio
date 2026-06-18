import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiSend } from 'react-icons/fi';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signal transmitted:', formData);
    alert('Signal transmitted successfully across the galaxy!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="transmission-section" id="contact">
      <div className="transmission-container">
        
        <div className="console-header">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            DEEP SPACE TRANSMISSION
          </motion.h2>
          <div className="console-status">
            <div className="status-dot"></div>
            <span>COMMS ONLINE - AWAITING SIGNAL</span>
          </div>
        </div>

        <motion.div 
          className="comm-console"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="console-lines"></div>

          <form className="console-form" onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="name">ESTABLISH CONNECTION (NAME)</label>
              <input
                type="text"
                id="name"
                name="name"
                className="console-input"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter identity..."
                required
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="email">TRANSMIT COORDINATES (EMAIL)</label>
              <input
                type="email"
                id="email"
                name="email"
                className="console-input"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter frequency..."
                required
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="message">SEND SIGNAL (MESSAGE)</label>
              <textarea
                id="message"
                name="message"
                className="console-input"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message here..."
                required
              ></textarea>
            </div>

            <div className="launch-btn-container">
              <button type="submit" className="launch-btn">
                <span>INITIATE TRANSMISSION</span>
                <FiSend size={20} />
              </button>
            </div>
          </form>
        </motion.div>

        {/* Cosmic Coordinate Map / Social Satellites */}
        <div className="cosmic-map">
          <div className="map-grid"></div>
          
          <motion.a 
            href="https://github.com/Devesh-star" 
            target="_blank" 
            rel="noreferrer" 
            className="satellite-link sat-github"
            title="GitHub Satellite"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <FiGithub size={24} />
          </motion.a>

          <motion.a 
            href="https://linkedin.com/" 
            target="_blank" 
            rel="noreferrer" 
            className="satellite-link sat-linkedin"
            title="LinkedIn Satellite"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <FiLinkedin size={24} />
          </motion.a>

          <motion.a 
            href="mailto:devesh@example.com" 
            className="satellite-link sat-email"
            title="Email Satellite"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <FiMail size={24} />
          </motion.a>
        </div>

      </div>
    </section>
  );
};

export default Contact;
