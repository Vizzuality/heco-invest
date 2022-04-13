import { FC } from 'react';

import cx from 'classnames';

import { CategoryType } from 'types/category';

import type { CategoryTagDotProps } from './types';

export const CategoryTagDot: FC<CategoryTagDotProps> = ({ category }: CategoryTagDotProps) => (
  <span
    className={cx({
      'inline-block w-4 h-4 mr-4 rounded-full': true,
      'bg-category-tourism': category === 'tourism-and-recreation',
      'bg-category-production': category === 'non-timber-forest-production',
      'bg-category-agrosystems': category === 'sustainable-agrosystems',
      'bg-category-forestry': category === 'forestry-and-agroforestry',
      'bg-category-human': category === 'human-capital-and-inclusion',
    })}
  />
);

export default CategoryTagDot;
