import React, { FC, Children, useState } from 'react';

import cx from 'classnames';

import { noop } from 'lodash-es';

import LayoutContainer from 'components/layout-container';

import MultiPageFormAriaLive from './aria-live';
import MultiPageFormCompletePage from './complete-page';
import MultiPageFormFooter from './footer';
import MultiPageFormHeader from './header';
import MultiPageFormPage from './page';
import type { MultiPageFormProps } from './types';

export const MultiPageForm: FC<MultiPageFormProps> = ({
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
}: MultiPageFormProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  const FormPages = Children.toArray(children).filter(
    (child: React.ReactElement<any>) => child.type === MultiPageFormPage
  );

  const FormCompletePage = Children.toArray(children).filter(
    (child: React.ReactElement<any>) => child.type === MultiPageFormCompletePage
  );

  const CurrentPage =
    FormCompletePage && isComplete
      ? FormCompletePage
      : FormPages[autoNavigation ? currentPage : pageProp];

  const numPages = Children.count(FormPages);

  const pagesWithErrors: number[] = FormPages.reduce<number[]>(
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
      <MultiPageFormAriaLive
        title={title}
        currentPage={autoNavigation ? currentPage : pageProp}
        numPages={numPages}
      />
      <MultiPageFormHeader title={title} onCloseClick={onCloseClick} />
      <LayoutContainer layout={layout}>{CurrentPage}</LayoutContainer>
      <MultiPageFormFooter
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

export default MultiPageForm;
