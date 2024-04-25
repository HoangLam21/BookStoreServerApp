/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {},
    colors:{
      'primary--color' : '#513820',
      'backgrond--color' : '#F7F7F7',
      'header--lightcolor': '#A79B8F',
      'border--lightcolor': '#E5E1DE',
      'white--color': '#fff',
      'backgroud--lightcolor': '#F3F1EF',
      'border--color': '#EEEBE9'
    }
  },
  plugins: [require('tailwind-scrollbar'),
],
}

