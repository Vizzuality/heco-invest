import { ExternalLink } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import Link from 'next/link';

import { InferGetStaticPropsType } from 'next';

import { useUserAccount } from 'hooks/use-user-account';
// import useOwnerAccountName from 'hooks/useAccountOwner';

import { loadI18nMessages } from 'helpers/i18n';
import { useLanguageNames } from 'helpers/pages';

import Button from 'components/button';
import Head from 'components/head';
import Icon from 'components/icon';
import { Paths, ReviewStatus, UserRoles } from 'enums';
import DashboardLayout, { DashboardLayoutProps } from 'layouts/dashboard';
import NakedLayout from 'layouts/naked';
import ProtectedPage from 'layouts/protected-page';
import { PageComponent } from 'types';
import { useRouter } from 'next/router';

export async function getStaticProps(ctx) {
  return {
    props: {
      intlMessages: await loadI18nMessages(ctx),
    },
  };
}

type AccountInfoPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export const AccountInfoPage: PageComponent<AccountInfoPageProps, DashboardLayoutProps> = () => {
  const intl = useIntl();
  const account = useUserAccount();
  const languages = useLanguageNames();
  const { push } = useRouter();

  const statusText = {
    [ReviewStatus.Approved]: (
      <FormattedMessage
        defaultMessage="Your account has been <n>approved</n>, your profile is now publicly visible."
        id="aZVd4k"
        values={{
          n: (chunk: string) => <strong>{chunk}</strong>,
        }}
      />
    ),
    [ReviewStatus.Unapproved]: (
      <FormattedMessage
        defaultMessage="Your account has not yet been reviewed, your profile is not publicly visible."
        id="xqsnF9"
        values={{
          n: (chunk: string) => <strong>{chunk}</strong>,
        }}
      />
    ),
    [ReviewStatus.Rejected]: (
      <FormattedMessage
        defaultMessage="Your account has been <n>rejected</n>, your profile is not publicly visible."
        id="qhxHf3"
        values={{
          n: (chunk: string) => <strong>{chunk}</strong>,
        }}
      />
    ),
  };

  const accountPublicProfile = `${
    account?.type === 'investor' ? Paths.Investor : Paths.ProjectDeveloper
  }/${account?.slug}`;

  return (
    <ProtectedPage permissions={[UserRoles.ProjectDeveloper, UserRoles.Investor]}>
      <Head title={intl.formatMessage({ defaultMessage: 'Account information', id: 'CzsYIe' })} />
      <DashboardLayout>
        <div className="w-max-3xl">
          <div className="flex flex-col gap-8 p-6 mb-4 bg-white rounded-lg">
            <div className="flex justify-between">
              <h2 className="font-semibold">
                <FormattedMessage defaultMessage="Public profile" id="G6hIMy" />
              </h2>
              {!!account && (
                <Link href={accountPublicProfile} passHref>
                  <a className="flex items-center text-green-light">
                    <Icon className="mr-3 text-xs" icon={ExternalLink} />
                    <FormattedMessage defaultMessage="View public profile" id="0PnfDn" />
                  </a>
                </Link>
              )}
            </div>
            <div className="flex justify-between">
              <h3 className="text-gray-700">
                <FormattedMessage defaultMessage="Status" id="tzMNF3" />
              </h3>
              <p>{!!account && statusText[account.review_status]}</p>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() =>
                  push(`/${account?.type === 'investor' ? 'investors' : 'project-developers'}/edit`)
                }
              >
                <FormattedMessage defaultMessage="Edit profile" id="nYrKWp" />
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-8 p-6 bg-white rounded-lg">
            <div className="flex justify-between">
              <h2 className="font-semibold">
                <FormattedMessage defaultMessage="Public profile" id="G6hIMy" />
              </h2>
            </div>
            {/* <div className="flex justify-between">
              <h3 className="text-gray-700">
                <FormattedMessage defaultMessage="Date of creation" id="KxPY7j" />
              </h3>
              <p>
                <FormattedDate value={Date.now()} />
              </p>
            </div> */}
            <div className="flex justify-between">
              <h3 className="text-gray-700">
                <FormattedMessage defaultMessage="Language" id="y1Z3or" />
              </h3>
              <p>{languages[account?.language]}</p>
            </div>
            {/* <div className="flex justify-between">
              <h3 className="text-gray-700">
                <FormattedMessage defaultMessage="Owner" id="zINlao" />
              </h3>
              <p>{ownerName}</p>
            </div> */}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedPage>
  );
};

AccountInfoPage.layout = {
  Component: NakedLayout,
};

export default AccountInfoPage;
