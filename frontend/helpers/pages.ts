import { useMemo } from 'react';

import { FormState, Path } from 'react-hook-form';
import { useIntl } from 'react-intl';

import omit from 'lodash-es/omit';
import pickBy from 'lodash-es/pickBy';

import { useRouter } from 'next/router';

import { AxiosError } from 'axios';

import { FilterForm, FilterParams } from 'containers/forms/filters/types';

import { EnumTypes, Languages, LocationsTypes, Paths } from 'enums';
import languages from 'locales.config.json';
import { Project, ProjectForm, ProjectUpdatePayload } from 'types/project';
import { formPageInputs } from 'validations/project';

import { ErrorResponse } from 'services/types';
import { useEnums } from 'services/enums/enumService';
import { usePriorityLandscapes } from 'services/locations/locations';
import { Enum } from 'types/enums';

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

export const useFiltersEnums = () => {
  const { data, isLoading } = useEnums();

  const { priorityLandscapes } = usePriorityLandscapes();

  const filtersData: Enum[] = useMemo(() => {
    if (isLoading) {
      return [];
    }
    const { category, ticket_size, instrument_type, impact, sdg } = data;
    return [
      category,
      ticket_size,
      instrument_type,
      impact,
      sdg,
      priorityLandscapes?.map(({ id, name }) => ({
        id,
        // A bit hacky but the priority landscapes are not enums. It was assumed that filters
        // would only be based on enums.
        type: LocationsTypes.PriorityLandscapes as unknown as EnumTypes,
        name,
      })) ?? [],
    ].flat();
  }, [data, isLoading, priorityLandscapes]);

  return filtersData;
};

/** Hook to change the page's query */
export const useSearch = () => {
  const { push } = useRouter();
  const pathname = useDiscoverPath();
  const { page, sorting, search, ...filters } = useQueryParams();
  return (newSearch?: string, newFilters?: Partial<FilterParams>, newSorting?: string) =>
    push(
      {
        query: {
          sorting: newSorting || sorting,
          page: 1,
          search: typeof newSearch === 'string' ? newSearch : search,
          ...(newFilters || filters),
        },
        pathname,
      },
      undefined,
      {
        shallow: true,
      }
    );
};

/** Function that transform the filters data from form inputs to query params */
export const transformFilterInputsToParams = (filterInputs: Partial<FilterForm>) => {
  let filterParams: Partial<FilterParams> = {};
  Object.entries(filterInputs).forEach(([key, value]) => {
    // Just send the used filters
    if (value) {
      filterParams[`filter[${key}]`] = `${value}`;
    }
  });
  return filterParams;
};

export const transformFilterParamsToInputs = (filters: Partial<FilterParams>) => {
  let filterInputs: Partial<FilterForm> = {};
  Object.entries(filters).forEach(([key, value]) => {
    // Just send the used filters
    const inputKey = key.replace(/filter\[|\]/gi, '');
    if (value) {
      filterInputs[inputKey] = `${value}`;
    }
  });
  return filterInputs;
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
