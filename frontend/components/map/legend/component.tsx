import { FC } from 'react';

import cx from 'classnames';

import type { LegendProps } from './types';

export const Legend: FC<LegendProps> = ({ children, className = '', maxHeight }: LegendProps) => {
  return (
    <div
      className={cx('relative flex flex-col flex-grow bg-transparent', {
        [className]: !!className,
      })}
      style={{
        maxHeight,
      }}
    >
      <div className="absolute top-0 left-0 z-10 w-full h-4 pointer-events-none" />
      <div>{children}</div>
      <div className="absolute bottom-0 left-0 z-10 w-full h-3 pointer-events-none" />
    </div>
  );
};

export default Legend;
