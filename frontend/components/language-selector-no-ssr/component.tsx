import React, { useState, useCallback, useEffect } from 'react';

import { translateText } from 'helpers/transifex';

import Button from 'components/button';
import Icon from 'components/icon';
import Menu, { MenuItem } from 'components/menu';

import ChevronDownIcon from 'svgs/chevron-down.svg?sprite';

import { getSimplifiedLanguageName, getSimplifiedLanguageCode } from './helpers';
import { LanguageSelectorProps } from './types';

export const LanguageSelector: React.FC<LanguageSelectorProps> = () => {
  const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';

  const [languages, setLanguages] = useState<
    ReturnType<typeof window.Transifex.live.getAllLanguages>
  >([]);
  const [languageCode, setLanguageCode] = useState('en');

  const onChangeLanguage = useCallback((newLanguageCode) => {
    setLanguageCode(newLanguageCode);
    if (window.Transifex?.live) {
      window.Transifex.live.translateTo(newLanguageCode);
    }
  }, []);

  useEffect(() => {
    if (window.Transifex?.live) {
      window.Transifex.live.onReady(() => {
        onChangeLanguage(window.Transifex.live.detectLanguage());
        window.Transifex.live.onFetchLanguages((availableLanguages) => {
          setLanguages(
            availableLanguages
              .filter((l) => !l.source)
              .map((l) => ({ ...l, name: getSimplifiedLanguageName(l.name) }))
              .sort((a, b) => a.code.localeCompare(b.code))
          );
        });
      });
    }
  }, [isProduction, onChangeLanguage]);

  return (
    <>
      {languages.length > 0 && (
        <Menu
          className="notranslate"
          Trigger={
            <Button
              theme="naked"
              size="small"
              className="pl-4 pr-4 focus-visible:outline-green-dark"
              aria-label={translateText('Language: {language}', {
                language: getSimplifiedLanguageName(
                  languages.find((language) => language.code === languageCode)?.name ?? ''
                ),
              })}
            >
              <span>
                {getSimplifiedLanguageCode(
                  languages.find((language) => language.code === languageCode)?.code ?? ''
                ).toUpperCase()}
              </span>
              <Icon icon={ChevronDownIcon} className="inline-block ml-1 h-4 w-4 fill-current" />
            </Button>
          }
          align="end"
          onAction={(key) => onChangeLanguage(key as string)}
        >
          {languages.map((language) => (
            <MenuItem key={language.code}>
              {`${getSimplifiedLanguageCode(language.code).toUpperCase()} - ${language.name}`}
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  );
};

export default LanguageSelector;
