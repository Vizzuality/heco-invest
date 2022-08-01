import { withLocalizedRequests } from 'hoc/locale';

import { loadI18nMessages } from 'helpers/i18n';

import DashboardFavoritesLayout, {
  DashboardFavoritesLayoutProps,
} from 'layouts/dashboard-favorites';
import NakedLayout from 'layouts/naked';
import { PageComponent } from 'types';
import { Investor as InvestorType } from 'types/investor';

export const getStaticProps = withLocalizedRequests(async ({ locale }) => {
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
});

type FavoritesInvestorsPageProps = {
  data: InvestorType[];
  meta: Record<string, string>;
  loading: boolean;
};

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
