/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blush: "#FFC0CB",
        /** Deep romantic red — does not shadow Tailwind's `rose` scale */
        love: "#FF4D6D",
        gold: "#D4AF37",
      },
      fontFamily: {
        display: ["Great Vibes", "cursive"],
        body: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Outfit", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "soft-gradient":
          "linear-gradient(135deg, #fff5f7 0%, #ffe4ec 35%, #ffd6e0 70%, #fff9fb 100%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(255, 77, 109, 0.35), 0 0 80px rgba(255, 192, 203, 0.2)",
        "glow-gold": "0 0 30px rgba(212, 175, 55, 0.4)",
      },
    },
  },
  plugins: [],
};
