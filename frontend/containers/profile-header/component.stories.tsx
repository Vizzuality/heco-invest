import { Story, Meta } from '@storybook/react/types-6-0';

import ProfileHeader, { ProfileHeaderProps } from '.';

export default {
  component: ProfileHeader,
  title: 'Containers/ProfileHeader',
  argTypes: {},
} as Meta;

const Template: Story<ProfileHeaderProps> = ({ ...rest }: ProfileHeaderProps) => (
  <ProfileHeader {...rest} />
);

export const Default: Story<ProfileHeaderProps> = Template.bind({});
Default.args = {
  logo: '/images/temp-placeholders/nesst-logo.png',
  title: 'NESst',
  subtitle: 'Non-VC Investment vehicle',
  text: 'NESsT finances enterprises that generate dignified employment and sustain the planet. Since 1997, we have financed 200 enterprises that have sustained jobs for 70,000 individuals and improved 670,000 lives. We achieve our mission through an Incubator that provides pre-seed capital and business services to improve investment readiness; and the Enterprise Fund that deploys seed-state loans to enterprises seeking capital to scale.',
  website: 'https://www.site.com',
  social: [
    { id: 'linkedin', url: 'https://www.linkedin.com' },
    { id: 'twitter', url: 'https://www.twitter.com' },
    { id: 'facebook', url: 'https://www.facebook.com' },
    { id: 'instagram', url: 'https://www.instagram.com' },
  ],
  contact: {
    name: 'User name',
    email: 'user@example.com',
    phone: '3519233424234',
  },
};
