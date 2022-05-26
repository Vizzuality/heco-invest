import { Story, Meta } from '@storybook/react/types-6-0';
import withMock from 'storybook-addon-mock';

import apiEnumsMock from 'mockups/api/v1/enums.json';
import projectMock from 'mockups/project.json';
import { Project as ProjectType } from 'types/project';

import ProjectDetails, { ProjectDetailsProps } from '.';

const mockApiData = [
  {
    url: '/api/v1/enums',
    method: 'GET',
    status: 200,
    response: apiEnumsMock,
  },
];

export default {
  component: ProjectDetails,
  title: 'Containers/ProjectDetails',
  decorators: [withMock],
} as Meta;

const Template: Story<ProjectDetailsProps> = ({ project }: ProjectDetailsProps) => {
  return (
    <div className="relative max-w-md max-h-full overflow-y-scroll bg-white border rounded-2xl">
      <ProjectDetails project={project} />
    </div>
  );
};

export const Default: Story<ProjectDetailsProps> = Template.bind({});

Default.args = {
  project: {
    ...(projectMock as unknown as ProjectType),
    trusted: false,
    looking_for_funding: false,
  },
};

Default.parameters = {
  mockData: mockApiData,
};

export const Verified: Story<ProjectDetailsProps> = Template.bind({});

Verified.args = {
  project: {
    ...(projectMock as unknown as ProjectType),
    trusted: true,
    looking_for_funding: false,
  },
};

Verified.parameters = {
  mockData: mockApiData,
};

export const LookingForFunding: Story<ProjectDetailsProps> = Template.bind({});

LookingForFunding.args = {
  project: {
    ...(projectMock as unknown as ProjectType),
    trusted: false,
    looking_for_funding: true,
  },
};

LookingForFunding.parameters = {
  mockData: mockApiData,
};
