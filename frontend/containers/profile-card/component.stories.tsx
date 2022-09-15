import { Story, Meta } from '@storybook/react/types-6-0';
import withMock from 'storybook-addon-mock';

import apiEnumsMock from 'mockups/api/v1/enums.json';

import ProfileCard, { ProfileCardProps } from '.';

const mockApiData = [
  {
    url: '/api/v1/enums',
    method: 'GET',
    status: 200,
    response: apiEnumsMock,
  },
];

export default {
  component: ProfileCard,
  title: 'Containers/ProfileCard',
  decorators: [withMock],
} as Meta;

const defaultArgs = {
  picture: 'https://placekitten.com/g/300/300',
  name: 'John Doe',
  description:
    'Morbi varius semper ipsum, sed placerat lacus blandit non. Curabitur ac commodo orci. Sed laoreet feugiat libero, nec tincidunt tortor lacinia',
  link: '#',
};

const Template: Story<ProfileCardProps> = (args: ProfileCardProps) => (
  <ProfileCard className="w-96" {...args} />
);

export const ProjectDeveloper: Story<ProfileCardProps> = Template.bind({});
ProjectDeveloper.args = {
  ...(defaultArgs as ProfileCardProps),
  profileType: 'project-developer',
  type: 'academic',
  impacts: ['climate', 'water'],
};

export const Investor: Story<ProfileCardProps> = Template.bind({});
Investor.args = {
  ...(defaultArgs as ProfileCardProps),
  profileType: 'investor',
  type: 'angel-investor',
  impacts: ['climate', 'community'],
};

export const WithoutImpacts: Story<ProfileCardProps> = Template.bind({});
WithoutImpacts.args = {
  ...(defaultArgs as ProfileCardProps),
  profileType: 'investor',
  type: 'angel-investor',
};

export const TruncatedDescription: Story<ProfileCardProps> = Template.bind({});
TruncatedDescription.args = {
  ...(defaultArgs as ProfileCardProps),
  profileType: 'investor',
  type: 'angel-investor',
  description:
    'Morbi varius semper ipsum, sed placerat lacus blandit non. Curabitur ac commodo orci. Sed laoreet feugiat libero, nec tincidunt tortor lacinia eu. Nulla fringilla auctor nisi, vel accumsan neque bibendum ac. Praesent consequat rhoncus enim. Cras ultricies dolor ante, ac dignissim ex tincidunt ac. Nam placerat elit eget odio interdum pellentesque. Nullam scelerisque, justo ut molestie suscipit, erat elit semper sem, et pharetra mauris nisi scelerisque nisl. Quisque scelerisque risus sit amet sapien pulvinar suscipit. Vestibulum tristique porta augue, vitae convallis quam tincidunt vitae. In sed enim turpis. Praesent placerat eleifend sollicitudin. Morbi sit amet libero scelerisque, lacinia neque luctus, posuere eros. Praesent a turpis ac libero luctus tincidunt. Sed fringilla vehicula dolor. Integer sollicitudin sodales interdum.',
  impacts: ['climate', 'water'],
};
