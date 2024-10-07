/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "50%": { transform: "translateX(5px)" },
          "75%": { transform: "translateX(-5px)" },
        },
        slideIn: {
          "0%": {
            transform: "translateY(-20px) translateX(-20px)",
            opacity: "0",
            filter: "blur(5px)",
          },
          "100%": {
            transform: "translateY(0) translateX(0)",
            opacity: "1",
            filter: "blur(0)",
          },
        },
      },
      animation: {
        shake: "shake 0.4s ease-in-out",
        slideIn: "slideIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
      backgroundImage: {
        "global-gradient":
          "linear-gradient(to bottom right, #1f2937, #000000, #111827)",
      },
    },
  },
  plugins: [require("rippleui")],
};
