/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      screens: {
        "2xl": "1280px",
        xl: "1220px",
        lg: "1024px",
        md: "800px",
        sl: "520px",
        sm: "420px",
        xs: "320px",
      },
      colors: {
        ccc: "#ccc",
        "blue-gray": "#F4F7FC",
        white: "#fff",
        black: "#1b1b1b",
        backdrop: "rgba(0, 0, 0, 0.13)",
      },
      boxShadow: { 
        'custom': '0px 4px 10px rgba(0, 0, 0, 0.2)', 
      }
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        body: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif`,
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
      });
    },
  ],
};
