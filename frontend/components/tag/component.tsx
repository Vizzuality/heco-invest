import { FC } from 'react';

import cx from 'classnames';

import type { TagProps } from './types';

export const Tag: FC<TagProps> = ({
  children,
  className,
  size = 'small',
  border = true,
}: TagProps) => (
  <div
    className={cx({
      'relative inline-flex rounded-full': true,
      border: border,
      [`${className}`]: !!className,
      'text-black': !className,
    })}
  >
    <div
      className={cx({
        'flex items-center px-4 py-2': true,
        'px-4 py-2': size === 'small',
        'px-2 py-1': size === 'smallest',
      })}
    >
      {children}
    </div>
  </div>
);

export default Tag;
