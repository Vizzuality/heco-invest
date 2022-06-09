import React from 'react';

import { FormattedMessage } from 'react-intl';

import ProfileCard from 'containers/profile-card/component';
import { ProjectDevelopersProps } from 'containers/project-page/developers/types';

import LayoutContainer from 'components/layout-container';
import { Paths } from 'enums';

export const ProjectDevelopers: React.FC<ProjectDevelopersProps> = ({
  project,
}: ProjectDevelopersProps) => {
  const { project_developer: mainDeveloper, involved_project_developers: developers } = project;
  const NUMBER_DEVELOPERS = developers.length;

  return (
    <section className="bg-background-middle py-18">
      <LayoutContainer className="flex flex-col lg:flex-row space-y-28 lg:space-y-0 lg:space-x-28">
        <div className="flex flex-col pl-6 space-y-1 lg:pl-16">
          <h2 className="font-serif text-2xl text-black lg:text-3xl">
            <FormattedMessage defaultMessage="Project Developers" id="+K9fF0" />
          </h2>
          <p className="text-gray-800">
            <FormattedMessage
              defaultMessage="This project has {numDevelopers} {noun}"
              id="I7L4wz"
              values={{
                numDevelopers: NUMBER_DEVELOPERS,
                noun: NUMBER_DEVELOPERS === 1 ? 'project developer' : 'project developers',
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
            developers.map((developer) => {
              const { about, name, picture, project_developer_type, id, slug } = developer;
              return (
                <ProfileCard
                  className="w-full"
                  key={id}
                  link={`${Paths.ProjectDeveloper}/${slug}`}
                  picture={picture.small}
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
