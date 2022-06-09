import React from 'react';

import { PlusCircle as PlusCircleIcon } from 'react-feather';

import { Story, Meta } from '@storybook/react/types-6-0';
import withMock from 'storybook-addon-mock';

import Button from 'components/button';
import Icon from 'components/icon';
import apiAccountInvestorMock from 'mockups/api/v1/account/investor.json';
import apiAccountProjectDeveloperMock from 'mockups/api/v1/account/project_developer.json';
import apiUserInvestorMock from 'mockups/api/v1/user/investor.json';
import apiUserProjectDeveloperMock from 'mockups/api/v1/user/project_developer.json';

import { apiBaseUrl } from 'services/api';

import DashboardLayout from './component';

import { DashboardLayoutProps } from '.';

const apiUrl = `${apiBaseUrl}/api/v1`;

const mockApiProjectDeveloper = [
  {
    url: `${apiUrl}/user`,
    method: 'GET',
    status: 200,
    response: apiUserProjectDeveloperMock,
  },
  {
    url: `${apiUrl}/account/project_developer`,
    method: 'GET',
    status: 200,
    response: apiAccountProjectDeveloperMock,
  },
];

const mockApiInvestor = [
  {
    url: `${apiUrl}/user`,
    method: 'GET',
    status: 200,
    response: apiUserInvestorMock,
  },
  {
    url: `${apiUrl}/account/investor`,
    method: 'GET',
    status: 200,
    response: apiAccountInvestorMock,
  },
];

export default {
  component: DashboardLayout,
  title: 'layouts/Dashboard',
  decorators: [withMock],
} as Meta;

const Template: Story<DashboardLayoutProps> = (args: DashboardLayoutProps) => (
  <DashboardLayout
    buttons={
      <Button className="drop-shadow-xl" theme="primary-white" to="/">
        <Icon icon={PlusCircleIcon} className="w-4 h-4 mr-2" aria-hidden />
        Create project
      </Button>
    }
    {...args}
  >
    <p className="my-2">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel euismod risus. Ut
      maximus odio vulputate condimentum semper. Proin feugiat faucibus vulputate. Nullam eu nisl
      maximus, vestibulum dolor sit amet, tempus quam. Integer ut ultricies lectus, at imperdiet
      lorem. Vestibulum dapibus ullamcorper odio vel vehicula. Suspendisse elementum enim odio, quis
      tristique lorem sollicitudin at. Nunc sit amet malesuada ante. Proin at vestibulum tortor.
    </p>
    <p className="my-2">
      Suspendisse commodo, nunc sit amet venenatis pellentesque, diam sem dapibus massa, id
      porttitor arcu enim ut felis. Interdum et malesuada fames ac ante ipsum primis in faucibus.
      Nunc vitae magna pretium, suscipit turpis a, tincidunt sapien. Aenean feugiat mattis massa a
      tempus. Vivamus viverra enim diam, quis viverra neque venenatis at. Sed tincidunt, arcu eu
      tempor ultricies, mi diam commodo elit, at aliquam mi ex et sapien. Class aptent taciti
      sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam vel dui sagittis
      odio eleifend ultrices sit amet eu magna. Phasellus scelerisque est sed tincidunt finibus.
      Quisque sed eros metus. Ut vel sollicitudin magna, et suscipit felis. In porta lorem quis quam
      commodo fermentum. Sed non nulla sit amet odio semper porttitor.
    </p>
    <p className="my-2">
      Maecenas rhoncus sem ut nisi efficitur congue. Etiam at erat sapien. Sed nunc magna, vehicula
      id mattis in, pharetra nec enim. Proin at augue non lectus convallis aliquet. Integer a ante
      sed magna faucibus suscipit sed eget lectus. Pellentesque iaculis pellentesque ex, semper
      imperdiet orci. Nam consectetur, nisi sed interdum dictum, felis purus facilisis erat, sed
      semper est ante a sem. Phasellus ultricies quis libero a luctus. Aenean semper non neque id
      venenatis. Phasellus quis justo dapibus, maximus libero id, pellentesque magna. Duis auctor
      metus sit amet arcu tincidunt aliquet. Phasellus in bibendum ligula, eu dictum diam.
    </p>
    <p className="my-2">
      Nullam quam neque, efficitur eu pellentesque ut, vestibulum sit amet enim. Suspendisse dictum
      nunc non interdum bibendum. Sed iaculis maximus malesuada. Nunc feugiat, sem in tincidunt
      ullamcorper, augue velit molestie odio, non euismod lectus mi a nibh. Mauris et quam eget
      turpis lobortis scelerisque ac vitae diam. Quisque tristique odio dolor, ut tincidunt lacus
      feugiat at. Nam rutrum tempor sem, ut ornare sapien. Vivamus iaculis commodo erat in
      consectetur. Vestibulum id arcu ipsum. Praesent eleifend vel nisl vel congue. Sed efficitur
      egestas lacus. Fusce at sapien tempus, consectetur nunc vitae, euismod urna. Aliquam erat
      volutpat. Morbi euismod blandit felis, feugiat lobortis ante.
    </p>
  </DashboardLayout>
);

export const ProjectDeveloper: Story<DashboardLayoutProps> = Template.bind({});
ProjectDeveloper.args = {};
ProjectDeveloper.parameters = {
  mockData: mockApiProjectDeveloper,
};

export const Investor: Story<DashboardLayoutProps> = Template.bind({});
Investor.args = {};
Investor.parameters = {
  mockData: mockApiInvestor,
};
