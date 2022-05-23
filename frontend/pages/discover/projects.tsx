import { useState, useRef, useEffect } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import { useRouter } from 'next/router';

import { FocusScope } from '@react-aria/focus';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick } from 'rooks';

import { useBreakpoint } from 'hooks/use-breakpoint';
import { useScrollOnQuery } from 'hooks/use-scroll-on-query';
import { usePagination } from 'hooks/usePagination';

import { loadI18nMessages } from 'helpers/i18n';

import ProjectCard from 'containers/project-card';
import ProjectDetails from 'containers/project-details';

import Loading from 'components/loading';
import Map from 'components/map';
import Modal from 'components/modal';
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
  const projectsListAndDetailsContainerRef = useRef(null);
  const projectsListContainerRef = useRef(null);

  const intl = useIntl();
  const { query } = useRouter();
  const { props: paginationProps } = usePagination(meta);
  const breakpoint = useBreakpoint();

  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

  // Scroll the element to the top when the query changes.
  useScrollOnQuery({ ref: projectsListContainerRef });

  // Close the project details card when the user clicks outside of the
  // DetailsCard & Projects list
  useOutsideClick(projectsListAndDetailsContainerRef, () => {
    if (!breakpoint('lg')) return;
    setSelectedProject(null);
  });

  // Close project details card when query changes; the user either,
  // changed pages (pagination), searched, or applied filters.
  useEffect(() => {
    setSelectedProject(null);
  }, [query]);

  const handleProjectCardClick = (projectId: string) => {
    setSelectedProject(projects.find(({ id }) => id === projectId));
  };

  const handleProjectDetailsClose = () => {
    setSelectedProject(null);
  };

  const hasProjects = projects?.length > 0 || false;

  return (
    <div className="relative flex flex-col w-full h-full lg:gap-0 lg:overflow-hidden lg:flex-row">
      <div
        ref={projectsListAndDetailsContainerRef}
        className="flex flex-col lg:top-1 lg:bottom-1 lg:absolute lg:w-full"
      >
        <div className="relative flex flex-col lg:overflow-hidden lg:w-5/12">
          <div
            ref={projectsListContainerRef}
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
            <div className="flex flex-col">
              {projects.map((project) => (
                <ProjectCard
                  className="m-1"
                  key={project.id}
                  active={project.id === selectedProject?.id}
                  project={project}
                  onClick={handleProjectCardClick}
                />
              ))}
              {!loading && !hasProjects && (
                <FormattedMessage defaultMessage="No projects" id="TfXhCr" />
              )}
            </div>
          </div>
          {hasProjects && <Pagination className="w-full pt-2 -mb-2" {...paginationProps} />}
        </div>
        {breakpoint('lg') ? (
          <AnimatePresence>
            {selectedProject && (
              <FocusScope
                contain
                restoreFocus
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
              >
                <motion.div
                  className="z-10"
                  transition={{ duration: 0.15 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <aside className="absolute top-0 z-10 w-7/12 xl:w-5/12 mt-1 mb-0 -ml-2.5 -bottom-4 left-5/12 rounded-t-2xl">
                    <div className="max-h-full overflow-y-scroll bg-white border rounded-2xl">
                      <ProjectDetails
                        project={selectedProject}
                        onClose={handleProjectDetailsClose}
                      />
                    </div>
                  </aside>
                </motion.div>
              </FocusScope>
            )}
          </AnimatePresence>
        ) : (
          <Modal
            theme="naked"
            title={intl.formatMessage({
              defaultMessage: 'Project details',
              id: '7gMEKc',
            })}
            open={!!selectedProject}
            onDismiss={handleProjectDetailsClose}
          >
            <ProjectDetails project={selectedProject} onClose={handleProjectDetailsClose} />
          </Modal>
        )}
      </div>
      <aside className="flex-grow min-h-full p-2 m-1 bg-white rounded-2xl lg:min-h-0 lg:absolute lg:right-0 lg:w-7/12 lg:bottom-1 lg:top-1">
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
