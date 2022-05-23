import { FC } from 'react';

import Tag from 'components/tag';

import CategoryTagDot from './category-tag-dot';
import type { CategoryTagProps } from './types';

export const CategoryTag: FC<CategoryTagProps> = ({
  className,
  category,
  size = 'small',
  children,
}: CategoryTagProps) => (
  <Tag size={size} className={className}>
    <CategoryTagDot size={size} category={category} />
    {children}
  </Tag>
);

export default CategoryTag;
