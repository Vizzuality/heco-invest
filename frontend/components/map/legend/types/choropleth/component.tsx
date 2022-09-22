import { FC } from 'react';

import cx from 'classnames';

import type { LegendTypeChoroplethProps } from './types';

export const LegendTypeChoropleth: FC<LegendTypeChoroplethProps> = ({
  className = '',
  items,
}: LegendTypeChoroplethProps) => (
  <div
    className={cx({
      [className]: !!className,
    })}
  >
    <ul className="flex w-full">
      {items.map(({ color }) => (
        <li
          key={`${color}`}
          className="flex-shrink-0 h-1"
          style={{
            width: `${100 / items.length}%`,
            backgroundColor: color,
          }}
        />
      ))}
    </ul>

    <ul className="flex w-full mt-1">
      {items.map(({ label, color }) => (
        <li
          key={color}
          className="flex-shrink-0 text-center text-2xs"
          style={{
            width: `${100 / items.length}%`,
          }}
        >
          {label}
        </li>
      ))}
    </ul>
  </div>
);

export default LegendTypeChoropleth;
