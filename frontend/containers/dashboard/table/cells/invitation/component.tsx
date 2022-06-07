import React from 'react';

import cx from 'classnames';

import { CellInvitationProps } from './types';

export const CellInvitation = ({ value }: CellInvitationProps) => {
  if (!value) return null;

  return (
    <div
      className={cx({
        'items-center inline-block px-4 border opacity-20 rounded-2xl': true,
        'bg-green-light  border-green-light': value === 'Accepted',
        'bg-red-400  border-red-400': value === 'Waiting',
      })}
    >
      <p>{value}</p>
    </div>
  );
};

export default CellInvitation;
