import { FC, useCallback, useEffect, useState } from 'react';

import { X as CloseIcon } from 'react-feather';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import Button from 'components/button';
import Input from 'components/forms/input';
import Label from 'components/forms/label';
import Icon from 'components/icon';
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
    resetField,
    formState: { errors },
    getValues,
  } = useForm<UsersInvitationForm>({
    shouldFocusError: true,
    shouldUseNativeValidation: true,
  });

  const handleKeyDown = useCallback(
    (e) => {
      if (['Enter', 'Tab', ','].includes(e.key)) {
        const emails = getValues('emails').split(',');

        resetField('emails');
        setEmailChips(emails);
      }
    },
    [getValues, resetField]
  );

  const removeEmail = useCallback(
    (email) => {
      const restEmails = [...emailChips];
      restEmails.splice(emailChips.indexOf(email), 1);
      setEmailChips(restEmails);
    },
    [emailChips]
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
      <div className="p-2 focus-within:border-green-dark min-h-[95px] border border-beige rounded-lg">
        <div className="flex space-x-1">
          <div className="flex space-x-2">
            {emailChips?.map((email, i) => (
              <div className="flex px-4 py-1 bg-beige rounded-2xl" key={i}>
                <p className="text-sm text-green-dark">{email}</p>
                <button type="button" onClick={() => removeEmail(email)}>
                  <Icon icon={CloseIcon} className={cx('w-4 ml-3 text-green-dark')} />
                </button>
              </div>
            ))}
          </div>
          <Input
            type="text"
            id="emails-users-invitation"
            name="emails"
            aria-describedby="emails-users-invitation-error"
            register={register}
            placeholder={formatMessage(
              {
                defaultMessage: '{placeholder}',
                id: '8SayhS',
              },
              {
                placeholder: emailChips?.length > 0 ? '' : 'separate emails by comma',
              }
            )}
            className="px-0 py-0 mx-0 leading-3 text-gray-400 border-none focus:shadow-none hover:shadow-none"
            onKeyDown={handleKeyDown}
            contentEditable
          />
        </div>
      </div>

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
