import React, { useCallback, useMemo } from 'react';

import { useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import Button from 'components/button';
import Icon from 'components/icon';
import Menu, { MenuItem } from 'components/menu';
import localesConfig from 'locales.config.json';

import ChevronDownIcon from 'svgs/chevron-down.svg';

import { LanguageSelectorProps } from './types';

export const LanguageSelector: React.FC<LanguageSelectorProps> = () => {
  const router = useRouter();
  const intl = useIntl();

  const uiLanguages = useMemo(
    () => localesConfig.locales.sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  const onChangeLanguage = useCallback(
    (newLanguageCode) => {
      const { pathname, query, asPath } = router;

      // Navigate to the same route but with a different locale
      // NOTE: Transifex listens to `router.locale` in `pages/_app.tsx`
      router.push({ pathname, query }, asPath, { locale: newLanguageCode });

      // Set a cookie for 1 year so that the user preference is kept
      document.cookie = `NEXT_LOCALE=${newLanguageCode}; path=/; max-age=31536000; secure`;
    },
    [router]
  );

  if (uiLanguages.length === 0) {
    return null;
  }

  return (
    <Menu
      Trigger={
        <Button
          theme="naked"
          size="small"
          className="pl-4 pr-4 focus-visible:outline-green-dark"
          aria-label={intl.formatMessage(
            { defaultMessage: 'Language: {language}', id: 'M1xKEI' },
            {
              language:
                uiLanguages.find((language) => language.locale === router.locale)?.name ?? '',
            }
          )}
        >
          <span>
            {(
              uiLanguages.find((language) => language.locale === router.locale)?.locale ?? ''
            ).toUpperCase()}
          </span>
          <Icon icon={ChevronDownIcon} className="inline-block w-4 h-4 ml-1" />
        </Button>
      }
      align="end"
      onAction={(key) => onChangeLanguage(key as string)}
    >
      {uiLanguages.map((language) => (
        <MenuItem key={language.locale}>
          {`${language.locale.toUpperCase()} - ${language.name}`}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default LanguageSelector;
