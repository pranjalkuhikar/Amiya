import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import "./Loader.scss";

const Loader = ({ onAnimationComplete }) => {
  const location = useLocation();
  const isHome = location.pathname === "/";
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
        <p className="loader-text font-[PPR]" ref={textRef}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 582 94"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill={isHome ? "#FFFFFF" : "#000000"}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M462.814 0.487183H443.371V1.01917C444.038 6.6125 441.774 12.2059 436.312 20.9952L421.798 44.4338H421.264L407.148 20.8619C402.487 13.0059 399.69 6.8792 400.888 0.885864V0.487183H377.983V1.01917C383.178 6.0805 387.172 12.3392 392.099 20.5965L413.14 55.3538V72.4005C413.14 82.2552 412.21 87.7152 408.879 92.5085V93.0419H430.452V92.5085C427.123 87.7152 426.191 82.2552 426.191 72.4005V54.9552L447.366 20.9952L447.518 20.7583L447.518 20.758C452.512 13.0038 456.749 6.42413 462.814 1.01917V0.487183ZM78.8373 71.8672C79.3479 73.1172 79.8306 74.316 80.2937 75.466C83.3335 83.0158 85.5273 88.4645 89.2253 92.5085V93.0419H67.1187V92.5085C69.7827 87.9819 68.3173 80.7912 64.988 72.4005L62.192 65.3419H23.572L20.7747 72.6672C17.4453 81.3232 16.2467 87.9819 19.044 92.5085V93.0419H0V92.5085C4.44204 88.3136 6.71192 82.2878 9.67149 74.431L9.67163 74.4306L9.67415 74.4239L9.67522 74.4211C9.90808 73.8029 10.1452 73.1734 10.388 72.5325L38.62 0.487203H50.0733L78.8373 71.8672ZM27.168 56.1525H58.596L42.8813 16.7339H42.348L27.168 56.1525ZM305.042 92.5088C308.37 87.8475 309.302 82.2554 309.302 72.5328V20.9954C309.302 11.2741 308.37 5.54743 305.042 1.01943V0.487447H326.604V1.01943C323.277 5.54743 322.345 11.2741 322.345 20.9954V72.5328C322.345 82.2554 323.277 87.8475 326.604 92.5088V93.0421H305.042V92.5088ZM571.583 71.8672C572.094 73.1173 572.577 74.3162 573.04 75.4664C576.079 83.016 578.273 88.4646 581.971 92.5085V93.0419H559.865V92.5085C562.529 87.9819 561.063 80.7912 557.734 72.4005L554.938 65.3419H516.318L513.521 72.6672C510.191 81.3232 508.993 87.9819 511.79 92.5085V93.0419H492.746V92.5085C497.188 88.3137 499.458 82.288 502.417 74.4315L502.417 74.4312C502.651 73.8097 502.89 73.1769 503.134 72.5325L531.366 0.487203H542.819L571.583 71.8672ZM551.342 56.1525L535.627 16.7339H535.094L519.913 56.1525H551.342ZM223.786 92.5389C227.211 87.9283 227.998 81.7363 227.998 72.1216V15.3496H227.34L196.914 92.5389H179.77V92.0109C182.403 87.5336 180.955 80.4203 177.662 72.1216L173.039 60.4829L154.766 15.2163H154.106V72.1216C154.106 81.7363 155.03 87.9283 158.324 92.5389H139.884C143.308 87.9283 144.096 81.7363 144.096 72.1216V21.1456C144.096 11.9256 143.436 5.47092 139.882 0.992249H162.272L192.831 76.6016H193.358L223.388 0.992249H244.988C241.696 5.47092 240.906 11.7923 240.906 21.1456V72.1216C240.906 81.7363 241.698 87.9283 244.991 92.5389H223.786Z"
            ></path>
          </svg>
        </p>
      </div>
      <div className="loader-image" ref={imageRef}>
        <img src="/images/founder.jpg" alt="Founder" />
      </div>
    </div>
  );
};

export default Loader;
