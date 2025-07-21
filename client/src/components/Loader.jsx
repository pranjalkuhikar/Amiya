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

      // Split loader into two panels
      tl.to(
        ".loader-panel.left",
        {
          duration: 1.2,
          x: "-100%",
          ease: "power2.inOut",
        },
        "+=0.3"
      ).to(
        ".loader-panel.right",
        {
          duration: 1.2,
          x: "100%",
          ease: "power2.inOut",
          onStart: () => {
            document.body.classList.add("no-scroll");
          },
          onComplete: () => {
            document.body.classList.remove("no-scroll");
            gsap.set(".loader", { display: "none" });
          },
        },
        "<"
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
      className="loader fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden"
    >
      <div className="loader-panel left absolute top-0 left-0 w-1/2 h-full bg-white transform-gpu will-change-transform" />
      <div className="loader-panel right absolute top-0 right-0 w-1/2 h-full bg-white transform-gpu will-change-transform" />
      <div className="loader-content absolute top-0 left-0 right-0 bottom-0 w-full h-full flex flex-col items-center justify-center pointer-events-none">
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
    </div>
  );
};

export default Loader;
