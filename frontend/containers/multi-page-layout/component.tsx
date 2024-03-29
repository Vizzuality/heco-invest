import React, { FC, Children, useState, useEffect } from 'react';

import cx from 'classnames';

import { noop } from 'lodash-es';

import LayoutContainer from 'components/layout-container';

import MultiPageLayoutAriaLive from './aria-live';
import MultiPageLayoutFooter from './footer';
import MultiPageLayoutHeader from './header';
import MultiPageLayoutLoading from './loading';
import MultiPageLayoutOutroPage from './outro-page';
import MultiPageLayoutPage from './page';
import type { MultiPageLayoutProps } from './types';

export const MultiPageLayout: FC<MultiPageLayoutProps> = ({
  className,
  layout,
  title,
  locale,
  isLoading = false,
  siteHeader = false,
  showProgressBar = true,
  isSubmitting = false,
  showOutro = false,
  showOutroFooter = false,
  previousButtonText,
  nextButtonText,
  leaveButtonText,
  submitButtonText,
  outroButtonText,
  alert,
  page: pageProp,
  children,
  autoNavigation = true,
  footerElements,
  createdAt,
  updatedAt,
  onPreviousClick = noop,
  onNextClick = noop,
  onPageClick = noop,
  onCloseClick,
  onSubmitClick,
  onCompleteClick,
  getTotalPages,
}: MultiPageLayoutProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  const Pages = Children.toArray(children).filter(
    (child: React.ReactElement<any>) => child.type === MultiPageLayoutPage
  );

  const OutroPage = Children.toArray(children).filter(
    (child: React.ReactElement<any>) => child.type === MultiPageLayoutOutroPage
  );

  const CurrentPage =
    OutroPage && showOutro ? OutroPage : Pages[autoNavigation ? currentPage : pageProp];

  const numPages = Children.count(Pages);

  const pagesWithErrors: number[] = Pages.reduce<number[]>(
    (acc: number[], page: React.ReactElement<any>, index: number) => {
      if (page.props?.hasErrors === true) acc.push(index);
      return acc;
    },
    []
  );

  const handlePreviousClick = () => {
    const previousPage = (autoNavigation ? currentPage : pageProp) - 1;
    if (previousPage < 0) return;
    if (autoNavigation) {
      setCurrentPage(previousPage);
    } else {
      onPreviousClick(previousPage);
    }
  };

  const handleNextClick = () => {
    const nextPage = (autoNavigation ? currentPage : pageProp) + 1;
    if (nextPage > numPages) return;
    if (autoNavigation) {
      setCurrentPage(nextPage);
    } else {
      onNextClick(nextPage);
    }
  };

  const handleOnPageClick = (page: number) => {
    if (autoNavigation) {
      setCurrentPage(page);
    } else {
      onPageClick(page);
    }
  };

  useEffect(() => {
    getTotalPages?.(numPages);
  }, [getTotalPages, numPages]);

  return (
    <div
      className={cx({
        [className]: !!className,
      })}
    >
      <MultiPageLayoutAriaLive
        title={title}
        currentPage={autoNavigation ? currentPage : pageProp}
        numPages={numPages}
      />
      <MultiPageLayoutHeader
        title={title}
        locale={locale}
        siteHeader={siteHeader}
        leaveButtonText={leaveButtonText}
        createdAt={createdAt}
        updatedAt={updatedAt}
        onCloseClick={onCloseClick}
      />
      <LayoutContainer layout={layout}>
        {isLoading ? <MultiPageLayoutLoading /> : CurrentPage}
      </LayoutContainer>
      {(!showOutro || (showOutro && showOutroFooter)) && (
        <MultiPageLayoutFooter
          disabled={isLoading}
          numPages={numPages}
          currentPage={autoNavigation ? currentPage : pageProp}
          showProgressBar={showProgressBar}
          isSubmitting={isSubmitting}
          showOutro={showOutro}
          previousButtonText={previousButtonText}
          nextButtonText={nextButtonText}
          submitButtonText={submitButtonText}
          outroButtonText={outroButtonText}
          pagesWithErrors={pagesWithErrors}
          alert={alert}
          footerElements={footerElements}
          onPreviousClick={handlePreviousClick}
          onNextClick={handleNextClick}
          onSubmitClick={onSubmitClick}
          onCompleteClick={onCompleteClick}
          onPageClick={handleOnPageClick}
        />
      )}
    </div>
  );
};

export default MultiPageLayout;
