import dynamic from 'next/dynamic';

const LanguageSelector = dynamic(import('./component'), { ssr: false });

export type { LanguageSelectorProps } from './types';
export default LanguageSelector;
