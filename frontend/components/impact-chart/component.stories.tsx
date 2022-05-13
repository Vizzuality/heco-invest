import { Story } from '@storybook/react/types-6-0';

import ImpactChart from './component';
import { ImpactChartProps } from './types';

export default {
  title: 'Components/ImpactChart',
  component: ImpactChart,
};

const Template: Story<ImpactChartProps> = (args) => (
  <div className="w-[500px] h-[500px]">
    <ImpactChart {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  impact: [30, 45, 60, 55],
  labels: ['Biodiversity', 'Climate', 'Community', 'Water'],
  color: 'rgba(229, 125, 87, 0.8)',
};
