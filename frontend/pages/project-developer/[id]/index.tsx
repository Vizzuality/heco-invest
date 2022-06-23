import { useEffect, useState } from 'react';

import { FormattedMessage } from 'react-intl';

import { withLocalizedRequests } from 'hoc/locale';

import { chunk, groupBy } from 'lodash-es';

import { loadI18nMessages } from 'helpers/i18n';

import Breadcrumbs from 'containers/breadcrumbs';
import ProfileHeader from 'containers/profile-header';
import ProjectCard from 'containers/project-card';
import { SOCIAL_DATA } from 'containers/social-contact/constants';
import { ContactItemType } from 'containers/social-contact/contact-information-modal';
import TagsGrid, { TagsGridRowType } from 'containers/tags-grid';

import Carousel, { Slide } from 'components/carousel';
import Head from 'components/head';
import LayoutContainer from 'components/layout-container';
import { EnumTypes } from 'enums';
import { StaticPageLayoutProps } from 'layouts/static-page';
import { PageComponent } from 'types';
import { CategoryType } from 'types/category';
import { GroupedEnums as GroupedEnumsType } from 'types/enums';
import { ProjectDeveloper as ProjectDeveloperType } from 'types/projectDeveloper';

import { getEnums } from 'services/enums/enumService';
import {
  getProjectDeveloper,
  useFavoriteProjectDeveloper,
} from 'services/project-developers/projectDevelopersService';

export const getServerSideProps = withLocalizedRequests(async ({ params: { id }, locale }) => {
  let projectDeveloper;

  // If getting the project developer fails, it's most likely because the record has
  // not been found. Let's return a 404. Anything else will trigger a 500 by default.
  try {
    projectDeveloper = await getProjectDeveloper(id as string, { includes: 'projects' });
  } catch (e) {
    return { notFound: true };
  }

  const enums = await getEnums();

  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
      enums: groupBy(enums, 'type'),
      projectDeveloper,
    },
  };
});

type ProjectDeveloperPageProps = {
  projectDeveloper: ProjectDeveloperType;
  enums: GroupedEnumsType;
};

const ProjectDeveloperPage: PageComponent<ProjectDeveloperPageProps, StaticPageLayoutProps> = ({
  projectDeveloper,
  enums,
}) => {
  const [isFavourite, setIsFavourite] = useState(projectDeveloper.favourite);

  useEffect(() => {
    // this useEffect is needed because the initial PD can be different from the current. On the server, when we fetch the PD, we don't send the session cookie so the endpoint doesn't tell us if the PD is in the favourites. When the hook executes on the client (the browser), we do send the token and thus projectDeveloper.favourite has a different value.
    setIsFavourite(projectDeveloper.favourite);
  }, [projectDeveloper]);

  const projectDeveloperTypeName = enums[EnumTypes.ProjectDeveloperType].find(
    ({ id }) => id === projectDeveloper.project_developer_type
  )?.name;

  const stats = {
    totalProjects: projectDeveloper.projects?.length,
    projectsWaitingFunding: projectDeveloper.projects?.filter(
      ({ looking_for_funding }) => looking_for_funding === true
    ).length,
  };

  const social = SOCIAL_DATA.map((item) => item.id)
    .reduce((acc, social) => [...acc, { id: social, url: projectDeveloper[social] }], [])
    .filter((social) => social.url);

  const contact: ContactItemType = {
    name: projectDeveloper.name,
    email: projectDeveloper.contact_email,
    phone: projectDeveloper.contact_phone,
  };

  const tagsRows: TagsGridRowType[] = [
    {
      title: 'Categories of interest',
      type: 'category',
      tags: enums[EnumTypes.Category].filter(({ id }) =>
        projectDeveloper.categories?.includes(id as CategoryType)
      ),
    },
    {
      title: 'Areas of work',
      tags: enums[EnumTypes.Mosaic].filter(({ id }) => projectDeveloper.mosaics?.includes(id)),
    },
    {
      title: 'Impact',
      tags: enums[EnumTypes.Impact].filter(({ id }) => projectDeveloper.impacts?.includes(id)),
    },
  ];

  const { projects } = projectDeveloper;

  const favoriteProjectDeveloper = useFavoriteProjectDeveloper();

  const handleFavoriteClick = () => {
    const { id } = projectDeveloper;
    // This mutation uses a 'DELETE' request when the isFavorite is true, and a 'POST' request when is false.
    favoriteProjectDeveloper.mutate(
      { id, isFavourite },
      {
        onSuccess: (data) => setIsFavourite(data.favourite),
      }
    );
  };

  return (
    <>
      <Head
        title={`${projectDeveloper.name} - ${projectDeveloperTypeName}`}
        description={projectDeveloper.about}
      />

      <LayoutContainer className="-mt-10 md:mt-0 lg:-mt-16">
        <Breadcrumbs
          className="px-4 sm:px-6 lg:px-8"
          substitutions={{
            id: { name: projectDeveloper.name },
          }}
        />
        <ProfileHeader
          className="mt-6"
          logo={projectDeveloper.picture?.medium}
          title={projectDeveloper.name}
          subtitle={projectDeveloperTypeName}
          text={projectDeveloper.about}
          website={projectDeveloper.website}
          social={social}
          contact={contact}
          projectsWaitingFunding={stats.projectsWaitingFunding}
          totalProjects={stats.totalProjects}
          originalLanguage={projectDeveloper.language}
          isFavorite={isFavourite}
          onFavoriteClick={handleFavoriteClick}
          favoriteLoading={favoriteProjectDeveloper.isLoading}
        />
      </LayoutContainer>

      <LayoutContainer layout="narrow" className="mt-24 mb-20 md:mt-40">
        <section aria-labelledby="project-developer-overview">
          <h2
            id="project-developer-overview"
            className="mt-12 font-serif text-2xl font-semibold md:mt-20 sm:text-3xl text-green-dark"
          >
            <FormattedMessage defaultMessage="Overview" id="9uOFF3" />
          </h2>

          <h3 className="mt-10 mb-3 text-xl font-semibold md:mt-14">
            <FormattedMessage defaultMessage="Mission" id="RXoqkD" />
          </h3>
          <p className="my-3">{projectDeveloper.mission}</p>

          <TagsGrid className="mt-10 md:mt-14" rows={tagsRows} />
        </section>

        {projects?.length > 0 && (
          <>
            <hr className="mt-12 md:mt-20" />

            <h2 className="mt-12 font-serif text-2xl font-semibold md:mt-20 sm:text-3xl text-green-dark">
              <FormattedMessage defaultMessage="Projects" id="UxTJRa" />
              <span className="ml-3">({projects.length})</span>
            </h2>

            <Carousel className="mt-12">
              {chunk(projects, 3).map((projectsChunk, index) => (
                <Slide key={`slide-${index}`} className="flex flex-col gap-2">
                  {projectsChunk.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </Slide>
              ))}
            </Carousel>
          </>
        )}
      </LayoutContainer>
    </>
  );
};

ProjectDeveloperPage.layout = {};

export default ProjectDeveloperPage;
