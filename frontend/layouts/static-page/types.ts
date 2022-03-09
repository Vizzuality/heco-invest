import React from 'react';

import { FooterProps } from './footer';
import { HeaderProps } from './header';

export interface MainProps {
  /** Props to apply to the container */
  props?: React.ComponentProps<'main'> & {
    /** Whether the header have a topMargin set by default. Defaults to `true` */
    topMargin?: boolean;
  };
}

export type StaticPageLayoutProps = React.PropsWithChildren<
  React.ComponentProps<'div'> & {
    /** Props for the header */
    headerProps?: HeaderProps['props'];
    /** Props for the `<main />` element of the page */
    mainProps?: MainProps['props'];
    /** Props for the footer */
    footerProps?: FooterProps['props'];
  }
>;
