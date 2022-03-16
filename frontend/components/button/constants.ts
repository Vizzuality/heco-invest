import { ButtonCommonProps } from './types';

export const COMMON_CLASSES =
  'flex items-center rounded-full font-sans transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:pointer-events-none';

export const COLOR_THEMES: Record<NonNullable<ButtonCommonProps['theme']>, string> = {
  'primary-green': `bg-green-dark text-white hover:text-green-light focus-visible:outline-green-dark`,
  'primary-white': `bg-white text-green-dark hover:text-green-light shadow-transparent hover:shadow-lg focus-visible:outline-white`,
  'primary-orange': `bg-orange text-black hover:text-white focus-visible:outline-green-dark`,
  'secondary-green': `bg-green-light/0 border border-green-dark text-green-dark hover:bg-green-light focus-visible:outline-green-dark`,
  'secondary-white': `bg-white/0 border border-white text-white hover:bg-background-light hover:text-green-dark focus-visible:outline-white`,
  naked: '',
};
export const SIZE_THEMES: Record<NonNullable<ButtonCommonProps['size']>, string> = {
  base: `px-10 py-4`,
  small: `px-6 py-2`,
};
