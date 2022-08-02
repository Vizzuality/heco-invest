import { Heart as HeartIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import { withLocalizedRequests } from 'hoc/locale';

import { loadI18nMessages } from 'helpers/i18n';

import ProjectCard from 'containers/project-card';

import Button from 'components/button';
import Icon from 'components/icon';
import { Paths } from 'enums';
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
};

export const FavoritesProjectsPage: PageComponent<
  FavoritesProjectsPageProps,
  DashboardFavoritesLayoutProps
> = ({ data: projects = [], meta }) => {
  const hasProjects = projects?.length > 0;

  const handleRemoveAllClick = () => {
    console.log('unfavorite all projects');
  };

  return (
    <>
      <div className="top-0 left-0 flex justify-between w-full pb-3 pr-2 mx-1 mb-4 md:pt-10 md:-mt-10 md:px-1 lg:z-10 lg:sticky bg-background-dark">
        <div className="font-medium">
          <FormattedMessage defaultMessage="Projects" id="UxTJRa" />{' '}
          {meta?.total && `(${meta?.total})`}
        </div>
        <div>
          <Button
            size="smallest"
            theme="naked"
            className="text-sm underline text-green-dark focus-visible:outline-green-dark"
            onClick={handleRemoveAllClick}
          >
            <FormattedMessage defaultMessage="Remove all" id="jNai7b" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col md:pl-1 md:-mr-1">
        {hasProjects ? (
          <>
            {projects.map((project) => (
              <ProjectCard className="m-1" key={project.id} project={project} />
            ))}
          </>
        ) : (
          <div className="flex flex-col items-center mt-10 lg:mt-20">
            <p className="text-lg text-gray-800 lg:text-xl">
              <FormattedMessage
                defaultMessage="Currently you don’t have any <b>Projects</b> in your favorites."
                id="Xms+aE"
                values={{
                  b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
                }}
              />
            </p>
            <p className="text-lg text-gray-800 lg:text-xl">
              <FormattedMessage
                defaultMessage="Discover projects and <heart></heart> them."
                id="QEg+U9"
                values={{
                  heart: () => (
                    <Icon
                      aria-hidden={true}
                      icon={HeartIcon}
                      className="inline-block w-6 h-6 mb-1 text-green-dark shrink-0 fill-background-green-dark"
                    />
                  ),
                }}
              />
            </p>
            <Button className="mt-8" to={Paths.Projects}>
              <FormattedMessage defaultMessage="Discover projects" id="TndK0C" />
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

FavoritesProjectsPage.layout = {
  Component: DashboardFavoritesLayout,
};

export default FavoritesProjectsPage;
