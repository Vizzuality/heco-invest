/**
 * Return the translated version of the string based on the current Transifex language
 * @param string String to translate
 * @param variables Variables that shouldn't be part of the translation
 * @returns Translated string
 */
export const translateText = (string: string, variables?: Record<string, string>): string => {
  if (typeof window !== 'undefined' && window.Transifex && string) {
    return window.Transifex.live.translateText(string, variables);
  }

  // When rendered on the server, we still want the original string to be displayed correctly
  return Object.keys(variables ?? {}).reduce(
    (res, variable) => string.replace(`{${variable}}`, variables[variable]),
    string
  );
};

/**
 * Translate a node based on the current Transifex language
 * @param node Node to translate
 */
export const translateNode = (node: HTMLElement): void => {
  if (typeof window !== 'undefined' && window.Transifex && node) {
    return window.Transifex.live.translateNode(node);
  }

  return null;
};
