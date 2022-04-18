import React from 'react';

import { FieldValues, Path } from 'react-hook-form';
import { useIntl } from 'react-intl';

import ErrorMessage from 'components/forms/error-message';

import Input from '../../../components/forms/input';
import Label from '../../../components/forms/label';
import { SOCIAL_DATA } from '../constants';

import { InputSocialContactProps } from './types';

export const InputsSocialContact = <FormValues extends FieldValues>({
  register,
  registerOptions,
  errors,
}: InputSocialContactProps<FormValues>) => {
  const { formatMessage } = useIntl();

  return (
    <div className="w-full md:grid md:grid-cols-2 md:gap-x-6">
      {[{ id: 'website', title: 'Website' }, ...SOCIAL_DATA].map(({ id, title }, index) => (
        <div key={id} className={index === 0 ? 'md:col-span-2' : ''}>
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
          {errors && errors[id] && (
            <ErrorMessage id={`${id}-error`} errorText={errors[id].message} />
          )}
        </div>
      ))}
    </div>
  );
};

export default InputsSocialContact;
