import { PropsWithChildren } from 'react';

export type AlertProps = PropsWithChildren<{
  /** Classnames to apply to container */
  className?: string;
  /** Alert type. Defaults to `warning` */
  type?: 'warning' | 'success';
  /** Whether to wrap the alert in a LayoutContainer. Defaults to `false` */
  withLayoutContainer?: boolean;
}>;
