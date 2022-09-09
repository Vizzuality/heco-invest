import { FC, useState } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import { useGetAlert } from 'helpers/pages';

import Alert from 'components/alert';
import Button from 'components/button';
import ConfirmationPrompt from 'components/confirmation-prompt';

import { useAccount, useDeleteAccount } from 'services/account';

import { DeleteAccountProps } from './types';

export const DeleteAccount: FC<DeleteAccountProps> = ({}: DeleteAccountProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { formatMessage } = useIntl();
  const { userAccount } = useAccount();
  const deleteAccountMutation = useDeleteAccount();
  const alert = useGetAlert(deleteAccountMutation.error);

  const handleCloseModal = () => {
    deleteAccountMutation.reset();
    setShowConfirmation(false);
  };

  const handleDeleteAccount = () => {
    deleteAccountMutation.reset();
    // onSuccess, etc callbacks will not be fired
    deleteAccountMutation.mutate({});
  };

  return (
    <>
      <div className="p-6 bg-white rounded-lg">
        <div className="flex-grow text-xl font-semibold text-red-700">
          <FormattedMessage defaultMessage="Delete account" id="wyxJrL" />
        </div>
        <div className="p-4 mt-6 text-sm rounded-lg bg-red-50">
          <FormattedMessage
            defaultMessage="By deleting the account, <b>all existing information, users and related content will be deleted</b>. This action can’t be undone."
            id="mqQ6S4"
            values={{
              b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
            }}
          />
        </div>
        <div className="flex justify-end mt-6">
          <Button theme="primary-red" onClick={() => setShowConfirmation(true)}>
            <FormattedMessage defaultMessage="Delete account" id="wyxJrL" />
          </Button>
        </div>
      </div>
      <ConfirmationPrompt
        onAccept={handleDeleteAccount}
        onAcceptLoading={deleteAccountMutation.isLoading}
        onDismiss={handleCloseModal}
        onRefuse={handleCloseModal}
        open={showConfirmation}
        title={formatMessage(
          { defaultMessage: 'Delete {accountName} account', id: 'kN2Vfv' },
          { accountName: userAccount?.name }
        )}
        description={
          <>
            <p>
              <FormattedMessage
                defaultMessage="Are you sure you want to delete the account?"
                id="6hS0se"
              />
            </p>
            <p>
              <FormattedMessage defaultMessage="You can’t undo this action." id="Z6MFUA" />
            </p>
            {alert && (
              <Alert type="warning" className="mt-4 rounded">
                {/* useGetAlert returns an array, but the endpoint only sends one error message at a time. */}
                {alert[0]}
              </Alert>
            )}
          </>
        }
      />
    </>
  );
};

export default DeleteAccount;
