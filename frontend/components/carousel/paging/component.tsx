import { FC } from 'react';

import { useIntl } from 'react-intl';

import cx from 'classnames';

import { times } from 'lodash-es';

import { PagingProps } from './types';

export const Paging: FC<PagingProps> = ({ className, numSlides, currentSlide, onClick }) => {
  const intl = useIntl();

  return (
    <div className={className}>
      {times(numSlides, (slide) => (
        <button
          aria-label={intl.formatMessage(
            {
              defaultMessage: 'Slide {slideNumber}',
              id: 'dPuc1g',
            },
            {
              slideNumber: slide + 1,
            }
          )}
          className={cx({
            'block w-2 h-2 rounded-full cursor-pointer': true,
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark':
              true,
            'bg-beige': slide !== currentSlide,
            'bg-green-dark': slide === currentSlide,
          })}
          onClick={() => onClick(slide)}
        />
      ))}
    </div>
  );
};

export default Paging;
