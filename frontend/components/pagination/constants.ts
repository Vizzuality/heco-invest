export const THEMES = {
  default: {
    listClasses: 'flex flex-wrap items-center justify-center gap-2 py-3',
    buttonClasses: {
      default: 'justify-center w-10 h-10 focus-visible:!outline-green-dark',
      active: 'justify-center w-10 h-10 focus-visible:!outline-green-dark',
    },
    buttonTheme: {
      default: 'primary-white',
      active: 'primary-green',
    },
  },
  compact: {
    listClasses: 'flex flex-wrap items-center justify-center gap-y-2 gap-x-3 py-3',
    buttonClasses: {
      default: 'text-gray-400 justify-center w-6 h-6 focus-visible:!outline-green-dark',
      active: 'text-green-dark justify-center w-6 h-6 focus-visible:!outline-green-dark',
    },
    buttonTheme: {
      default: 'naked',
      active: 'naked',
    },
  },
};
