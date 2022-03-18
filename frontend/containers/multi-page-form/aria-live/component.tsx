import React from 'react';

import { FormattedMessage } from 'react-intl';

import { MultiPageFormAriaLiveProps } from './types';

export const MultiPageFormAriaLive: React.FC<MultiPageFormAriaLiveProps> = ({
  currPage,
  numPages,
  title,
}: MultiPageFormAriaLiveProps) => (
  <span className="sr-only" aria-live="polite" aria-atomic="true">
    <FormattedMessage
      defaultMessage="{title} - page {currentPage} out of {numPages}"
      values={{
        title: title,
        currentPage: currPage + 1,
        numPages: numPages,
      }}
      id="0cWjQP"
    />
  </span>
);

export default MultiPageFormAriaLive;
