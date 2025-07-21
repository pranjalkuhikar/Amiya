// components/Loader.jsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// Register plugins
gsap.registerPlugin(MotionPathPlugin, useGSAP);

const Loader = ({ onComplete }) => {
  const [counter, setCounter] = useState(0);
  const loaderRef = useRef();

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
      // Create timeline instance
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
          gsap.set(".loader", { display: "none" });
        },
      });

      // Initial counter animation
      tl.to(".counter", {
        duration: 0.5,
        opacity: 1,
        y: 0,
        ease: "power2.out",
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
        "+=2"
      );

      // Logo reveal
      tl.fromTo(
        ".logo",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.3"
      );

      // Smooth exit animation to top
      tl.to(
        ".loader",
        {
          duration: 1.2,
          y: () => `-${window.innerHeight}px`, // Use window height for consistent behavior
          ease: "power3.inOut",
          scale: 0.98,
          opacity: 0,
          onStart: () => {
            console.log("Starting exit animation");
            document.body.classList.add("no-scroll");
            // Force reflow to ensure transform is applied
            document.body.offsetHeight;
          },
          onComplete: () => {
            console.log("Exit animation complete");
            document.body.classList.remove("no-scroll");
            // Ensure loader is hidden after animation
            gsap.set(".loader", { display: "none" });
          },
        },
        "+=0.3"
      );
    },
    { scope: loaderRef, dependencies: [onComplete] }
  );

  // Clean up no-scroll class on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div
      ref={loaderRef}
      className="loader fixed top-0 left-0 right-0 bottom-0 w-full h-screen bg-white flex flex-col items-center justify-center z-50 overflow-hidden transform-gpu will-change-transform"
      style={{
        transformOrigin: 'center center',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        willChange: 'transform, opacity'
      }}
    >
      <div className="relative h-28 overflow-hidden">
        <div className="counter text-6xl md:text-8xl font-light tracking-tight opacity-0 transform translate-y-10">
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
