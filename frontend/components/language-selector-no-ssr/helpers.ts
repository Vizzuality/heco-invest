/**
 * Return the name of a language without the name of its variant e.g. “Spanish (Latin America)”
 * becomes “Spanish”
 * @param language Name of a language
 * @returns Simplified language name
 */
export const getSimplifiedLanguageName = (language: string): string =>
  language.replace(/\s\(.+\)/, '');

/**
 * Return the code of a language without the code of its variant e.g. “es_419” becomes “es”
 * @param languageCode Code of a language
 * @returns Simplified language code
 */
export const getSimplifiedLanguageCode = (languageCode: string): string =>
  languageCode.replace(/_(.+)$/, '');
