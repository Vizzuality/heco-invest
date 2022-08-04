import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';

import ProfileCard from 'containers/profile-card';

import CardHoverToDelete, { CardHoverToDeleteProps } from '.';

export default {
  component: CardHoverToDelete,
  title: 'Containers/Dashboard/Favorites/CardHoverToDelete',
} as Meta;

const Template: Story<CardHoverToDeleteProps> = (args: CardHoverToDeleteProps) => (
  <CardHoverToDelete {...args} onClick={() => action('onClick')}>
    <ProfileCard
      profileType="project-developer"
      type="academic"
      impacts={['climate', 'water']}
      picture="https://placekitten.com/g/300/300"
      name="John Doe"
      description="Morbi varius semper ipsum, sed placerat lacus blandit non. Curabitur ac commodo orci. Sed laoreet feugiat libero, nec tincidunt tortor lacinia"
      link="#"
    />
  </CardHoverToDelete>
);

export const Default: Story<CardHoverToDeleteProps> = Template.bind({});
Default.args = {};
