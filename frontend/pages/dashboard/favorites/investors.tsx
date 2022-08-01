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

type FavoritesInvestorsPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export const FavoritesInvestorsPage: PageComponent<
  FavoritesInvestorsPageProps,
  DashboardFavoritesLayoutProps
> = () => {
  return <DashboardFavoritesLayout>Investors</DashboardFavoritesLayout>;
};

FavoritesInvestorsPage.layout = {
  Component: NakedLayout,
};

export default FavoritesInvestorsPage;
