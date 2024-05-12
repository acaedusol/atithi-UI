/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: ["./src/**/*.{html,ts,css}"],
  theme: {
    screens: {
      'xs': '375px',
    },
    extend: {},
  },
  plugins: [],
}

