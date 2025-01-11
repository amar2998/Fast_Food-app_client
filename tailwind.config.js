/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "cusblue":"#34C2A6",
        "redvio":"#DD1168",
        "secondary":"#555",
        "primary":"#fcfcfc"
      },
      fontFamily:{
        "primaryfont":["Ubuntu", 'sans-serif']
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

