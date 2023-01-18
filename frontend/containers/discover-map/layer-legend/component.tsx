import { useState, useCallback, FC } from 'react';

import { ChevronDown as ChevronDownIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import { useId } from '@react-aria/utils';
import { motion } from 'framer-motion';

import Button from 'components/button';
import Icon from 'components/icon';
import Legend from 'components/map/legend';
import LegendItem from 'components/map/legend/item';
import BasicTypeGradient from 'components/map/legend/types/basic';
import LegendTypeChoropleth from 'components/map/legend/types/choropleth';
import LegendTypeGradient from 'components/map/legend/types/gradient';
import ProjectLegend from 'components/map/project-legend';

import { LayerLegendProps } from './types';

export const LayerLegend: FC<LayerLegendProps> = ({
  layersLegends,
  className = '',
  maxHeight,
  onCloseLegend,
}) => {
  const id = useId();

  const [active, setActive] = useState(true);

  const onToggleActive = useCallback(() => {
    setActive(!active);
  }, [active]);

  const legendVariants = {
    open: { opacity: 1, height: 'auto' },
    closed: { opacity: 0, height: 0 },
  };

  return (
    <div
      className={cx({
        'flex flex-col items-end h-full gap-px bg-transparent pl-4': true,
        [className]: !!className,
      })}
    >
      <Button
        theme="naked"
        size="smallest"
        aria-controls={id}
        aria-expanded={active}
        className="fixed flex items-center justify-center w-8 h-8 bg-white rounded -translate-y-[34px] button focus-visible:outline-green-dark shadow"
        onClick={onToggleActive}
      >
        <span className="sr-only">
          <FormattedMessage defaultMessage="Show legend" id="PexDlg" />
        </span>
        <Icon
          aria-hidden={true}
          icon={ChevronDownIcon}
          className={cx({
            'w-4.5 h-4.5 text-gray-800 shrink-0 transition duration-500': true,
            '-scale-y-100': !active,
          })}
        />
      </Button>
      <motion.div
        id={id}
        aria-hidden={!active}
        animate={active ? 'open' : 'closed'}
        transition={{ duration: 0.6 }}
        variants={legendVariants}
        className="w-56 z-10 bg-transparent shadow-xl text-xs flex flex-col lg:min-w-[280px] h-full overflow-hidden"
        style={{ maxHeight }}
      >
        <Legend>
          {layersLegends.map((i) => {
            const { type, items, id, name, group, description } = i;
            return (
              <LegendItem
                key={i.id}
                name={name}
                id={id}
                description={description}
                handleCloseLegend={() => onCloseLegend(group)}
                icon={
                  type === 'monocolor' && (
                    <span
                      className="inline-block w-2 h-2 mr-2 rounded-sm"
                      style={{
                        backgroundColor: items[0].color,
                        opacity: items[0].opacity || 1,
                      }}
                    />
                  )
                }
              >
                {type === 'choropleth' && (
                  <LegendTypeChoropleth className="mt-1.5 text-2xs text-black" items={items} />
                )}
                {type === 'gradient' && (
                  <LegendTypeGradient className="mt-1.5 text-black text-2sx" items={items} />
                )}
                {type === 'basic' && (
                  <BasicTypeGradient className="mt-1.5 text-black text-2sx" items={items} />
                )}
              </LegendItem>
            );
          })}
        </Legend>
        <ProjectLegend className="z-10 bg-white rounded shadow" />
      </motion.div>
    </div>
  );
};

export default LayerLegend;
