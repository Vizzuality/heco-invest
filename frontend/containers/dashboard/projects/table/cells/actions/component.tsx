import { FC, useState } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import Link from 'next/link';
import { useRouter } from 'next/router';

import RowMenu, { RowMenuItem } from 'containers/dashboard/row-menu';

import ConfirmationPrompt from 'components/confirmation-prompt';
import { Paths, ProjectStatus } from 'enums';

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
      case 'edit':
        router.push(
          `${Paths.Project}/${slug}/edit?returnPath=${encodeURIComponent(router.asPath)}`,
          `${Paths.Project}/${slug}/edit`
        );
        return;
      case 'preview':
        router.push(`${Paths.Project}/${slug}/preview`);
        return;
      case 'open':
        router.push(`${Paths.Project}/${slug}`);
        return;
      case 'delete':
        setConfirmDelete(true);
        return;
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

  // Used to change the position of the menu on the last row so that it is not hidden by the table's bottom
  const isLast = rows?.length === index + 1;

  return (
    <div className="flex items-center justify-center gap-3">
      <Link
        href={`${Paths.Project}/${slug}/edit?returnPath=${encodeURIComponent(router.asPath)}`}
        as={`${Paths.Project}/${slug}/edit`}
      >
        <a className="px-2 py-1 text-sm transition-all text-green-dark focus-visible:outline-green-dark rounded-2xl">
          <FormattedMessage defaultMessage="Edit" id="wEQDC6" />
        </a>
      </Link>
      <RowMenu direction={isLast ? 'top' : 'bottom'} onAction={handleRowMenuItemClick}>
        <RowMenuItem key="edit">
          <FormattedMessage defaultMessage="Edit" id="wEQDC6" />
        </RowMenuItem>
        {status === ProjectStatus.Draft ? (
          <RowMenuItem key="preview">
            <FormattedMessage defaultMessage="Preview project page" id="EvP1Ut" />
          </RowMenuItem>
        ) : (
          <RowMenuItem key="open">
            <FormattedMessage defaultMessage="View project page" id="ToXG99" />
          </RowMenuItem>
        )}
        <RowMenuItem key="delete">
          <FormattedMessage defaultMessage="Delete" id="K3r6DQ" />
        </RowMenuItem>
      </RowMenu>

      <ConfirmationPrompt
        open={confirmDelete}
        onAccept={handleDeleteProjectConfirmation}
        onDismiss={() => setConfirmDelete(false)}
        onRefuse={() => setConfirmDelete(false)}
        title={intl.formatMessage({ defaultMessage: 'Delete project?', id: 'GsO+rH' })}
        description={
          <>
            <p>
              <FormattedMessage
                defaultMessage="Are you sure you want to delete “<strong>{projectName}</strong>”?"
                id="UIQdVc"
                values={{
                  projectName: name,
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
