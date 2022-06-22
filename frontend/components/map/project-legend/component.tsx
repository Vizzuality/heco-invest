import { FC, useCallback, useState } from 'react';

import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import { useId } from '@react-aria/utils';

import { CategoryTagDot } from 'containers/category-tag';

import { CategoryType } from 'types/category';

import { useEnums } from 'services/enums/enumService';

import type { ProjectLegendProps } from './types';

export const ProjectLegend: FC<ProjectLegendProps> = ({ className }: ProjectLegendProps) => {
  const { data, isLoading, isError } = useEnums();
  const id = useId();

  const [active, setActive] = useState(true);

  const onToggleActive = useCallback(() => {
    setActive(!active);
  }, [active]);
  if (isLoading || isError) {
    return null;
  }

  return (
    <div
      className={cx({
        'w-56 px-4 py-2 bg-white rounded-2xl shadow-xl text-xs flex flex-col': true,
        [className]: !!className,
      })}
    >
      <button
        type="button"
        aria-expanded={active}
        aria-controls={id}
        className="relative flex flex-col items-start"
        onClick={onToggleActive}
      >
        <div className="font-semibold text-gray-700">
          <FormattedMessage defaultMessage="Project categories" id="rginRA" />
        </div>
        {active && (
          <ol className="flex flex-col gap-2 mt-2 text-left">
            {data.category.map((category) => (
              <li key={category.id}>
                <CategoryTagDot category={category.id as CategoryType} size="smallest" />
                {category.name}
              </li>
            ))}
          </ol>
        )}
      </button>
    </div>
  );
};

export default ProjectLegend;
