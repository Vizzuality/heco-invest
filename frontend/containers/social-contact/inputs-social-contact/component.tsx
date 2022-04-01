import React from 'react';

import { FieldValues, Path } from 'react-hook-form';
import { useIntl } from 'react-intl';

import Input from '../../../components/forms/input';
import Label from '../../../components/forms/label';
import { SOCIAL_DATA } from '../constants';

import { InputSocialContactProps } from './types';

const InputsSocialContact = <FormValues extends FieldValues>({
  register,
  registerOptions,
}: InputSocialContactProps<FormValues>) => {
  const { formatMessage } = useIntl();

  return (
    <div className="w-full md:grid md:grid-cols-2 md:gap-x-6">
      <div key="website">
        <Label htmlFor="wibsite">
          {formatMessage({ defaultMessage: 'Website', id: 'JkLHGw' })}{' '}
          {!registerOptions?.required &&
            `(${formatMessage({ defaultMessage: 'optional', id: 'V4KNjk' })})`}
          <Input
            className="mt-2.5 mb-4.5"
            name={'website' as Path<FormValues> & string}
            id="website"
            type="text"
            register={register}
            registerOptions={registerOptions}
            placeholder={formatMessage({
              defaultMessage: 'insert URL',
              id: 'et2m37',
            })}
          />
        </Label>
      </div>
      {SOCIAL_DATA.map(({ id, title }) => (
        <div key={id}>
          <Label htmlFor={id}>
            {title}{' '}
            {!registerOptions?.required &&
              `(${formatMessage({ defaultMessage: 'optional', id: 'V4KNjk' })})`}
            <Input
              className="mt-2.5 mb-4.5"
              name={id as Path<FormValues> & string}
              id={id}
              type="text"
              register={register}
              registerOptions={registerOptions}
              placeholder={formatMessage({
                defaultMessage: 'insert URL',
                id: 'et2m37',
              })}
            />
          </Label>
        </div>
      ))}
    </div>
  );
};

export default InputsSocialContact;
