import React, { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Contact.scss";

const Contact = () => {
  const contactRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = gsap.utils.toArray(
      ".contact-hero, .contact-details, .contact-form-section, .contact-map"
    );

    sections.forEach((section, index) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            // markers: true, // For debugging
          },
        }
      );
    });

    // Animation for individual elements within contact-details
    gsap.utils.toArray(".detail-item").forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2, // Stagger effect
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Animation for form elements
    gsap.utils
      .toArray(".form-group, .submit-button")
      .forEach((element, index) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1, // Stagger effect
            scrollTrigger: {
              trigger: element,
              start: "top 95%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
  }, []);
  return (
    <div className="contact-page">
      <section className="contact-hero">
        <h1>Get in Touch</h1>
        <p>
          We'd love to hear from you. Please fill out the form below or reach
          out to us directly.
        </p>
      </section>

      <section className="contact-details">
        <div className="detail-item">
          <h3>Email</h3>
          <p>info@amiya.com</p>
        </div>
        <div className="detail-item">
          <h3>Phone</h3>
          <p>+1 (123) 456-7890</p>
        </div>
        <div className="detail-item">
          <h3>Address</h3>
          <p>123 Fashion Lane, Style City, SC 12345</p>
        </div>
      </section>

      <section className="contact-form-section">
        <h2>Send Us a Message</h2>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" name="subject" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
