import { Story, Meta } from '@storybook/react/types-6-0';

import TagsGrid, { TagsGridProps } from '.';

export default {
  component: TagsGrid,
  title: 'Containers/TagsGrid',
  argTypes: {},
} as Meta;

const Template: Story<TagsGridProps> = ({ ...rest }: TagsGridProps) => <TagsGrid {...rest} />;

export const Default: Story<TagsGridProps> = Template.bind({});
Default.args = {
  rows: [
    {
      title: 'Invests in',
      type: 'category',
      tags: [
        { id: 'tourism-and-recreation', title: 'Tourism & Recreation' },
        { id: 'non-timber-forest-production', title: 'Non-timber forest production' },
        { id: 'sustainable-agrosystems', title: 'Sustainable agrosystems' },
        { id: 'forestry-and-agroforestry', title: 'Forestry & agroforestry' },
      ],
    },
    {
      title: 'Ticket size',
      tags: ['US$50k', '$50k - $500k', '$500k - $1M'],
    },
    {
      title: 'Instrument size',
      tags: ['Grand', 'Loan'],
    },
    {
      title: 'Impact they invest on',
      tags: ['Biodiversity', 'Community'],
    },
  ],
};
