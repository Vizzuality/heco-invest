import { FC } from 'react';

import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import { CellStatusProps, StatusTag } from './types';

export const CellStatus: FC<CellStatusProps> = ({ value }: CellStatusProps) => {
  if (value === undefined) return null;

  return (
    <span
      className={cx({
        'bg-opacity-20 text-sm px-2.5 py-0.5 rounded-2xl': true,
        'bg-gray-800 text-gray-800': value === StatusTag.Draft,
        'bg-green-light text-green-dark': value === StatusTag.Verified,
        'bg-orange text-orange': value === StatusTag.Unverified,
      })}
    >
      {value === StatusTag.Draft && <FormattedMessage defaultMessage="Draft" id="W6nwjo" />}
      {value === StatusTag.Verified && <FormattedMessage defaultMessage="Verified" id="Z8971h" />}
      {value === StatusTag.Unverified && (
        <FormattedMessage defaultMessage="Unverified" id="n9fdaJ" />
      )}
    </span>
  );
};

export default CellStatus;
