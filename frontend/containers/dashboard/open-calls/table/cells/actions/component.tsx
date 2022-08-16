import { FC, useCallback, useState } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import Link from 'next/link';
import { useRouter } from 'next/router';

import RowMenu, { RowMenuItem } from 'containers/dashboard/row-menu';

import ConfirmationPrompt from 'components/confirmation-prompt';
import { Paths, OpenCallStatus } from 'enums';

import { useDeleteOpenCall, useUpdateOpenCall } from 'services/open-call/open-call-service';

import { CellActionsProps } from './types';

export const CellActions: FC<CellActionsProps> = ({
  row: {
    original: { slug, name, status },
    index,
  },
  rows,
}: CellActionsProps) => {
  const intl = useIntl();
  const router = useRouter();

  const deleteOpenCallMutation = useDeleteOpenCall();
  const updateOpenCallMutation = useUpdateOpenCall();

  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [confirmLaunch, setConfirmLaunch] = useState(false);
  const [confirmClose, setConfirmClose] = useState(false);

  const handleRowMenuItemClick = (key: string) => {
    switch (key) {
      case 'launch':
        setConfirmLaunch(true);
        return;
      // case 'edit':
      //   router.push(
      //     `${Paths.OpenCall}/${slug}/edit?returnPath=${encodeURIComponent(router.asPath)}`,
      //     `${Paths.OpenCall}/${slug}/edit`
      //   );
      //   return;
      // case 'preview':
      //   router.push(`${Paths.OpenCall}/${slug}/preview`);
      //   return;
      case 'open':
        router.push(`${Paths.OpenCall}/${slug}`);
        return;
      case 'close':
        setConfirmClose(true);
        return;
      case 'delete':
        setConfirmDelete(true);
        return;
    }
  };

  const handleDeleteOpenCall = useCallback(() => {
    deleteOpenCallMutation.mutate(slug, {
      onSuccess: () => {
        setConfirmDelete(false);
      },
    });
  }, [slug, deleteOpenCallMutation]);

  const handleLaunchOpenCall = useCallback(() => {
    updateOpenCallMutation.mutate(
      { id: slug, status: OpenCallStatus.Launched },
      {
        onSuccess: () => {
          setConfirmLaunch(false);
        },
      }
    );
  }, [slug, updateOpenCallMutation]);

  const handleCloseOpenCall = useCallback(() => {
    updateOpenCallMutation.mutate(
      { id: slug, status: OpenCallStatus.Closed },
      {
        onSuccess: () => {
          setConfirmClose(false);
        },
      }
    );
  }, [slug, updateOpenCallMutation]);

  return (
    <div className="flex items-center justify-center gap-3">
      <Link
        href={`${Paths.OpenCall}/${slug}/edit?returnPath=${encodeURIComponent(router.asPath)}`}
        as={`${Paths.OpenCall}/${slug}/edit`}
      >
        <a className="px-2 py-1 text-sm transition-all text-green-dark focus-visible:outline-green-dark rounded-2xl">
          <FormattedMessage defaultMessage="Edit" id="wEQDC6" />
        </a>
      </Link>
      <RowMenu direction="top" onAction={handleRowMenuItemClick}>
        {status === OpenCallStatus.Draft && (
          <RowMenuItem key="launch">
            <FormattedMessage defaultMessage="Launch open call" id="c4HVkO" />
          </RowMenuItem>
        )}
        {/* <RowMenuItem key="edit">
          <FormattedMessage defaultMessage="Edit" id="wEQDC6" />
        </RowMenuItem>
        {status === OpenCallStatus.Draft ? (
          <RowMenuItem key="preview">
            <FormattedMessage defaultMessage="Preview open call page" id="iR1WoG" />
          </RowMenuItem>
        ) : ( */}
        <RowMenuItem key="open">
          <FormattedMessage defaultMessage="View open call page" id="7sVapx" />
        </RowMenuItem>
        {/* )} */}
        {status === OpenCallStatus.Launched && (
          <RowMenuItem key="close">
            <FormattedMessage defaultMessage="Close open call" id="kdZTM0" />
          </RowMenuItem>
        )}
        <RowMenuItem key="delete">
          <FormattedMessage defaultMessage="Delete" id="K3r6DQ" />
        </RowMenuItem>
      </RowMenu>

      <ConfirmationPrompt
        open={confirmDelete}
        onAccept={handleDeleteOpenCall}
        onDismiss={() => setConfirmDelete(false)}
        onRefuse={() => setConfirmDelete(false)}
        title={intl.formatMessage({ defaultMessage: 'Delete open call?', id: 'DsukuX' })}
        description={
          <>
            <p>
              <FormattedMessage
                defaultMessage="Are you sure you want to delete “<strong>{name}</strong>”?"
                id="LI0oKR"
                values={{
                  name,
                  strong: (chunk: string) => <span className="font-semibold">{chunk}</span>,
                }}
              />
            </p>
            <p>
              <FormattedMessage defaultMessage="You can't undo this action." id="k0xbVH" />
            </p>
          </>
        }
      />

      <ConfirmationPrompt
        open={confirmLaunch}
        onAccept={handleLaunchOpenCall}
        onDismiss={() => setConfirmLaunch(false)}
        onRefuse={() => setConfirmLaunch(false)}
        onConfirmText={intl.formatMessage({ defaultMessage: 'Launch', id: 'ewx2b7' })}
        title={intl.formatMessage({ defaultMessage: 'Launch open call?', id: 'EgOO+m' })}
        description={
          <>
            <p>
              <FormattedMessage
                defaultMessage="By launching your open call, it will be publicly visible and projects will be able to apply to it."
                id="8UvQTx"
              />
            </p>
            <p>
              <FormattedMessage defaultMessage="Are you sure you want to continue?" id="Iu60EH" />
            </p>
          </>
        }
      />

      <ConfirmationPrompt
        open={confirmClose}
        onAccept={handleCloseOpenCall}
        onDismiss={() => setConfirmClose(false)}
        onRefuse={() => setConfirmClose(false)}
        onConfirmText={intl.formatMessage({ defaultMessage: 'Close', id: 'rbrahO' })}
        title={intl.formatMessage({ defaultMessage: 'Close open call?', id: '0lKwqs' })}
        description={
          <>
            <p>
              <FormattedMessage
                defaultMessage="Are you sure you want to close “<strong>{name}</strong>”?"
                id="r2qqVX"
                values={{
                  name,
                  strong: (chunk: string) => <span className="font-semibold">{chunk}</span>,
                }}
              />
            </p>
            <p>
              <FormattedMessage defaultMessage="You can't undo this action." id="k0xbVH" />
            </p>
          </>
        }
      />
    </div>
  );
};

export default CellActions;
