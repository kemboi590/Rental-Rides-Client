import colors from "tailwindcss/colors";
import daisyui from "daisyui"
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text-light': '#f7fafc',
        'webcolor': '#FF914D',
      }
    },
  },
  plugins: [
    daisyui,
  ],
}