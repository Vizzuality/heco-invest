import { useMemo, useState } from 'react';

import { decycle } from 'cycle';
import { groupBy } from 'lodash-es';

import { loadI18nMessages } from 'helpers/i18n';
import { projectImpact } from 'helpers/project';

import Breadcrumbs from 'containers/breadcrumbs';
import ImpactChart from 'containers/impact-chart';
import ImpactText from 'containers/impact-text';
import ProjectHeader from 'containers/project-header';
import Contact from 'containers/project-page/contact/component';
import ProjectDevelopers from 'containers/project-page/developers/component';
import Funding from 'containers/project-page/funding/component';
import Impact from 'containers/project-page/impact/component';
import Overview from 'containers/project-page/overview/component';

import Head from 'components/head';
import LayoutContainer from 'components/layout-container';
import { ImpactAreas } from 'enums';
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
      includes:
        'project_images,project_developer,country,municipality,department,involved_project_developers',
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
        <ProjectHeader className="mt-6" project={project} />
      </LayoutContainer>

      <Overview project={project} />
      <Impact project={project} />
      <Funding project={project} />
      <ProjectDevelopers project={project} />
      <Contact project={project} />
    </>
  );
};

ProjectPage.layout = {};

export default ProjectPage;
