import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';

import projectMock from 'mockups/project.json';
import { Project as ProjectType } from 'types/project';

import ProjectCard, { ProjectCardProps } from '.';

export default {
  component: ProjectCard,
  title: 'Containers/ProjectCard',
  argTypes: {},
} as Meta;

const Template: Story<ProjectCardProps> = ({ project }: ProjectCardProps) => {
  const onClick = (projectId: string) => action('onClick')(projectId);
  return <ProjectCard project={project} onClick={onClick} />;
};

export const Default: Story<ProjectCardProps> = Template.bind({});
Default.args = {
  project: { ...projectMock, trusted: false } as unknown as ProjectType,
};

/* VERIFICATION PROJECTS: HIDDEN
export const Verified: Story<ProjectCardProps> = Template.bind({});
Verified.args = {
  project: projectMock as unknown as ProjectType,
};
*/
