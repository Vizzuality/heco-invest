import { Story, Meta } from '@storybook/react/types-6-0';

import DeveloperAbout, { DeveloperAboutProps } from '.';

export default {
  component: DeveloperAbout,
  title: 'Containers/DeveloperAbout',
  argTypes: {},
} as Meta;

const Template: Story<DeveloperAboutProps> = ({ ...rest }: DeveloperAboutProps) => (
  <DeveloperAbout {...rest} />
);

export const Default: Story<DeveloperAboutProps> = Template.bind({});
Default.args = {
  developerName: 'Theodore Mosby',
  developerPhoto: 'https://placekitten.com/400/400',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt enim pharetra velit tortor mauris aenean. Adipiscing sed ornare at ipsum pellentesque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt enim pharetra velit tortor mauris aenean. Adipiscing sed ornare at ipsum pellentesque.',
  website: 'https://www.example.com',
  social: [
    { id: 'facebook', url: 'https://www.facebook.com' },
    { id: 'twitter', url: 'https://www.twitter.com' },
    { id: 'instagram', url: 'https://www.instagram.com' },
    { id: 'linked-in', url: 'https://www.linkedin.com' },
  ],
};
