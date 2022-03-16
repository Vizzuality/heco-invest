import { FC } from 'react';

import cx from 'classnames';

import type { TagProps } from './types';

export const Tag: FC<TagProps> = ({ children, className }: TagProps) => (
  <div
    className={cx({
      'relative inline-flex border rounded-full': true,
      [`${className}`]: !!className,
      'text-black': !className,
    })}
  >
    <div
      className={cx({
        'flex items-center px-4 py-2': true,
      })}
    >
      {children}
    </div>
  </div>
);

export default Tag;
