import { FC } from 'react';

import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from 'react-feather';
import { useIntl } from 'react-intl';

import Icon from 'components/icon';

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
          className="absolute flex items-center justify-center w-8 h-8 bg-white border rounded-full shadow cursor-pointer -left-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark"
          onClick={onPreviousSlideClick}
        >
          <Icon className="w-4 h-4 -ml-0.5" icon={ChevronLeftIcon} />
        </button>
      )}

      {currentSlide < numSlides - 1 && (
        <button
          aria-label={intl.formatMessage({
            defaultMessage: 'Next slide',
            id: 'Y9bYKH',
          })}
          className="absolute flex items-center justify-center w-8 h-8 bg-white border rounded-full shadow cursor-pointer -right-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark"
          onClick={onNextSlideClick}
        >
          <Icon className="w-4 h-4 -mr-0.5" icon={ChevronRightIcon} />
        </button>
      )}
    </div>
  );
};

export default Arrows;
