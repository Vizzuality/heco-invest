import { useState } from 'react';

import { Story } from '@storybook/react/types-6-0';

import Legend from './component';
import LegendItem from './item';
import ITEMS from './mock';
import { LegendProps } from './types';
import LegendTypeBasic from './types/basic';
import LegendTypeChoropleth from './types/choropleth';
import LegendTypeGradient from './types/gradient';

export default {
  title: 'Components/Map/Legend',
  component: Legend,
};

const Template: Story<LegendProps> = (args) => {
  const [arrItems, setArrItems] = useState(ITEMS);

  return (
    <Legend {...args}>
      {arrItems.map((i: any) => {
        const { type, items, id } = i;
        return (
          <LegendItem
            legend={i}
            handleCloseLegend={() => setArrItems(arrItems.filter((item) => item.id !== id))}
            key={i.id}
            {...i}
          >
            {type === 'basic' && (
              <LegendTypeBasic className="text-sm text-gray-300" items={items} />
            )}
            {type === 'choropleth' && (
              <LegendTypeChoropleth className="text-sm text-gray-300" items={items} />
            )}
            {type === 'gradient' && (
              <LegendTypeGradient className="text-sm text-gray-300" items={items} />
            )}
          </LegendItem>
        );
      })}
    </Legend>
  );
};

export const Default = Template.bind({});
Default.args = {
  className: '',
};

export const MaxHeight = Template.bind({});
MaxHeight.args = {
  className: '',
  maxHeight: 300,
};
