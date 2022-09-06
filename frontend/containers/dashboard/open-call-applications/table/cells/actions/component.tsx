import { FC, useState } from 'react';

import { X as XIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import Link from 'next/link';

import WithdrawApplicationModal from 'containers/dashboard/open-call-applications/withdraw-application-modal';

import Button from 'components/button';
import Icon from 'components/icon';
import Tooltip from 'components/tooltip';
import { Paths } from 'enums';

import { CellActionsProps } from './types';

export const CellActions: FC<CellActionsProps> = ({
  row: {
    original: { openCallApplication, openCall },
  },
}: CellActionsProps) => {
  const [withdrawApplicationModalOpen, setWithdrawApplicationModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className="inline-flex items-center justify-center gap-10">
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
              onClick={() => setWithdrawApplicationModalOpen(true)}
            >
              <span className="sr-only">
                <FormattedMessage defaultMessage="Withdraw from the open call" id="soFliQ" />
              </span>
              <Icon className="w-4 h-4 text-green-dark" icon={XIcon} />
            </Button>
          </Tooltip>
        </div>
        <Link href={`${Paths.DashboardOpenCallApplications}/${openCallApplication.id}`}>
          <a className="px-2 py-1 -mr-2 text-sm transition-all text-green-dark focus-visible:outline-green-dark rounded-2xl">
            <FormattedMessage defaultMessage="Details" id="Lv0zJu" />
          </a>
        </Link>
      </div>

      <WithdrawApplicationModal
        openCallApplication={openCallApplication}
        openCall={openCall}
        isOpen={withdrawApplicationModalOpen}
        onAccept={() => setWithdrawApplicationModalOpen(false)}
        onDismiss={() => setWithdrawApplicationModalOpen(false)}
      />
    </>
  );
};

export default CellActions;
