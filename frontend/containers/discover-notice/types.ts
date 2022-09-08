import { PropsWithChildren } from 'react';

export type DiscoverNoticeProps = PropsWithChildren<{
  /** Classnames to apply to the container */
  className?: string;
  /** Whether to display the notice */
  isVisible: boolean;
  /** Callback executed when the disclaimer close button is pressed */
  onClose: () => void;
}>;
