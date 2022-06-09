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

type OpenCallApplicationsPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export const OpenCallApplicationsPage: PageComponent<
  OpenCallApplicationsPageProps,
  DashboardLayoutProps
> = () => {
  const intl = useIntl();

  return (
    <ProtectedPage permissions={[UserRoles.ProjectDeveloper]}>
      <Head
        title={intl.formatMessage({ defaultMessage: 'My open call applications', id: '6EYInP' })}
      />
      <DashboardLayout>Open call applications page</DashboardLayout>
    </ProtectedPage>
  );
};

OpenCallApplicationsPage.layout = {
  Component: NakedLayout,
};

export default OpenCallApplicationsPage;
