import "./About.scss";
import SplitText from "../../components/SplitText/SplitText";
import { motion } from "framer-motion";
import { useEffect } from "react";

const About = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="about-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.header className="about-header" variants={sectionVariants}>
        <SplitText>
          <h1 className="about-title">About Us</h1>
        </SplitText>
        <SplitText>
          <p>
            We are more than just a brand; we are a story, a journey, and a
            commitment to quality and passion.
          </p>
        </SplitText>
      </motion.header>

      <motion.section
        className="about-section mission-section"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <SplitText>
          <h2 className="mission-title">Our Mission</h2>
        </SplitText>
        <SplitText>
          <p>
            To create timeless pieces that resonate with your individuality and
            elevate your everyday style. We believe in craftsmanship,
            sustainability, and designs that speak volumes without saying a
            word.
          </p>
        </SplitText>
      </motion.section>

      <motion.section
        className="about-section values-section"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Our Values
        </motion.h2>
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <motion.li
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.3 },
            }}
          >
            <strong>Quality:</strong> Every stitch, every fabric, every detail
            is meticulously chosen and crafted.
          </motion.li>
          <motion.li
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.3 },
            }}
          >
            <strong>Sustainability:</strong> We are committed to ethical
            sourcing and environmentally conscious practices.
          </motion.li>
          <motion.li
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.3 },
            }}
          >
            <strong>Innovation:</strong> Pushing boundaries in design and
            functionality.
          </motion.li>
          <motion.li
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.3 },
            }}
          >
            <strong>Community:</strong> Building connections and fostering a
            sense of belonging.
          </motion.li>
        </motion.ul>
      </motion.section>

      <motion.section
        className="about-section story-section"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <SplitText>
          <h2 className="story-title">Our Story</h2>
        </SplitText>
        <SplitText>
          <p>
            Born from a passion for unique aesthetics and a desire to offer
            something truly special, our journey began with a simple idea: to
            blend classic elegance with contemporary flair.
          </p>
        </SplitText>
        <SplitText>
          <p>
            We invite you to be a part of our story, to wear our creations, and
            to experience the dedication woven into every fiber.
          </p>
        </SplitText>
      </motion.section>

      <motion.section
        className="about-section founder-section"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          className="founder-content"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <SplitText>
            <h2 className="founder-title">Meet Our Founder</h2>
          </SplitText>
          <SplitText>
            <p>
              Our brand was founded by Jane Doe, a visionary with a deep passion
              for design and a commitment to craftsmanship. With years of
              experience in the fashion industry, Jane embarked on a journey to
              create timeless pieces that resonate with individuality and
              elevate everyday style.
            </p>
          </SplitText>
          <SplitText>
            <p>
              Her dedication to ethical sourcing and environmentally conscious
              practices is woven into the very fabric of our brand, ensuring
              that every creation not only looks good but also does good.
            </p>
          </SplitText>
        </motion.div>
        <motion.div
          className="founder-image-container"
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 },
          }}
        >
          <img
            src="/images/founder.jpg"
            alt="Founder"
            className="founder-image"
          />
        </motion.div>
      </motion.section>

      <motion.section
        className="about-section team-section"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <SplitText>
          <h2>Our Team</h2>
        </SplitText>
        <motion.div
          className="team-members-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <motion.div
            className="team-member"
            variants={cardVariants}
            whileHover={{
              y: -10,
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.15)",
              transition: { duration: 0.3 },
            }}
          >
            <h3>Jane Doe</h3>
            <p>Founder & Creative Director</p>
            <p>
              Jane's vision and artistic eye are the heart of our brand. With
              years of experience in fashion and design, she leads our creative
              endeavors.
            </p>
          </motion.div>
          <motion.div
            className="team-member"
            variants={cardVariants}
            whileHover={{
              y: -10,
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.15)",
              transition: { duration: 0.3 },
            }}
          >
            <h3>John Smith</h3>
            <p>Head of Operations</p>
            <p>
              John ensures that every aspect of our production and delivery runs
              smoothly, maintaining our high standards of efficiency and
              quality.
            </p>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.footer
        className="about-footer"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p>&copy; 2023 Your Brand Name. All rights reserved.</p>
      </motion.footer>
    </motion.div>
  );
};

export default About;
