import React from "react";

// Example: You can use Framer Motion for animations if installed
// import { motion } from "framer-motion";

const Home = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-lightgray to-primary/10 flex flex-col items-center justify-center font-sans">
      {/* Hero Section */}
      <section className="w-full max-w-3xl text-center py-16 px-6 rounded-3xl shadow-xl bg-white/90 backdrop-blur-md border border-gray mb-10">
        <h1
          className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-black"
          style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
        >
          Amiya <span className="text-primary">2025</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray mb-8">
          Redefining fashion for the future. Discover, shop, and express
          yourself with Amiya.
        </p>
        <a href="#shop" className="btn btn-primary btn-lg">
          Shop Now
        </a>
      </section>

      {/* Newsletter Signup */}
      <section className="w-full max-w-md bg-white/95 rounded-2xl shadow-lg p-8 flex flex-col items-center border border-gray">
        <h2
          className="text-2xl font-semibold mb-2 text-black"
          style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
        >
          Want to Join our Newsletter?
        </h2>
        <form className="w-full flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email*"
            className="w-full px-4 py-2 rounded-lg border border-gray focus:outline-none focus:ring-2 focus:ring-primary transition bg-lightgray text-black"
            required
            style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
          />
          <button
            type="submit"
            className="btn btn-primary btn-full"
            style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
          >
            Subscribe
          </button>
        </form>
        <p className="text-xs text-gray mt-2">
          By subscribing, you agree to Amiya's Privacy Policy.
        </p>
      </section>
    </main>
  );
};

export default Home;
