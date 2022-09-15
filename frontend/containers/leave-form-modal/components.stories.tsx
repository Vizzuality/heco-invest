import { useState } from 'react';

import { ArrowLeft } from 'react-feather';

import { Story, Meta } from '@storybook/react/types-6-0';

import Button from 'components/button';

import LeaveFormModal, { LeaveFormModalProps } from '.';

export default {
  component: LeaveFormModal,
  title: 'Containers/LeaveFormModal',
  argTypes: {},
} as Meta;

const Template: Story<LeaveFormModalProps> = (props: LeaveFormModalProps) => {
  const [open, setOpen] = useState(false);
  const [leave, setLeave] = useState(false);

  return (
    <div>
      {!leave && (
        <div>
          <p>Form</p>
          <Button onClick={() => setOpen(true)}>Leave Form</Button>
          <LeaveFormModal
            isOpen={open}
            close={() => setOpen(false)}
            handleLeave={() => {
              setLeave(true);
              setOpen(false);
            }}
            {...props}
          />
        </div>
      )}
      {leave && (
        <div>
          <Button theme="secondary-green" icon={ArrowLeft} onClick={() => setLeave(false)}>
            Back to Form
          </Button>
          <p>Leaving the form...</p>
        </div>
      )}
    </div>
  );
};

export const Default: Story<LeaveFormModalProps> = Template.bind({});
