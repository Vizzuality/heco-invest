import React from 'react';

import { FormattedMessage } from 'react-intl';

import Link from 'next/link';

import Button from 'components/button';
import Modal from 'components/modal';
import { Paths } from 'enums';

import { LeaveFormModalProps } from './types';

export const LeaveFormModal = ({
  title,
  isOpen,
  close,
  handleLeave,
  showSignupLink,
}: LeaveFormModalProps) => {
  return (
    <Modal open={isOpen} title={title} onDismiss={close}>
      <div className="text-center">
        <h1 className="mb-8 font-serif text-3xl font-semibold">
          <FormattedMessage defaultMessage="Do you want to leave?" id="lfvUqs" />
        </h1>
        <p>
          <FormattedMessage
            defaultMessage="By leaving you will lose your current progress"
            id="oYPIc/"
          />
        </p>
        <div className="flex justify-center gap-6 mt-12">
          <Button theme="secondary-green" onClick={close}>
            <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
          </Button>
          <Button onClick={handleLeave}>
            <FormattedMessage defaultMessage="Leave" id="fnihsY" />
          </Button>
        </div>
        {showSignupLink && (
          <div className="mt-6">
            <Link href={Paths.SignUp} passHref>
              <a className="underline text-green-dark">
                <FormattedMessage defaultMessage="Already a member? Log in" id="Wo0Pmr" />
              </a>
            </Link>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default LeaveFormModal;
