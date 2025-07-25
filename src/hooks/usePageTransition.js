import { useNavigate } from "react-router-dom";
import { useRef, useCallback } from "react";
import gsap from "gsap";

export const usePageTransition = () => {
  const navigate = useNavigate();
  const isTransitioning = useRef(false);

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

  const navigateWithTransition = useCallback(
    (to, options = {}) => {
      if (isTransitioning.current) return;

      isTransitioning.current = true;
      const pageName = getPageName(to);

      // Create transition overlay
      const overlay = document.createElement("div");
      overlay.className = "page-transition-overlay";
      overlay.innerHTML = `
        <div class="transition-content">
          <div class="transition-page-name">
            <span>${pageName}</span>
          </div>
          <div class="transition-line"></div>
        </div>
      `;

      document.body.appendChild(overlay);

      // Enhanced animation timeline
      const tl = gsap.timeline();

      // Entry animation (top to bottom)
      tl.fromTo(
        overlay,
        { y: "-100%" },
        {
          y: "0%",
          duration: 0.8,
          ease: "power3.inOut",
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
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )
        // Line animation
        .fromTo(
          overlay.querySelector(".transition-line"),
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.2"
        )
        // Hold for a moment
        .to({}, { duration: 0.3 })
        // Navigate to new page
        .call(() => {
          navigate(to, options);
        })
        // Exit animations (bottom to top)
        .to(overlay.querySelector(".transition-line"), {
          scaleX: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
        })
        .to(
          overlay.querySelector(".transition-page-name"),
          {
            opacity: 0,
            y: -30,
            scale: 0.9,
            duration: 0.5,
            ease: "back.in(1.7)",
          },
          "-=0.2"
        )

        // Final overlay exit (bottom to top)
        .to(
          overlay,
          {
            y: "-100%",
            duration: 0.8,
            ease: "power3.inOut",
            onComplete: () => {
              document.body.removeChild(overlay);
              isTransitioning.current = false;
            },
          },
          "-=0.2"
        );
    },
    [navigate]
  );

  return { navigateWithTransition, isTransitioning: isTransitioning.current };
};

export default usePageTransition;
