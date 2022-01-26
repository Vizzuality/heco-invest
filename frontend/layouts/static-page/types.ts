import React from 'react';

import { FooterProps } from './footer';
import { HeaderProps } from './header';

export type StaticPageLayoutProps = React.PropsWithChildren<
  React.ComponentProps<'div'> & {
    /** Props for the header */
    headerProps?: HeaderProps['props'];
    /** Props for the `<main />` element of the page */
    mainProps?: React.ComponentProps<'main'>;
    /** Props for the footer */
    footerProps?: FooterProps['props'];
  }
>;
