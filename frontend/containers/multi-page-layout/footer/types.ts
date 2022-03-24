export interface MultiPageLayoutFooterProps {
  /** Classnames to apply to container */
  className?: string;
  /** Whether the layout/form is being submitted */
  isSubmitting?: boolean;
  /** Whether the layout/form has been completed successfully */
  isComplete?: boolean;
  /** Whether to display a progress bar. Defaults to `true` */
  showProgressBar?: boolean;
  /** Number of total pages */
  numPages: number;
  /** Current page */
  currentPage: number;
  /** Text to display on the submit page button. Defaults to `Submit` */
  submitButtonText?: string;
  /** Text to display on the final page button. Defaults to `Finish` */
  completeButtonText?: string;
  /** Text to display for the "next" button. Defaults to `Next` */
  nextButtonText?: string;
  /** Text to display for the "previous" button. Defaults to `Back` */
  previousButtonText?: string;
  /** Array of indexes of the pages that have errors. Defaults to `[]` */
  pagesWithErrors?: number[];
  /** Alert to display right above the footer */
  alert?: string;
  /** Previous Button click callback */
  onPreviousClick?: () => void;
  /** Next Button click callback */
  onNextClick?: () => void;
  /** onClick handler for when a page button is clicked */
  onPageClick?: (pageIndex: number) => void;
  /** Submit button click callback */
  onSubmitClick?: () => void;
  /** Complete button click callback */
  onCompleteClick?: () => void;
}
