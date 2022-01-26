import React, { useMemo } from 'react';

import { FooterProps } from './types';

export const Footer: React.FC<FooterProps> = ({ props = {} }: FooterProps) => {
  const containerProps = useMemo(
    () => ({
      ...props,
      className: `bg-gray-300 ${props.className}`,
    }),
    [props]
  );

  return <footer {...containerProps}>Footer</footer>;
};

export default Footer;
