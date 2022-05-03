import React from 'react';

import { HeaderProps } from 'layouts/static-page/header';

export interface MainProps {
  /** Props to apply to the container */
  props?: React.ComponentProps<'main'>;
}

export type DashboardLayoutProps = React.PropsWithChildren<
  React.ComponentProps<'div'> & {
    /** Props for the header */
    headerProps?: HeaderProps['props'];
    /** Props for the `<main />` element of the page */
    mainProps?: MainProps['props'];
  }
>;
