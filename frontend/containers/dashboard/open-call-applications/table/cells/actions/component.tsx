import { FC, useState } from 'react';

import { X as XIcon } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import Link from 'next/link';

import { useGetAlert } from 'helpers/pages';

import Alert from 'components/alert';
import Button from 'components/button';
import ConfirmationPrompt from 'components/confirmation-prompt';
import Icon from 'components/icon';
import Tooltip from 'components/tooltip';
import { Paths } from 'enums';

import { useDeleteOpenCallApplication } from 'services/open-call/applicationService';

import { CellActionsProps } from './types';

export const CellActions: FC<CellActionsProps> = ({
  row: {
    original: { id, openCallName },
  },
}: CellActionsProps) => {
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState<boolean>(false);

  const intl = useIntl();
  const deleteOpenCallApplicationMutation = useDeleteOpenCallApplication();
  const alert = useGetAlert(deleteOpenCallApplicationMutation.error);

  const closeConfirmDeleteModal = () => {
    deleteOpenCallApplicationMutation.reset();
    setConfirmDeleteModalOpen(false);
  };

  const handleDeletionConfirmation = () => {
    deleteOpenCallApplicationMutation.mutate(id, { onSuccess: closeConfirmDeleteModal });
  };

  return (
    <>
      <div className="flex items-center justify-center gap-10 pr-8">
        <div>
          <Tooltip
            placement="top"
            arrow
            arrowClassName="bg-black"
            content={
              <div className="max-w-xs p-2 font-sans text-sm font-normal text-white bg-black rounded-sm sm:max-w-md">
                <FormattedMessage defaultMessage="Withdraw from the open call" id="soFliQ" />
              </div>
            }
          >
            <Button
              className="flex items-center justify-center w-8 h-8 -my-2 border rounded-full hover:bg-green-light hover:bg-opacity-20 pointer border-green-dark focus-visible:outline focus-visible:outline-green-dark focus-visible:outline-2 focus-visible:outline-offset-2"
              theme="naked"
              type="button"
              size="smallest"
              onClick={() => setConfirmDeleteModalOpen(true)}
            >
              <span className="sr-only">
                <FormattedMessage defaultMessage="Widthraw from the open call" id="gd1sn5" />
              </span>
              <Icon className="w-4 h-4 text-green-dark" icon={XIcon} />
            </Button>
          </Tooltip>
        </div>
        <Link href={`${Paths.DashboardOpenCallApplications}/${id}`}>
          <a className="px-2 py-1 text-sm transition-all text-green-dark focus-visible:outline-green-dark rounded-2xl">
            <FormattedMessage defaultMessage="Details" id="Lv0zJu" />
          </a>
        </Link>
      </div>

      <ConfirmationPrompt
        open={confirmDeleteModalOpen}
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
                  openCallName,
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
    </>
  );
};

export default CellActions;
