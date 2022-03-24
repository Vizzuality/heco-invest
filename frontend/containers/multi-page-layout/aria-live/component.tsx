import React from 'react';

import { FormattedMessage } from 'react-intl';

import { MultiPageLayoutAriaLiveProps } from './types';

export const MultiPageLayoutAriaLive: React.FC<MultiPageLayoutAriaLiveProps> = ({
  currentPage,
  numPages,
  title,
}: MultiPageLayoutAriaLiveProps) => (
  <span className="sr-only" aria-live="polite" aria-atomic="true">
    <FormattedMessage
      defaultMessage="{title} - page {currentPage} out of {numPages}"
      values={{
        title: title,
        currentPage: currentPage + 1,
        numPages: numPages,
      }}
      id="0cWjQP"
    />
  </span>
);

export default MultiPageLayoutAriaLive;
