import React from 'react';

import { FormattedMessage } from 'react-intl';

import LayoutContainer from 'components/layout-container';
import { ProjectDevelopersProps } from 'layouts/project-page/developers/types';

export const ProjectDevelopers: React.FC<ProjectDevelopersProps> = ({
  project,
}: ProjectDevelopersProps) => {
  console.log({ project });
  return (
    <section className="bg-background-middle py-18">
      <LayoutContainer>
        <h2 className="pl-16 mb-16 font-serif text-3xl text-black">
          <FormattedMessage defaultMessage="Project Developers" id="+K9fF0" />
        </h2>
      </LayoutContainer>
    </section>
  );
};

export default ProjectDevelopers;
