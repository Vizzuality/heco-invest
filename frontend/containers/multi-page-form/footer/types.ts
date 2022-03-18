export interface MultiPageFormFooterProps {
  /** Classnames to apply to container */
  className?: string;
  /** Whether the form is being submitted */
  isSubmitting?: boolean;
  /** Whether the form has been completed successfully */
  isComplete?: boolean;
  /** Whether to display a progress bar. Defaults to `true` */
  showProgressBar?: boolean;
  /** Number of total pages */
  numPages: number;
  /** Current page */
  currPage: number;
  /** Text to display on the final page button */
  completeButtonText?: string;
  /** Previous Button click callback */
  onPreviousClick?: () => void;
  /** Next Button click callback */
  onNextClick?: () => void;
  /** Submit button click callback */
  onSubmitClick?: () => void;
  /** Complete button click callback */
  onCompleteClick?: () => void;
}
