import { Story, Meta } from '@storybook/react/types-6-0';

import { WebsiteSocialProps } from './types';

import WebsiteSocial from '.';

export default {
  component: WebsiteSocial,
  title: 'Containers/WebsiteSocial',
  argTypes: {},
} as Meta;

const Template: Story<WebsiteSocialProps> = ({ ...rest }: WebsiteSocialProps) => (
  <WebsiteSocial {...rest} />
);

export const Default: Story<WebsiteSocialProps> = Template.bind({});
Default.args = {
  website: 'https://www.example.com',
  social: [
    { id: 'facebook', url: 'https://www.facebook.com' },
    { id: 'twitter', url: 'https://www.twitter.com' },
    { id: 'instagram', url: 'https://www.instagram.com' },
    { id: 'linked-in', url: 'https://www.linkedin.com' },
  ],
};
