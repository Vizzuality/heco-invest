import React, { useState } from 'react';

import { Mail as MailIcon, Trash2 as TrashIcon } from 'react-feather';
import { useIntl } from 'react-intl';

import cx from 'classnames';

import ConfirmationPrompt from 'components/confirmation-prompt';
import Icon from 'components/icon';

import { CellActionsProps } from './types';

export const CellActions = ({ row }: CellActionsProps) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const intl = useIntl();

  if (!row) return null;
  const {
    original: { id, confirmed, first_name, last_name },
  } = row;
  const displayName = first_name + ' ' + last_name;

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => console.log('re-invite user')}
        className={cx({
          'flex items-center justify-center w-8 h-8 border rounded-full pointer border-green-dark':
            true,
          invisible: confirmed,
        })}
      >
        <Icon className="w-5 h-5 text-green-dark" icon={MailIcon} />
      </button>

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
        description={intl.formatMessage(
          {
            defaultMessage:
              'Are you sure you want to delete <strong>{displayName}</strong>? You cant undo this action.',
            id: 'bQc7X2',
          },
          {
            displayName: displayName,
            strong: (chunk: string) => <strong>{chunk}</strong>,
          }
        )}
      />
    </div>
  );
};

export default CellActions;
