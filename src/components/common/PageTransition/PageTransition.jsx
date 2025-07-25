import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import "./PageTransition.scss";

const PageTransition = ({ children }) => {
  const location = useLocation();
  const transitionRef = useRef(null);
  const contentRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("idle");

  // Get page name from route
  const getPageName = (path) => {
    const pageNames = {
      "/": "Home",
      "/shop": "Shop",
      "/about": "About",
      "/contact": "Contact",
      "/cart": "Cart",
      "/sign-in": "Sign In",
      "/sign-up": "Sign Up",
    };

    // Handle dynamic routes
    if (path.startsWith("/product/")) {
      return "Product";
    }
    if (path.startsWith("/category/")) {
      return "Category";
    }
    if (path.startsWith("/checkout")) {
      return "Checkout";
    }

    return pageNames[path] || "Page";
  };

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setIsTransitioning(true);
      setTransitionStage("exit");

      const pageName = getPageName(location.pathname);

      // Create transition overlay with performance optimizations
      const overlay = document.createElement("div");
      overlay.className = "page-transition-overlay";
      overlay.style.willChange = "transform";
      overlay.innerHTML = `
        <div class="transition-content">
          <div class="transition-page-name" style="will-change: transform, opacity">
            <span>${pageName}</span>
          </div>
          <div class="transition-line" style="will-change: transform, opacity"></div>
        </div>
      `;

      document.body.appendChild(overlay);

      // Enhanced animation timeline with performance optimizations
      const tl = gsap.timeline();

      // Set initial GPU acceleration
      gsap.set(overlay, { force3D: true });
      gsap.set(overlay.querySelector(".transition-page-name"), {
        force3D: true,
      });
      gsap.set(overlay.querySelector(".transition-line"), { force3D: true });

      // Entry animation (top to bottom)
      tl.fromTo(
        overlay,
        { y: "-100%" },
        {
          y: "0%",
          duration: 0.5,
          ease: "power2.inOut",
          force3D: true,
        }
      )
        // Page name animation
        .fromTo(
          overlay.querySelector(".transition-page-name"),
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
            force3D: true,
            onStart: () => {
              // Set line width to match text width
              const textElement = overlay.querySelector(
                ".transition-page-name"
              );
              const lineElement = overlay.querySelector(".transition-line");
              if (textElement && lineElement) {
                const textWidth = textElement.offsetWidth;
                lineElement.style.width = `${textWidth}px`;
              }
            },
          },
          "-=0.3"
        )
        // Line animation
        .fromTo(
          overlay.querySelector(".transition-line"),
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
            force3D: true,
          },
          "-=0.1"
        )
        // Update content DURING overlay (not after)
        .call(
          () => {
            setDisplayLocation(location);
            setTransitionStage("enter");
          },
          [],
          0.2
        )
        // Hold for smooth transition
        .to({}, { duration: 0.2 })
        // Exit animations (bottom to top)
        .to(overlay.querySelector(".transition-line"), {
          scaleX: 0,
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
          force3D: true,
        })
        .to(
          overlay.querySelector(".transition-page-name"),
          {
            opacity: 0,
            y: -30,
            scale: 0.9,
            duration: 0.3,
            ease: "power2.in",
            force3D: true,
          },
          "-=0.1"
        )
        // Final overlay exit (bottom to top)
        .to(
          overlay,
          {
            y: "-100%",
            duration: 0.4,
            ease: "power2.inOut",
            force3D: true,
            onComplete: () => {
              // Clean up will-change properties
              overlay.style.willChange = "auto";
              document.body.removeChild(overlay);
              setIsTransitioning(false);
              setTransitionStage("idle");
            },
          },
          "-=0.1"
        );
    }
  }, [location.pathname, displayLocation.pathname]);

  // Scroll to top on route change
  useEffect(() => {
    if (!isTransitioning) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [displayLocation.pathname, isTransitioning]);

  return (
    <div className="page-transition-container">
      <div
        ref={contentRef}
        className={`page-content ${isTransitioning ? "transitioning" : ""}`}
      >
        {React.cloneElement(children, { key: displayLocation.pathname })}
      </div>
    </div>
  );
};

export default PageTransition;
