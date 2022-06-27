import { PropsWithChildren } from 'react';

export type ExpandoProps = PropsWithChildren<{
  /** Classes to apply to the container */
  className?: string;
  /** Title to show on the expando */
  title: string | JSX.Element;
  /** Whether the expando defaults to an open state. Defaults to `true` */
  defaultOpen?: boolean;
}>;
