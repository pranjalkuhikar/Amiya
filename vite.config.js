import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          "react-vendor": ["react", "react-dom"],

          // Routing
          router: ["react-router-dom"],

          // State management
          redux: ["@reduxjs/toolkit", "react-redux"],

          // Animations
          animations: ["framer-motion", "gsap"],

          // UI libraries
          "ui-icons": ["lucide-react", "react-icons"],

          // Authentication
          auth: ["@clerk/clerk-react"],

          // Other utilities
          utils: ["lenis", "react-toastify", "keen-slider"],
        },
      },
    },
    // Increase chunk size warning limit to 1000kb (optional)
    chunkSizeWarningLimit: 1000,
  },
});
