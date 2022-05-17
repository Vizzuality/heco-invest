import { FC } from 'react';

import Link from 'next/link';

import { Paths } from 'enums';

import { LogoProps } from './types';

export const Logo: FC<LogoProps> = ({}: LogoProps) => (
  <Link href={Paths.Home}>
    <a className="font-semibold">HeCo Invest</a>
  </Link>
);

export default Logo;
