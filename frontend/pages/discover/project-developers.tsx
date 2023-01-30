import { useRef } from 'react';

import { useIntl } from 'react-intl';

import cx from 'classnames';

import { withLocalizedRequests } from 'hoc/locale';

import { useScrollOnQuery } from 'hooks/use-scroll-on-query';
import { usePagination } from 'hooks/usePagination';

import { loadI18nMessages } from 'helpers/i18n';

import DiscoverNoResults from 'containers/discover-no-results';
import ProfileCard from 'containers/profile-card';

import Head from 'components/head';
import Loading from 'components/loading';
import Pagination from 'components/pagination';
import { Paths } from 'enums';
import DiscoverPageLayout, { DiscoverPageLayoutProps } from 'layouts/discover-page';
import { PageComponent } from 'types';
import { ProjectDeveloper as ProjectDeveloperType } from 'types/projectDeveloper';

export const getServerSideProps = withLocalizedRequests(async ({ locale }) => {
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
});

type ProjectDevelopersPageProps = {
  data: ProjectDeveloperType[];
  meta: Record<string, string>;
  loading: boolean;
};

const ProjectDevelopersPage: PageComponent<ProjectDevelopersPageProps, DiscoverPageLayoutProps> = ({
  data: projectDevelopers = [],
  loading = false,
  meta,
}) => {
  const intl = useIntl();
  const projectDevelopersContainerRef = useRef(null);
  const { props: paginationProps } = usePagination(meta);

  useScrollOnQuery({ ref: projectDevelopersContainerRef });

  const hasProjectDevelopers = projectDevelopers?.length > 0 || false;

  return (
    <>
      <Head
        title={intl.formatMessage({ defaultMessage: 'Discover Project Developers', id: '2qzivP' })}
      />
      <div className="flex h-full">
        <div className="relative flex flex-col w-full lg:overflow-hidden ">
          {!loading && !hasProjectDevelopers && <DiscoverNoResults />}
          <div
            ref={projectDevelopersContainerRef}
            className={cx({
              'relative flex-grow': true,
              'lg:overflow-y-auto': !loading,
              'lg:pointer-events-none lg:overflow-hidden': loading,
            })}
          >
            {loading && (
              <span
                className={cx({
                  'flex items-center justify-center bg-gray-600 bg-opacity-20': true,
                  'absolute bottom-0.5 md:bottom-0 z-20 top-0.5 left-0.5 right-0.5 border':
                    hasProjectDevelopers,
                  'my-40': !hasProjectDevelopers,
                })}
              >
                <Loading visible={loading} iconClassName="w-10 h-10" />
              </span>
            )}
            <div className="grid grid-cols-1 gap-2 p-0.5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
              {projectDevelopers.map(
                ({ project_developer_type, name, about, slug, picture, impacts }) => (
                  <ProfileCard
                    profileType="project-developer"
                    key={slug}
                    name={name}
                    type={project_developer_type}
                    description={about}
                    link={`${Paths.ProjectDeveloper}/${slug}`}
                    picture={picture?.small}
                    impacts={impacts}
                  />
                )
              )}
            </div>
          </div>
          {hasProjectDevelopers && (
            <Pagination className="w-full pt-2 -mb-2" {...paginationProps} />
          )}
        </div>
      </div>
    </>
  );
};

ProjectDevelopersPage.layout = {
  Component: DiscoverPageLayout,
  props: {
    screenHeightLg: true,
  },
};

export default ProjectDevelopersPage;
