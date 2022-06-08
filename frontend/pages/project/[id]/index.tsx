import { decycle } from 'cycle';
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
import { StaticPageLayoutProps } from 'layouts/static-page';
import { PageComponent } from 'types';
import { GroupedEnums as GroupedEnumsType } from 'types/enums';
import { Project as ProjectType } from 'types/project';

import { getEnums } from 'services/enums/enumService';
import { getProject } from 'services/projects/projectService';

export const getServerSideProps = async ({ params: { id }, locale }) => {
  let project;

  // If getting the project fails, it's most likely because the record has not been found. Let's return a 404. Anything else will trigger a 500 by default.
  try {
    ({ data: project } = await getProject(id, {
      includes: [
        'project_images',
        'project_developer',
        'involved_project_developers',
        'country',
        'municipality',
        'department',
      ],
    }));
  } catch (e) {
    return { notFound: true };
  }

  const enums = await getEnums();

  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
      enums: groupBy(enums, 'type'),
      project: decycle(project),
    },
  };
};

type ProjectPageProps = {
  project: ProjectType;
  enums: GroupedEnumsType;
};

const ProjectPage: PageComponent<ProjectPageProps, StaticPageLayoutProps> = ({
  project,
  enums,
}) => {
  return (
    <>
      <Head title={project.name} description={project.description} />

      <LayoutContainer className="-mt-10 md:mt-0 lg:-mt-16">
        <Breadcrumbs
          className="px-4 sm:px-6 lg:px-8"
          substitutions={{
            id: { name: project.name },
          }}
        />
        <Header className="mt-6" project={project} />
      </LayoutContainer>

      <Overview project={project} />
      <Impact project={project} enums={enums} />
      <Funding project={project} enums={enums} />
      <ProjectDevelopers project={project} />
      <Contact project={project} />
    </>
  );
};

ProjectPage.layout = {};

export default ProjectPage;
