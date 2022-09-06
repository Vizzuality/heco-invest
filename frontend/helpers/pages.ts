import { useMemo } from 'react';

import { FormState, Path } from 'react-hook-form';
import { useIntl } from 'react-intl';

import omit from 'lodash-es/omit';
import pickBy from 'lodash-es/pickBy';

import { useRouter } from 'next/router';

import { AxiosError } from 'axios';

import { EnumTypes, Languages, LocationsTypes, Paths } from 'enums';
import languages from 'locales.config.json';
import { Enum } from 'types/enums';
import { Locations } from 'types/locations';
import { Project, ProjectForm, ProjectUpdatePayload } from 'types/project';
import { formPageInputs } from 'validations/project';

import { PagedRequest, ErrorResponse } from 'services/types';

export function cleanQueryParams(params) {
  let queryParams = { ...params };

  Object.keys(queryParams).forEach((key) => {
    const value = queryParams[key];

    if (
      value === null ||
      value === undefined ||
      (typeof value === 'string' && value === '') ||
      (typeof value === 'object' && !Object.keys(value).length) ||
      (key === 'page' && value === '1') ||
      (key === 'sorting' && value === 'created_at desc')
    ) {
      delete queryParams[key];
    }
  });

  return queryParams;
}

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
export const useQueryParams = () => {
  const { query } = useRouter();
  return cleanQueryParams(query);
};

/** Hook that returns the search queries on string format */
export const useQueryString = (params: PagedRequest = {}) => {
  const { query } = useRouter();
  const queries = Object.entries(query);
  if (queries.length) {
    const queryString = new URLSearchParams();
    queries.forEach(([key, value]) => {
      let queryValue = params[key] !== undefined ? params[key] : value;
      if (Array.isArray(queryValue)) {
        queryValue = queryValue.join(',');
      }
      if (Object.keys(cleanQueryParams({ [key]: queryValue })).length) {
        queryString.append(key, queryValue as string);
      }
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
    [LocationsTypes.PriorityLandscapes]: formatMessage({
      defaultMessage: 'Priority landscape',
      id: 'dwB95+',
    }),
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

/** Function to transform the project (get) to the upload payload */
export const getProjectValues = (project: Project): ProjectUpdatePayload => {
  const inputs = formPageInputs.flat();
  const projectForm = pickBy<ProjectForm>(project, (value, key: any) => inputs.includes(key));

  const projectDto = omit(
    projectForm,
    'involved_project_developer',
    'project_gallery',
    'slug',
    'project_images_attributes'
  );

  const projectUpload = {
    ...projectDto,
    id: project.id,
    municipality_id: project.municipality?.id,
    department_id: project.municipality?.parent?.id,
    country_id: project.country?.id,
    project_images_attributes: project.project_images?.map(({ cover, file, id }) => {
      const imageId = file.original.split('redirect/')[1].split('/')[0];
      return {
        file: imageId,
        cover,
        id,
        _destroy: false,
      };
    }),
    involved_project_developer_ids: project.involved_project_developers?.map(({ id }) => id),
    involved_project_developer_not_listed: project.involved_project_developer_not_listed,
    status: project.status,
  };

  return projectUpload as ProjectUpdatePayload;
};

export const PRIORITY_LANDSCAPES_CODES = [
  'priority-landscape-orinoquia',
  'priority-landscape-amazon-heart',
  'priority-landscape-amazonian-piedmont-massif',
  'priority-landscape-orinoquia-transition',
];
