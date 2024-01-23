import { PropsWithChildren } from 'react';

export type OurPartnersCardProps = PropsWithChildren<{
  /* Logo to display */
  logo: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
  /* Whether the card defaults to an open state */
  defaultOpen?: boolean;
}>;
