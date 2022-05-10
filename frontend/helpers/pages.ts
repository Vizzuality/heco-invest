import { Path } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { AxiosError } from 'axios';

import { ErrorResponse } from 'services/types';

/** Uses the error messages received from the API and the input names of the form to get the fields and form pages with errors */
export function getServiceErrors<FormValues>(
  error: AxiosError<ErrorResponse>,
  inputs: Path<FormValues>[][]
) {
  const errors: string[] = Array.isArray(error.message)
    ? error.message.map(({ title }) => title)
    : [error.message];

  let errorPages: number[] = [];
  const fieldErrors: { fieldName: Path<FormValues>; message: string }[] = [];

  errors.forEach((errorMessage) => {
    inputs.forEach((fields, index) => {
      return fields.forEach((field) => {
        const transformedFieldName = field.replace('_', ' ');

        if (errorMessage.toLowerCase().includes(transformedFieldName)) {
          if (!errorPages.includes(index)) {
            errorPages.push(index);
          }
          fieldErrors.push({ fieldName: field, message: errorMessage });
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

/** Function to convert bytes in megabites */
export const bytesToMegabytes = (bytes: number): number => {
  return bytes / (1024 * 1024);
};

/** Constant to define the default max allowed file size to upload */
export const FILE_UPLOADER_MAX_SIZE = 5 * 1024 * 1024;
