import React, { useState } from 'react';

import { Mail as MailIcon, Trash2 as TrashIcon } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQueryClient } from 'react-query';

import cx from 'classnames';

import ConfirmationPrompt from 'components/confirmation-prompt';
import Icon from 'components/icon';
import Tooltip from 'components/tooltip';
import { InvitationStatus, Queries } from 'enums';

import { useDeleteUser } from 'services/account';

import { CellActionsProps } from './types';

export const CellActions = ({ row }: CellActionsProps) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const intl = useIntl();

  const deleteUser = useDeleteUser();
  const queryClient = useQueryClient();

  if (!row) return null;
  const {
    original: { id, invitation, first_name, last_name, email },
  } = row;
  const displayName = first_name ? first_name + ' ' + last_name : email;
  const canResendInvitation =
    invitation === InvitationStatus.Expired || invitation === InvitationStatus.Waiting;

  const handleDeleteUser = (userId: string) => {
    deleteUser.mutate(userId, {
      onSuccess: () => {
        queryClient.invalidateQueries(Queries.AccountUsersList);
        setConfirmDelete(false);
      },
    });
  };

  return (
    <div
      className={cx({
        'flex justify-end': true,
        'space-x-2': canResendInvitation,
      })}
    >
      <Tooltip
        placement="top"
        arrow
        arrowClassName="bg-black"
        content={
          <div className="max-w-xs p-2 font-sans text-sm font-normal text-white bg-black rounded-sm sm:max-w-md">
            <FormattedMessage defaultMessage="Invite again" id="Fxekek" />
          </div>
        }
      >
        <button
          onClick={() => console.log('re-invite user')}
          className={cx({
            'flex items-center justify-center w-8 h-8 border rounded-full pointer border-green-dark hover:bg-green-light hover:bg-opacity-20':
              true,
            invisible: !canResendInvitation,
          })}
        >
          <Icon className="w-5 h-5 text-green-dark" icon={MailIcon} />
        </button>
      </Tooltip>

      <Tooltip
        placement="top"
        arrow
        arrowClassName="bg-black"
        content={
          <div className="max-w-xs p-2 font-sans text-sm font-normal text-white bg-black rounded-sm sm:max-w-md">
            <FormattedMessage defaultMessage="Delete" id="K3r6DQ" />
          </div>
        }
      >
        <button
          type="button"
          onClick={() => setConfirmDelete(true)}
          className="flex items-center justify-center w-8 h-8 border rounded-full hover:bg-green-light hover:bg-opacity-20 pointer border-green-dark"
        >
          <Icon className="w-5 h-5 text-green-dark" icon={TrashIcon} />
        </button>
      </Tooltip>

      <ConfirmationPrompt
        open={confirmDelete}
        onAccept={() => handleDeleteUser(id)}
        onDismiss={() => setConfirmDelete(false)}
        onRefuse={() => setConfirmDelete(false)}
        title={intl.formatMessage({ id: 'tSCuG5', defaultMessage: 'Delete user?' })}
        description={intl.formatMessage(
          {
            defaultMessage:
              "Are you sure you want to delete <strong>{displayName}</strong>? You can't undo this action.",
            id: 'eXH6WV',
          },
          {
            displayName,
            strong: (chunk: string) => <strong>{chunk}</strong>,
          }
        )}
      />
    </div>
  );
};

export default CellActions;
