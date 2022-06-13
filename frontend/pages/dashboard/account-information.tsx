import { useIntl } from 'react-intl';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import Head from 'components/head';
import { UserRoles } from 'enums';
import DashboardLayout, { DashboardLayoutProps } from 'layouts/dashboard';
import NakedLayout from 'layouts/naked';
import ProtectedPage from 'layouts/protected-page';
import { PageComponent } from 'types';

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

  return (
    <ProtectedPage permissions={[UserRoles.ProjectDeveloper, UserRoles.Investor]}>
      <Head title={intl.formatMessage({ defaultMessage: 'Account information', id: 'CzsYIe' })} />
      <DashboardLayout>Account information page</DashboardLayout>
    </ProtectedPage>
  );
};

AccountInfoPage.layout = {
  Component: NakedLayout,
};

export default AccountInfoPage;
