import { FC } from 'react';

import { FormattedMessage } from 'react-intl';

import Link from 'next/link';

import RowMenu, { RowMenuItem } from 'containers/dashboard/row-menu';

import { Paths } from 'enums';

import { useOpenCallApplicationFunding } from 'services/open-call/application-service';

import { CellActionsProps } from './types';

export const CellActions: FC<CellActionsProps> = ({
  row: {
    original: { openCall, openCallApplication },
  },
}: CellActionsProps) => {
  const fundingOpenCallMutation = useOpenCallApplicationFunding();

  const handleRowMenuItemClick = (key: string) => {
    switch (key) {
      case 'funding':
        fundingOpenCallMutation.mutate({ id: openCallApplication?.id, isFunding: true });
        return;
      case 'not-funding':
        fundingOpenCallMutation.mutate({ id: openCallApplication?.id, isFunding: false });
        return;
    }
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <Link
        href={`${Paths.DashboardOpenCallDetails}/${openCall?.slug}/application/${openCallApplication?.id}`}
      >
        <a className="px-2 py-1 text-sm transition-all text-green-dark focus-visible:outline-green-dark rounded-2xl">
          <FormattedMessage defaultMessage="Details" id="Lv0zJu" />
        </a>
      </Link>
      <RowMenu onAction={handleRowMenuItemClick}>
        <RowMenuItem key="funding">
          <FormattedMessage defaultMessage="Funding" id="fZb224" />
        </RowMenuItem>
        <RowMenuItem key="not-funding">
          <FormattedMessage defaultMessage="Not funding" id="Llk7Pe" />
        </RowMenuItem>
      </RowMenu>
    </div>
  );
};

export default CellActions;
