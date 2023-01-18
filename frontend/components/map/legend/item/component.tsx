import { FC } from 'react';

import { X } from 'react-feather';
import { useIntl } from 'react-intl';

import Button from 'components/button';
import FieldInfo from 'components/forms/field-info';
import Icon from 'components/icon';

import type { LegendItemProps } from './types';

export const LegendItem: FC<LegendItemProps> = ({
  id,
  name,
  description,
  icon,
  children,
  handleCloseLegend,
}: LegendItemProps) => {
  const { formatMessage } = useIntl();

  return (
    <div key={id} className="px-2 py-2.5 mb-0.5 bg-white rounded shadow">
      <div className="flex items-center justify-between">
        <div className="">
          <div className="flex items-center leading-[14px]">
            {icon}
            <span className="text-xs font-medium leading-[14px]">{name}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <FieldInfo content={description} />
          <Button
            type="button"
            className="z-50 flex items-center w-3 h-3 right-2"
            onClick={handleCloseLegend}
            theme="naked"
            size="smallest"
            aria-label={formatMessage({ defaultMessage: 'Remove layer', id: 'D6WycV' })}
          >
            <Icon
              icon={X}
              className="w-4 h-4 stroke-[3px] text-gray-800 transition-transform hover:rotate-180"
            />
          </Button>
        </div>
      </div>
      {children && <div>{children}</div>}
    </div>
  );
};

export default LegendItem;
