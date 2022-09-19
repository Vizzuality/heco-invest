import { FC } from 'react';

import { ExternalLink as ExternalLinkIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import Link from 'next/link';

import Button from 'components/button';
import Loading from 'components/loading';
import { Paths, UserRoles } from 'enums';

import { useAccount } from 'services/account';

import { AccountPublicProfileProps } from './types';

export const AccountPublicProfile: FC<
  AccountPublicProfileProps
> = ({}: AccountPublicProfileProps) => {
  const { user, userAccount } = useAccount();

  const isProjectDeveloper = user?.role === UserRoles.ProjectDeveloper;

  const publicProfileLink = `${isProjectDeveloper ? Paths.ProjectDeveloper : Paths.Investor}/${
    userAccount?.slug
  }`;

  const editProfileLink = isProjectDeveloper ? Paths.EditProjectDeveloper : Paths.EditInvestor;

  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="flex text-sm">
        <div className="flex-grow font-semibold">
          <FormattedMessage defaultMessage="Public profile" id="G6hIMy" />
        </div>
        {userAccount && (
          <Link href={publicProfileLink}>
            <a
              className="flex gap-2 px-2 transition-all rounded-full text-green-light focus-visible:outline focus-visible:outline-green-dark focus-visible:outline-2 focus-visible:outline-offset-2"
              target="_blank"
            >
              <ExternalLinkIcon className="w-4 h-4 translate-y-px" />
              <FormattedMessage defaultMessage="View public profile" id="0PnfDn" />
            </a>
          </Link>
        )}
      </div>
      {!user ? (
        <div className="flex items-center justify-center w-full h-10">
          <Loading visible={true} iconClassName="w-10 h-10" />
        </div>
      ) : (
        <>
          <div className="text-sm gap-6 grid grid-cols-1 lg:grid-cols-[240px_1fr] mt-8 text-gray-900">
            <span className="text-gray-600">
              <FormattedMessage defaultMessage="Status" id="tzMNF3" />
            </span>
            <span>
              {user?.approved ? (
                <FormattedMessage
                  defaultMessage="Your account has been <b>approved</b>, your profile is now publicly visible."
                  id="zyydTD"
                  values={{
                    b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
                  }}
                />
              ) : (
                <FormattedMessage
                  defaultMessage="Your account has not been approved, your profile is not publicly visible."
                  id="4iXh64"
                />
              )}
            </span>
          </div>
          <div className="flex flex-col items-center justify-end mt-8 md:flex-row">
            <Button
              to={`${editProfileLink}?returnPath=${Paths.DashboardAccountInfo}`}
              as={editProfileLink}
            >
              <FormattedMessage defaultMessage="Edit profile" id="nYrKWp" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountPublicProfile;
