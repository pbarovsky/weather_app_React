/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      screens: {
        'sm': '320px',
        'sl': '520px',
        'md': '690px',
        'lg': '1024px',
        'xl': '1235px',
      },
      colors: {
        "ccc": "#ccc",
        "blue-gray": '#F4F7FC',
        'white': '#fff',
        'black': '#1b1b1b',
      },
    },
  },
  plugins: [],
}

