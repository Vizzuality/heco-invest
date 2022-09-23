import { FC } from 'react';

import cx from 'classnames';

import type { LegendTypeBasicProps } from './types';

export const LegendTypeBasic: FC<LegendTypeBasicProps> = ({
  className = '',
  items,
}: LegendTypeBasicProps) => (
  <div
    className={cx({
      [className]: !!className,
    })}
  >
    <ul className="grid w-full grid-flow-col grid-cols-2 grid-rows-4 gap-y-1">
      {items.map(({ label, color }) => (
        <li key={`${label}`} className="flex items-center space-x-2 font-medium text-2xs ">
          <div
            className="w-4 h-2 rounded-sm"
            style={{
              backgroundColor: color,
            }}
          />
          <div>{label}</div>
        </li>
      ))}
    </ul>
  </div>
);

export default LegendTypeBasic;
