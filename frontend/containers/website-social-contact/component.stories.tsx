import { Story, Meta } from '@storybook/react/types-6-0';

import WebsiteSocialContact, { WebsiteSocialContactProps } from '.';

export default {
  component: WebsiteSocialContact,
  title: 'Containers/WebsiteSocialContact',
  argTypes: {},
} as Meta;

const Template: Story<WebsiteSocialContactProps> = ({ ...rest }: WebsiteSocialContactProps) => (
  <WebsiteSocialContact {...rest} />
);

export const Default: Story<WebsiteSocialContactProps> = Template.bind({});
Default.args = {
  website: 'https://www.example.com',
  social: [
    { id: 'facebook', url: 'https://www.facebook.com' },
    { id: 'twitter', url: 'https://www.twitter.com' },
    { id: 'instagram', url: 'https://www.instagram.com' },
    { id: 'linked-in', url: 'https://www.linkedin.com' },
  ],
  contact: 'John Doe',
};
