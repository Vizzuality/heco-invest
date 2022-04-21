import { Story, Meta } from '@storybook/react/types-6-0';

import sdgsMock from 'mockups/sdgs.json';
import { Enum } from 'types/enums';

import SDGs, { SDGsProps } from '.';

export default {
  component: SDGs,
  title: 'Containers/SGDs',
  argTypes: {},
} as Meta;

const Template: Story<SDGsProps> = ({ ...rest }: SDGsProps) => <SDGs {...rest} />;

export const Default: Story<SDGsProps> = Template.bind({});
Default.args = {
  sdgs: [sdgsMock[0], sdgsMock[4], sdgsMock[7], sdgsMock[9], sdgsMock[12], sdgsMock[14]] as Enum[],
};
