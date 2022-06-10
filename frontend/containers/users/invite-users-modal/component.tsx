import { FC, useCallback, useEffect, useState } from 'react';

import { X as CloseIcon } from 'react-feather';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import Button from 'components/button';
import ErrorMessage from 'components/forms/error-message';
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
  const [emailChips, setEmailChips] = useState([]);

  const {
    clearErrors,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    resetField,
    setError,
  } = useForm<UsersInvitationForm>({
    shouldFocusError: true,
    shouldUseNativeValidation: true,
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    setEmailChips([]);
  }, [setOpenInvitationModal]);

  const onSubmit = () => console.log({ data: emailChips });

  const handleKeyDown = useCallback(
    (e) => {
      const newEmail = getValues('email');
      if (['Enter', 'Tab', ','].includes(e.key)) {
        clearErrors('email');
        const isValid = /\S+@\S+\.\S+/.test(newEmail);
        if (isValid) {
          resetField('email');
          setEmailChips(emailChips.concat(newEmail));
        } else {
          setError('email', { message: 'Please, enter a valid email.', type: 'manual' });
        }
      }
    },
    [clearErrors, emailChips, getValues, resetField, setError]
  );

  const removeEmail = useCallback(
    (email) => {
      const restEmails = [...emailChips];
      restEmails.splice(emailChips.indexOf(email), 1);
      setEmailChips(restEmails);
      resetField('email');
    },
    [emailChips, resetField]
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
      <form className="flex flex-col" noValidate onSubmit={handleSubmit(onSubmit)}>
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
        <div className="inline-block p-2 focus-within:border-green-dark min-h-[95px] border border-beige rounded-lg">
          <div className="flex flex-wrap space-x-1">
            <div className="flex flex-wrap">
              {emailChips?.map((email, i) => (
                <div className="flex px-4 py-1 mb-1 mr-1 bg-beige rounded-2xl" key={i}>
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
              name="email"
              aria-describedby="emails-error"
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
              className="px-1 py-0 mx-0 max-w-[240px] leading-8 h-7 text-gray-400 border-none focus:shadow-none hover:shadow-none"
              onKeyDown={handleKeyDown}
              contentEditable
            />
          </div>
        </div>

        <div>
          <ErrorMessage id="emails-error" errorText={errors?.email?.message} />
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
          <Button type="submit" theme="primary-green" size="small" className="flex-shrink-0 mr-5">
            <FormattedMessage defaultMessage="Send invite" id="oBB4L4" />
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default InviteUsersModal;
