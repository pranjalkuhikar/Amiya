// components/Loader.jsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Loader = ({ onComplete }) => {
  const [counter, setCounter] = useState(0);
  const loaderRef = useRef();
  const counterRef = useRef();

  // Set up counter interval
  useEffect(() => {
    const counterInterval = setInterval(() => {
      setCounter((prev) => {
        if (prev < 100) {
          const increment = Math.floor(Math.random() * 5) + 1;
          return Math.min(prev + increment, 100);
        }
        return prev;
      });
    }, 40);

    return () => clearInterval(counterInterval);
  }, []);

  // GSAP animations
  useGSAP(
    () => {
      // Initial animation
      gsap.to(".counter", {
        duration: 0.5,
        opacity: 1,
        y: 0,
        ease: "power2.out",
      });

      // Main timeline
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      // Counter animation
      tl.to(
        ".counter",
        {
          duration: 0.5,
          y: -20,
          opacity: 0,
          ease: "power2.in",
          onComplete: () => setCounter(100),
        },
        2.5
      );

      // Logo reveal
      tl.fromTo(
        ".logo",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.3"
      );

      // Final exit animation with curved path
      tl.to(
        ".loader",
        {
          duration: 1.2,
          ease: "power2.inOut",
          motionPath: {
            path: [
              { x: 0, y: 0 },
              { x: 50, y: -100 },
              { x: 0, y: -window.innerHeight * 1.2 },
            ],
            curviness: 1.5,
          },
          opacity: 0,
          scale: 0.95,
        },
        "+=0.3"
      );
    },
    { scope: loaderRef, dependencies: [onComplete] }
  );

  return (
    <div
      ref={loaderRef}
      className="loader fixed top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center z-50 overflow-hidden"
    >
      <div className="relative h-20 overflow-hidden">
        <div
          ref={counterRef}
          className="counter text-6xl md:text-8xl font-light tracking-tight opacity-0 transform translate-y-10"
        >
          {counter}%
        </div>
        <div className="logo absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0">
          <h1 className="text-4xl md:text-6xl font-light tracking-tight">
            Amiya
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Loader;
