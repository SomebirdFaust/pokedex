/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,vue,ts,jsx,tsx}"],
  theme: {
    colors : {
      gray: {
        100: '#f7fafc'
      }
    },
    extend: {},
  },
  plugins: [],
}

module.exports = {
  theme: {
    borderRadius: {
      'none' : '0',
      'sm' : '0.125rem',
      DEFAULT: '.25rem',
      'lg': '.5rem',
      'full': '9999px',
    },
    extend: {
      colors: {
        red: 'rgb(255, 200, 200)',
        blue: 'rgb(152, 186, 255)',
      }
    }
  }
}
