import { Story, Meta } from '@storybook/react/types-6-0';

import ProjectCard, { ProjectCardProps } from '.';

export default {
  component: ProjectCard,
  title: 'Containers/ProjectCard',
  argTypes: {},
} as Meta;

const Template: Story<ProjectCardProps> = ({
  id,
  category,
  name,
  instrument,
  amount,
  link: href,
  onClick,
}: ProjectCardProps) => (
  <ProjectCard
    key={id}
    id={id}
    category={category}
    name={name}
    instrument={instrument}
    amount={amount}
    link={`/project/${id}`}
    onClick={onClick}
  />
);

export const Default: Story<ProjectCardProps> = Template.bind({});
Default.args = {
  id: 'project-id',
  category: 'Tourism & recreation',
  name: 'Circulo de Creaciones Cidaticas Circreadi',
  instrument: 'Grant',
  amount: 25000,
  link: '/project/circulo-creaciones',
};
