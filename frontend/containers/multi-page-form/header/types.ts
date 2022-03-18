export interface MultiPageFormHeaderProps {
  /** Classnames to apply to container */
  className?: string;
  /** Title to display at the top of the page */
  title: string;
  /** Callback when the close button is pressed */
  onCloseClick?: () => void;
}
