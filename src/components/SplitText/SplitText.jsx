import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(GSAPSplitText, ScrollTrigger);

const SplitText = ({ children, splitType = 'lines', delay = 0, duration = 1, ease = 'power2.out', trigger, start = 'top 80%', end = 'bottom 20%', scrub = false, markers = false, animation = {} }) => {
  const el = useRef();
  const splitTextRef = useRef();

  useEffect(() => {
    if (!el.current) {
      console.warn('SplitText component did not receive a ref to its child element.');
      return;
    }

    // Ensure the content is rendered before splitting
    if (el.current.innerHTML.trim() === '') {
      console.warn('SplitText component received empty content. Animation skipped.');
      return;
    }

    // Clean up any previous SplitText instances
    if (splitTextRef.current) {
      splitTextRef.current.revert();
    }

    const targets = el.current.children.length > 0 ? el.current.children : [el.current];

    targets.forEach(target => {
      try {
        splitTextRef.current = new GSAPSplitText(target, { type: splitType });

        const chars = splitTextRef.current[splitType];

        if (!chars || chars.length === 0) {
          console.warn(`No ${splitType} found to animate for element:`, target);
          return;
        }

        gsap.fromTo(
          chars,
          {
            opacity: 0,
            y: '100%',
            rotationX: -90,
            transformOrigin: '50% 50% -100px',
            ...animation.from
          },
          {
            opacity: 1,
            y: '0%',
            rotationX: 0,
            stagger: 0.02,
            delay: delay,
            duration: duration,
            ease: ease,
            ...animation.to,
            scrollTrigger: trigger ? {
              trigger: trigger.current || el.current,
              start: start,
              end: end,
              scrub: scrub,
              markers: markers,
              ...trigger.options
            } : null,
          }
        );
      } catch (error) {
        console.error('Error splitting text or creating animation:', error);
      }
    });

    return () => {
      if (splitTextRef.current) {
        splitTextRef.current.revert();
      }
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [children, splitType, delay, duration, ease, trigger, start, end, scrub, markers, animation]);

  return React.cloneElement(children, { ref: el });
};

export default SplitText;