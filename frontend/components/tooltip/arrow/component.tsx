import { FC } from 'react';

import cx from 'classnames';

import type { ArrowProps } from './types';

export const Arrow: FC<ArrowProps> = (props: ArrowProps) => {
  const { 'data-placement': placement, className } = props;

  return (
    <div
      {...props}
      className={cx({
        '-bottom-1': placement && placement.includes('top'),
        '-top-1': placement && placement.includes('bottom'),
        '-right-1': placement && placement.includes('left'),
        '-left-1': placement && placement.includes('right'),
      })}
    >
      <div
        className={cx({
          'w-2 h-2 bg-white transform': true,
          'rotate-45': !placement || placement?.includes('top'),
          '-rotate-[135deg]': placement?.includes('bottom'),
          '-rotate-45': placement?.includes('left'),
          'rotate-[135deg]': placement?.includes('right'),
          [className]: !!className,
        })}
      />
    </div>
  );
};

export default Arrow;
