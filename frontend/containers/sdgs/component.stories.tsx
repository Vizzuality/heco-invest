import { Story, Meta } from '@storybook/react/types-6-0';

import SDGs, { SDGsProps } from '.';

export default {
  component: SDGs,
  title: 'Containers/SGDs',
  argTypes: {},
} as Meta;

const Template: Story<SDGsProps> = ({ ...rest }: SDGsProps) => <SDGs {...rest} />;

export const Default: Story<SDGsProps> = Template.bind({});
Default.args = {};
