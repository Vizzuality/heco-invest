import React from 'react';

import { FormattedMessage } from 'react-intl';

import ProfileCard from 'containers/profile-card/component';
import { ProjectDevelopersProps } from 'containers/project-page/developers/types';

import LayoutContainer from 'components/layout-container';
import { Paths } from 'enums';

export const ProjectDevelopers: React.FC<ProjectDevelopersProps> = ({
  project,
}: ProjectDevelopersProps) => {
  const allDevelopers = [project.project_developer, ...project.involved_project_developers].filter(
    // Occasionally, the (involved_project_developers) relationship is not returned correctly, causing
    // the frontend to crash. In order to make it more resilient, we're making this check to ensure
    // that we do have the relationship before attempting to use its data to show the PD cards.
    ({ type }) => type === 'project_developer'
  );

  return (
    <section className="bg-background-middle py-18">
      <LayoutContainer className="flex flex-col space-y-8 lg:flex-row lg:space-y-28 lg:space-x-28">
        <div className="flex flex-col pl-6 space-y-1 lg:pl-16">
          <h2 className="font-serif text-2xl text-black lg:text-4xl lg:mb-4">
            <FormattedMessage defaultMessage="Project Developers" id="+K9fF0" />
          </h2>
          <p className="text-gray-800">
            <FormattedMessage
              defaultMessage="This project has {numDevelopers} {numDevelopers, plural, one {project developer} other {project developers}}."
              id="MM4RqT"
              values={{
                numDevelopers: allDevelopers.length,
              }}
            />
          </p>
        </div>
        <div className="flex flex-col space-y-6">
          {allDevelopers.map(({ about, name, picture, project_developer_type, id, slug }) => (
            <ProfileCard
              className="w-full"
              key={id}
              link={`${Paths.ProjectDeveloper}/${slug}`}
              picture={picture?.small}
              name={name}
              description={about}
              type={project_developer_type}
              profileType="project-developer"
            />
          ))}
        </div>
      </LayoutContainer>
    </section>
  );
};
export default ProjectDevelopers;
