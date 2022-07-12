import { FC, useCallback, useState } from 'react';

import { ChevronDown as ChevronDownIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import { useId } from '@react-aria/utils';
import { motion } from 'framer-motion';

import { CategoryTagDot } from 'containers/category-tag';

import Icon from 'components/icon';
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

  const legendVariants = {
    open: { opacity: 1, height: 'auto' },
    closed: { opacity: 0, height: 0 },
  };

  return (
    <div
      className={cx({
        'flex flex-col items-end h-full gap-px': true,
        [className]: !!className,
      })}
    >
      <button
        type="button"
        aria-controls={id}
        aria-expanded={active}
        className="relative flex items-center justify-center w-8 h-8 bg-white rounded shadow-xl focus-visible:outline-green-dark"
        onClick={onToggleActive}
      >
        <Icon
          aria-hidden={true}
          icon={ChevronDownIcon}
          className={cx({
            'w-4.5 h-4.5 text-gray-600 shrink-0 transition duration-500': true,
            '-scale-y-100': !active,
          })}
        />
      </button>
      <motion.div
        id={id}
        animate={active ? 'open' : 'closed'}
        transition={{ duration: 0.6 }}
        variants={legendVariants}
        className="w-56 z-10 bg-white rounded shadow-xl text-xs flex flex-col lg:min-w-[280px]"
      >
        <div className="px-2 py-2">
          <div className="font-semibold text-black">
            <FormattedMessage defaultMessage="Project categories" id="rginRA" />
          </div>
          <ol className="flex flex-col gap-2 mt-2 text-left">
            {data.category.map((category) => (
              <li key={category.id}>
                <CategoryTagDot category={category.id as CategoryType} size="smallest" />
                {category.name}
              </li>
            ))}
          </ol>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectLegend;
