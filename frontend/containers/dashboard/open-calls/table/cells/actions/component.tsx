import { FC, useState } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import Link from 'next/link';
import { useRouter } from 'next/router';

import RowMenu, { RowMenuItem } from 'containers/dashboard/row-menu';

import ConfirmationPrompt from 'components/confirmation-prompt';
import { Paths, OpenCallStatus } from 'enums';

import { useDeleteAccountProject } from 'services/account';

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

  const deleteProjectMutation = useDeleteAccountProject();

  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const handleRowMenuItemClick = (key: string) => {
    switch (key) {
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
      // case 'delete':
      //   setConfirmDelete(true);
      //   return;
    }
  };

  const handleDeleteProjectConfirmation = () => {
    deleteProjectMutation.mutate(
      { id: slug },
      {
        onSuccess: () => {
          setConfirmDelete(false);
        },
      }
    );
  };

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
        {/* <RowMenuItem key="delete">
          <FormattedMessage defaultMessage="Delete" id="K3r6DQ" />
        </RowMenuItem> */}
      </RowMenu>

      <ConfirmationPrompt
        open={confirmDelete}
        onAccept={handleDeleteProjectConfirmation}
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
    </div>
  );
};

export default CellActions;
