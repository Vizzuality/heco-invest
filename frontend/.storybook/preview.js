import React from 'react';

import { themes } from '@storybook/theming';
import { OverlayProvider } from '@react-aria/overlays';
import { SSRProvider } from '@react-aria/ssr';
import { reactIntl, localesNames } from './react-intl.js';
import '../styles/globals.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      order: [
        'Intro',
        'Docs',
        ['Install', 'Deploy', 'Authentication', 'Fetching', 'Media', 'Tests'],
        'Components',
      ],
    },
  },
  docs: {
    theme: themes.dark,
  },
  reactIntl,
  locale: reactIntl.defaultLocale,
  locales: localesNames,
};

export const decorators = [
  (Story) => {
    return (
      <SSRProvider>
        <OverlayProvider>
          <div className="bg-background-light">{Story()}</div>
        </OverlayProvider>
      </SSRProvider>
    );
  },
];
