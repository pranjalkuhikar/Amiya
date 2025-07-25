import { Link, useLocation } from "react-router-dom";
import { useAuth, UserButton } from "@clerk/clerk-react";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartCount } from "../../../features/cartSlice";

import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.scss";

const Navbar = () => {
  const { isSignedIn } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const navRef = useRef(null);

  // Use Redux instead of Context API
  const cartCount = useSelector(selectCartCount);

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

  // Cart counter component with animation
  const CartCounter = () => {
    const isCartUpdated = useSelector((state) => state.cart.isCartUpdated);

    return (
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            key="cart-count"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{
              scale: isCartUpdated ? [1, 1.2, 1] : 1,
              opacity: 1,
              backgroundColor: isCartUpdated
                ? ["#4F46E5", "#EF4444", "#4F46E5"]
                : "#EF4444",
            }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{
              duration: isCartUpdated ? 0.4 : 0.2,
              times: isCartUpdated ? [0, 0.5, 1] : [0, 1],
            }}
            className="absolute top-0 right-2 flex items-center justify-center rounded-full text-white text-xs font-medium"
            style={{
              minWidth: "20px",
              height: "20px",
              padding: cartCount > 9 ? "0 2px" : "0",
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
      <nav ref={navRef} className={`${scrolled ? "scrolled" : ""}`}>
        <Link to="/" className="logo w-40">
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
        </Link>
        <div className="menu desktop-menu">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="nav-btn-group">
          <Link to="/cart" className="nav-btn-item">
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
          <span className="nav-btn-divider"></span>
          {isSignedIn ? (
            <div className="nav-btn-item">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-6 h-6",
                    userButtonTrigger: "focus:shadow-none",
                  },
                }}
              />
            </div>
          ) : (
            <Link to="/sign-in" className="nav-btn-item group">
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
          )}
        </div>

        <div className="right-side-nav-items">
          <button
            className="hamburger"
            aria-label="Open menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={menuOpen ? "open" : ""}></span>
            <span className={menuOpen ? "open" : ""}></span>
            <span className={menuOpen ? "open" : ""}></span>
          </button>
        </div>
        <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
          <div className="mobile-nav-links">
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
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
