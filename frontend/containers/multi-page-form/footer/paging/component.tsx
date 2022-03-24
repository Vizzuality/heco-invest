import { FC } from 'react';

import { useIntl } from 'react-intl';

import cx from 'classnames';

import { times } from 'lodash-es';

import { MultiPageFormFooterPagingProps } from './types';

export const MultiPageFormFooterPaging: FC<MultiPageFormFooterPagingProps> = ({
  className,
  currentPage,
  numPages,
  pagesWithErrors = [],
  isSubmitting,
  onPageClick,
}: MultiPageFormFooterPagingProps) => {
  const intl = useIntl();

  return (
    <div
      className={cx({
        [className]: !!className,
      })}
    >
      <div className="relative flex gap-4">
        <span className="absolute h-px -translate-y-1/2 left-3 right-3 bg-beige top-1/2" />

        {times(numPages, (page) => {
          const hasErrors = pagesWithErrors.includes(page);
          const isCurrentPage = page === currentPage;
          const isBeforeCurrent = page < currentPage;
          const isAfterCurrent = page > currentPage;

          return (
            <button
              aria-label={intl.formatMessage(
                {
                  defaultMessage: 'Go to page {pageNumber}',
                  id: '0SKBlf',
                },
                {
                  pageNumber: page + 1,
                }
              )}
              aria-current={isCurrentPage ? 'step' : false}
              className={cx({
                'block w-6 h-6 rounded-full cursor-pointer text-sm z-10 transition-colors': true,
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark':
                  true,
                'text-red-600 bg-red-50 border hover:border-red-600': hasErrors && !isSubmitting,
                'border-red-600': hasErrors && isCurrentPage && !isSubmitting,
                'border-red-50': hasErrors && !isCurrentPage && !isSubmitting,
                'bg-background-light text-green-dark border border-green-dark':
                  isCurrentPage && !hasErrors && !isSubmitting,
                'bg-background-light border border-beige text-beige hover:border-green-dark':
                  !isCurrentPage && !hasErrors && isAfterCurrent && !isSubmitting,
                'bg-green-dark text-white border-green-dark hover:text-green-light':
                  !isCurrentPage && !hasErrors && isBeforeCurrent && !isSubmitting,
                'bg-background-light border border-beige text-beige': isSubmitting,
              })}
              disabled={isSubmitting}
              onClick={() => onPageClick(page)}
            >
              {page + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MultiPageFormFooterPaging;
