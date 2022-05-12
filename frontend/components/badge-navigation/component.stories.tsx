import { Story, Meta } from '@storybook/react/types-6-0';

import BadgeNavigation, { BadgeNavigationProps } from '.';

export default {
  component: BadgeNavigation,
  title: 'Components/BadgeNavigation',
  argTypes: {},
} as Meta;

const Template: Story<BadgeNavigationProps> = ({ ...props }: BadgeNavigationProps) => (
  <div className="flex items-center justify-center h-48 bg-background-dark">
    <BadgeNavigation {...props} />
  </div>
);

export const Default: Story<BadgeNavigationProps> = Template.bind({});

Default.args = {
  activeId: 'second-id',
  items: [
    {
      id: 'first-id',
      name: 'First',
      link: 'http://www.example.com/first',
      number: 10,
    },
    {
      id: 'second-id',
      name: 'Second',
      link: 'http://www.example.com/second',
      number: 4,
    },
    {
      id: 'third-id',
      name: 'Third',
      link: 'http://www.example.com/third',
      number: 10,
    },
    {
      id: 'fourth-id',
      name: 'Fourth',
      link: 'http://www.example.com/fourth',
      number: 200,
    },
  ],
};
