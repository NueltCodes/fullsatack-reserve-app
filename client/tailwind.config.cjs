/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        bounce: "bounce 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        pulse: "pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      colors: {
        primary: "#F5385D",
      },
    },
  },
  plugins: [],
};
