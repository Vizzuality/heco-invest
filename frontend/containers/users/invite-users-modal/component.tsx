import { FC, useCallback, useEffect } from 'react';

import { X as CloseIcon } from 'react-feather';
import { FieldError, SubmitErrorHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import { isArray } from 'lodash-es';

import Alert from 'components/alert';
import Button from 'components/button';
import ErrorMessage from 'components/forms/error-message';
import Input from 'components/forms/input';
import Label from 'components/forms/label';
import Icon from 'components/icon';
import Modal from 'components/modal';
import { InviteUsersDto, UsersInvitationForm } from 'types/invitation';

import { useAccount } from 'services/account';
import { useInviteUsers } from 'services/invitation/invitationService';

import type { InviteUsersModalProps } from './types';

export const InviteUsersModal: FC<InviteUsersModalProps> = ({
  openInvitationModal,
  setOpenInvitationModal,
}: InviteUsersModalProps) => {
  const { formatMessage } = useIntl();
  const inviteUsers = useInviteUsers();
  const { userAccount } = useAccount('owner');
  const { name } = userAccount || {};

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

  const getInviteUsersErrorMessage = (errorCode: number, email: string) => {
    switch (errorCode) {
      case 409:
        return formatMessage(
          {
            defaultMessage: 'User with email {email} already has an account in HeCo.',
            id: 'sK7G1d',
          },
          {
            email,
          }
        );
      case 422:
        return formatMessage(
          { defaultMessage: 'Email {email} is invalid.', id: 'jG0v72' },
          {
            email,
          }
        );
      default:
        return formatMessage(
          {
            defaultMessage:
              'Something went wrong while sending an invitation to the email {email}.',
            id: '9dtx+L',
          },
          {
            email,
          }
        );
    }
  };

  const resetForm = useCallback(() => {
    reset({ email: '', emails: [] });
    clearErrors();
    setOpenInvitationModal(false);
  }, [clearErrors, reset, setOpenInvitationModal]);

  const handleSendInvite = useCallback(
    (data: InviteUsersDto) =>
      inviteUsers.mutate(
        { emails: data.emails },
        {
          onSuccess: (emails) => {
            Object.entries(emails).forEach(([email, code], index) => {
              if (code !== 200) {
                setError(`emails.${index}`, {
                  type: code,
                  message: getInviteUsersErrorMessage(code, email),
                });
              } else {
                const emailsValue = getValues('emails')?.filter((value) => value !== email);
                setValue('emails', emailsValue);
              }
            });
            if (!getValues('emails')?.length) {
              resetForm();
            }
          },
        }
      ),
    [getValues, inviteUsers, resetForm, setError, setValue]
  );

  const onSubmit = (values: UsersInvitationForm) => {
    if (values.emails.length) {
      if (!('email' in formState.errors)) {
        handleSendInvite({ emails: values.emails });
      } else {
        setError('email', { message: 'Please, enter valid emails.', type: 'manual' });
      }
    }
  };

  const onError: SubmitErrorHandler<UsersInvitationForm> = (errors) => {
    if ((errors.emails as unknown as FieldError)?.type === 'required') {
      validateAndSetEmailsValue(undefined, 'submiting');
      handleSubmit(onSubmit)();
    }
  };

  const validateAndSetEmailsValue = useCallback(
    (e?, type?: 'submiting') => {
      const oldEmails = getValues('emails');
      const newEmail = getValues('email').trim();
      if (type == 'submiting' || ['Enter', 'Tab'].includes(e.key)) {
        const isValid = /\S+@\S+\.\S+/.test(newEmail);
        if (isValid) {
          setValue('emails', oldEmails.concat(newEmail));
          resetField('email');
        } else {
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
      onDismiss={resetForm}
      title={formatMessage({ defaultMessage: 'Invite users', id: 'R+1DVQ' })}
      open={openInvitationModal}
      dismissable={false}
      size="narrow"
      scrollable={false}
    >
      <form className="flex flex-col" noValidate autoComplete="off">
        <p className="mb-2 font-serif text-3xl text-green-dark">
          <FormattedMessage defaultMessage="Invite users" id="R+1DVQ" />
        </p>

        <p className="mb-4">
          <FormattedMessage
            defaultMessage="Users will receive an email to sign up into the platform and join <strong>{name}</strong> account."
            id="k5DITM"
            values={{
              name: name,
              _strong: (chunk: string) => <strong>{chunk}</strong>,
              get strong() {
                return this._strong;
              },
              set strong(value) {
                this._strong = value;
              },
            }}
          />
        </p>

        <Label htmlFor="emails-users-invitation" className="mb-2 font-sans text-base text-gray-800">
          <FormattedMessage defaultMessage="Emails" id="AdAi3x" />
        </Label>
        <div className="inline-block p-2 focus-within:border-green-dark min-h-[95px] border border-beige rounded-lg">
          <div className="flex flex-wrap space-x-1">
            <div className="flex flex-wrap">
              {getValues('emails')?.map((email, i) => (
                <div
                  className="flex px-4 pt-1 mb-1 mr-1 border cursor-pointer bg-background-dark border-beige rounded-2xl hover:bg-opacity-25 hover:bg-green-light"
                  key={i}
                >
                  <p className="text-sm text-green-dark">{email}</p>
                  <button type="button" onClick={() => removeEmail(email)}>
                    <Icon icon={CloseIcon} className={cx('w-4 ml-3 pb-[3px] text-green-dark')} />
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
              className="w-full px-1 py-0 mx-0 leading-8 text-gray-400 border-none h-7 focus:shadow-none hover:shadow-none"
              onKeyDown={validateAndSetEmailsValue}
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
          {formState.errors?.emails &&
            (isArray(formState.errors?.emails) ? (
              <div id="emails-error">
                {formState.errors?.emails.map(({ message }, index) => (
                  <ErrorMessage key={message} id={`emails-error-${index}`} errorText={message} />
                ))}
              </div>
            ) : (
              (formState.errors?.emails as unknown as FieldError)?.message && (
                <ErrorMessage
                  id="emails-error"
                  errorText={(formState.errors?.emails as unknown as FieldError)?.message}
                />
              )
            ))}
        </div>
        <div>
          <ErrorMessage id="email-error" errorText={formState.errors?.email?.message} />
        </div>

        {inviteUsers.isError && (
          <Alert type="warning" className="my-4" withLayoutContainer>
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
            onClick={resetForm}
          >
            <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
          </Button>
          <Button
            onClick={handleSubmit(onSubmit, onError)}
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
