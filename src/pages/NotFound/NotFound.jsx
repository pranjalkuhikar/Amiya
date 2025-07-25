import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search, ShoppingBag } from "lucide-react";
import "./NotFound.scss";

const NotFound = () => {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="not-found-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Elements */}
      <div className="background-elements">
        <motion.div
          className="floating-shape shape-1"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="floating-shape shape-2"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
        <motion.div
          className="floating-shape shape-3"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
      </div>

      <div className="not-found-container">
        <motion.div className="not-found-content" variants={itemVariants}>
          {/* 404 Number */}
          <motion.div className="error-number" variants={itemVariants}>
            <span className="four">4</span>
            <span className="zero">0</span>
            <span className="four">4</span>
          </motion.div>

          {/* Main Message */}
          <motion.h1 className="error-title" variants={itemVariants}>
            Oops! Page Not Found
          </motion.h1>

          <motion.p className="error-description" variants={itemVariants}>
            The page you're looking for seems to have wandered off into the fashion void. 
            Don't worry, even the best stylists lose track of things sometimes!
          </motion.p>

          {/* Action Buttons */}
          <motion.div className="action-buttons" variants={itemVariants}>
            <Link to="/" className="btn btn-primary">
              <Home size={20} />
              <span>Back to Home</span>
            </Link>

            <Link to="/shop" className="btn btn-secondary">
              <ShoppingBag size={20} />
              <span>Continue Shopping</span>
            </Link>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="quick-links" variants={itemVariants}>
            <h3>Popular Pages</h3>
            <div className="links-grid">
              <Link to="/shop" className="quick-link">
                <ShoppingBag size={16} />
                <span>Shop Collection</span>
              </Link>
              <Link to="/about" className="quick-link">
                <Search size={16} />
                <span>About Us</span>
              </Link>
              <Link to="/contact" className="quick-link">
                <ArrowLeft size={16} />
                <span>Contact</span>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div className="decorative-elements" variants={itemVariants}>
          <div className="pattern-grid">
            {Array.from({ length: 12 }).map((_, index) => (
              <motion.div
                key={index}
                className="pattern-dot"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.3 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;
