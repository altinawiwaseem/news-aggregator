/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      zIndex: {
        100: "100",
      },
      fontSize: {
        sm: "0.8rem",
      },
      height: {
        128: "32rem",
        152: "38rem",
        184: "46rem",
        228: "52rem",
      },
      maxHeight: {
        152: "38rem",
        128: "32rem",
        228: "52rem",
      },
      boxShadow: {
        "3xl": "8px 8px 0px 0px #0d1117",
        "4xl": "4px 4px 0px 0px #FFD51C",
        "5xl": "4px 4px 0px 0px #5855D8",
        "6xl": "0 -2px 10px rgba(0, 0, 0, 1)",
        "7xl": "4px 4px 0px 0px #475569",
        "8xl": "8px 8px 0px 0px #633EF4",
        "9xl": "14px 14px 0px 0px #D3D2DB",
        "10xl": "14px 14px 0px 0px #677CF4",
      },
      colors: {
        // dark-mode
        "bg-xiketic": "#15141E",
        "input-space-cadet": "#202033",
        "cyber-yellow": "#FFD51C",
        "btn-majorelle-blue": "#5855D8",
        "nav-raisin-black": "#2B2B33",
        "nav-raisin-black-2": "#2C2C3A",
        "nav-raisin-black-3": "#353546",
        "nav-raisin-black-4": "#3D3D51",
        "dark-raisin-black": "#1E1E27",
        snow: "#FFFBFC",
        "text-ghost-white": "#F0EFF3",

        "oxford-blue": "#1f293b",
        "sonic-silver": "#6F86A5",
        "ultramarine-blue": "#5068F2",
        "dark-purple": "#081a51",
        "han-purple": "#5832F3",

        white: "rgb(255,255,255)",
        jet: "#2D2D2D",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
