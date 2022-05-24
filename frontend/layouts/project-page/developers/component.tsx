import React from 'react';

import { FormattedMessage } from 'react-intl';

import Image from 'next/image';

import LayoutContainer from 'components/layout-container';
import { ProjectDevelopersProps } from 'layouts/project-page/developers/types';

export const ProjectDevelopers: React.FC<ProjectDevelopersProps> = ({
  project,
}: ProjectDevelopersProps) => {
  console.log({ project: project.project_developer });
  const numberOfDevelopers = project.project_developer.length || 1;
  const {
    project_developer: { about, name, picture, project_developer_type },
  } = project;
  return (
    <section className="bg-background-middle py-18">
      <LayoutContainer className="flex space-x-28">
        <div className="flex flex-col pl-16 space-y-1">
          <h2 className="font-serif text-3xl text-black ">
            <FormattedMessage defaultMessage="Project Developers" id="+K9fF0" />
          </h2>
          <p className="text-gray-800">{`This project has ${numberOfDevelopers} project developer`}</p>
        </div>
        <div className="w-2/3 p-6 space-y-8 font-sans bg-white border rounded-2xl border-beige">
          <div className="flex items-center space-x-4">
            <Image
              alt={name}
              className="rounded-full"
              height={72}
              src={picture.small}
              title={name}
              width={72}
            />
            <div>
              <h6 className="text-xl font-semibold">{name}</h6>
              <p className="text-gray-800 uppercase">{project_developer_type}</p>
            </div>
          </div>
          <div>
            <p>{about}</p>
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
};

export default ProjectDevelopers;
