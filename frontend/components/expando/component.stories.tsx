import { Story } from '@storybook/react/types-6-0';

import Expando from './component';
import type { ExpandoProps } from './types';

export default {
  title: 'Components/Expando',
  component: Expando,
};

const defaultArgs = {
  className: 'border border-gray-500 rounded rounded-md',
  title: <div className="flex items-center w-full px-2 my-2">Expando title</div>,
  children: (
    <div className="p-2 border-t border-gray-500">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac nibh finibus, pretium
      purus eu, elementum mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
      posuere cubilia curae; Donec vulputate tempus blandit. Integer eget semper mauris. Nam id nibh
      dui. In risus orci, consequat sit amet ultrices vitae, convallis vitae enim. Donec tristique
      tempor ligula ac accumsan. Proin dictum mattis vulputate. Quisque eu consectetur nisl. Quisque
      ut risus egestas, posuere turpis sed, commodo velit.;
    </div>
  ),
};

const Template: Story<ExpandoProps> = (args) => <Expando {...args} />;

export const Default = Template.bind({});
Default.args = defaultArgs;

export const Closed = Template.bind({});
Closed.args = {
  ...defaultArgs,
  defaultOpen: false,
};

const MultipleTemplate: Story<ExpandoProps> = (args) => (
  <div className="flex flex-col gap-2">
    {[...Array(3)].map((_, idx) => (
      <Expando
        key={idx}
        {...args}
        title={<div className="flex items-center w-full px-2 my-2">{`Expando ${idx}`}</div>}
      />
    ))}
  </div>
);

export const Multiple = MultipleTemplate.bind({});
Multiple.args = defaultArgs;
