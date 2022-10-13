import { FC, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import useMe from 'hooks/me';

import Label from 'components/forms/label';
import Switch from 'components/forms/switch';

import { useUpdateUser } from 'services/users/userService';

import { Settings2FAProps } from './types';

const Settings2FA: FC<Settings2FAProps> = () => {
  const { user, isLoading } = useMe();
  const { register, setValue, handleSubmit } = useForm<{ otp_required_for_login: boolean }>();
  const updateUser = useUpdateUser();

  useEffect(() => {
    if (!!user) {
      setValue('otp_required_for_login', user.otp_required_for_login);
    }
  }, [setValue, user]);

  const onSubmit = ({ otp_required_for_login }: { otp_required_for_login: boolean }) => {
    updateUser.mutate({ otp_required_for_login });
  };

  return (
    <div className="p-6 bg-white rounded-lg">
      <div>
        <h2 className="mb-2 text-xl font-semibold">
          <FormattedMessage defaultMessage="Two factor authentication" id="Z2ADwQ" />
        </h2>
        <p className="text-gray-600">
          <FormattedMessage
            defaultMessage="Keep your account extra secure with a second login step."
            id="YM37l9"
          />
        </p>
      </div>
      <form noValidate>
        <div className="mt-6.5 flex items-center gap-x-2">
          <Switch
            id="otp-required-for-login"
            name="otp_required_for_login"
            register={register}
            registerOptions={{
              onChange: () => {
                handleSubmit(onSubmit)();
              },
            }}
            disabled={isLoading || updateUser.isLoading}
          />
          <Label htmlFor="otp-required-for-login">
            <FormattedMessage defaultMessage="Enable two factor authentication" id="yirvdu" />
          </Label>
        </div>
      </form>
    </div>
  );
};

export default Settings2FA;
