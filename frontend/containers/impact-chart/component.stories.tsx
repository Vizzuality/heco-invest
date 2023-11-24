import { Story } from '@storybook/react/types-6-0';

import { projectImpact } from 'helpers/project';

import { ImpactAreas } from 'enums';
import projectMock from 'mockups/project.json';
import { Project as ProjectType } from 'types/project';

import ImpactChart from './component';
import { ImpactChartProps } from './types';

export default {
  title: 'Containers/ImpactChart',
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
  impact: projectImpact(projectMock as unknown as ProjectType)[ImpactAreas.Municipality],
  category: 'sustainable-tourism',
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  category: 'sustainable-tourism',
};

export const Compact = CompactTemplate.bind({});
Compact.args = {
  compactMode: true,
  impact: projectImpact(projectMock as unknown as ProjectType)[ImpactAreas.Municipality],
  category: 'sustainable-tourism',
};

export const CompactPlaceholder = CompactTemplate.bind({});
CompactPlaceholder.args = {
  compactMode: true,
  category: 'sustainable-tourism',
};
