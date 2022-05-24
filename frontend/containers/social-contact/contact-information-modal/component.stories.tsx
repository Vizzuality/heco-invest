import { useState } from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';

import Button from 'components/button';

import ContactInformationModal, { ContactInformationModalProps } from '.';

export default {
  component: ContactInformationModal,
  title: 'Containers/ContactInformationModal',
  argTypes: {},
} as Meta;

const Template: Story<ContactInformationModalProps> = (args: ContactInformationModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Contact</Button>
      <ContactInformationModal {...args} isOpen={open} onDismiss={() => setOpen(false)} />
    </div>
  );
};

export const Default: Story<ContactInformationModalProps> = Template.bind({});

Default.args = {
  contacts: {
    name: 'User name',
    email: 'user@example.com',
    phone: '+351919238420',
  },
};
