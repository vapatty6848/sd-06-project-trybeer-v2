module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'app-background': '#e5e7eb',
        primary: '#00caf9',
        'primary-light': '#6afdff',
        'primary-dark': '#0099c6',
        secondary: '#00f98a',
        'secondary-light': '#6bffbb',
        'secondary-dark': '#00c55b',
      },
      keyframes: {
        'fade-hide': {
            '0%': {
                opacity: '1'
            },
            '100%': {
                opacity: '0'
            },
        },
      },
      animation: {
          'fade-hide': 'hide 1s'
      }
    },
  },
  variants: {
    extend: {
      whitespace: ['hover', 'focus'],
    },
  },
  plugins: [],
}