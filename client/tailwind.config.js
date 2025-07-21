/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Helvetica"],
      },
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
      colors: {
        primary: "#f15025", // Orange
        white: "#ffffff",
        lightgray: "#e6e8e6",
        gray: "#ced0ce",
        black: "#191919",
      },
    },
  },
  corePlugins: {
    fontFamily: true,
  },
  plugins: [],
};
