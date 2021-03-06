import { useIntl } from 'react-intl';

import { withLocalizedRequests } from 'hoc/locale';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import Head from 'components/head';
import { UserRoles } from 'enums';
import DashboardLayout, { DashboardLayoutProps } from 'layouts/dashboard';
import NakedLayout from 'layouts/naked';
import ProtectedPage from 'layouts/protected-page';
import { PageComponent } from 'types';

export const getStaticProps = withLocalizedRequests(async ({ locale }) => {
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
});

type FavoritesPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export const FavoritesPage: PageComponent<FavoritesPageProps, DashboardLayoutProps> = () => {
  const intl = useIntl();

  return (
    <ProtectedPage permissions={[UserRoles.ProjectDeveloper, UserRoles.Investor]}>
      <Head title={intl.formatMessage({ defaultMessage: 'My favorites', id: '50bxrQ' })} />
      <DashboardLayout>Favorites page</DashboardLayout>
    </ProtectedPage>
  );
};

FavoritesPage.layout = {
  Component: NakedLayout,
};

export default FavoritesPage;
