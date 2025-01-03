/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  important:true,
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "../src-tauri/**/*.{html,js}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};