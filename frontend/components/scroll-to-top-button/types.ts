import { MutableRefObject } from 'react';

export type ScrollToTopProps = {
  /** button class name */
  className?: string;
  /** Container element reference */
  containerRef?: MutableRefObject<HTMLDivElement>;
};
