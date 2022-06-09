import { PropsWithChildren } from 'react';

import { HeaderProps } from './header';

export type DashboardLayoutProps = PropsWithChildren<
  HeaderProps & {
    /** Buttons to show in the header */
    buttons?: JSX.Element;
  }
>;
