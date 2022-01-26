import React, { useMemo } from 'react';

import { HeaderProps } from './types';

export const Header: React.FC<HeaderProps> = ({ props = {} }: HeaderProps) => {
  const containerProps = useMemo(
    () => ({
      ...props,
      className: `bg-gray-300 ${props.className}`,
    }),
    [props]
  );

  return <header {...containerProps}>Header</header>;
};

export default Header;
