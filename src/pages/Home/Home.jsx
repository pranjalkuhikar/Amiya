import React, { useEffect, useRef } from "react";
import "./Home.scss";
import { MoveRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "keen-slider/keen-slider.min.css";
import SliderCards from "../../components/SliderCard/SliderCards";
import ArrowButton from "../../components/common/ArrowButton";
import { Link } from "react-router-dom";
import ScrollVelocity from "../../components/ScrollVelocity";

gsap.registerPlugin(ScrollTrigger);

// Shirt and Pant slider data
const shirtCards = [
  {
    id: 1,
    title: "Classic White Shirt",
    desc: "Timeless white shirt for all occasions.",
    img: "/images/shirt1.jpg",
    price: 999,
  },
  {
    id: 2,
    title: "Blue Oxford Shirt",
    desc: "Smart-casual blue oxford for daily wear.",
    img: "/images/shirt2.jpg",
    price: 1199,
  },
  {
    id: 3,
    title: "Checked Flannel Shirt",
    desc: "Cozy and stylish for chilly days.",
    img: "/images/shirt3.jpg",
    price: 1299,
  },
  {
    id: 4,
    title: "Linen Summer Shirt",
    desc: "Breezy comfort for hot weather.",
    img: "/images/shirt4.jpg",
    price: 1099,
  },
];

const pantCards = [
  {
    id: 1,
    title: "Slim Fit Chinos",
    desc: "Versatile chinos for work and play.",
    img: "/images/pant1.jpg",
    price: 1399,
  },
  {
    id: 2,
    title: "Classic Blue Jeans",
    desc: "Everyday denim with a perfect fit.",
    img: "/images/pant2.jpg",
    price: 1499,
  },
  {
    id: 3,
    title: "Black Formal Trousers",
    desc: "Sharp look for business or events.",
    img: "/images/pant3.jpg",
    price: 1599,
  },
  {
    id: 4,
    title: "Casual Jogger Pants",
    desc: "Relaxed style for downtime.",
    img: "/images/pant4.jpg",
    price: 899,
  },
];

const Home = () => {
  const sectionRefs = useRef([]);
  const imageRefs = useRef([]);
  const textRefs = useRef([]);

  useEffect(() => {
    // Animation for images and text on scroll
    gsap.utils.toArray(sectionRefs.current).forEach((section, i) => {
      const image = imageRefs.current[i];
      const text = textRefs.current[i];

      // Set initial states
      gsap.set([image, text], { opacity: 0, y: 50 });

      // Create scroll trigger for each section
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 150%",
            end: "bottom 4%",
            scrub: 0.5,
            // markers: true, // Uncomment for debugging
          },
        })
        .to(image, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
        .to(text, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=1");

      // Parallax effect for images
      gsap.to(image, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }, []);

  const addToRefs = (el, refArray) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  return (
    <>
      <div className="home">
        <div className="home__content">
          <div className="home__content__title">
            <span>Consciously</span> made clothing that feels <span>Good</span>{" "}
            - on you
          </div>
          <div className="home__content__text">
            Unreservedly honest clothing that truly fits your life - kind to
            skin and the planet, no exceptions!
          </div>
        </div>
        <Link to="/shop" className="btn">
          <div className="line1"></div>
          <div className="text">Explore All Products</div>
          <div className="line2">
            <span>
              <MoveRight size={20} color="#fff" />
            </span>
            <span>
              <MoveRight size={20} color="#fff" />
            </span>
          </div>
        </Link>
      </div>

      {/* Full Screen Sections */}
      <div className="sections-container">
        <h2 className="text font-[PPS]">
          Explore <span>Collection</span>
        </h2>
        {/* First Section */}
        <section
          ref={(el) => addToRefs(el, sectionRefs)}
          className="img min-h-screen w-full flex items-center relative overflow-hidden"
        >
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10 h-full py-20">
            <div
              ref={(el) => addToRefs(el, imageRefs)}
              className="w-full md:w-1/2 h-[60vh] md:h-full mb-10 md:mb-0"
            >
              <img
                src="/images/img1.jpg"
                alt="Fashion Item 1"
                className="w-full h-full object-cover rounded-lg shadow-2xl"
              />
            </div>
            <div
              ref={(el) => addToRefs(el, textRefs)}
              className="w-full md:w-1/2 text-center md:text-left"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-start mb-6">
                Shirt <br />
                <div className="flex w-full items-center justify-between gap-2">
                  <span>Collection</span>{" "}
                  <Link to="/shop" aria-label="Go to shop">
                    <ArrowButton />
                  </Link>
                </div>
              </h2>

              <SliderCards cards={shirtCards} />
            </div>
          </div>
        </section>

        {/* Second Section */}
        <section
          ref={(el) => addToRefs(el, sectionRefs)}
          className="min-h-screen flex items-center relative overflow-hidden"
        >
          <div className="w-full flex flex-col md:flex-row-reverse items-center justify-between gap-10 h-full py-20">
            <div
              ref={(el) => addToRefs(el, imageRefs)}
              className="w-full md:w-1/2 h-[60vh] md:h-full mb-10 md:mb-0"
            >
              <img
                src="/images/img2.jpg"
                alt="Fashion Item 2"
                className="w-full h-full object-cover rounded-lg shadow-2xl"
              />
            </div>
            <div
              ref={(el) => addToRefs(el, textRefs)}
              className="w-full md:w-1/2 text-center md:text-left"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Trouser <br />
                <div className="flex w-full items-center justify-between gap-2">
                  <span>Collection</span>{" "}
                  <Link to="/shop" aria-label="Go to shop">
                    <ArrowButton />
                  </Link>
                </div>
              </h2>
              <SliderCards cards={pantCards} />
            </div>
          </div>
        </section>
      </div>
      <div>
        <ScrollVelocity
          texts={[
            "Explore Collection Shirt and Top Pants and Shots Sweters and Jackets Skirts Dresses",
          ]}
          className="custom-scroll-text"
        />
      </div>
    </>
  );
};

export default Home;
