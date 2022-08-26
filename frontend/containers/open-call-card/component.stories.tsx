import { Story, Meta } from '@storybook/react/types-6-0';

import { OpenCallStatus } from 'enums';
import investorMock from 'mockups/investor.json';
import openCallMock from 'mockups/openCall.json';
import { OpenCall as OpenCallType } from 'types/open-calls';

import OpenCallCard, { OpenCallCardProps } from '.';

export default {
  component: OpenCallCard,
  title: 'Containers/OpenCallCard',
  argTypes: {},
} as Meta;

const Template: Story<OpenCallCardProps> = ({ openCall }: OpenCallCardProps) => {
  return <OpenCallCard openCall={openCall} />;
};

export const Default: Story<OpenCallCardProps> = Template.bind({});
Default.args = {
  openCall: { ...openCallMock, investor: investorMock } as unknown as OpenCallType,
};

export const Closed: Story<OpenCallCardProps> = Template.bind({});
Closed.args = {
  openCall: {
    ...openCallMock,
    investor: investorMock,
    status: OpenCallStatus.Closed,
  } as unknown as OpenCallType,
};

export const Verified: Story<OpenCallCardProps> = Template.bind({});
Verified.args = {
  openCall: {
    ...openCallMock,
    investor: investorMock,
    trusted: true,
  } as unknown as OpenCallType,
};
