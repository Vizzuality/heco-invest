import { LanguageType } from 'types';

export interface MultiPageLayoutHeaderProps {
  /** Classnames to apply to container */
  className?: string;
  /** Title to display at the top of the page */
  title: string;
  /** Locale of the layout to display in a tag */
  locale?: LanguageType;
  /** Text to display on top right "Leave" button. Defaults to +Leave` */
  leaveButtonText?: string;
  /** Callback when the close button is pressed */
  onCloseClick?: () => void;
}
