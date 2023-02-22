/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'moderate-blue': 'hsl(238, 40%, 52%)',
      'soft-red': 'hsl(358, 79%, 66%)',
      'light-grayish-blue': 'hsl(239, 57%, 85%)',
      'pale-red': 'hsl(357, 100%, 86%)',
      'dark-blue': 'hsl(212, 24%, 26%)',
      'grayish-blue': 'hsl(211, 10%, 45%)',
      'light-gray': 'hsl(223, 19%, 93%)',
      'very-light-gray': 'hsl(228, 33%, 97%)',
      'white': 'hsl(0, 0%, 100%)',
      'purple-700': 'rgb(126 34 206)',
      'purple-200':'rgb(233 213 255)'
    },
    extend: {
      fontFamily: {
        rubik: ['Rubik', 'sans-serif']
      }
    },
  },
  plugins: [],
}
