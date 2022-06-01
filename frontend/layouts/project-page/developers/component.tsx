import React from 'react';

import { FormattedMessage } from 'react-intl';

import Image from 'next/image';

import LayoutContainer from 'components/layout-container';
import { ProjectDevelopersProps } from 'layouts/project-page/developers/types';

export const ProjectDevelopers: React.FC<ProjectDevelopersProps> = ({
  project,
}: ProjectDevelopersProps) => {
  const { involved_project_developers: developers } = project;
  const NUMBER_DEVELOPERS = developers.length;

  return (
    <section className="bg-background-middle py-18">
      <LayoutContainer className="flex flex-col lg:flex-row space-y-28 lg:space-y-0 lg:space-x-28">
        <div className="flex flex-col pl-6 space-y-1 lg:pl-16">
          <h2 className="font-serif text-3xl text-black">
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
        {!!NUMBER_DEVELOPERS &&
          developers.map((developer) => {
            const { about, name, picture, project_developer_type, id } = developer;
            return (
              <div
                key={id}
                className="p-6 space-y-8 font-sans bg-white border md:w-2/3 rounded-2xl border-beige"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    alt={name}
                    className="rounded-full"
                    height={72}
                    src={picture.original}
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
            );
          })}
      </LayoutContainer>
    </section>
  );
};

export default ProjectDevelopers;
