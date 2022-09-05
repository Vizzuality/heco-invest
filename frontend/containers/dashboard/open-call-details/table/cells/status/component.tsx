import { FC } from 'react';

import cx from 'classnames';

import { CellStatusProps } from './types';

export const CellStatus: FC<CellStatusProps> = ({ row, cell }: CellStatusProps) => {
  const {
    original: { openCallApplication },
  } = row;

  const { value } = cell;

  return (
    <span
      className={cx({
        'bg-opacity-20 text-sm px-2.5 py-0.5 rounded-2xl': true,
        'bg-gray-800 text-gray-800': !openCallApplication.funded,
        'bg-green-light text-green-dark': openCallApplication.funded,
      })}
    >
      {value}
    </span>
  );
};

export default CellStatus;
