import { FC } from 'react';

import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import { CategoryTagDot } from 'containers/category-tag';

import { CategoryType } from 'types/category';

import { useEnums } from 'services/enums/enumService';

import type { ProjectLegendProps } from './types';

export const ProjectLegend: FC<ProjectLegendProps> = ({ className }: ProjectLegendProps) => {
  const { data, isLoading, isError } = useEnums();

  if (isLoading || isError) {
    return null;
  }

  return (
    <div
      className={cx({
        'w-56 p-4 bg-white rounded-2xl shadow-xl text-xs': true,
        [className]: !!className,
      })}
    >
      <div className="font-semibold text-gray-700">
        <FormattedMessage defaultMessage="Project categories" id="rginRA" />
      </div>
      <ol className="flex flex-col gap-2 mt-2">
        {data.category.map((category) => (
          <li key={category.id}>
            <CategoryTagDot category={category.id as CategoryType} size="smallest" />
            {category.name}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ProjectLegend;
