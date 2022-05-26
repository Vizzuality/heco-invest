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

export const SingleContact: Story<ContactInformationModalProps> = Template.bind({});

SingleContact.args = {
  contacts: {
    name: 'User name',
    email: 'user@example.com',
    phone: '+351919238420',
    picture: 'https://placekitten.com/408/300',
  },
};

export const MultipleContacts: Story<ContactInformationModalProps> = Template.bind({});

MultipleContacts.args = {
  contacts: [
    {
      name: 'First contact name',
      email: 'first@example.com',
      phone: '+351919238420',
      picture: 'https://placekitten.com/408/287',
    },
    {
      name: 'Second contact name',
      email: 'second@example.com',
      phone: '+351324234234234',
      picture: 'https://placekitten.com/408/230',
    },
  ],
};

export const PlaceholderPicture: Story<ContactInformationModalProps> = Template.bind({});

PlaceholderPicture.args = {
  contacts: {
    name: 'User name',
    email: 'user@example.com',
    phone: '+351919238420',
  },
};
