import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white text-black border-t border-gray-200 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="fill-current"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="fill-current"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-current"
          />
        </svg>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <div className="flex flex-col items-center text-center mb-24">
          <h2 className="font-semibold text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
            Work with us
          </h2>
          <a
            href="mailto:info@amiya.com"
            className="text-xl md:text-2xl hover:opacity-70 transition-all duration-500 border-b border-black pb-1"
          >
            info@amiya.com
          </a>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-20 border-gray-200 w-full max-w-[90%] mx-auto" />

      {/* Links & Social */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-8 md:gap-x-16 pb-24">
        {/* Shop */}
        <div className="flex flex-col gap-4">
          <h5 className="font-medium text-sm uppercase tracking-wider">Shop</h5>
          <ul className="space-y-3 text-gray-600">
            <li>
              <Link
                to="/new-arrivals"
                className="text-sm hover:text-black transition-colors duration-300"
              >
                New Arrivals
              </Link>
            </li>
            <li>
              <Link
                to="/bestsellers"
                className="text-sm hover:text-black transition-colors duration-300"
              >
                Bestsellers
              </Link>
            </li>
            <li>
              <Link
                to="/clothing"
                className="text-sm hover:text-black transition-colors duration-300"
              >
                Clothing
              </Link>
            </li>
            <li>
              <Link
                to="/accessories"
                className="text-sm hover:text-black transition-colors duration-300"
              >
                Accessories
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="flex flex-col gap-4">
          <h5 className="font-medium text-sm uppercase tracking-wider">
            Support
          </h5>
          <ul className="space-y-3 text-gray-600">
            <li>
              <Link
                to="/help"
                className="text-sm hover:text-black transition-colors duration-300"
              >
                Help Center
              </Link>
            </li>
            <li>
              <Link
                to="/shipping"
                className="text-sm hover:text-black transition-colors duration-300"
              >
                Shipping Info
              </Link>
            </li>
            <li>
              <Link
                to="/returns"
                className="text-sm hover:text-black transition-colors duration-300"
              >
                Returns
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-sm hover:text-black transition-colors duration-300"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className="flex flex-col gap-4">
          <h5 className="font-medium text-sm uppercase tracking-wider">
            Company
          </h5>
          <ul className="space-y-3 text-gray-600">
            <li>
              <Link
                to="/about"
                className="text-sm hover:text-black transition-colors duration-300"
              >
                Our Story
              </Link>
            </li>
            <li>
              <Link
                to="/sustainability"
                className="text-sm hover:text-black transition-colors duration-300"
              >
                Sustainability
              </Link>
            </li>
            <li>
              <Link
                to="/careers"
                className="text-sm hover:text-black transition-colors duration-300"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="text-sm hover:text-black transition-colors duration-300"
              >
                Terms & Privacy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div className="flex flex-col gap-4">
          <h5 className="font-medium text-sm uppercase tracking-wider">
            Follow Us
          </h5>
          <ul className="space-y-3 text-gray-600">
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-black transition-colors duration-300"
              >
                <Instagram size={16} /> Instagram
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-black transition-colors duration-300"
              >
                <Facebook size={16} /> Facebook
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-black transition-colors duration-300"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 border-t border-gray-200">
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Wordmark */}
          <h1 className="font-extrabold font-[PPR] text-3xl tracking-tight order-2 md:order-1">
            AMIYA
          </h1>

          {/* Copyright */}
          <div className="text-sm text-gray-600 order-1 md:order-2">
            © {year} AMIYA. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
