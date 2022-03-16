import { IntlShape } from 'react-intl';

import { LanguageType } from 'types';

export function translatedLanguageNameForLocale(intl: IntlShape, locale: LanguageType): string {
  switch (locale) {
    case 'en':
      return intl.formatMessage({ defaultMessage: 'English', id: 'WkrNSk' });
    case 'pt':
      return intl.formatMessage({ defaultMessage: 'Portuguese', id: 'A4UTjl' });
    default:
      return intl.formatMessage({ defaultMessage: 'Spanish', id: '8WtyrD' });
  }
}
