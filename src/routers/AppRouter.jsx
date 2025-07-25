import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Home from "../pages/Home/Home";
import AboutPage from "../pages/About/AboutPage";
import Shop from "../pages/Shop/Shop";
import Navbar from "../components/layout/Navbar/Navbar";
import Contact from "../pages/Contact/Contact";
import Cart from "../pages/Cart/Cart";
import CheckoutPage from "../pages/Checkout/CheckoutPage";
import SignInPage from "../pages/Auth/SignInPage";
import SignUpPage from "../pages/Auth/SignUpPage";
import Dashboard from "../pages/Account/Dashboard";
import Loader from "../components/Loader/Loader";
import gsap from "gsap";
import Footer from "../components/layout/Footer/Footer";
import ProductDetail from "../pages/Shop/ProductDetail";

const AppRouter = () => {
  const [loading, setLoading] = useState(true);
  const mainContentRef = useRef(null);

  useEffect(() => {
    gsap.set(mainContentRef.current, { opacity: 0 });
  }, []);

  // Lock/unlock scroll when loader is active
  useEffect(() => {
    if (loading) {
      // Lock scroll and disable Lenis
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
      document.documentElement.style.overflow = "hidden";

      // Stop Lenis if available
      if (window.lenis) {
        window.lenis.stop();
      }
    } else {
      // Unlock scroll and re-enable Lenis
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.documentElement.style.overflow = "";

      // Start Lenis if available
      if (window.lenis) {
        window.lenis.start();
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.documentElement.style.overflow = "";

      // Ensure Lenis is started on cleanup
      if (window.lenis) {
        window.lenis.start();
      }
    };
  }, [loading]);

  const handleLoaderComplete = () => {
    gsap.fromTo(
      ".home",
      { backgroundSize: "110%" },
      {
        backgroundSize: "100%",
        duration: 0,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(mainContentRef.current, {
            opacity: 1,
            duration: 0.5,
            onComplete: () => {
              setLoading(false);
            },
          });
        },
      }
    );
  };

  return (
    <>
      <div ref={mainContentRef}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route
            path="/account"
            element={
              <SignedIn>
                <Dashboard />
              </SignedIn>
            }
          />
          <Route
            path="/account"
            element={
              <SignedOut>
                <Navigate
                  to={`/sign-in?redirect_url=${encodeURIComponent(
                    window.location.pathname
                  )}`}
                />
              </SignedOut>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>

      {loading && <Loader onAnimationComplete={handleLoaderComplete} />}
    </>
  );
};

export default AppRouter;
