/** @type {import('tailwindcss').Config} */
export default {
    content: [],
    theme: {
      extend: {},
    },
    plugins: [require('daisyui')],
    safelist: [
      'alert-info',
      'alert-success',
    ]
  }
  