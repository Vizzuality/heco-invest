import { FC } from 'react';

import cx from 'classnames';

import type { CategoryTagDotProps } from './types';

export const CategoryTagDot: FC<CategoryTagDotProps> = ({ category }: CategoryTagDotProps) => (
  <span
    className={cx({
      'inline-block w-4 h-4 mr-4 rounded-full': true,
      'bg-category-tourism': category === 'tourism',
      'bg-category-production': category === 'production',
      'bg-category-agrosystems': category === 'agrosystems',
      'bg-category-forestry': category === 'forestry',
    })}
  />
);

export default CategoryTagDot;
