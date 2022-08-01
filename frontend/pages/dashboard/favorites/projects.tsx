import { withLocalizedRequests } from 'hoc/locale';

import { loadI18nMessages } from 'helpers/i18n';

import DashboardFavoritesLayout, {
  DashboardFavoritesLayoutProps,
} from 'layouts/dashboard-favorites';
import { PageComponent } from 'types';
import { Project as ProjectType } from 'types/project';

export const getStaticProps = withLocalizedRequests(async ({ locale }) => {
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
});

type FavoritesProjectsPageProps = {
  data: ProjectType[];
  meta: Record<string, string>;
  loading: boolean;
};

export const FavoritesProjectsPage: PageComponent<
  FavoritesProjectsPageProps,
  DashboardFavoritesLayoutProps
> = ({ data: projects = [], loading = false, meta }) => {
  return <DashboardFavoritesLayout>Projects</DashboardFavoritesLayout>;
};

FavoritesProjectsPage.layout = {
  Component: DashboardFavoritesLayout,
};

export default FavoritesProjectsPage;
