import React, { useMemo } from 'react';

import { LayoutContainerProps } from './types';

export const LayoutContainer: React.FC<LayoutContainerProps> = ({
  ...rest
}: LayoutContainerProps) => {
  const containerProps = useMemo(
    () => ({
      ...rest,
      className: `container mx-auto px-4 sm:px-6 lg:px-8 ${rest.className}`,
    }),
    [rest]
  );

  return <div {...containerProps}>{rest.children}</div>;
};

export default LayoutContainer;
