import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Loader.scss';

const Loader = ({ onAnimationComplete }) => {
  const loaderRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(textRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
    })
    .to(loaderRef.current, {
      y: '-100%',
      duration: 1.5,
      ease: 'power3.inOut',
      delay: 0.5,
      onComplete: onAnimationComplete, // Call the callback when animation is complete
    });
  }, [onAnimationComplete]);

  return (
    <div className="loader" ref={loaderRef}>
      <div className="loader-text-container">
        <p className="loader-text" ref={textRef}>Amiya</p>
      </div>
    </div>
  );
};

export default Loader;