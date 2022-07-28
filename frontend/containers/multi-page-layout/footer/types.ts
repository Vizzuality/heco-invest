export interface MultiPageLayoutFooterProps {
  /** Classnames to apply to container */
  className?: string;
  /** Whether the layout/form is being submitted */
  isSubmitting?: boolean;
  /** Whether to show the outro page */
  showOutro?: boolean;
  /** Whether to disable the footer buttons. Defaults to `false` */
  disabled?: boolean;
  /** Whether to display a progress bar. Defaults to `true` */
  showProgressBar?: boolean;
  /** Number of total pages */
  numPages: number;
  /** Current page */
  currentPage: number;
  /** Text to display on the submit page button. Defaults to `Submit` */
  submitButtonText?: string;
  /** Text to display on the outro page button. Defaults to `Finish` */
  outroButtonText?: string;
  /** Text to display for the "next" button. Defaults to `Next` */
  nextButtonText?: string;
  /** Text to display for the "previous" button. Defaults to `Back` */
  previousButtonText?: string;
  /** Array of indexes of the pages that have errors. Defaults to `[]` */
  pagesWithErrors?: number[];
  /** Alert to display right above the footer */
  alert?: string | string[];
  /** Allows us to pass custom elements to be displayed on the footer. (Eg: custom buttons) */
  footerElements?: JSX.Element;
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
