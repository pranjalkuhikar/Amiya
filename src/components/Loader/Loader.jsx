import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Loader.scss";

const Loader = ({ onAnimationComplete }) => {
  const loaderRef = useRef(null);
  const counterRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let num = { value: 0 };
    const tl = gsap.timeline();

    // Set initial states
    gsap.set(counterRef.current, { opacity: 1 });
    gsap.set(textRef.current, { opacity: 0, y: 100 });
    gsap.set(imageRef.current, { opacity: 0, scale: 0.9 });

    // Counter animation
    tl.from(counterRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    })
      .to(num, {
        value: 100,
        duration: 2,
        ease: "power1.inOut",
        onUpdate: () => setCounter(Math.round(num.value)),
      })
      .to(counterRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      })

      // Brand name animation
      .fromTo(
        textRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        }
      )
      .to(textRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.in",
        delay: 0.5,
      })

      // Founder image animation
      .fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
        }
      )
      .to(imageRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: "power2.in",
        delay: 0.3,
      })

      // Final loader fade out
      .to(loaderRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(loaderRef.current, { display: "none" });
          onAnimationComplete?.();
        },
      });
  }, [onAnimationComplete]);

  return (
    <div className="loader" ref={loaderRef}>
      <div className="loader-counter" ref={counterRef}>
        {counter}%
      </div>
      <div className="loader-text-container">
        <p className="loader-text" ref={textRef}>
          Amiya
        </p>
      </div>
      <div className="loader-image" ref={imageRef}>
        <img src="/images/founder.jpg" alt="Founder" />
      </div>
    </div>
  );
};

export default Loader;
