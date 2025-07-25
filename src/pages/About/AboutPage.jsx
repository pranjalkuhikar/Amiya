import { motion } from "framer-motion";
import "./AboutPage.scss";
import TiltedCard from "../../components/TitledCard/TitledCard";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="about-page"
    >
      <div className="about-content">
        <div className="text-section">
          <p className="founder-label">FOUNDER</p>
          <h1 className="founder-name">AIMEESONG</h1>
          <p className="ceo-title uppercase">
            Creative Director & Founder of Song of Style & Amiya
          </p>
          <p className="description">
            Aimee Song is a fashion entrepreneur, designer, and influencer. She
            started her journey with a blog called "Song of Style", which became
            a global brand. Later, she launched Amiya, a fashion label known for
            elegant, modern designs. Aimee inspires millions with her creative
            style and strong presence in the fashion world.
          </p>
          <Link
            to="https://www.instagram.com/aimeesong/"
            className="website-link"
          >
            AIMEESONG <span className="arrow">&#8599;</span>
          </Link>
        </div>
        <div className="image-section">
          <TiltedCard
            imageSrc="/images/founder.jpg"
            altText="AIMEESONG"
            captionText="AIMEESONG"
            containerHeight="300px"
            containerWidth="300px"
            imageHeight="300px"
            imageWidth="300px"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={
              <p className="tilted-card-demo-text text-white hidden">
                AIMEESONG
              </p>
            }
          />
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
