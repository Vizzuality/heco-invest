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
  impact: [3, 5, 6, 5],
  category: 'tourism-and-recreation',
};
