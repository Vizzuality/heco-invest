import { ExternalLink as ExternalLinkIcon } from 'react-feather';
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';

import Link from 'next/link';

import { withLocalizedRequests } from 'hoc/locale';

import { InferGetStaticPropsType } from 'next';

import useMe from 'hooks/me';

import { loadI18nMessages } from 'helpers/i18n';
import { translatedLanguageNameForLocale } from 'helpers/intl';

import Button from 'components/button';
import Head from 'components/head';
import LayoutContainer from 'components/layout-container';
import Loading from 'components/loading';
import { UserRoles, Paths } from 'enums';
import DashboardLayout, { DashboardLayoutProps } from 'layouts/dashboard';
import NakedLayout from 'layouts/naked';
import ProtectedPage from 'layouts/protected-page';
import { PageComponent } from 'types';

import { useAccount } from 'services/account';

export const getStaticProps = withLocalizedRequests(async ({ locale }) => {
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
});

type AccountInfoPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export const AccountInfoPage: PageComponent<AccountInfoPageProps, DashboardLayoutProps> = () => {
  const intl = useIntl();
  const { user, userAccount, userAccountLoading } = useAccount('owner');
  const isProjectDeveloper = user?.role === UserRoles.ProjectDeveloper;

  const publicProfileLink = `${isProjectDeveloper ? Paths.ProjectDeveloper : Paths.Investor}/${
    userAccount?.slug
  }`;

  const editProfileLink = isProjectDeveloper ? Paths.EditProjectDeveloper : Paths.EditInvestor;

  return (
    <ProtectedPage allowConfirmed permissions={[UserRoles.ProjectDeveloper, UserRoles.Investor]}>
      <Head title={intl.formatMessage({ defaultMessage: 'Account information', id: 'CzsYIe' })} />
      <DashboardLayout>
        <LayoutContainer layout={'narrow'} className="flex flex-col gap-4">
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
          <div className="relative p-6 bg-white rounded-lg">
            <div className="flex text-sm">
              <div className="flex-grow font-semibold">
                <FormattedMessage defaultMessage="Basic info" id="Py+eVV" />
              </div>
            </div>
            {userAccountLoading ? (
              <div className="flex items-center justify-center w-full h-10">
                <Loading visible={true} iconClassName="w-10 h-10" />
              </div>
            ) : (
              <>
                <div className="text-sm gap-6 grid grid-cols-1 lg:grid-cols-[240px_1fr] mt-8 text-gray-900">
                  <span className="text-gray-600">
                    <FormattedMessage defaultMessage="Date of creation" id="KxPY7j" />
                  </span>
                  <span>
                    {!!userAccount?.created_at && FormattedDate({ value: userAccount.created_at })}
                  </span>

                  <span className="text-gray-600">
                    <FormattedMessage defaultMessage="Language" id="y1Z3or" />
                  </span>
                  <span>{translatedLanguageNameForLocale(intl, userAccount?.language)}</span>
                  <span className="text-gray-600">
                    <FormattedMessage defaultMessage="Owner" id="zINlao" />
                  </span>
                  <span>
                    {userAccount?.owner.first_name} {userAccount?.owner.last_name}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-4 p-4 mt-6 text-sm md:flex-row rounded-xl bg-background-middle">
                  <div className="flex flex-grow">
                    <FormattedMessage
                      defaultMessage="To update any of this information, or to delete the account, please contact the platform administrator."
                      id="/XKclL"
                    />
                  </div>
                  {/* ADD BUTTON WHEN WE HAVE THE ADMIN CONTACT */}
                  {/* <div>
                    <Button theme="secondary-green" className="whitespace-nowrap">
                      <FormattedMessage defaultMessage="Contact Admin" id="sDHn6D" />
                    </Button>
                  </div> */}
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
