import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import { groupBy } from 'lodash-es';

import { loadI18nMessages } from 'helpers/i18n';

import Breadcrumbs from 'containers/breadcrumbs';
import Contact from 'containers/project-page/contact';
import ProjectDevelopers from 'containers/project-page/developers';
import Funding from 'containers/project-page/funding';
import Header from 'containers/project-page/header';
import Impact from 'containers/project-page/impact';
import Overview from 'containers/project-page/overview';

import Head from 'components/head';
import LayoutContainer from 'components/layout-container';
import Loading from 'components/loading';
import { Paths } from 'enums';
import { StaticPageLayoutProps } from 'layouts/static-page';
import { logEvent } from 'lib/analytics/ga';
import { PageComponent } from 'types';
import { GroupedEnums as GroupedEnumsType } from 'types/enums';
import { Project as ProjectType } from 'types/project';

import { getEnums } from 'services/enums/enumService';
import { getProject, useProject } from 'services/projects/projectService';

const PROJECT_QUERY_PARAMS = {
  includes: [
    'project_images',
    'project_developer',
    'involved_project_developers',
    'country',
    'municipality',
    'department',
    'priority_landscape',
  ],
};

export const getServerSideProps = withLocalizedRequests(
  /** @ts-ignore */
  // Property 'query' does not exist on type 'GetStaticPropsContext<ParsedUrlQuery, PreviewData>'.
  async ({ params: { id }, locale, query }) => {
    let project;
    let enums;

    try {
      enums = await getEnums();
      ({ data: project } = await getProject(id as string, PROJECT_QUERY_PARAMS));
    } catch (e) {
      // If getting the project fails, it's most likely because the record has not been found.
      if (query?.preview) {
        // The user is attempting to preview a drafted project, which the endpoint won't return
        // unless the ownership can be verified. We'll be loading it client side.
        project = null;
      } else {
        // Not previewing a drafted project and project doesn't exist. Return a 404.
        return { notFound: true };
      }
    }

    // If a project is published, let's make it so the "Preview" page doesn't exist
    if (project && query?.preview) {
      return { notFound: true };
    }

    return {
      props: {
        intlMessages: await loadI18nMessages({ locale }),
        enums: groupBy(enums, 'type'),
        project,
      },
    };
  }
);

type ProjectPageProps = {
  project: ProjectType;
  enums: GroupedEnumsType;
};

const ProjectPage: PageComponent<ProjectPageProps, StaticPageLayoutProps> = ({
  project: projectProp,
  enums,
}) => {
  const router = useRouter();

  const {
    data: { data: project },
    isFetching: isFetchingProject,
  } = useProject(router.query.id as string, PROJECT_QUERY_PARAMS, projectProp);

  useEffect(() => {
    logEvent('profile_visit', {
      page_location: router.asPath,
    });
  }, [router.asPath]);

  if (!project) {
    if (!isFetchingProject) router.push(Paths.Dashboard);
    return (
      <div className="flex items-center justify-center min-h-screen -mt-28 md:-mt-36 lg:-mt-44">
        <Loading visible={true} iconClassName="w-10 h-10" />
      </div>
    );
  }

  return (
    <>
      <Head title={project.name} description={project.description} />

      <>
        <LayoutContainer className="px-0 -mt-10 md:-mt-8">
          <Breadcrumbs
            className="px-4 sm:px-6 lg:px-8"
            substitutions={{
              id: { name: project.name },
            }}
          />
          <Header className="mt-4" project={project} />
        </LayoutContainer>

        <Overview project={project} />
        <Impact project={project} enums={enums} />
        <Funding project={project} enums={enums} />
        <ProjectDevelopers project={project} />
        <Contact project={project} />
      </>
    </>
  );
};

ProjectPage.layout = {};

export default ProjectPage;
