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
        middle: '#FBF7F2',
        dark: '#EFEDE9',
      },
      gray: {
        200: '#E5E7EB',
        400: '#B5B5B5',
        600: '#999999',
        800: '#585858',
        900: '#1D1D1B',
      },
      green: {
        light: '#CFD762',
        dark: '#316146',
      },
      red: '#BF3300',
      orange: '#F4A064',
      black: '#000000',
      white: '#FFFFFF',
      beige: '#E3DED6',
      category: {
        forestry: '#E57D57',
        tourism: '#4492E5',
        production: '#404B9A',
        agrosystems: '#E7C343',
      },
      current: 'currentColor',
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgb(233 233 233 / 0.25), 0 0 15px 0 rgb(223 215 206 / 0.3)',
      DEFAULT: '0 4px 15px 0 rgb(220 220 220 / 0.5)',
      lg: '0 4px 15px 0 rgb(176 176 176 / 0.25)',
      xl: '0 8px 16px rgb(0 0 0 / 0.07)',
      '2xl': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)',
      // Useful for animations
      transparent: '0 4px 15px 0 rgb(220 220 220 / 0)',
      search: '0 0 32px rgb(0 0 0 / 0.25)',
      none: 'none',
    },
    extend: {
      spacing: {
        4.5: '1.125rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
