import React from 'react';

import { OverlayProvider } from '@react-aria/overlays';
import { SSRProvider } from '@react-aria/ssr';
import { reactIntl, localesNames } from './react-intl.js';
import '../styles/globals.css';

export const parameters = {
  controls: { expanded: true },
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
  reactIntl,
  locale: reactIntl.defaultLocale,
  locales: localesNames,
};

export const decorators = [
  (Story) => {
    return (
      <SSRProvider>
        <OverlayProvider>
          {Story()}
        </OverlayProvider>
      </SSRProvider>
    );
  },
];
