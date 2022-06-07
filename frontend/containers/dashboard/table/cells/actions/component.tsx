import React from 'react';

import { Mail as MailIcon, Trash2 as TrashIcon } from 'react-feather';

import Icon from 'components/icon';

import { CellActionsProps } from './types';

export const CellActions = ({ row }: CellActionsProps) => {
  if (!row) return null;
  const {
    original: { id, email },
  } = row;

  return (
    <div className="flex space-x-2">
      <a
        href={`mailto:${email}`}
        className="flex items-center justify-center w-8 h-8 border rounded-full pointer border-green-dark"
      >
        <Icon className="w-5 h-5 text-green-dark" icon={MailIcon} />
      </a>
      <button
        type="button"
        onClick={() => console.log(`Delete ${id} user`)}
        className="flex items-center justify-center w-8 h-8 border rounded-full pointer border-green-dark"
      >
        <Icon className="w-5 h-5 text-green-dark" icon={TrashIcon} />
      </button>
    </div>
  );
};

export default CellActions;
