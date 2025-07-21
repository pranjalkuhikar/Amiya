import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-lightgray to-primary/10 flex items-center justify-center font-sans">
      <section
        className="w-full max-w-md bg-white/95 rounded-3xl shadow-xl p-10 border border-gray"
        style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
      >
        <h1 className="text-3xl font-extrabold mb-6 text-primary text-center">
          Create Your Amiya Account
        </h1>
        <form className="flex flex-col gap-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-black mb-2 font-semibold">
                First Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray focus:outline-none focus:ring-2 focus:ring-primary transition bg-lightgray text-black"
                placeholder="First Name"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-black mb-2 font-semibold">
                Last Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray focus:outline-none focus:ring-2 focus:ring-primary transition bg-lightgray text-black"
                placeholder="Last Name"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-black mb-2 font-semibold">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-gray focus:outline-none focus:ring-2 focus:ring-primary transition bg-lightgray text-black"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-black mb-2 font-semibold">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 rounded-lg border border-gray focus:outline-none focus:ring-2 focus:ring-primary transition pr-12 bg-lightgray text-black"
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                className="btn btn-ghost absolute right-3 top-1/2 -translate-y-1/2 text-sm"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-full">
            Create Account
          </button>
        </form>
        <div className="text-center mt-6 text-gray">
          Already have an account?{" "}
          <Link to="/login" className="btn btn-link">
            Login
          </Link>
        </div>
      </section>
    </main>
  );
};

export default SignUp;
