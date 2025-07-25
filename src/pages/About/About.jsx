import { motion } from "framer-motion";
import React from 'react';
import './About.scss';

const About = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1>About Us</h1>
        <p>We are more than just a brand; we are a story, a journey, and a commitment to quality and passion.</p>
      </header>

      <section className="about-section mission-section">
        <h2>Our Mission</h2>
        <p>To create timeless pieces that resonate with your individuality and elevate your everyday style. We believe in craftsmanship, sustainability, and designs that speak volumes without saying a word.</p>
      </section>

      <section className="about-section values-section">
        <h2>Our Values</h2>
        <ul>
          <li><strong>Quality:</strong> Every stitch, every fabric, every detail is meticulously chosen and crafted.</li>
          <li><strong>Sustainability:</strong> We are committed to ethical sourcing and environmentally conscious practices.</li>
          <li><strong>Innovation:</strong> Pushing boundaries in design and functionality.</li>
          <li><strong>Community:</strong> Building connections and fostering a sense of belonging.</li>
        </ul>
      </section>

      <section className="about-section story-section">
        <h2>Our Story</h2>
        <p>Born from a passion for unique aesthetics and a desire to offer something truly special, our journey began with a simple idea: to blend classic elegance with contemporary flair. From humble beginnings, we've grown into a brand cherished by those who appreciate the finer things in life.</p>
        <p>We invite you to be a part of our story, to wear our creations, and to experience the dedication woven into every fiber.</p>
      </section>

      <section className="about-section team-section">
        <h2>Meet the Team</h2>
        <div className="team-member">
          <h3>Jane Doe</h3>
          <p>Founder & Creative Director</p>
          <p>Jane's vision and artistic eye are the heart of our brand. With years of experience in fashion and design, she leads our creative endeavors.</p>
        </div>
        <div className="team-member">
          <h3>John Smith</h3>
          <p>Head of Operations</p>
          <p>John ensures that every aspect of our production and delivery runs smoothly, maintaining our high standards of efficiency and quality.</p>
        </div>
      </section>

      <footer className="about-footer">
        <p>&copy; 2023 Your Brand Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
