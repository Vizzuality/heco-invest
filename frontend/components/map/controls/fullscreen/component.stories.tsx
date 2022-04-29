import { useRef, useState } from 'react';

import { Story } from '@storybook/react/types-6-0';

import FullscreenControl from './component';
import { FullscreenControlProps } from './types';

export default {
  title: 'Components/Map/Controls/Fullscreen',
  component: FullscreenControl,
};

const Template: Story<FullscreenControlProps> = (args) => {
  const ref = useRef(null);

  return (
    <>
      <div ref={ref} className="relative flex items-center justify-center h-40 bg-beige">
        Fullscreen content
        <FullscreenControl {...args} mapRef={ref} />
      </div>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  className: 'absolute top-2 right-2',
  onZoomChange: (zoom) => {
    console.info(zoom);
  },
};
