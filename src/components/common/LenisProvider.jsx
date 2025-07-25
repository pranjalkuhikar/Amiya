import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }) {
  const lenisRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      import('lenis').then(({ default: Lenis }) => {
        // Initialize Lenis
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
          direction: 'vertical',
          gestureDirection: 'vertical',
          smooth: true,
          smoothTouch: false,
          touchMultiplier: 2,
        });

        // Store lenis instance in ref
        lenisRef.current = lenis;

        // Update ScrollTrigger on scroll
        function updateScroll() {
          lenis.on('scroll', ScrollTrigger.update);
        }

        // Call requestAnimationFrame for smooth scrolling
        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        // Start the animation frame
        const rafId = requestAnimationFrame(raf);
        updateScroll();

        // Cleanup function
        return () => {
          cancelAnimationFrame(rafId);
          lenis.destroy();
          lenisRef.current = null;
        };
      });
    }
  }, []);

  // Reset scroll to top on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);

  return children;
}
