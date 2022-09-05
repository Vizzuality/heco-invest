import { FC } from 'react';

import { FormattedMessage } from 'react-intl';

import Link from 'next/link';

import { Paths } from 'enums';

import { CellActionsProps } from './types';

export const CellActions: FC<CellActionsProps> = ({
  row: {
    original: { openCall, openCallApplication },
  },
}: CellActionsProps) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <Link
        href={`${Paths.DashboardOpenCallDetails}/${openCall?.slug}/application/${openCallApplication?.id}`}
      >
        <a className="px-2 py-1 text-sm transition-all text-green-dark focus-visible:outline-green-dark rounded-2xl">
          <FormattedMessage defaultMessage="Details" id="Lv0zJu" />
        </a>
      </Link>
    </div>
  );
};

export default CellActions;
