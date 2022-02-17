import React, { useCallback, useMemo } from 'react';

import { useRouter } from 'next/router';

import { useT, useLanguages } from '@transifex/react';

import Button from 'components/button';
import Icon from 'components/icon';
import Menu, { MenuItem } from 'components/menu';

import ChevronDownIcon from 'svgs/chevron-down.svg';

import { getSimplifiedLanguageName, getSimplifiedLanguageCode } from './helpers';
import { LanguageSelectorProps } from './types';

export const LanguageSelector: React.FC<LanguageSelectorProps> = () => {
  const router = useRouter();
  const languages = useLanguages();
  const t = useT();

  const uiLanguages = useMemo(
    () =>
      languages
        .filter((l) => l.code !== 'zu')
        .map((l) => ({ ...l, name: getSimplifiedLanguageName(l.name) }))
        .sort((a, b) => a.code.localeCompare(b.code)),
    [languages]
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
          aria-label={t('Language: {language}', {
            language: getSimplifiedLanguageName(
              uiLanguages.find((language) => language.code === router.locale)?.name ?? ''
            ),
          })}
        >
          <span>
            {getSimplifiedLanguageCode(
              uiLanguages.find((language) => language.code === router.locale)?.code ?? ''
            ).toUpperCase()}
          </span>
          <Icon icon={ChevronDownIcon} className="inline-block w-4 h-4 ml-1 fill-current" />
        </Button>
      }
      align="end"
      onAction={(key) => onChangeLanguage(key as string)}
    >
      {uiLanguages.map((language) => (
        <MenuItem key={language.code}>
          {`${getSimplifiedLanguageCode(language.code).toUpperCase()} - ${language.name}`}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default LanguageSelector;
