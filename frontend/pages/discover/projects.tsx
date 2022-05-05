import { useRef } from 'react';

import { FormattedMessage } from 'react-intl';

import { useScrollOnQuery } from 'hooks/use-scroll-on-query';
import { usePagination } from 'hooks/usePagination';

import { loadI18nMessages } from 'helpers/i18n';

import ProjectCard from 'containers/project-card';

import Loading from 'components/loading';
import Map from 'components/map';
import Pagination from 'components/pagination';
import DiscoverPageLayout, { DiscoverPageLayoutProps } from 'layouts/discover-page';
import { PageComponent } from 'types';
import { Project as ProjectType } from 'types/project';

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
};

type ProjectsPageProps = {
  data: ProjectType[];
  meta: Record<string, string>;
  loading: boolean;
};

const ProjectsPage: PageComponent<ProjectsPageProps, DiscoverPageLayoutProps> = ({
  data: projects = [],
  loading = false,
  meta,
}) => {
  const projectsContainerRef = useRef(null);
  const { props: paginationProps } = usePagination(meta);

  useScrollOnQuery({ ref: projectsContainerRef });

  const hasProjects = projects?.length > 0 || false;

  return (
    <div className="flex flex-col w-full h-full pb-2 lg:p-1 lg:-m-1 lg:gap-0 lg:overflow-hidden lg:flex-row">
      <div className="relative flex flex-col w-full lg:overflow-hidden lg:w-5/12">
        <div
          ref={projectsContainerRef}
          className="relative flex-grow lg:pr-2.5 lg:overflow-y-scroll"
        >
          {loading && (
            <span className="absolute z-20 flex items-center justify-center bg-gray-600 bg-opacity-20 top-1 bottom-1 left-1 right-2 rounded-2xl">
              <Loading visible={loading} iconClassName="w-10 h-10" />
            </span>
          )}
          <div className="flex flex-col">
            {projects.map((project) => (
              <ProjectCard className="m-1" key={project.id} project={project} />
            ))}
            {!loading && !hasProjects && (
              <FormattedMessage defaultMessage="No projects" id="TfXhCr" />
            )}
          </div>
        </div>
        {hasProjects && <Pagination className="w-full pt-2 -mb-2" {...paginationProps} />}
      </div>
      <aside className="flex-grow min-h-full p-2 m-1 bg-white rounded-2xl lg:min-h-0">
        <Map className="lg:overflow-hidden rounded-xl" onMapViewportChange={() => {}} />
      </aside>
    </div>
  );
};

ProjectsPage.layout = {
  Component: DiscoverPageLayout,
  props: {
    screenHeightLg: true,
  },
};

export default ProjectsPage;
