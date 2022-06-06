import { FC } from 'react';

import { ExternalLink as ExternalLinkIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import Link from 'next/link';

import { Paths, UserRoles } from 'enums';

import { AccountInfoProps } from './types';

export const AccountInfo: FC<AccountInfoProps> = ({ userRole, account }: AccountInfoProps) => {
  const publicProfileLink = `${
    userRole === UserRoles.ProjectDeveloper ? Paths.ProjectDeveloper : Paths.Investor
  }/${account?.slug}`;

  return (
    <div className="flex items-center gap-4 my-2 text-sm">
      <span className="text-gray-600">{account?.name}</span>
      <Link href={publicProfileLink}>
        <a className="flex gap-2 text-green-light" target="_blank">
          <ExternalLinkIcon className="w-4 h-4 translate-y-px" />
          <FormattedMessage defaultMessage="View public profile" id="0PnfDn" />
        </a>
      </Link>
    </div>
  );
};

export default AccountInfo;
