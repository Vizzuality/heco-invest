import React, { FC, Children, useState } from 'react';

import cx from 'classnames';

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
  children,
  onCloseClick,
  onSubmitClick,
  onCompleteClick,
}: MultiPageFormProps) => {
  const [currPage, setCurrPage] = useState(0);

  const FormPages = Children.toArray(children).filter(
    (child: React.ReactElement<any>) => child.type === MultiPageFormPage
  );

  const FormCompletePage = Children.toArray(children).filter(
    (child: React.ReactElement<any>) => child.type === MultiPageFormCompletePage
  );

  const CurrentPage = FormCompletePage && isComplete ? FormCompletePage : FormPages[currPage];

  const numPages = Children.count(FormPages);

  const pagesWithErrors: number[] = FormPages.reduce<number[]>(
    (acc: number[], page: React.ReactElement<any>, index: number) => {
      if (page.props?.hasErrors === true) acc.push(index);
      return acc;
    },
    []
  );

  const handlePreviousClick = () => {
    if (currPage === 0) return;
    setCurrPage(currPage - 1);
  };

  const handleNextClick = () => {
    if (!(currPage < numPages - 1)) return;
    setCurrPage(currPage + 1);
  };

  const handleOnPageClick = (page: number) => {
    setCurrPage(page);
  };

  return (
    <div
      className={cx({
        [className]: !!className,
      })}
    >
      <MultiPageFormAriaLive title={title} currPage={currPage} numPages={numPages} />
      <MultiPageFormHeader title={title} onCloseClick={onCloseClick} />
      <LayoutContainer layout={layout}>{CurrentPage}</LayoutContainer>
      <MultiPageFormFooter
        numPages={numPages}
        currPage={currPage}
        showProgressBar={showProgressBar}
        isSubmitting={isSubmitting}
        isComplete={isComplete}
        completeButtonText={completeButtonText}
        pagesWithErrors={pagesWithErrors}
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
