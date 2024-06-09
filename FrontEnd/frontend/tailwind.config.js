/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
   extend: {
      fontFamily: {
        'garamond': ['Cormorant Garamond', 'serif'],
      },
      
      screens: {
        'custom': '1000px',
      }
    },
    colors:{
      'primary--color' : '#513820',
      'backgrond--color' : '#F7F7F7',
      'header--lightcolor': '#A79B8F',
      'border--lightcolor': '#E5E1DE',
      'white--color': '#fff',
      'backgroud--lightcolor': '#F3F1EF',
      'border--color': '#EEEBE9',
      'status--0': '#A52A2A',
      'status--1-3':'#191970	',
      'status--4':'#006400',
      'color-main':'#513820',
      'color-background-main':'#f6f5f4',
      'color-main-2': '#a89b8f',
      'background-button': "#E5E2DF",
      'background--overlay':"#000000",
      'white': '#fff',
      'black':"#000000",


    }
  },
  plugins: [require('tailwind-scrollbar'),
  "react-html-attrs",
      function({ addUtilities }) {
        addUtilities({
          '.line-through-red': {
            'text-decoration-line': 'line-through',
            'text-decoration-color': 'red',
          },
        }, ['responsive', 'hover']);
      },
    ],
}

