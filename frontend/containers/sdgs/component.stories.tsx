import { Story, Meta } from '@storybook/react/types-6-0';

import SDGs, { SDGsProps } from '.';

export default {
  component: SDGs,
  title: 'Containers/SGDs',
  argTypes: {},
} as Meta;

const Template: Story<SDGsProps> = ({ ...rest }: SDGsProps) => <SDGs {...rest} />;

export const Default: Story<SDGsProps> = Template.bind({});
Default.args = {
  sdgs: [
    { id: 'no-poverty', title: 'No poverty' },
    { id: 'gender-equality', title: 'Gender equality' },
    { id: 'decent-work', title: 'Decent work and economic growth' },
    { id: 'reduced-inequalities', title: 'Reduced inequalities' },
    { id: 'climate-action', title: 'Climate action' },
    { id: 'life-on-land', title: 'Life on land' },
  ],
};
