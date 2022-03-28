import { FC } from 'react';

import { FormattedMessage } from 'react-intl';

import { AriaLiveProps } from './types';

export const AriaLive: FC<AriaLiveProps> = ({ currentSlide, numSlides }) => (
  <div className="sr-only" aria-live="polite" aria-atomic="true">
    <FormattedMessage
      defaultMessage="Slide {slide} out of {total}"
      values={{
        slide: currentSlide + 1,
        total: numSlides,
      }}
      id="xjBcRf"
    />
  </div>
);

export default AriaLive;
