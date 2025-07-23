import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin, ArrowUp } from "lucide-react";
import "./Footer.scss";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 footer">
      <div className="min-h-screen flex flex-col justify-between">
        {/* Top Section */}
        <div className="part-1 flex flex-col md:flex-row justify-between items-center border-y border-gray-400 p-8 md:px-16">
          <h2 className="text-4xl md:text-7xl font-[PPS] text-center md:text-left mb-4 md:mb-0">
            Work with us
          </h2>
          <a
            href="mailto:info@amiya.com"
            className="text-2xl md:text-4xl font-[PPR] hover:underline"
          >
            info@amiya.com
          </a>
        </div>

        {/* Middle Section */}
        <div className="part-2 flex flex-row justify-start gap-10 md:gap-20 lg:gap-40 md:p-16">
          <div className="flex flex-col gap-5">
            <h3 className="text-xl font-[PPS]">Sitemap</h3>
            <div className="flex flex-col gap-3 text-gray-600">
              <Link to="/" className="hover:text-black transition-colors">
                Home
              </Link>
              <Link to="/shop" className="hover:text-black transition-colors">
                Shop
              </Link>
              <Link to="/about" className="hover:text-black transition-colors">
                About
              </Link>
              <Link
                to="/contact"
                className="hover:text-black transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="text-xl font-[PPS]">Legal</h3>
            <div className="flex flex-col gap-3 text-gray-600">
              <Link to="/terms" className="hover:text-black transition-colors">
                Terms & Conditions
              </Link>
              <Link
                to="/privacy"
                className="hover:text-black transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/cookies"
                className="hover:text-black transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="text-xl font-[PPS]">Socials</h3>
            <div className="flex flex-col md:flex-row gap-5 text-gray-600">
              <Link
                to="https://www.instagram.com/amiyaco"
                className="hover:text-black transition-colors"
                aria-label="Instagram"
              >
                <Instagram />
              </Link>
              <Link
                to="#"
                className="hover:text-black transition-colors"
                aria-label="Facebook"
              >
                <Facebook />
              </Link>
              <Link
                to="#"
                className="hover:text-black transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-around p-8 md:px-16 gap-6">
          <div className="text-6xl md:text-8xl lg:text-[10rem] xl:text-[18rem] font-[PPS] tracking-tight leading-none">
            Amiya
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 hover:underline font-[PPS]"
            aria-label="Back to top"
          >
            Back to top <ArrowUp size={20} />
          </button>
          <div className="text-sm md:text-base font-[PPS] text-center md:text-right">
            &copy; {year} Amiya. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
