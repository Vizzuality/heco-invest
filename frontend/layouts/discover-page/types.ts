import { PropsWithChildren } from 'react';

export type DiscoverPageLayoutProps = PropsWithChildren<{
  /**
   * Whether the content of the layout will be fixed to the screen height with scrollable
   * content. Only applies on large screens. Defaults to `false`
   **/
  screenHeightLg: boolean;
}>;
