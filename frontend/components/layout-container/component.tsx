import React, { useMemo } from 'react';

import cx from 'classnames';

import { LayoutContainerProps } from './types';

export const LayoutContainer: React.FC<LayoutContainerProps> = ({
  className,
  layout = 'default',
  ...rest
}: LayoutContainerProps) => {
  const containerProps = useMemo(
    () => ({
      ...rest,
      className: cx({
        'container md:max-w-screen-lg lg:max-w-screen-xl 2xl:max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8':
          true,
        'max-w-md sm:max-w-xl md:max-w-5xl': layout === 'narrow',
        [className]: !!className,
      }),
    }),
    [className, layout, rest]
  );

  return <div {...containerProps}>{rest.children}</div>;
};

export default LayoutContainer;
