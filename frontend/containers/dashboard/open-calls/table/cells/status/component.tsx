import { FC } from 'react';

import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import { OpenCallStatus } from 'enums';

import { CellStatusProps } from './types';

export const CellStatus: FC<CellStatusProps> = ({ value }: CellStatusProps) => {
  if (value === undefined) return null;

  return (
    <span
      className={cx({
        'bg-opacity-20 text-sm px-2.5 py-0.5 rounded-2xl': true,
        'bg-gray-800 text-gray-800': value === OpenCallStatus.Draft,
        'bg-green-light text-green-dark': value === OpenCallStatus.Launched,
        'bg-orange text-orange': value === OpenCallStatus.Closed,
      })}
    >
      {value === OpenCallStatus.Draft && <FormattedMessage defaultMessage="Draft" id="W6nwjo" />}
      {value === OpenCallStatus.Launched && (
        <FormattedMessage defaultMessage="Launched" id="sH3zMa" />
      )}
      {value === OpenCallStatus.Closed && <FormattedMessage defaultMessage="Closed" id="Fv1ZSz" />}
    </span>
  );
};

export default CellStatus;
