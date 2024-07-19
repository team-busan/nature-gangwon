/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8c7ae6",
        lightGreen : "#C7F7C6",
        paleGreen : "#3BF17C",
        softGreen : "#1ED760",
        green : "#00A05B",
        darkGreen : "#00704A",
        deepGreen : "#1E3932"
      },
      width : {
        '1420' : '1420px'
      },
      height : {
        '104': '26rem',
        '112': '28rem',
        '120': '30rem',
        '128': '32rem',
        '136': '34rem',
        '144': '36rem',
        '160': '40rem',
      },
    },
  },
  corePlugins: {
    preflight: true,
  },
  plugins: [],
};
