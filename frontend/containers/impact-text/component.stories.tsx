import { Story } from '@storybook/react/types-6-0';

import { ImpactAreas } from 'enums';

import ImpactText from './component';
import { ImpactTextProps } from './types';

export default {
  title: 'Containers/ImpactText',
  component: ImpactText,
};

const Template: Story<ImpactTextProps> = (args) => (
  <div className="w-96">
    <ImpactText {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  area: ImpactAreas.Municipality,
  impact: {
    biodiversity: 5.3242342423543252,
    climate: 7.4235345235253444,
    water: 9.930683249422888,
    community: 3.234354352523432,
    total: 2.522670812355722,
  },
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  area: ImpactAreas.PriorityLandscape,
  impact: undefined,
};
