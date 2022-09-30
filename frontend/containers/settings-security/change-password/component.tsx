import { FC } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import Alert from 'components/alert';
import Button from 'components/button';
import ErrorMessage from 'components/forms/error-message';
import Input from 'components/forms/input';
import Label from 'components/forms/label';
import Loading from 'components/loading';
import { ChangePassword } from 'types/user';
import { useChangePasswordResolver } from 'validations/change-password';

import { useChangePassword } from 'services/users/userService';

import { SettingsChangePasswordProps } from './types';

const SettingsChangePassword: FC<SettingsChangePasswordProps> = () => {
  const { formatMessage } = useIntl();
  const resolver = useChangePasswordResolver();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePassword>({
    resolver,
    shouldUseNativeValidation: true,
  });

  const changePassword = useChangePassword();

  const onSubmit: SubmitHandler<ChangePassword> = (data) => {
    changePassword.mutate(data, {
      onSuccess: () => reset(),
      onError: () => reset(),
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg">
      <div>
        <h2 className="mb-6 text-xl font-semibold">
          <FormattedMessage defaultMessage="Change password" id="L4nXIc" />
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-4.5">
          <Label htmlFor="current-password">
            <FormattedMessage defaultMessage="Current password" id="NIynnB" />
          </Label>
          <Input
            type="password"
            id="current-password"
            name="current_password"
            register={register}
            className="mt-2.5 mb-2"
            placeholder={formatMessage({
              defaultMessage: 'insert current password',
              id: 'F76hVG',
            })}
            aria-describedby="current-password-error"
          />
          <ErrorMessage id="current-password-error" errorText={errors?.current_password?.message} />
        </div>
        <div className="mb-4.5">
          <Label htmlFor="password">
            <FormattedMessage defaultMessage="New password" id="fTHhSB" />
          </Label>
          <Input
            type="password"
            id="password"
            name="password"
            register={register}
            className="mt-2.5 mb-2.5"
            placeholder={formatMessage({
              defaultMessage: 'insert new password',
              id: '0z5mo1',
            })}
            aria-describedby="password-error"
          />
          <ErrorMessage id="password-error" errorText={errors?.password?.message} />
        </div>
        <div className="mb-12">
          <Label htmlFor="confirm-password">
            <FormattedMessage defaultMessage="Confirm password" id="8HimVK" />
          </Label>
          <Input
            type="password"
            id="confirm-password"
            name="password_confirmation"
            register={register}
            className="mt-2.5 mb-2.5"
            placeholder={formatMessage({
              defaultMessage: 'confirm password',
              id: 'GhrkT+',
            })}
            aria-describedby="confirm-password-error"
          />
          <ErrorMessage
            id="confirm-password-error"
            errorText={errors?.password_confirmation?.message}
          />
        </div>
        {changePassword.error && (
          <Alert type="warning" withLayoutContainer>
            {changePassword.error?.message?.[0]?.title}
          </Alert>
        )}
        {changePassword.isSuccess && (
          <Alert type="success" withLayoutContainer>
            <FormattedMessage defaultMessage="Password changed successfully" id="odrmaG" />
          </Alert>
        )}
        <div className="flex justify-end mt-6">
          <Button type="submit" disabled={changePassword.isLoading}>
            <Loading visible={changePassword.isLoading} className="mr-4" />
            <FormattedMessage defaultMessage="Update password" id="KkT/Fh" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingsChangePassword;
