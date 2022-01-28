import React from 'react';

import cx from 'classnames';

import { Story, Meta } from '@storybook/react/types-6-0';

import SearchIcon from 'svgs/search.svg';

import Button, { ButtonProps } from '.';

export default {
  component: Button,
  title: 'Components/Button',
  argTypes: {
    disabled: { control: 'boolean' },
  },
} as Meta;

const Template: Story<ButtonProps> = ({ theme, ...rest }: ButtonProps) => (
  <div
    className={cx({
      'p-4': true,
      'bg-background-light': theme !== 'primary-white' && theme !== 'secondary-white',
      'bg-green-dark': theme === 'primary-white' || theme === 'secondary-white',
    })}
  >
    <Button className="inline-block" theme={theme} {...rest} />
  </div>
);

export const Default: Story<ButtonProps> = Template.bind({});
Default.args = {
  theme: 'primary-green',
  size: 'base',
  children: 'Search',
};

export const Link: Story<ButtonProps> = Template.bind({});
Link.args = {
  theme: 'primary-green',
  size: 'base',
  to: 'explore',
  children: 'Learn more',
};

export const ExternalLink: Story<ButtonProps> = Template.bind({});
ExternalLink.storyName = 'External link';
ExternalLink.args = {
  theme: 'primary-green',
  size: 'base',
  to: 'https://www.vizzuality.com/',
  external: true,
  children: 'About Vizzuality',
};

export const WithIcon: Story<ButtonProps> = Template.bind({});
WithIcon.storyName = 'With icon';
WithIcon.args = {
  theme: 'primary-green',
  size: 'base',
  children: 'Search',
  icon: SearchIcon,
};
