import { withLocalizedRequests } from 'hoc/locale';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import DashboardFavoritesLayout, {
  DashboardFavoritesLayoutProps,
} from 'layouts/dashboard-favorites';
import { PageComponent } from 'types';

export const getStaticProps = withLocalizedRequests(async ({ locale }) => {
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
});

type FavoritesOpenCallsPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export const FavoritesOpenCallsPage: PageComponent<
  FavoritesOpenCallsPageProps,
  DashboardFavoritesLayoutProps
> = () => {
  return <div>Open calls</div>;
};

FavoritesOpenCallsPage.layout = {
  Component: DashboardFavoritesLayout,
};

export default FavoritesOpenCallsPage;
