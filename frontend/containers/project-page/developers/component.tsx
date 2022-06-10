import React from 'react';

import { FormattedMessage } from 'react-intl';

import ProfileCard from 'containers/profile-card/component';
import { ProjectDevelopersProps } from 'containers/project-page/developers/types';

import LayoutContainer from 'components/layout-container';
import { Paths } from 'enums';

export const ProjectDevelopers: React.FC<ProjectDevelopersProps> = ({
  project,
}: ProjectDevelopersProps) => {
  const { project_developer: mainDeveloper, involved_project_developers } = project;
  // If the involved_project_developers have just the project_developer (same id), the JSONA parsing returns a reference of the project_developer, so it doesn't have propoerties.
  //   involved_project_developers: [{
  //     "$ref": "$[\"project_developer\"]"
  // }]
  // So  we have to filter the involved_project_developers that have properties to have the ones that are not the main project developer.
  const developers = involved_project_developers?.filter(({ id }) => id);
  // The involved_projectDevelpers + the  project_developer
  const NUMBER_DEVELOPERS = developers.length + 1;

  return (
    <section className="bg-background-middle py-18">
      <LayoutContainer className="flex flex-col lg:flex-row space-y-28 lg:space-y-0 lg:space-x-28">
        <div className="flex flex-col pl-6 space-y-1 lg:pl-16">
          <h2 className="font-serif text-2xl text-black lg:text-3xl">
            <FormattedMessage defaultMessage="Project Developers" id="+K9fF0" />
          </h2>
          <p className="text-gray-800">
            <FormattedMessage
              defaultMessage="This project has {numDevelopers} project developer{noun}"
              id="CcFPkO"
              values={{
                numDevelopers: NUMBER_DEVELOPERS,
                noun: NUMBER_DEVELOPERS === 1 ? '' : 's',
              }}
            />
          </p>
        </div>
        <div className="flex flex-col space-y-6">
          {!!mainDeveloper && (
            <ProfileCard
              className="w-full"
              key={mainDeveloper.id}
              link={`${Paths.ProjectDeveloper}/${mainDeveloper.slug}`}
              picture={mainDeveloper.picture.small}
              name={mainDeveloper.name}
              description={mainDeveloper.about}
              type={mainDeveloper.project_developer_type}
              profileType="project-developer"
            />
          )}
          {!!NUMBER_DEVELOPERS &&
            developers?.map((developer) => {
              const { about, name, picture, project_developer_type, id, slug } = developer;
              return (
                <ProfileCard
                  className="w-full"
                  key={id}
                  link={`${Paths.ProjectDeveloper}/${slug}`}
                  picture={picture?.small || ''}
                  name={name}
                  description={about}
                  type={project_developer_type}
                  profileType="project-developer"
                />
              );
            })}
        </div>
      </LayoutContainer>
    </section>
  );
};

export default ProjectDevelopers;
