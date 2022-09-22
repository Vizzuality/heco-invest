import { FC } from 'react';

import { X } from 'react-feather';

import Button from 'components/button';

import type { LegendItemProps } from './types';

export const LegendItem: FC<LegendItemProps> = ({
  id,
  name,
  // description,
  icon,
  children,
  handleCloseLegend,
}: LegendItemProps) => {
  return (
    <div key={id} className="px-2 py-2.5 mb-1 bg-white rounded">
      <div className="flex items-center justify-between">
        <div className="">
          <div className="flex items-center leading-[14px]">
            {icon}
            <span className="text-xs leading-[14px]">{name}</span>
          </div>
        </div>
        <Button
          type="button"
          className="absolute z-50 flex items-center w-3 h-3 right-2"
          onClick={handleCloseLegend}
          theme="naked"
          icon={() => <X className="text-gray-800 transition-transform hover:rotate-180" />}
          size="smallest"
        />
      </div>
      {children && <div>{children}</div>}
    </div>
  );
};

export default LegendItem;
