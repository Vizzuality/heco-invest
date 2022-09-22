import { useState, useMemo, useCallback, FC } from 'react';

import { ChevronDown as ChevronDownIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import { useId } from '@react-aria/utils';
import { motion } from 'framer-motion';

import Button from 'components/button';
import Icon from 'components/icon';
import Legend from 'components/map/legend';
import LegendItem from 'components/map/legend/item';
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
  const [sortArray, setSortArray] = useState([]);
  // Sorted
  const sortedItems = useMemo(() => {
    const itms = layersLegends.sort((a, b) => sortArray.indexOf(a.id) - sortArray.indexOf(b.id));
    return itms;
  }, [layersLegends, sortArray]);

  const id = useId();

  // Callbacks
  const onChangeOrder = useCallback((ids) => {
    setSortArray(ids);
  }, []);
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
        'flex flex-col items-end justify-end h-full gap-px bg-transparent': true,
        [className]: !!className,
      })}
    >
      <Button
        theme="naked"
        size="smallest"
        aria-controls={id}
        aria-expanded={active}
        className="flex items-center justify-center w-8 h-8 bg-white rounded shadow-xl focus-visible:outline-green-dark"
        onClick={onToggleActive}
      >
        <span className="sr-only">
          <FormattedMessage defaultMessage="Legend" id="iZuO+L" />
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
        className="w-56 z-10 bg-transparent shadow-xl text-xs flex flex-col lg:min-w-[280px] h-full overflow-y-auto"
        style={{ maxHeight }}
      >
        <Legend onChangeOrder={onChangeOrder}>
          {sortedItems.map((i) => {
            const { type, items, id, name } = i;
            return (
              <LegendItem
                key={i.id}
                name={name}
                id={id}
                handleCloseLegend={() => onCloseLegend(id)}
                icon={
                  type === 'basic' && (
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
              </LegendItem>
            );
          })}
        </Legend>
        <ProjectLegend className="bg-white rounded" />
      </motion.div>
    </div>
  );
};

export default LayerLegend;
