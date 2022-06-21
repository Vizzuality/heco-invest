import { ExternalLink as ExternalLinkIcon } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import Link from 'next/link';

import { InferGetStaticPropsType } from 'next';

import useMe from 'hooks/me';

import { loadI18nMessages } from 'helpers/i18n';
import { translatedLanguageNameForLocale } from 'helpers/intl';

import Button from 'components/button';
import Head from 'components/head';
import LayoutContainer from 'components/layout-container';
import Loading from 'components/loading';
import { UserRoles, Paths, ReviewStatus } from 'enums';
import DashboardLayout, { DashboardLayoutProps } from 'layouts/dashboard';
import NakedLayout from 'layouts/naked';
import ProtectedPage from 'layouts/protected-page';
import { PageComponent } from 'types';

import { useAccount } from 'services/account';

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
  const { user } = useMe();

  const { data: accountData, isLoading: isLoadingAccountData } = useAccount();

  const publicProfileLink = `${
    user?.role === UserRoles.ProjectDeveloper ? Paths.ProjectDeveloper : Paths.Investor
  }/${accountData?.slug}`;

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

  return (
    <ProtectedPage permissions={[UserRoles.ProjectDeveloper, UserRoles.Investor]}>
      <Head title={intl.formatMessage({ defaultMessage: 'Account information', id: 'CzsYIe' })} />
      <DashboardLayout>
        <LayoutContainer layout={'narrow'} className="flex flex-col gap-4">
          <div className="p-6 bg-white rounded-lg">
            <div className="flex text-sm">
              <div className="flex-grow font-semibold">
                <FormattedMessage defaultMessage="Public profile" id="G6hIMy" />
              </div>
              {accountData && (
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
            {!user || !accountData ? (
              <div className="flex items-center justify-center w-full h-10">
                <Loading visible={true} iconClassName="w-10 h-10" />
              </div>
            ) : (
              <>
                <div className="text-sm gap-6 grid grid-cols-1 lg:grid-cols-[240px_1fr] mt-8 text-gray-900">
                  <span className="text-gray-600">
                    <FormattedMessage defaultMessage="Status" id="tzMNF3" />
                  </span>
                  <span>{statusText[accountData?.review_status]}</span>
                </div>
                <div className="flex flex-col items-center justify-end mt-8 md:flex-row">
                  <Button
                    to={`${Paths.EditProjectDeveloper}?returnPath=${Paths.DashboardAccountInfo}`}
                    as={Paths.EditProjectDeveloper}
                  >
                    <FormattedMessage defaultMessage="Edit profile" id="nYrKWp" />
                  </Button>
                </div>
              </>
            )}
          </div>
          <div className="relative p-6 bg-white rounded-lg">
            <div className="flex text-sm">
              <div className="flex-grow font-semibold">
                <FormattedMessage defaultMessage="Basic info" id="Py+eVV" />
              </div>
            </div>
            {isLoadingAccountData ? (
              <div className="flex items-center justify-center w-full h-10">
                <Loading visible={true} iconClassName="w-10 h-10" />
              </div>
            ) : (
              <>
                <div className="text-sm gap-6 grid grid-cols-1 lg:grid-cols-[240px_1fr] mt-8 text-gray-900">
                  {/*
                  <span className="text-gray-600">
                    <FormattedMessage defaultMessage="Date of creation" id="KxPY7j" />
                  </span>
                  <span>TODO</span>
                  */}
                  <span className="text-gray-600">
                    <FormattedMessage defaultMessage="Language" id="y1Z3or" />
                  </span>
                  <span>{translatedLanguageNameForLocale(intl, accountData?.language)}</span>
                  {/*
                  <span className="text-gray-600">
                    <FormattedMessage defaultMessage="Owner" id="zINlao" />
                  </span>
                  <span>TODO</span>
                  */}
                </div>
                <div className="p-4 mt-6 text-sm md:flex-row rounded-xl bg-background-middle">
                  <FormattedMessage
                    defaultMessage="To update any of this information or to delete the account, please contact the platform administrator by sending an email to: <email>admin@admin.com</email>."
                    id="Uzc3q6"
                    values={{
                      email: (chunk: string) => (
                        <Link href={`mailto:${chunk}`}>
                          <a
                            className="inline underline transition-all rounded text-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {chunk}
                          </a>
                        </Link>
                      ),
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </LayoutContainer>
      </DashboardLayout>
    </ProtectedPage>
  );
};

AccountInfoPage.layout = {
  Component: NakedLayout,
};

export default AccountInfoPage;
