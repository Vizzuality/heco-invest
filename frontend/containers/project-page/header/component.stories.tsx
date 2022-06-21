import { Story, Meta } from '@storybook/react/types-6-0';

import projectMockup from 'mockups/project.json';

import Header, { HeaderProps } from '.';

export default {
  component: Header,
  title: 'Containers/ProjectPage/Header',
  argTypes: {},
} as Meta;

const Template: Story<HeaderProps> = ({ ...args }: HeaderProps) => <Header {...args} />;

export const Default: Story<HeaderProps> = Template.bind({});
Default.args = {
  project: projectMockup as any, // Not ideal, but it's a quick so we don't have to keep updating the mock.
};
