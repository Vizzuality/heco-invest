const forms = require('@tailwindcss/forms');

module.exports = {
  content: ['./**/*.ts', './**/*.tsx'],
  theme: {
    fontFamily: {
      sans: ['Work\\ Sans', 'sans-serif'],
      serif: ['Cormorant', 'serif'],
    },
    fontSize: {
      '2xs': ['.625rem', '.75rem'],
      xs: ['.75rem', '1.125rem'],
      sm: ['.875rem', '1.25rem'],
      base: ['1rem', '1.5rem'],
      lg: ['1.125rem', '1.75rem'],
      xl: ['1.3rem', '2rem'],
      '2xl': ['2rem', '2.5rem'],
      '3xl': ['2.5rem', '3rem'],
      '4xl': ['3.5rem', '4rem'],
      '5xl': ['4rem', '5rem'],
      '6xl': ['5.5rem', '6.5rem'],
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
