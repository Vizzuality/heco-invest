import { useMemo } from 'react';

import { FormState, Path } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import { AxiosError } from 'axios';

import { EnumTypes, Languages, Paths } from 'enums';
import languages from 'locales.config.json';
import { Enum } from 'types/enums';
import { Project } from 'types/project';

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

/** Hook to use the discover path.
 * If the current route is one of the discover subpaths, returnd itself.
 * If it's on other page, return the discover path.
 */
export const useDiscoverPath = () => {
  const { pathname } = useRouter();
  return pathname.includes(Paths.Discover) ? pathname : Paths.Discover;
};

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

/** Hook that returns the query returnPath, if any */
export const useQueryReturnPath = () => {
  const { query } = useRouter();
  return typeof query?.returnPath === 'string'
    ? decodeURIComponent(query.returnPath as string)
    : undefined;
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
        langs.es = formatMessage({ defaultMessage: 'Spanish', id: '8WtyrD' });
      case 'pt':
        langs.pt = formatMessage({ defaultMessage: 'Portuguese', id: 'A4UTjl' });
    }
  });
  return langs;
};

/**  Function to get the mosaics list with the number of related projects, using a mockup relation between mosaic ids and their corresponding location ids */
export const getMosaicsWithProjectsNumber = (mosaicEnums: Enum[], projects: Project[]) => {
  const mosaicLocations = {
    'amazon-heart': '6f827753-3c27-4343-bc39-0c81a1875488',
    'amazonian-piedmont-massif': '35490999-6962-4825-8ca4-1862c1a5e45d',
    'orinoquia-transition': '135e49c7-0d29-455f-8700-33c573772b41',
    orinoquia: 'b8eba9d3-1618-401c-b85c-c287941f6fe9',
  };

  return mosaicEnums.map((mosaic) => {
    const projectsQuantity =
      projects.filter((project) => project.priority_landscape?.id === mosaicLocations[mosaic.id])
        ?.length || 0;
    return { ...mosaic, projectsQuantity };
  });
};
