import { Story, Meta } from '@storybook/react/types-6-0';

import BadgeNavigation, { BadgeNavigationProps } from '.';

export default {
  component: BadgeNavigation,
  title: 'Components/BadgeNavigation',
  argTypes: {},
} as Meta;

const navigationItems = [
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
];

const Template: Story<BadgeNavigationProps> = ({ ...props }: BadgeNavigationProps) => (
  <div className="flex items-center justify-center h-48 bg-background-dark">
    <BadgeNavigation {...props} />
  </div>
);

export const Default: Story<BadgeNavigationProps> = Template.bind({});

Default.args = {
  activeId: 'second-id',
  items: navigationItems,
};

export const Pill: Story<BadgeNavigationProps> = Template.bind({});

Pill.args = {
  activeId: 'second-id',
  type: 'pill',
  items: navigationItems,
};

export const BadgeLeft: Story<BadgeNavigationProps> = Template.bind({});

BadgeLeft.args = {
  badgePosition: 'left',
  activeId: 'second-id',
  items: navigationItems,
};

export const Simple: Story<BadgeNavigationProps> = Template.bind({});

Simple.args = {
  theme: 'simple',
  activeId: 'second-id',
  items: navigationItems,
};

export const Vertical: Story<BadgeNavigationProps> = Template.bind({});

Vertical.args = {
  orientation: 'vertical',
  badgePosition: 'left',
  activeId: 'second-id',
  items: navigationItems,
};
