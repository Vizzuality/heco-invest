import { useState } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';
import { useQueryClient } from 'react-query';

import RowMenu, { RowMenuItem } from 'containers/dashboard/row-menu';

import ConfirmationPrompt from 'components/confirmation-prompt';
import { InvitationStatus, Queries } from 'enums';

import { transferOwnership } from 'services/account';

import { CellRoleProps } from './types';

export const CellRole = ({ value, row: { original }, isOwner, accountName }: CellRoleProps) => {
  const { formatMessage } = useIntl();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const queryClient = useQueryClient();

  if (value) {
    return (
      <p>
        <FormattedMessage defaultMessage="Owner" id="zINlao" />
      </p>
    );
  }

  if (
    !isOwner ||
    (original.invitation !== InvitationStatus.Completed &&
      (!original.approved || !original.confirmed))
  ) {
    return (
      <p>
        <FormattedMessage defaultMessage="User" id="EwRIOm" />
      </p>
    );
  }

  const handleChangeOwner = (key: string) => {
    if (key === 'owner') {
      setIsOpen(true);
    }
  };

  const updateAccountOwner = async () => {
    if (isOwner && original?.id) {
      setIsLoading(true);
      transferOwnership(original.id)
        .then(() => {
          queryClient.invalidateQueries(Queries.User);
          queryClient.invalidateQueries(Queries.AccountUsersList);
          setIsOpen(false);
        })
        .catch((err) => {
          setError(
            err?.message[0]?.title ||
              formatMessage({
                defaultMessage:
                  'Something went wrong while trying to change the account ownership.',
                id: 'P3pSke',
              })
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="flex items-center">
      <p className="mr-2">
        <FormattedMessage defaultMessage="User" id="EwRIOm" />
      </p>
      <RowMenu onAction={handleChangeOwner} iconType="open-close">
        <RowMenuItem key="user">
          <FormattedMessage defaultMessage="User" id="EwRIOm" />
        </RowMenuItem>
        <RowMenuItem key="owner">
          <FormattedMessage defaultMessage="Owner" id="zINlao" />
        </RowMenuItem>
      </RowMenu>
      <ConfirmationPrompt
        open={isOpen}
        onAccept={updateAccountOwner}
        title={formatMessage({ defaultMessage: 'Change account owner', id: 'Xcq/fH' })}
        onDismiss={() => setIsOpen(false)}
        onRefuse={() => setIsOpen(false)}
        onConfirmText={formatMessage({ defaultMessage: 'Transfer ownership', id: '2AIlHB' })}
        description={formatMessage(
          {
            defaultMessage:
              'Are you sure you want to make <n>{userName}</n> the owner of <n>{accountName}</n> account? You cant undo this action.',
            id: 'UD6OB+',
          },
          {
            n: (chunk: string) => <span className="font-semibold">{chunk}</span>,
            userName: original?.first_name
              ? `${original?.first_name} ${original?.last_name}`
              : original?.email,
            accountName,
          }
        )}
        confirmationError={error}
        onAcceptLoading={isLoading}
      />
    </div>
  );
};

export default CellRole;
