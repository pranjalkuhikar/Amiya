import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-t from-gray-900 via-gray-900 to-gray-800 border-t border-gray-800 text-gray-300 text-sm min-h-[50vh] flex flex-col">
      {/* decorative wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none -translate-y-1 pointer-events-none">
        <svg className="relative block w-[calc(100%+1.3px)] h-12" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M0,0 C30,100 70,100 100,0 L100,100 L0,100 Z" fill="currentColor" /></svg>
      </div>

      {/* upper section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-12 md:grid-cols-4">
        {/* Brand */}
        <div className="space-y-4 md:col-span-1">
          <h3 className="font-extrabold text-2xl tracking-tight">trueKind.</h3>
          <p className="max-w-[14rem] text-gray-600 text-xs">
            Clean, Conscious, Clinical Skincare Honest products that truly work
          </p>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-4">Explore</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/shop" className="hover:text-white transition-colors duration-150 relative after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-px after:w-0 after:bg-current after:transition-all hover:after:w-full">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/philosophy" className="hover:text-white transition-colors duration-150 relative after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-px after:w-0 after:bg-current after:transition-all hover:after:w-full">
                Philosophy
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-white transition-colors duration-150 relative after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-px after:w-0 after:bg-current after:transition-all hover:after:w-full">
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/journal" className="hover:text-white transition-colors duration-150 relative after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-px after:w-0 after:bg-current after:transition-all hover:after:w-full">
                Journal
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white transition-colors duration-150 relative after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-px after:w-0 after:bg-current after:transition-all hover:after:w-full">
                Sign Up / Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h4 className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-4">Follow Us</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-150 relative after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-px after:w-0 after:bg-current after:transition-all hover:after:w-full"
              >
                <span className="flex items-center gap-2"><Instagram size={16}/> Instagram</span>
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-150 relative after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-px after:w-0 after:bg-current after:transition-all hover:after:w-full"
              >
                <span className="flex items-center gap-2"><Facebook size={16}/> Facebook</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="mailto:tk@brandesofia.com"
                className="hover:text-white transition-colors duration-150 relative after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-px after:w-0 after:bg-current after:transition-all hover:after:w-full"
              >
                tk@brandesofia.com
              </a>
            </li>
            <li>
              <a href="tel:+911112223333" className="hover:text-white transition-colors duration-150 relative after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-px after:w-0 after:bg-current after:transition-all hover:after:w-full">
                +91-11-2222-3333
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t py-4 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span>
            &copy; {new Date().getFullYear()} trueKind, All Rights Reserved
          </span>
          <div className="space-x-6">
            <Link to="/disclaimer" className="hover:text-white transition-colors duration-150 relative after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-px after:w-0 after:bg-current after:transition-all hover:after:w-full">
              Disclaimer
            </Link>
            <Link to="/credits" className="hover:text-white transition-colors duration-150 relative after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-px after:w-0 after:bg-current after:transition-all hover:after:w-full">
              Credits
            </Link>
            <a
              href="https://abhishekandpokesa.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-150 relative after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-px after:w-0 after:bg-current after:transition-all hover:after:w-full"
            >
              Website by Abhishek &amp; Pokesa
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
