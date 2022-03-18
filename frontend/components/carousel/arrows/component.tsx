import { FC } from 'react';

import { useIntl } from 'react-intl';

import { ArrowsProps } from './types';

export const Arrows: FC<ArrowsProps> = ({
  className,
  currentSlide,
  numSlides,
  onPreviousSlideClick,
  onNextSlideClick,
}) => {
  const intl = useIntl();

  return (
    <div className={className}>
      {currentSlide > 0 && (
        <button
          aria-label={intl.formatMessage({
            defaultMessage: 'Previous slide',
            id: 'MH3koz',
          })}
          className="absolute w-8 h-8 bg-white border rounded-full shadow cursor-pointer -left-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark"
          onClick={onPreviousSlideClick}
        >
          &lt;
        </button>
      )}

      {currentSlide < numSlides - 1 && (
        <button
          aria-label={intl.formatMessage({
            defaultMessage: 'Next slide',
            id: 'Y9bYKH',
          })}
          className="absolute w-8 h-8 bg-white border rounded-full shadow cursor-pointer -right-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark"
          onClick={onNextSlideClick}
        >
          &gt;
        </button>
      )}
    </div>
  );
};

export default Arrows;
