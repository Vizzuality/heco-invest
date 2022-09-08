import { useIntl } from 'react-intl';

import { withLocalizedRequests } from 'hoc/locale';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import AccountBasicInfo from 'containers/dashboard/account-information/basic-info';
import DeleteAccount from 'containers/dashboard/account-information/delete-account';
import AccountPublicProfile from 'containers/dashboard/account-information/public-profile';

import Head from 'components/head';
import LayoutContainer from 'components/layout-container';
import { UserRoles } from 'enums';
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
  const { user } = useAccount();

  return (
    <ProtectedPage permissions={[UserRoles.ProjectDeveloper, UserRoles.Investor]}>
      <Head title={intl.formatMessage({ defaultMessage: 'Account information', id: 'CzsYIe' })} />
      <DashboardLayout>
        <LayoutContainer layout={'narrow'} className="flex flex-col gap-4">
          <AccountPublicProfile />
          <AccountBasicInfo />
          {user?.owner && <DeleteAccount />}
        </LayoutContainer>
      </DashboardLayout>
    </ProtectedPage>
  );
};

AccountInfoPage.layout = {
  Component: NakedLayout,
};

export default AccountInfoPage;
