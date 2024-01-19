import { PropsWithChildren } from 'react';

export type OurPartnersCardProps = PropsWithChildren<{
  logo: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
}>;
