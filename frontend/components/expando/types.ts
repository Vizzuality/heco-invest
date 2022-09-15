import { PropsWithChildren } from 'react';

export type ExpandoProps = PropsWithChildren<{
  /** Classes to apply to the container */
  className?: string;
  /** Title to show on the expando */
  title: string | JSX.Element;
  /** Whether the expando defaults to an open state. Defaults to `true` */
  defaultOpen?: boolean;
  /** Duration of the animation while expanding/collapsing. Defaults to 0.1 */
  duration?: number;
  /** Callback called when the expando changes open state */
  onChange?: (isOpen: boolean) => void;
}>;
