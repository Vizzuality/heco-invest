import { useIntl } from 'react-intl';

import { object, string, array, number, mixed, boolean } from 'yup';

export default (page: number) => {
  const { formatMessage } = useIntl();

  const messages = {
    project_gallery: {
      min_lenth: formatMessage({ defaultMessage: 'Upload at least one picture', id: 'BG1UW6' }),
      max_length: formatMessage({ defaultMessage: 'Upload a maximum of six images', id: 'U6/vVg' }),
      max_pitcure_size: formatMessage({
        defaultMessage: 'The pictures must have a maximun size of 5 Mbs',
        id: 'SMuTS1',
      }),
    },
    involved_project_developer: formatMessage({
      defaultMessage: 'Select if there are other project developers involved on the project',
      id: '2RaCKb',
    }),
  };

  const schemas = [
    object().shape({
      name: string().required(),
      country_id: string().required(),
      municipality_id: string().required(),
      department_id: string().required(),
      project_gallery: mixed<FileList>()
        .test('min_lenth', messages.project_gallery.min_lenth, (value) => value?.length > 0)
        .test('max_lenth', messages.project_gallery.max_length, (value) => value?.length <= 6)
        .test('max_picture_size', messages.project_gallery.max_pitcure_size, (value) => {
          let oversize = false;
          for (let i = 0; i < value.length; i++) {
            if (value[i].size > 5 * 1024 * 1024) {
              oversize = true;
            }
          }
          return !oversize;
        }),
      location: mixed(),
      involved_project_developer: number()
        .min(0)
        .max(1)
        .required(messages.involved_project_developer)
        .typeError(messages.involved_project_developer),
      involved_project_developer_ids: array().of(string()).nullable(),
      involved_project_developer_not_listed: boolean(),
    }),
    // ADD THE OTHER PAGES
  ];
  return schemas[page];
};
