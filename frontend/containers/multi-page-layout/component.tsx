import React, { FC, Children, useState } from 'react';

import cx from 'classnames';

import { noop } from 'lodash-es';

import LayoutContainer from 'components/layout-container';

import MultiPageLayoutAriaLive from './aria-live';
import MultiPageLayoutCompletePage from './complete-page';
import MultiPageLayoutFooter from './footer';
import MultiPageLayoutHeader from './header';
import MultiPageLayoutPage from './page';
import type { MultiPageLayoutProps } from './types';

export const MultiPageLayout: FC<MultiPageLayoutProps> = ({
  className,
  layout,
  title,
  showProgressBar = true,
  isSubmitting = false,
  isComplete = false,
  completeButtonText,
  alert,
  page: pageProp,
  children,
  autoNavigation = true,
  onPreviousClick = noop,
  onNextClick = noop,
  onPageClick = noop,
  onCloseClick,
  onSubmitClick,
  onCompleteClick,
}: MultiPageLayoutProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  const Pages = Children.toArray(children).filter(
    (child: React.ReactElement<any>) => child.type === MultiPageLayoutPage
  );

  const CompletePage = Children.toArray(children).filter(
    (child: React.ReactElement<any>) => child.type === MultiPageLayoutCompletePage
  );

  const CurrentPage =
    CompletePage && isComplete ? CompletePage : Pages[autoNavigation ? currentPage : pageProp];

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
      <MultiPageLayoutHeader title={title} onCloseClick={onCloseClick} />
      <LayoutContainer layout={layout}>{CurrentPage}</LayoutContainer>
      <MultiPageLayoutFooter
        numPages={numPages}
        currentPage={autoNavigation ? currentPage : pageProp}
        showProgressBar={showProgressBar}
        isSubmitting={isSubmitting}
        isComplete={isComplete}
        completeButtonText={completeButtonText}
        pagesWithErrors={pagesWithErrors}
        alert={alert}
        onPreviousClick={handlePreviousClick}
        onNextClick={handleNextClick}
        onSubmitClick={onSubmitClick}
        onCompleteClick={onCompleteClick}
        onPageClick={handleOnPageClick}
      />
    </div>
  );
};

export default MultiPageLayout;
