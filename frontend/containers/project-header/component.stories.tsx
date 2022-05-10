import { Story, Meta } from '@storybook/react/types-6-0';

import projectMockup from 'mockups/project.json';
import { Project as ProjectType } from 'types/project';

import ProjectHeader, { ProjectHeaderProps } from '.';

export default {
  component: ProjectHeader,
  title: 'Containers/ProjectHeader',
  argTypes: {},
} as Meta;

const Template: Story<ProjectHeaderProps> = ({ ...args }: ProjectHeaderProps) => (
  <ProjectHeader {...args} />
);

export const Default: Story<ProjectHeaderProps> = Template.bind({});
Default.args = {
  project: projectMockup as any, // Not ideal, but it's a quick so we don't have to keep updating the mock.
};
