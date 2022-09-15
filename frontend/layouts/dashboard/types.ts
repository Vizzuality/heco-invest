import { PropsWithChildren } from 'react';

import type { BreadcrumbsProps } from 'containers/breadcrumbs';

import { HeaderProps } from './header';

export type DashboardLayoutProps = PropsWithChildren<
  HeaderProps & {
    /** Whether the loading spinner should be shown. Defaults to `false` */
    isLoading?: boolean;
    /** Style of header to display. Defaults to 'account' */
    header?: 'account' | 'breadcrumbs';
    /** Props to pass to the breadcrumbs component. To be used when using `header='breadcrumbs'` */
    breadcrumbsProps?: BreadcrumbsProps;
    /** Whether the main container should auto scroll up on query. Defaults to `true` */
    scrollOnQuery?: boolean;
    /** Sidebar to show on the dashboard */
    sidebar?: JSX.Element;
    /** Buttons to show in the header */
    buttons?: JSX.Element;
  }
>;
