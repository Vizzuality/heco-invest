import { FC } from 'react';

import { ArrowLeft as ArrowLeftIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import { noop } from 'lodash-es';

import Alert from 'components/alert';
import Button from 'components/button';
import LayoutContainer from 'components/layout-container';
import Loading from 'components/loading';

import MultiPageLayoutFooterPaging from './paging';
import { MultiPageLayoutFooterProps } from './types';

export const MultiPageLayoutFooter: FC<MultiPageLayoutFooterProps> = ({
  className,
  isSubmitting = false,
  isComplete = false,
  showProgressBar = true,
  numPages,
  currentPage,
  previousButtonText,
  nextButtonText,
  submitButtonText,
  completeButtonText,
  pagesWithErrors = [],
  alert,
  onPreviousClick = noop,
  onNextClick = noop,
  onSubmitClick = noop,
  onCompleteClick = noop,
  onPageClick = noop,
}: MultiPageLayoutFooterProps) => {
  const isLastPage = currentPage === numPages - 1;

  return (
    <footer
      className={cx({
        'fixed bottom-0 w-full z-10 bg-background-light/90 backdrop-blur-sm border-t': true,
        [className]: !!className,
      })}
    >
      {showProgressBar && !isComplete && (
        <span
          className="absolute top-0 left-0 h-1 duration-300 -translate-y-1/2 rounded bg-green-light transition-width"
          style={{
            width: `${(currentPage * 100) / numPages}%`,
          }}
        />
      )}
      {alert && !isComplete && (
        <div className="absolute top-0 w-full -translate-y-full">
          <Alert withLayoutContainer={true}>{alert}</Alert>
        </div>
      )}
      <LayoutContainer>
        <div className="flex flex-row-reverse items-center justify-between w-full h-20 gap-x-8 md:gap-x-16">
          <div className="flex justify-end flex-1">
            {!isComplete &&
              (isLastPage ? (
                <Button
                  className="px-3 py-2 leading-none md:px-8 md:py-4"
                  size="base"
                  onClick={onSubmitClick}
                  disabled={isSubmitting || pagesWithErrors.length > 0}
                >
                  <Loading className="w-5 h-5 mr-3 -ml-5" visible={isSubmitting} />
                  {submitButtonText ? (
                    submitButtonText
                  ) : (
                    <FormattedMessage defaultMessage="Submit" id="wSZR47" />
                  )}
                </Button>
              ) : (
                <Button
                  className="px-3 py-2 leading-none md:px-8 md:py-4"
                  size="base"
                  onClick={onNextClick}
                >
                  {nextButtonText ? (
                    nextButtonText
                  ) : (
                    <FormattedMessage defaultMessage="Next" id="9+Ddtu" />
                  )}
                </Button>
              ))}
            {isComplete && (
              <Button
                className="px-3 py-2 leading-none md:px-8 md:py-4"
                size="base"
                onClick={onCompleteClick}
              >
                {completeButtonText ? (
                  completeButtonText
                ) : (
                  <FormattedMessage defaultMessage="Finish" id="2O2sfp" />
                )}
              </Button>
            )}
          </div>
          <div>
            {!isComplete && (
              <MultiPageLayoutFooterPaging
                currentPage={currentPage}
                numPages={numPages}
                pagesWithErrors={pagesWithErrors}
                isSubmitting={isSubmitting}
                onPageClick={onPageClick}
              />
            )}
          </div>
          <div className="flex justify-start flex-1">
            {currentPage > 0 && !isComplete && (
              <Button
                className="px-0 leading-none dark-green md:px-8 text-green-dark hover:text-green-light active:text-green-light"
                size="base"
                theme="naked"
                icon={ArrowLeftIcon}
                onClick={onPreviousClick}
                disabled={isSubmitting}
              >
                <span className="hidden md:inline-block">
                  {previousButtonText ? (
                    previousButtonText
                  ) : (
                    <FormattedMessage defaultMessage="Back" id="cyR7Kh" />
                  )}
                </span>
              </Button>
            )}
          </div>
        </div>
      </LayoutContainer>
    </footer>
  );
};

export default MultiPageLayoutFooter;
