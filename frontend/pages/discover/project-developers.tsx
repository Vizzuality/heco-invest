import { useRef } from 'react';

import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import { useScrollOnQuery } from 'hooks/use-scroll-on-query';
import { usePagination } from 'hooks/usePagination';

import { loadI18nMessages } from 'helpers/i18n';

import ProfileCard from 'containers/profile-card';

import Loading from 'components/loading';
import Pagination from 'components/pagination';
import { Paths } from 'enums';
import DiscoverPageLayout, { DiscoverPageLayoutProps } from 'layouts/discover-page';
import { PageComponent } from 'types';
import { ProjectDeveloper as ProjectDeveloperType } from 'types/projectDeveloper';

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
};

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
  const projectDevelopersContainerRef = useRef(null);
  const { props: paginationProps } = usePagination(meta);

  useScrollOnQuery({ ref: projectDevelopersContainerRef });

  const hasProjectDevelopers = projectDevelopers?.length > 0 || false;

  return (
    <div className="flex flex-col w-full h-full pb-2 lg:p-1 lg:-m-1 lg:gap-0 lg:overflow-hidden lg:flex-row">
      <div className="relative flex flex-col w-full lg:overflow-hidden ">
        <div
          ref={projectDevelopersContainerRef}
          className={cx({
            'relative flex-grow lg:pr-2.5': true,
            'lg:overflow-y-scroll': !loading,
            'lg:pointer-events-none lg:overflow-hidden': loading,
          })}
        >
          {loading && (
            <span className="absolute bottom-0 z-20 flex items-center justify-center bg-gray-600 bg-opacity-20 top-1 left-1 right-3 rounded-2xl">
              <Loading visible={loading} iconClassName="w-10 h-10" />
            </span>
          )}
          <div className="grid grid-cols-1 gap-6 p-1 md:grid-cols-2 xl:grid-cols-3">
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
            {!loading && !hasProjectDevelopers && (
              <FormattedMessage defaultMessage="No project developers" id="Y2zB+b" />
            )}
          </div>
        </div>
        {hasProjectDevelopers && <Pagination className="w-full pt-2 -mb-2" {...paginationProps} />}
      </div>
    </div>
  );
};

ProjectDevelopersPage.layout = {
  Component: DiscoverPageLayout,
  props: {
    screenHeightLg: true,
  },
};

export default ProjectDevelopersPage;
