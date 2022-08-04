import { PropsWithChildren } from 'react';

import { HeaderProps } from './header';

export type DashboardLayoutProps = PropsWithChildren<
  HeaderProps & {
    /** Whether the loading spinner should be shown. Defaults to `false` */
    isLoading?: boolean;
    /** Whether the main container should auto scroll up on query. Defaults to `true` */
    scrollOnQuery?: boolean;
    /** Sidebar to show on the dashboard */
    sidebar?: JSX.Element;
    /** Buttons to show in the header */
    buttons?: JSX.Element;
  }
>;
