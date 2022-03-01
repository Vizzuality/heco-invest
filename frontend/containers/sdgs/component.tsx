import { FC, useState, useEffect } from 'react';

import { useIntl } from 'react-intl';

import cx from 'classnames';

import { uniq } from 'lodash';
import { noop } from 'lodash';

import { SDGS_DATA } from './constants';
import SDG from './sdg';
import type { SDGsProps } from './types';

export const SDGs: FC<SDGsProps> = ({
  className,
  size = 'small',
  ids: initialIds,
  selectable = false,
  selectedIds: initialSelectedIds,
  onChange = () => noop,
}: SDGsProps) => {
  const intl = useIntl();

  const ids: string[] = initialIds || SDGS_DATA(intl).map(({ id }) => id);

  const [selectedIds, setSelectedIds] = useState<string[]>(
    (initialSelectedIds || ids).filter((id) => ids.includes(id))
  );

  const toggleItem = (itemId: string, isSelected: boolean): void => {
    setSelectedIds(
      uniq(isSelected ? [...selectedIds, itemId] : selectedIds.filter((id) => id !== itemId))
    );
  };

  useEffect(() => {
    onChange(selectedIds);
  }, [onChange, selectedIds]);

  return (
    <div className={cx('flex flex-wrap items-center gap-2', className)}>
      {ids.map((id: string) => {
        return (
          <SDG
            key={id}
            id={id}
            size={size}
            selectable={selectable}
            defaultSelected={selectedIds.includes(id)}
            onChange={(isSelected) => toggleItem(id, isSelected)}
          />
        );
      })}
    </div>
  );
};

export default SDGs;
