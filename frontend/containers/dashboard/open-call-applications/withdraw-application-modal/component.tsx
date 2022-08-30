import { FC } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import { useGetAlert } from 'helpers/pages';

import Alert from 'components/alert';
import ConfirmationPrompt from 'components/confirmation-prompt';

import { useDeleteOpenCallApplication } from 'services/open-call/application-service';

import type { WithdrawApplicationModalProps } from './types';

export const WithdrawApplicationModal: FC<WithdrawApplicationModalProps> = ({
  openCallApplication,
  openCall,
  isOpen,
  onAccept,
  onDismiss,
}: WithdrawApplicationModalProps) => {
  const intl = useIntl();

  const deleteOpenCallApplicationMutation = useDeleteOpenCallApplication();
  const alert = useGetAlert(deleteOpenCallApplicationMutation.error);

  const closeConfirmDeleteModal = () => {
    deleteOpenCallApplicationMutation.reset();
    onDismiss();
  };

  const handleDeletionConfirmation = () => {
    deleteOpenCallApplicationMutation.mutate(openCallApplication.id, {
      onSuccess: () => {
        closeConfirmDeleteModal();
        onAccept();
      },
    });
  };

  return (
    <ConfirmationPrompt
      open={isOpen}
      onAccept={handleDeletionConfirmation}
      onDismiss={closeConfirmDeleteModal}
      onRefuse={closeConfirmDeleteModal}
      onAcceptLoading={deleteOpenCallApplicationMutation.isLoading}
      title={intl.formatMessage({
        defaultMessage: 'Withdraw from the open call?',
        id: 'XOLAV7',
      })}
      description={
        <>
          <p className="max-w-sm">
            <FormattedMessage
              defaultMessage="Are you sure you want to withdraw from the “<strong>{openCallName}</strong>“ open call?"
              id="rE2fon"
              values={{
                openCallName: openCall?.name,
                strong: (chunk: string) => <span className="font-semibold">{chunk}</span>,
              }}
            />
          </p>
          <p className="mt-4">
            <FormattedMessage defaultMessage="You can't undo this action." id="k0xbVH" />
          </p>
          {alert && (
            <Alert type="warning" className="my-4 -mb-4 rounded">
              {/* useGetAlert returns an array, but the endpoint only sends one error message at a time. */}
              {alert[0]}
            </Alert>
          )}
        </>
      }
    />
  );
};

export default WithdrawApplicationModal;
