import "./About.scss";
import SplitText from "../../components/SplitText/SplitText";

const About = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        <SplitText>
          <h1 className="about-title">About Us</h1>
        </SplitText>
        <SplitText>
          <p>
            We are more than just a brand; we are a story, a journey, and a
            commitment to quality and passion.
          </p>
        </SplitText>
      </header>

      <section className="about-section mission-section">
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
      </section>

      <section className="about-section values-section">
        <h2>Our Values</h2>
        <ul>
          <li>
            <strong>Quality:</strong> Every stitch, every fabric, every detail
            is meticulously chosen and crafted.
          </li>
          <li>
            <strong>Sustainability:</strong> We are committed to ethical
            sourcing and environmentally conscious practices.
          </li>
          <li>
            <strong>Innovation:</strong> Pushing boundaries in design and
            functionality.
          </li>
          <li>
            <strong>Community:</strong> Building connections and fostering a
            sense of belonging.
          </li>
        </ul>
      </section>

      <section className="about-section story-section">
        <SplitText><h2 className="story-title">Our Story</h2></SplitText>
        <SplitText><p>Born from a passion for unique aesthetics and a desire to offer something truly special, our journey began with a simple idea: to blend classic elegance with contemporary flair.</p></SplitText>
        <SplitText><p>We invite you to be a part of our story, to wear our creations, and to experience the dedication woven into every fiber.</p></SplitText>
      </section>

      <section className="about-section founder-section">
        <div className="founder-content">
          <SplitText><h2 className="founder-title">Meet Our Founder</h2></SplitText>
          <SplitText><p>Our brand was founded by Jane Doe, a visionary with a deep passion for design and a commitment to craftsmanship. With years of experience in the fashion industry, Jane embarked on a journey to create timeless pieces that resonate with individuality and elevate everyday style.</p></SplitText>
          <SplitText><p>Her dedication to ethical sourcing and environmentally conscious practices is woven into the very fabric of our brand, ensuring that every creation not only looks good but also does good.</p></SplitText>
        </div>
        <div className="founder-image-container">
          <img src="/images/founder.jpg" alt="Founder" className="founder-image" />
        </div>
      </section>

      <section className="about-section team-section">
        <SplitText><h2>Our Team</h2></SplitText>
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
