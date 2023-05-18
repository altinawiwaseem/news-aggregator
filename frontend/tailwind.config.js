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
        "6xl": "6px 6px 0px 0px #252a31",
        "7xl": "4px 4px 0px 0px #475569",
        "8xl": "8px 8px 0px 0px #633EF4",
        "9xl": "14px 14px 0px 0px #D3D2DB",
        "10xl": "14px 14px 0px 0px #677CF4",
      },
      colors: {
        // dark-mode
        "bg-xiketic": "#15141E",
        "card-space-cadet": "#202033",
        "nav-raisin-black": "#2B2B33",
        "nav-raisin-black-2": "#2C2C3A",
        "nav-raisin-black-3": "#353546",
        "nav-raisin-black-4": "#3D3D51",
        "dark-raisin-black": "#1E1E27",
        "btn-majorelle-blue": "#5855D8",
        "text-ghost-white": "#F0EFF3",
        "menu-dark-silver-metallic": "#A6A4AD",
        "menu-silver-metallic": "#B5B3BB",
        "link-violet-blue": "#7170D9",
        "cyber-yellow": "#FFD51C",
        "oxford-blue": "#1f293b",
        "sonic-silver": "#6F86A5",
        "ultramarine-blue": "#5068F2",
        "dark-purple": "#081a51",
        // current best-combo
        "black-choral": "#475569",
        "spanish-gray": "#BABABA",
        "sky-blue": "#29DEF2",
        snow: "#FFFBFC",
        "cerulean-blue": "#4458C7",
        //test
        "blue-green": "#6CB0A8",
        "persian-indigo": "#290773",
        "prussian-blue": "#333F54",
        "ultramarine-blue-2": "#677CF4",
        "cornflower-blue": "#7D88FF",
        "javascript-yellow": "#F0DB4F",
        //git
        "git-nav": "#161b22",
        "git-box": "#252a31",
        "git-background": "#0d1117",
        //
        magnolia: "F6F4FE",
        "han-purple": "#5832F3",
        "han-purple-200": "#633EF4",
        "han-purple-300": "#532BF3",
        "lavender-web": "#E3DFFF",
        "cool-gray": "#818AA3",
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
