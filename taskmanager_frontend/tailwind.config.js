/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Make sure this includes all the files where Tailwind classes will be used
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

