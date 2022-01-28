import React, { PropsWithChildren } from 'react';

import { IconProps } from 'components/icon';

export interface ButtonCommonProps {
  /** Color theme of the button */
  theme?:
    | 'primary-green'
    | 'primary-white'
    | 'primary-orange'
    | 'secondary-green'
    | 'secondary-white'
    | 'naked';
  /** Size of the button */
  size?: 'base' | 'small';
  /** Icon of the button */
  icon?: IconProps['icon'];
}

export type HTMLAnchorProps = PropsWithChildren<
  ButtonCommonProps &
    React.AnchorHTMLAttributes<HTMLAnchorElement> & {
      /** Href of the link */
      to: string;
      /**
       * Whether the link is external. If `true`, the router won't be used and the page will open in
       * a new tab/window.
       */
      external?: boolean;
    }
>;

export type HTMLButtonProps = PropsWithChildren<
  ButtonCommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>;

export type ButtonProps = HTMLButtonProps | HTMLAnchorProps;
