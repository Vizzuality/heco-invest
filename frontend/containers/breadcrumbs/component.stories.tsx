import { Story, Meta } from '@storybook/react/types-6-0';

import Breadcrumbs, { BreadcrumbsProps } from '.';

export default {
  component: Breadcrumbs,
  title: 'Containers/Breadcrumbs',
  argTypes: {},
} as Meta;

const Template: Story<BreadcrumbsProps> = ({ ...props }: BreadcrumbsProps) => (
  <Breadcrumbs {...props} />
);

export const Default: Story<BreadcrumbsProps> = Template.bind({});

Default.args = {};

Default.story = {
  parameters: {
    nextRouter: {
      route: '/project/about/new',
      asPath: '/project/about/new',
    },
  },
};

export const DynamicUrl: Story<BreadcrumbsProps> = Template.bind({});

DynamicUrl.args = {
  substitutions: {
    id: { name: 'HeCo project' },
  },
};

DynamicUrl.story = {
  parameters: {
    nextRouter: {
      route: '/project-developer/[id]',
      asPath: '/project-developer/pd-slug',
      query: {
        id: 'pd-slug',
      },
    },
  },
};

export const Substitutions: Story<BreadcrumbsProps> = Template.bind({});

Substitutions.args = {
  substitutions: {
    platform: { name: 'HeCo project' },
    about: { link: 'http://www.example.com' },
    'our-work': { name: 'Substituted name' },
  },
};

Substitutions.story = {
  parameters: {
    nextRouter: {
      route: '/platform/about/our-work',
      asPath: '/platform/about/our-work',
    },
  },
};

export const PrettyNames: Story<BreadcrumbsProps> = Template.bind({});

PrettyNames.args = {};

PrettyNames.story = {
  parameters: {
    nextRouter: {
      route: '/about-us/our-work/blog',
      asPath: '/about-us/our-work/blog',
    },
  },
};
