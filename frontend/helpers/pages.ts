import { useMemo } from 'react';

import { FormState, Path } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import { AxiosError } from 'axios';

import { EnumTypes, Languages } from 'enums';
import languages from 'locales.config.json';

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

export const useGetAlert = (error?: AxiosError<ErrorResponse>) => {
  const { formatMessage } = useIntl();
  return useMemo(() => {
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
  }, [error, formatMessage]);
};

/** Function to convert bytes in megabites */
export const bytesToMegabytes = (bytes: number): number => {
  return bytes / (1024 * 1024);
};

/** Constant to define the default max allowed file size to upload */
export const FILE_UPLOADER_MAX_SIZE = 5 * 1024 * 1024;

/** Hook to get the query params of the discover pages */
export const useQueryParams = (sortingState?: { sortBy: string; sortOrder: string }) => {
  const { query } = useRouter();
  return useMemo(() => {
    const { page, search, sorting, ...filters } = query;
    return {
      page: parseInt(query.page as string) || 1,
      search: (query.search as string) || '',
      sorting:
        // No need to decode URI component, next/router does it automatically
        sorting
          ? (sorting as string)
          : sortingState?.sortBy
          ? `${sortingState?.sortBy} ${sortingState?.sortOrder}`
          : '',
      ...filters,
    };
  }, [query, sortingState]);
};

/** Hook that returns the search queries on string format */
export const useQueryString = () => {
  const { query } = useRouter();
  const queries = Object.entries(query);
  if (queries.length) {
    const queryString = new URLSearchParams();
    queries.forEach(([key, value]) => {
      let queryValue = value;
      if (Array.isArray(value)) {
        queryValue = value.join(',');
      }
      queryString.append(key, queryValue as string);
    });
    return `?${queryString}`;
  }
  return '';
};

export const getSocialMediaLinksRegex = () => {
  const getRegex = (media: string) => new RegExp(`^https?:\/\/(www.)?${media}.com\/.*$`);
  return {
    twitter: getRegex('twitter'),
    facebook: getRegex('facebook'),
    linkedin: getRegex('linkedin'),
    instagram: getRegex('instagram'),
  };
};

export const getPageErrors = (formPageInputs: string[], errors: FormState<any>['errors']) => {
  return formPageInputs.some((input) => errors.hasOwnProperty(input));
};

export const useFilterNames = () => {
  const { formatMessage } = useIntl();
  return {
    [EnumTypes.Category]: formatMessage({ defaultMessage: 'Category', id: 'ccXLVi' }),
    [EnumTypes.Impact]: formatMessage({ defaultMessage: 'Impact', id: 'W2JBdp' }),
    [EnumTypes.TicketSize]: formatMessage({ defaultMessage: 'Ticket size', id: 'lfx6Nc' }),
    [EnumTypes.InstrumentType]: formatMessage({ defaultMessage: 'Instrument', id: 'wduJme' }),
    [EnumTypes.Sdg]: formatMessage({ defaultMessage: 'SDGs', id: 'JQjEP9' }),
  };
};

/** Hook to use an object with the locales as keys and the correspondent translated languages as values */
export const useLanguageNames = () => {
  const { formatMessage } = useIntl();
  let langs: Partial<{ [key in Languages]: string }> = {};

  languages.locales.map(({ locale }) => {
    switch (locale) {
      case 'en':
        langs.en = formatMessage({ defaultMessage: 'English', id: 'WkrNSk' });
      case 'es':
        langs.es = formatMessage({ defaultMessage: 'Espanish', id: '5kWT1/' });
      case 'pt':
        langs.pt = formatMessage({ defaultMessage: 'Portuguese', id: 'A4UTjl' });
    }
  });
  return langs;
};
