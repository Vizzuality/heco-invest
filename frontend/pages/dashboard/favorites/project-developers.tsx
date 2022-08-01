import { withLocalizedRequests } from 'hoc/locale';

import { loadI18nMessages } from 'helpers/i18n';

import DashboardFavoritesLayout, {
  DashboardFavoritesLayoutProps,
} from 'layouts/dashboard-favorites';
import { PageComponent } from 'types';
import { ProjectDeveloper as ProjectDeveloperType } from 'types/projectDeveloper';

export const getStaticProps = withLocalizedRequests(async ({ locale }) => {
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
});

type FavoritesProjectDevelopersPageProps = {
  data: ProjectDeveloperType[];
  meta: Record<string, string>;
  loading: boolean;
};

export const FavoritesProjectDevelopersPage: PageComponent<
  FavoritesProjectDevelopersPageProps,
  DashboardFavoritesLayoutProps
> = () => {
  return <div>Project developers</div>;
};

FavoritesProjectDevelopersPage.layout = {
  Component: DashboardFavoritesLayout,
};

export default FavoritesProjectDevelopersPage;
