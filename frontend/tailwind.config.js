const forms = require('@tailwindcss/forms');
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./**/*.ts', './**/*.tsx'],
  theme: {
    fontFamily: {
      sans: ['Work\\ Sans', 'sans-serif'],
      serif: ['Cormorant', 'serif'],
    },
    extend: {
      // This is needed for the upgrade to Tailwind CSS 3:
      // https://tailwindcss.com/docs/upgrade-guide#removed-color-aliases
      colors: {
        green: colors.emerald,
        yellow: colors.amber,
        purple: colors.violet,
      },
    },
  },
  plugins: [forms],
};
