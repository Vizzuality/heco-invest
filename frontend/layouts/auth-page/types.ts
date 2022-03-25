import React from 'react';

import { AsideProps } from './aside';
import { HeaderProps } from './header';
export interface MainProps {
  /** Props to apply to the container */
  props?: React.ComponentProps<'main'>;
}

export type AuthPageLayoutProps = React.PropsWithChildren<
  React.ComponentProps<'div'> & {
    /** Props for the header */
    headerProps?: HeaderProps['props'];
    /** Props for the `<main />` element of the page */
    mainProps?: MainProps['props'];
    /** Props for the `<main />` element of the page */
    asideProps?: AsideProps['props'];
  }
>;
