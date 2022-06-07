import React, { useState } from 'react';

import { Mail as MailIcon, Trash2 as TrashIcon } from 'react-feather';

import ConfirmationPrompt from 'components/confirmation-prompt';
import Icon from 'components/icon';

import { CellActionsProps } from './types';

export const CellActions = ({ row }: CellActionsProps) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

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
        onClick={() => setConfirmDelete(true)}
        className="flex items-center justify-center w-8 h-8 border rounded-full pointer border-green-dark"
      >
        <Icon className="w-5 h-5 text-green-dark" icon={TrashIcon} />
      </button>
      <ConfirmationPrompt
        open={confirmDelete}
        onAccept={() => console.log(`Delete ${id} user`)}
        onDismiss={() => setConfirmDelete(false)}
        onRefuse={() => setConfirmDelete(false)}
        title="Delete user?"
        description="Are you sure you want to delete this user?"
      />
    </div>
  );
};

export default CellActions;
