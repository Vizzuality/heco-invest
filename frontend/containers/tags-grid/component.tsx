import { FC } from 'react';

import cx from 'classnames';

import { slugify } from 'helpers/slugify';

import CategoryTag from 'containers/category-tag';

import Tag from 'components/tag';

import type { TagsGridProps } from './types';

export const TagsGrid: FC<TagsGridProps> = ({ className, rows }: TagsGridProps) => {
  const gridCells = rows.reduce((arr, { title, type, tags }) => {
    const id = slugify(title);

    // Do not display grid rows that have no tags
    if (!tags?.length) return arr;

    return [
      ...arr,
      { cellType: 'title', key: `title-${id}`, id, title },
      { cellType: 'tags', key: `tags-${id}`, id, type: type || 'default', tags },
    ];
  }, []);

  return (
    <div className={cx('grid gap-4 md:gap-8 md:grid-cols-auto-1fr', className)}>
      {gridCells.map(({ cellType, key, id, title, type, tags }) => {
        if (cellType === 'title') {
          return (
            <span key={key} id={id} className="pt-2 text-gray-800">
              {title}
            </span>
          );
        }

        if (cellType === 'tags') {
          return (
            <span key={key} aria-labelledby={id} className="flex flex-wrap gap-x-4 gap-y-2">
              {type === 'default' &&
                tags.map((tag) => <Tag key={tag?.id || tag}>{tag?.name || tag}</Tag>)}
              {type === 'category' &&
                tags.map(({ id, name }) => (
                  <CategoryTag key={id} category={id}>
                    {name}
                  </CategoryTag>
                ))}
            </span>
          );
        }

        return null;
      })}
    </div>
  );
};

export default TagsGrid;
