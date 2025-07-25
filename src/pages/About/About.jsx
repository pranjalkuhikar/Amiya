import { motion } from "framer-motion";
import React from "react";

const About = () => {
  return (
    <>
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pp-sb"
      >
        Redefining Modern Craftsmanship
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="pp-r"
      >
        Sustainable luxury apparel made with ethical practices
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="pp-r"
      >
        Sustainable luxury apparel made with ethical practices
      </motion.p>
    </>
  );
};

export default About;
