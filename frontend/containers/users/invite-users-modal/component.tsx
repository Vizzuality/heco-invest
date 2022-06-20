import { FC, useCallback, useEffect } from 'react';

import { X as CloseIcon } from 'react-feather';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import Alert from 'components/alert';
import Button from 'components/button';
import ErrorMessage from 'components/forms/error-message';
import Input from 'components/forms/input';
import Label from 'components/forms/label';
import Icon from 'components/icon';
import Modal from 'components/modal';
import { UsersInvitationForm } from 'types/user';
import { InviteUsersDto } from 'types/user';

import { useInviteUsers } from 'services/users/userService';

import type { InviteUsersModalProps } from './types';

export const InviteUsersModal: FC<InviteUsersModalProps> = ({
  openInvitationModal,
  setOpenInvitationModal,
}: InviteUsersModalProps) => {
  const { formatMessage } = useIntl();
  const inviteUsers = useInviteUsers();

  const {
    clearErrors,
    formState,
    getValues,
    handleSubmit,
    register,
    resetField,
    setError,
    setValue,
    reset,
  } = useForm<UsersInvitationForm>({
    shouldFocusError: true,
    shouldUseNativeValidation: true,
    reValidateMode: 'onChange',
    defaultValues: { emails: [] },
  });

  useEffect(() => {
    reset();
    clearErrors();
  }, [clearErrors, reset, setOpenInvitationModal]);

  const handleSendInvite = useCallback(
    (data: InviteUsersDto) =>
      inviteUsers.mutate(data, {
        onError: (error) => {
          console.log('error', error);
        },
        onSuccess: () => {
          setOpenInvitationModal(false);
        },
      }),
    [inviteUsers, setOpenInvitationModal]
  );

  const onSubmit = (values) => {
    if (values.emails.length) {
      if (!('email' in formState.errors)) {
        handleSendInvite({ data: values.emails });
      } else {
        setError('email', { message: 'Please, enter valid emails.', type: 'manual' });
      }
    }
  };

  const handleKeyDown = useCallback(
    (e?, type?: 'submiting') => {
      const oldEmails = getValues('emails');
      const newEmail = getValues('email');
      if (type == 'submiting' || ['Enter', 'Tab'].includes(e.key)) {
        const isValid = /\S+@\S+\.\S+/.test(newEmail);
        if (isValid) {
          setValue('emails', oldEmails.concat(newEmail));
          resetField('email');
        } else {
          console.log('error');
          setError('email', { message: 'Please, enter a valid email.', type: 'manual' });
        }
      }
    },
    [getValues, resetField, setError, setValue]
  );

  const removeEmail = useCallback(
    (email) => {
      const oldEmails = getValues('emails');
      const restEmails = [...oldEmails];
      restEmails.splice(oldEmails.indexOf(email), 1);
      setValue('emails', restEmails);
      resetField('email');
    },
    [getValues, resetField, setValue]
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
      <form className="flex flex-col" noValidate>
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
              {getValues('emails')?.map((email, i) => (
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
              id="email"
              name="email"
              aria-describedby="email-error"
              register={register}
              placeholder={formatMessage(
                {
                  defaultMessage: '{placeholder}',
                  id: '8SayhS',
                },
                {
                  placeholder: getValues('emails')?.length > 0 ? '' : 'separate emails by enter',
                }
              )}
              className="px-1 py-0 mx-0 max-w-[240px] leading-8 h-7 text-gray-400 border-none focus:shadow-none hover:shadow-none"
              onKeyDown={handleKeyDown}
              contentEditable
            />
            <Input
              className="hidden border-none focus:shadow-none hover:shadow-none"
              name="emails"
              id="emails"
              type="text"
              aria-describedby="emails-error"
              register={register}
              registerOptions={{
                required: formatMessage({
                  defaultMessage: 'Please, enter valid email.',
                  id: 'oAIvoH',
                }),
                minLength: 1,
              }}
            />
          </div>
        </div>
        <div>
          <ErrorMessage
            id="email-error"
            errorText={formState.errors?.emails?.length && formState.errors?.emails[0]?.message}
          />
        </div>
        <div>
          <ErrorMessage id="email-error" errorText={formState.errors?.email?.message} />
        </div>

        {inviteUsers.isError && (
          <Alert className="my-4" withLayoutContainer>
            {Array.isArray(inviteUsers.error.message)
              ? inviteUsers.error.message[0].title
              : inviteUsers.error.message}
          </Alert>
        )}

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
            onClick={handleSubmit(onSubmit, console.log)}
            theme="primary-green"
            size="small"
            className="flex-shrink-0 mr-5"
          >
            <FormattedMessage defaultMessage="Send invite" id="oBB4L4" />
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default InviteUsersModal;
