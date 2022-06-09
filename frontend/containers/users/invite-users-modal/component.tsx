import { FC, useCallback, useState } from 'react';

import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import Button from 'components/button';
import Label from 'components/forms/label';
import Textarea from 'components/forms/textarea';
import Modal from 'components/modal';
import { UsersInvitationForm } from 'types/user';

import type { InviteUsersModalProps } from './types';

export const InviteUsersModal: FC<InviteUsersModalProps> = ({
  openInvitationModal,
  setOpenInvitationModal,
}: InviteUsersModalProps) => {
  const { formatMessage } = useIntl();
  const [emailChips, setEmailChips] = useState(null);
  console.log('emails', emailChips);

  const {
    register,
    formState: { errors },
    getValues,
  } = useForm<UsersInvitationForm>({
    shouldFocusError: true,
    shouldUseNativeValidation: true,
  });

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === ',') {
        const emails = getValues('emails').split(',');
        setEmailChips(emails);
      }
    },
    [getValues]
  );

  return (
    <Modal
      onDismiss={() => setOpenInvitationModal(false)}
      title={formatMessage({ defaultMessage: 'Invite users', id: 'R+1DVQ' })}
      open={openInvitationModal}
      dismissable={true}
      size="default"
      scrollable={false}
    >
      <p className="mb-2 font-serif text-3xl text-green-dark">
        <FormattedMessage defaultMessage="Invite users" id="R+1DVQ" />
      </p>

      <p className="mb-4">
        <FormattedMessage
          defaultMessage="Users will receive an email to sign up into the platform and join NEEsT’s account."
          id="hbFTZN"
        />
      </p>

      <Label htmlFor="emails-users-invitation" className="mb-2 font-sans text-base text-gray-800">
        <FormattedMessage defaultMessage="Emails" id="AdAi3x" />
      </Label>
      <Textarea
        id="emails-users-invitation"
        name="emails"
        aria-describedby="emails-users-invitation-error"
        register={register}
        placeholder={formatMessage({
          defaultMessage: 'separate emails by comma',
          id: 'UQMsiR',
        })}
        className={cx({
          'min-h-[95px] text-gray-400': true,
          // 'border border-red-500': ,
        })}
        onKeyDown={handleKeyDown}
      />
      <div className="flex justify-end mt-8">
        <Button
          theme="secondary-green"
          size="small"
          className="flex-shrink-0 mr-5"
          onClick={() => setOpenInvitationModal(false)}
        >
          <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
        </Button>
        <Button
          theme="primary-green"
          size="small"
          className="flex-shrink-0 mr-5"
          onClick={() => console.log('Invite')}
        >
          <FormattedMessage defaultMessage="Send invite" id="oBB4L4" />
        </Button>
      </div>
    </Modal>
  );
};

export default InviteUsersModal;
