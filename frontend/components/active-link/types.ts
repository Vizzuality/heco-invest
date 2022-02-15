import { LinkProps } from 'next/link';

export type ActiveLinkProps = LinkProps & {
  /** String to apply to the link when it is active */
  activeClassName: string;
  /** Anchor element */
  children: React.ReactElement;
};
