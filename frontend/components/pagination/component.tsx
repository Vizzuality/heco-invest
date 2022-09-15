import { useCallback, useEffect, useState } from 'react';

import { ArrowLeft as ArrowLeftIcon, ArrowRight as ArrowRightIcon } from 'react-feather';
import {
  ChevronsLeft as ChevronsLeftIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ChevronsRight as ChevronsRightIcon,
} from 'react-feather';
import { useIntl, FormattedMessage } from 'react-intl';

import cx from 'classnames';

import { noop } from 'lodash-es';

import Button, { ButtonProps } from 'components/button';

import { THEMES } from './constants';
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
  theme = 'default',
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
          <ol className={THEMES[theme].listClasses}>
            {theme === 'default' && (
              <li>
                <Button
                  className={THEMES[theme].buttonClasses.default}
                  size="smallest"
                  theme={THEMES[theme].buttonTheme.default as ButtonProps['theme']}
                  aria-label={intl.formatMessage({
                    defaultMessage: 'Go to first page',
                    id: 'F4dsUN',
                  })}
                  disabled={pagination.currentPage <= 1}
                  onClick={handleFirstClick}
                >
                  <ChevronsLeftIcon className="w-4 h-4" />
                </Button>
              </li>
            )}
            <li>
              <Button
                className={THEMES[theme].buttonClasses.default}
                size="smallest"
                theme={THEMES[theme].buttonTheme.default as ButtonProps['theme']}
                aria-label={intl.formatMessage({
                  defaultMessage: 'Go to previous page',
                  id: 'NYErt1',
                })}
                disabled={pagination.currentPage <= 1}
                onClick={handlePreviousClick}
              >
                {theme === 'default' ? (
                  <ChevronLeftIcon className="w-4 h-4" />
                ) : (
                  <ArrowLeftIcon className="w-4 h-4" />
                )}
              </Button>
            </li>
            {rangeButtons.map((buttonNumber) => {
              const isCurrent = buttonNumber === pagination.currentPage;
              return (
                <li key={buttonNumber} aria-current={isCurrent}>
                  <Button
                    className={THEMES[theme].buttonClasses[isCurrent ? 'active' : 'default']}
                    size="smallest"
                    theme={
                      THEMES[theme].buttonTheme[
                        isCurrent ? 'active' : 'default'
                      ] as ButtonProps['theme']
                    }
                    aria-label={intl.formatMessage(
                      {
                        defaultMessage: 'Go to page {page}',
                        id: 'wQteLO',
                      },
                      { page: buttonNumber }
                    )}
                    disabled={isCurrent && theme !== 'compact'}
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
                className={THEMES[theme].buttonClasses.default}
                size="smallest"
                theme={THEMES[theme].buttonTheme.default as ButtonProps['theme']}
                aria-label={intl.formatMessage({
                  defaultMessage: 'Go to next page',
                  id: 'nkDaFL',
                })}
                disabled={pagination.currentPage >= pagination.totalPages}
                onClick={handleNextClick}
              >
                {theme === 'default' ? (
                  <ChevronRightIcon className="w-4 h-4" />
                ) : (
                  <ArrowRightIcon className="w-4 h-4" />
                )}
              </Button>
            </li>
            {theme === 'default' && (
              <li>
                <Button
                  className={THEMES[theme].buttonClasses.default}
                  size="smallest"
                  theme={THEMES[theme].buttonTheme.default as ButtonProps['theme']}
                  aria-label={intl.formatMessage({
                    defaultMessage: 'Go to last page',
                    id: 'fMrPOR',
                  })}
                  disabled={pagination.currentPage >= pagination.totalPages}
                  onClick={handleLastClick}
                >
                  <ChevronsRightIcon className="w-4 h-4" />
                </Button>
              </li>
            )}
          </ol>
        </nav>
        <div
          className={cx({ 'flex justify-center text-sm': true, hidden: theme === 'compact' })}
          aria-live="polite"
          aria-atomic="true"
        >
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
