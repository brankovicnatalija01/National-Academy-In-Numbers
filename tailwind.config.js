/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "21px": "21px",
        "9px": "9px",
        "12px": "12px",
        "18px": "18px",
        "30px": "30px",
        "35px": "35px",
        "24px": "24px",
      },
      backgroundImage: {
        customBlue:
          "radial-gradient(at 100% 100%, rgb(219, 234, 254), rgb(147, 197, 253), rgb(59, 130, 246))",
        test2:
          "linear-gradient(to top, rgb(55, 65, 81), rgb(17, 24, 39), rgb(0, 0, 0))",
      },
      spacing: {
        7.5: "30px", // Add this line
      },
    },
  },
  plugins: [],
};
