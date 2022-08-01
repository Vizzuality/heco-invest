import { useIntl } from 'react-intl';

import { withLocalizedRequests } from 'hoc/locale';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import DashboardFavoritesLayout, {
  DashboardFavoritesLayoutProps,
} from 'layouts/dashboard-favorites';
import NakedLayout from 'layouts/naked';
import { PageComponent } from 'types';

export const getStaticProps = withLocalizedRequests(async ({ locale }) => {
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
});

type FavoritesProjectsPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export const FavoritesProjectsPage: PageComponent<
  FavoritesProjectsPageProps,
  DashboardFavoritesLayoutProps
> = () => {
  return <DashboardFavoritesLayout>Projects</DashboardFavoritesLayout>;
};

FavoritesProjectsPage.layout = {
  Component: NakedLayout,
};

export default FavoritesProjectsPage;
