import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Loader.scss";

const Loader = ({ onAnimationComplete }) => {
  const loaderRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      },
    });

    tl.to(textRef.current.children, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    })
      .to(
        textRef.current.children,
        {
          opacity: 0,
          y: -50,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.in",
        },
        "+=0.5"
      )
      .to(
        loaderRef.current,
        {
          y: "-100%",
          duration: 1.2,
          ease: "power3.inOut",
        },
        "-=0.2"
      );
  }, [onAnimationComplete]);

  return (
    <div className="loader" ref={loaderRef}>
      <div className="loader__text font-[PPR]" ref={textRef}>
        <span className="font-[PPR]">A</span>
        <span className="font-[PPR]">M</span>
        <span className="font-[PPR]">I</span>
        <span className="font-[PPR]">Y</span>
        <span className="font-[PPR]">A</span>
      </div>
    </div>
  );
};

export default Loader;
