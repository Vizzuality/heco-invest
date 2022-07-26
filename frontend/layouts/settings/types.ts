import { PropsWithChildren } from 'react';

import { HeaderProps } from '../dashboard/header';

export type SettingsLayoutProps = PropsWithChildren<
  HeaderProps & {
    /** Whether the loading spinner should be shown. Defaults to `false` */
    isLoading?: boolean;
    /** Whether the main container should auto scroll up on query. Defaults to `true` */
    scrollOnQuery?: boolean;
    /** Buttons to show in the header */
    buttons?: JSX.Element;
  }
>;
