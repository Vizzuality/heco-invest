import { Path } from 'react-hook-form';

import { AxiosError } from 'axios';

import { ErrorResponse } from 'services/types';
import { useIntl } from 'react-intl';

export function getServiceErrors<FormValues>(
  error: AxiosError<ErrorResponse>,
  inputs: Path<FormValues>[][]
) {
  const errors: string[] = Array.isArray(error.message)
    ? error.message.map(({ title }) => title)
    : [error.message];

  let errorPages: number[] = [];
  const fieldErrors: Path<FormValues>[] = [];

  errors.forEach((errorMessage) => {
    inputs.forEach((fields, index) => {
      return fields.forEach((field) => {
        const transformedFieldName = field.replace('_', ' ');

        if (errorMessage.toLowerCase().includes(transformedFieldName)) {
          if (!errorPages.includes(index)) {
            errorPages.push(index);
          }
          fieldErrors.push(field);
        }
      });
    });
  });
  return { fieldErrors, errorPages };
}

export function useGetAlert(error?: AxiosError<ErrorResponse>): string[] {
  const { formatMessage } = useIntl();
  if (error) {
    return Array.isArray(error?.message)
      ? error.message.map(({ title }: { title: string }) => title)
      : [
          formatMessage({
            defaultMessage:
              'Something went wrong while submitting your form. Please correct the errors before submitting again.',
            id: 'WTuVeL',
          }),
        ];
  }
}
