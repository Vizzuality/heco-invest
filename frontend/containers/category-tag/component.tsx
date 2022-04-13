import { FC } from 'react';

import Tag from 'components/tag';

import CategoryTagDot from './category-tag-dot';
import type { CategoryTagProps } from './types';

export const CategoryTag: FC<CategoryTagProps> = ({ category, children }: CategoryTagProps) => (
  <Tag>
    <CategoryTagDot category={category} />
    {children}
  </Tag>
);

export default CategoryTag;
