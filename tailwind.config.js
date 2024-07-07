import colors from "tailwindcss/colors";
import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
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
    require('flowbite/plugin')
  ],
}