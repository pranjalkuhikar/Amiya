import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartCount } from "../../../features/cartSlice";
import { selectIsDarkMode, toggleTheme } from "../../../features/themeSlice";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.scss";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const navRef = useRef(null);
  const dispatch = useDispatch();

  // Use Redux instead of Context API
  const cartCount = useSelector(selectCartCount);
  const isDarkMode = useSelector(selectIsDarkMode);

  useEffect(() => {
    // Add/remove home-page class to body based on route
    if (isHome) {
      document.body.classList.add("home-page");
    } else {
      document.body.classList.remove("home-page");
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      const heroSection = document.querySelector(".hero-section");
      if (!heroSection) return;

      const heroHeight = heroSection.offsetHeight;
      const scrollPosition = window.scrollY;

      setScrolled(scrollPosition > heroHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.classList.remove("home-page");
    };
  }, [isHome]);

  // Toggle dark mode using Redux
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  // Cart counter component with animation
  const CartCounter = () => {
    const isCartUpdated = useSelector(state => state.cart.isCartUpdated);
    
    return (
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            key="cart-count"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ 
              scale: isCartUpdated ? [1, 1.2, 1] : 1, 
              opacity: 1,
              backgroundColor: isCartUpdated ? ['#4F46E5', '#EF4444', '#4F46E5'] : '#EF4444'
            }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ 
              duration: isCartUpdated ? 0.4 : 0.2,
              times: isCartUpdated ? [0, 0.5, 1] : [0, 1]
            }}
            className="absolute -top-2 -right-2 flex items-center justify-center rounded-full text-white text-xs font-medium"
            style={{ 
              minWidth: '20px', 
              height: '20px',
              padding: cartCount > 9 ? '0 6px' : '0'
            }}
          >
            {cartCount}
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <>
      <nav ref={navRef} className={`${scrolled ? "scrolled" : ""} ${isDarkMode ? "dark-mode" : ""}`}>
        <Link to="/" className="logo">
          Amiya
        </Link>
        <button
          className="hamburger"
          aria-label="Open menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={menuOpen ? "open" : ""}></span>
          <span className={menuOpen ? "open" : ""}></span>
          <span className={menuOpen ? "open" : ""}></span>
        </button>
        <div className="menu desktop-menu">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="btn desktop-menu">
          {/* Dark mode toggle */}
          <motion.button
            onClick={handleToggleTheme}
            className="mr-4 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </motion.button>
          
          <div className="relative">
            <Link to="/cart" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
              <svg
                className="icon-cart"
                width="15"
                height="18"
                viewBox="0 0 15 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.19891 5.8049C1.2448 5.02484 1.89076 4.41576 2.67216 4.41576H12.0298C12.8112 4.41576 13.4572 5.02485 13.5031 5.8049L14.0884 15.7547C14.1382 16.6023 13.4643 17.3171 12.6151 17.3171H2.08688C1.23775 17.3171 0.563767 16.6023 0.61363 15.7547L1.19891 5.8049Z"
                  stroke="currentColor"
                  strokeWidth="0.983866"
                />
                <path
                  d="M11.4354 6.3737C11.4354 3.21604 9.60694 0.65625 7.35147 0.65625C5.096 0.65625 3.26758 3.21604 3.26758 6.3737"
                  stroke="currentColor"
                  strokeWidth="0.983866"
                  strokeLinecap="round"
                />
              </svg>
              <CartCounter />
            </Link>
          </div>
          <div className="line"></div>
          <Link to="/login" className="account">
            <svg
              className="icon-account"
              width="16"
              height="18"
              viewBox="0 0 16 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.024 17.0559V15.3068C15.024 14.379 14.6555 13.4892 13.9994 12.8332C13.3434 12.1772 12.4536 11.8086 11.5258 11.8086H4.52944C3.60166 11.8086 2.71188 12.1772 2.05585 12.8332C1.39981 13.4892 1.03125 14.379 1.03125 15.3068V17.0559"
                stroke="currentColor"
                strokeWidth="0.983866"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.02798 8.30986C9.95997 8.30986 11.5262 6.74367 11.5262 4.81167C11.5262 2.87967 9.95997 1.31348 8.02798 1.31348C6.09598 1.31348 4.52979 2.87967 4.52979 4.81167C4.52979 6.74367 6.09598 8.30986 8.02798 8.30986Z"
                stroke="currentColor"
                strokeWidth="0.983866"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
        <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
          {[
            { to: "/", text: "Home" },
            { to: "/shop", text: "Shop" },
            { to: "/about", text: "About" },
            { to: "/contact", text: "Contact" },
          ].map((item, index) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              style={{ "--i": index + 1 }}
            >
              {item.text}
            </Link>
          ))}
          <div className="btn" style={{ "--i": 5 }}>
            <div className="relative">
              <Link
                to="/cart"
                className="cart"
                onClick={() => setMenuOpen(false)}
                aria-label="Cart"
              >
                <svg
                  className="icon-cart"
                  width="20"
                  height="20"
                  viewBox="0 0 15 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.19891 5.8049C1.2448 5.02484 1.89076 4.41576 2.67216 4.41576H12.0298C12.8112 4.41576 13.4572 5.02485 13.5031 5.8049L14.0884 15.7547C14.1382 16.6023 13.4643 17.3171 12.6151 17.3171H2.08688C1.23775 17.3171 0.563767 16.6023 0.61363 15.7547L1.19891 5.8049Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M11.4354 6.3737C11.4354 3.21604 9.60694 0.65625 7.35147 0.65625C5.096 0.65625 3.26758 3.21604 3.26758 6.3737"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
                <CartCounter />
              </Link>
            </div>
            <div className="line"></div>
            <Link
              to="/login"
              className="account"
              onClick={() => setMenuOpen(false)}
              aria-label="Account"
            >
              <svg
                className="icon-account"
                width="20"
                height="20"
                viewBox="0 0 16 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.024 17.0559V15.3068C15.024 14.379 14.6555 13.4892 13.9994 12.8332C13.3434 12.1772 12.4536 11.8086 11.5258 11.8086H4.52944C3.60166 11.8086 2.71188 12.1772 2.05585 12.8332C1.39981 13.4892 1.03125 14.379 1.03125 15.3068V17.0559"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.02798 8.30986C9.95997 8.30986 11.5262 6.74367 11.5262 4.81167C11.5262 2.87967 9.95997 1.31348 8.02798 1.31348C6.09598 1.31348 4.52979 2.87967 4.52979 4.81167C4.52979 6.74367 6.09598 8.30986 8.02798 8.30986Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
          
          {/* Dark mode toggle in mobile menu */}
          <div className="mt-4" style={{ "--i": 6 }}>
            <button
              onClick={handleToggleTheme}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
            >
              {isDarkMode ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
