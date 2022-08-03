import { PropsWithChildren } from 'react';

export type CardHoverToDeleteProps = PropsWithChildren<{
  /** Whether to show the loading spinner in the button. Defaults to `false` */
  loading?: boolean;
  /** Callback executed when the card is clicked */
  onClick: () => void;
}>;
