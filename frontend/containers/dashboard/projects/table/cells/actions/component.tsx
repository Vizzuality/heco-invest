import { FC } from 'react';

import { FormattedMessage } from 'react-intl';

import Link from 'next/link';
import { useRouter } from 'next/router';

import RowMenu, { RowMenuItem } from 'containers/dashboard/row-menu';

import { Paths, ProjectStatus } from 'enums';

import { CellActionsProps } from './types';

export const CellActions: FC<CellActionsProps> = ({
  row: {
    original: { slug, status },
  },
}: CellActionsProps) => {
  const router = useRouter();

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
        // TODO: confirm and delete
        console.log('Delete:', slug);
        return;
    }
  };

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
      <RowMenu onAction={handleRowMenuItemClick}>
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
    </div>
  );
};

export default CellActions;
