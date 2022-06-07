import React from 'react';

import cx from 'classnames';

import { CellInvitationProps } from './types';

export const CellInvitation = ({ value }: CellInvitationProps) => {
  if (!value) return null;

  return (
    <div
      className={cx({
        'items-center inline-block px-2.5 py-0.5 bg-opacity-20 rounded-2xl': true,
        'bg-green-light': value === 'Accepted',
        'bg-orange ml-2': value === 'Waiting',
      })}
    >
      <p
        className={cx({
          'text-sm': true,
          'text-green-dark': value === 'Accepted',
          'text-orange': value === 'Waiting',
        })}
      >
        {value}
      </p>
    </div>
  );
};

export default CellInvitation;
