const forms = require('@tailwindcss/forms');

module.exports = {
  content: ['./**/*.ts', './**/*.tsx'],
  theme: {
    fontFamily: {
      sans: ['Work\\ Sans', 'sans-serif'],
      serif: ['Cormorant', 'serif'],
    },
    colors: {
      background: {
        light: '#FFFDFA',
        dark: '#EFEDE9',
      },
      gray: {
        400: '#B5B5B5',
        600: '#999999',
        800: '#585858',
      },
      green: {
        dark: '#316146',
        light: '#CFD762',
      },
      red: '#BF3300',
      orange: '#F4A064',
      black: '#000000',
      white: '#FFFFFF',
      category: {
        forestry: '#E57D57',
        tourism: '#4492E5',
        production: '#404B9A',
        agrosystems: '#E7C343',
      },
    },
  },
  plugins: [forms],
};
