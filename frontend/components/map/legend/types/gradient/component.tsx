import { FC } from 'react';

import cx from 'classnames';

import type { LegendTypeGradientProps } from './types';

export const LegendTypeGradient: FC<LegendTypeGradientProps> = ({
  className = '',
  items,
}: LegendTypeGradientProps) => (
  <div
    className={cx('h-full', {
      [className]: !!className,
    })}
  >
    <div
      className="flex w-full h-1"
      style={{
        backgroundImage: `linear-gradient(to right, ${items.map((i) => i.color).join(',')})`,
      }}
    />

    <ul className="flex justify-between w-full mt-1">
      {items.map(({ label, color }) => (
        <li key={`${color}`} className="flex-shrink-0 font-medium text-2xs">
          {label}
        </li>
      ))}
    </ul>
  </div>
);

export default LegendTypeGradient;
