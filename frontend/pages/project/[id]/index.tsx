import { decycle } from 'cycle';
import { groupBy } from 'lodash-es';

import { loadI18nMessages } from 'helpers/i18n';

import Breadcrumbs from 'containers/breadcrumbs';
import ProjectHeader from 'containers/project-header';

import Head from 'components/head';
import ImpactChart from 'components/impact-chart';
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
    ({ data: project } = await getProject(id, { includes: 'project_images,project_developer' }));
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
  const { category: categories, impact: impacts } = enums;
  const impactChartColor = categories.find(({ id }) => id === project.category)?.color;

  const impactChartLabels = impacts.map(({ name }) => name);

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

      <LayoutContainer className="mb-20 mt-18">
        <section>Overview</section>
        <section>
          Impact
          <div className="flex justify-between h-[470px]">
            <div className="z-0 w-[470px] h-full">
              <ImpactChart
                labels={impactChartLabels}
                color={impactChartColor}
                impact={[30, 25, 60, 40]}
              />
            </div>
          </div>
        </section>
        <section>Funding &amp; Development</section>
      </LayoutContainer>

      <div className="bg-background-middle">
        <LayoutContainer className="py-18">
          <section>Project developers</section>
        </LayoutContainer>
      </div>
    </>
  );
};

ProjectPage.layout = {};

export default ProjectPage;
