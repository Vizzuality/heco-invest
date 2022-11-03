import { useState, useRef, useEffect } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import { FocusScope } from '@react-aria/focus';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick } from 'rooks';

import { useBreakpoint } from 'hooks/use-breakpoint';
import { useScrollOnQuery } from 'hooks/use-scroll-on-query';
import { usePagination } from 'hooks/usePagination';

import { loadI18nMessages } from 'helpers/i18n';

import DiscoverMap from 'containers/discover-map';
import ProjectCard from 'containers/project-card';
import ProjectDetails from 'containers/project-details';

import Head from 'components/head';
import Loading from 'components/loading';
import Modal from 'components/modal';
import Pagination from 'components/pagination';
import DiscoverPageLayout, { DiscoverPageLayoutProps } from 'layouts/discover-page';
import { PageComponent } from 'types';
import { Project as ProjectType } from 'types/project';

import { getProject } from 'services/projects/projectService';

export const getServerSideProps = withLocalizedRequests(async ({ locale }) => {
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
});

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
  const { query, push } = useRouter();
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

  const handleProjectCardClick = async (projectId: string) => {
    // if (!breakpoint('sm')) {
    //   push(`${Paths.Project}/${projectId}`);
    //   return;
    // }
    const selected = projects.find(({ id }) => id === projectId);
    if (!selected) {
      // if the selected project from the map is not in the filtered list, the project will be fetched
      const newSelectedProject = await getProject(projectId, {
        includes: ['project_developer', 'involved_project_developers'],
      });
      if (!!newSelectedProject.data) {
        setSelectedProject(newSelectedProject.data);
      }
      return;
    }
    setSelectedProject(selected);
  };

  const handleProjectDetailsClose = () => {
    setSelectedProject(null);
  };

  const hasProjects = projects?.length > 0 || false;

  return (
    <>
      <Head title={intl.formatMessage({ defaultMessage: 'Discover Projects', id: 'Qt/+mk' })} />
      <div className="relative flex flex-col w-full h-full md:gap-4 md:overflow-hidden md:flex-row">
        <div
          ref={projectsListAndDetailsContainerRef}
          className="relative flex flex-col flex-shrink-0 md:w-5/12"
        >
          <div className="relative flex flex-col md:overflow-hidden">
            <div
              ref={projectsListContainerRef}
              className={cx({
                'relative flex-grow': true,
                'md:overflow-y-auto': !loading,
                'md:pointer-events-none md:overflow-hidden': loading,
              })}
            >
              {loading && (
                <span
                  className={cx({
                    ' flex items-center justify-center bg-gray-600 bg-opacity-20': true,
                    'absolute bottom-0.5 md:bottom-0 z-20 top-0.5 left-0.5 right-0.5 md:right-3 border':
                      hasProjects,
                    'my-40': !hasProjects,
                  })}
                >
                  <Loading visible={loading} iconClassName="w-10 h-10" />
                </span>
              )}
              <div className="flex flex-col gap-2 p-0.5">
                {projects.map((project) => (
                  <ProjectCard
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
            {hasProjects && (
              <Pagination className="w-full pt-2 mb-4 md:mb-0" {...paginationProps} />
            )}
          </div>
          {breakpoint('md') ? (
            <AnimatePresence>
              {selectedProject && (
                <FocusScope
                  contain
                  restoreFocus
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                >
                  <motion.div
                    className="z-20 absolute top-0.5 left-full w-[53vw] lg:w-[45vw] xl:w-full bottom-3 "
                    transition={{ duration: 0.15 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <aside className="max-h-full overflow-y-auto translate-x-1 bg-white border rounded-2xl">
                      <ProjectDetails
                        project={selectedProject}
                        onClose={handleProjectDetailsClose}
                      />
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
              className="w-screen h-screen !max-h-screen rounded-none sm:rounded-lg left-0"
            >
              <ProjectDetails project={selectedProject} onClose={handleProjectDetailsClose} />
            </Modal>
          )}
        </div>
        <aside className="flex-grow hidden overflow-hidden bg-white sm:block rounded-2xl md:mt-0.5 md:mb-3">
          <DiscoverMap onSelectProjectPin={handleProjectCardClick} />
        </aside>
      </div>
    </>
  );
};

ProjectsPage.layout = {
  Component: DiscoverPageLayout,
  props: {
    screenHeightLg: true,
  },
};

export default ProjectsPage;
