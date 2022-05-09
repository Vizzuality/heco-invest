import { useCallback, useEffect, useState } from 'react';

import {
  ChevronsLeft as ChevronsLeftIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ChevronsRight as ChevronsRightIcon,
} from 'react-feather';
import { useIntl, FormattedMessage } from 'react-intl';

import cx from 'classnames';

import { noop } from 'lodash-es';

import Button from 'components/button';

import { PaginationProps } from './types';

const Pagination: React.FC<PaginationProps> = ({
  className,
  isLoading = false,
  reverseDisplay = false,
  numItems,
  currentPage,
  totalPages,
  totalItems,
  numNumberButtons = 8,
  onPageClick = noop,
}: PaginationProps) => {
  const intl = useIntl();

  const [pagination, setPagination] = useState({
    numItems: undefined,
    currentPage: undefined,
    totalPages: undefined,
    totalItems: undefined,
  });

  useEffect(() => {
    // Do not update pagination if data is loading.
    if (isLoading) return;
    setPagination({ numItems, currentPage, totalPages, totalItems });
  }, [currentPage, isLoading, numItems, totalItems, totalPages]);

  const calcPagingRange = useCallback(() => {
    // https://codereview.stackexchange.com/a/183472
    const min = 1;
    let length = numNumberButtons;

    if (length > pagination.totalPages) length = pagination.totalPages;

    let start = pagination.currentPage - Math.floor(length / 2);
    start = Math.max(start, min);
    start = Math.min(start, min + pagination.totalPages - length);

    return Array.from({ length: length }, (el, i) => start + i);
  }, [numNumberButtons, pagination]);

  const rangeButtons = calcPagingRange();

  const handleFirstClick = () => {
    onPageClick(1);
  };

  const handlePreviousClick = () => {
    if (pagination.currentPage <= 1) return;
    onPageClick(pagination.currentPage - 1);
  };

  const handleRangeButtonClick = (pageNumber) => {
    onPageClick(pageNumber);
  };

  const handleNextClick = () => {
    if (pagination.currentPage >= pagination.totalPages) return;
    onPageClick(currentPage + 1);
  };

  const handleLastClick = () => {
    onPageClick(pagination.totalPages);
  };

  // We don't have enough values to display the pagination; show nothing.
  if (Object.values(pagination).some((val) => isNaN(val))) return null;

  return (
    <div className={className}>
      <div
        className={cx({
          'flex items-center': true,
          'flex-col': reverseDisplay,
          'flex-col-reverse': !reverseDisplay,
        })}
      >
        <nav aria-label={intl.formatMessage({ defaultMessage: 'Pagination', id: 'ZATT08' })}>
          <ol className="flex flex-wrap items-center justify-center gap-2 py-2">
            <li>
              <Button
                className="justify-center w-10 h-10"
                size="smallest"
                theme="primary-white"
                aria-label={intl.formatMessage({
                  defaultMessage: 'Goto first page',
                  id: '6JknYY',
                })}
                disabled={pagination.currentPage <= 1}
                onClick={handleFirstClick}
              >
                <ChevronsLeftIcon className="w-4 h-4" />
              </Button>
            </li>
            <li>
              <Button
                className="justify-center w-10 h-10"
                size="smallest"
                theme="primary-white"
                aria-label={intl.formatMessage({
                  defaultMessage: 'Goto previous page',
                  id: 'PNhgnM',
                })}
                disabled={pagination.currentPage <= 1}
                onClick={handlePreviousClick}
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </Button>
            </li>
            {rangeButtons.map((buttonNumber) => {
              const isCurrent = buttonNumber === pagination.currentPage;
              const theme = isCurrent ? 'primary-green' : 'primary-white';
              return (
                <li key={buttonNumber} aria-current={isCurrent}>
                  <Button
                    className="justify-center w-10 h-10"
                    size="smallest"
                    theme={theme}
                    aria-label={intl.formatMessage(
                      {
                        defaultMessage: 'Goto page {page}',
                        id: 'LOFIuA',
                      },
                      { page: buttonNumber }
                    )}
                    disabled={isCurrent}
                    key={buttonNumber}
                    onClick={() => {
                      handleRangeButtonClick(buttonNumber);
                    }}
                  >
                    {buttonNumber}
                  </Button>
                </li>
              );
            })}
            <li>
              <Button
                className="justify-center w-10 h-10"
                size="smallest"
                theme="primary-white"
                aria-label={intl.formatMessage({
                  defaultMessage: 'Goto next page',
                  id: 'yv7uMQ',
                })}
                disabled={pagination.currentPage >= pagination.totalPages}
                onClick={handleNextClick}
              >
                <ChevronRightIcon className="w-4 h-4" />
              </Button>
            </li>
            <li>
              <Button
                className="justify-center w-10 h-10"
                size="smallest"
                theme="primary-white"
                aria-label={intl.formatMessage({
                  defaultMessage: 'Goto last page',
                  id: 'LKIG+a',
                })}
                disabled={pagination.currentPage >= pagination.totalPages}
                onClick={handleLastClick}
              >
                <ChevronsRightIcon className="w-4 h-4" />
              </Button>
            </li>
          </ol>
        </nav>
        <div className="flex justify-center text-sm" aria-live="polite" aria-atomic="true">
          <FormattedMessage
            defaultMessage="{numItems} of {totalItems} entries"
            values={{ numItems, totalItems }}
            id="HyAD0J"
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
