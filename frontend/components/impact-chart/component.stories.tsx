import { Story } from '@storybook/react/types-6-0';

import ImpactChart from './component';
import { ImpactChartProps } from './types';

export default {
  title: 'Components/ImpactChart',
  component: ImpactChart,
};

const Template: Story<ImpactChartProps> = (args) => (
  <div className="w-96">
    <ImpactChart {...args} />
  </div>
);

const CompactTemplate: Story<ImpactChartProps> = (args) => (
  <div className="w-20">
    <ImpactChart {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  impact: [3, 5, 6, 5],
  category: 'tourism-and-recreation',
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  impact: [],
  category: 'tourism-and-recreation',
};

export const Compact = CompactTemplate.bind({});
Compact.args = {
  compactMode: true,
  impact: [3, 5, 6, 5],
  category: 'tourism-and-recreation',
};

export const CompactPlaceholder = CompactTemplate.bind({});
CompactPlaceholder.args = {
  compactMode: true,
  impact: [],
  category: 'tourism-and-recreation',
};
