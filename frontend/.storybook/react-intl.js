const { locales: config } = require('../locales.config.json');

const locales = config.map(({ locale }) => locale);
const defaultLocale = config.find((locale) => locale.default).locale;

const messages = locales.reduce((acc, locale) => ({
  ...acc,
  [locale]: require(`../lang/compiled/${locale}.json`),
}), {});

const formats = {};

export const reactIntl = {
  defaultLocale,
  locales,
  messages,
  formats,
};

export const localesNames = config.reduce((acc, { locale, name }) => ({
  ...acc,
  [locale]: name
}), {});
