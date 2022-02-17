// lint-staged.config.js
// workaround for type checks https://github.com/microsoft/TypeScript/issues/27379#issuecomment-883154194
module.exports = {
  '*.{js,jsx,ts,tsx}': 'eslint --fix',
  '**/*.ts?(x)': () => 'tsc --noEmit',
};
