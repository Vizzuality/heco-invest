import { FC } from 'react';

import cx from 'classnames';

import Tag from 'components/tag';

import type { CategoryTagProps } from './types';

export const CategoryTag: FC<CategoryTagProps> = ({ category, children }: CategoryTagProps) => (
  <Tag>
    <span
      className={cx({
        'inline-block w-4 h-4 mr-4 rounded-full': true,
        'bg-category-tourism': category === 'tourism',
        'bg-category-production': category === 'production',
        'bg-category-agrosystems': category === 'agrosystems',
        'bg-category-forestry': category === 'forestry',
      })}
    />
    {children}
  </Tag>
);

export default CategoryTag;
