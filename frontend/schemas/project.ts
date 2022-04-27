import { useIntl } from 'react-intl';

import { object, string, array, number, mixed, boolean } from 'yup';

export default (page: number) => {
  const { formatMessage } = useIntl();

  const messages = {
    name: formatMessage({ defaultMessage: 'You need to insert a name', id: 'XvwE2r' }),
    country_id: formatMessage({ defaultMessage: 'You need to select a country', id: 'cappSj' }),
    department_id: formatMessage({ defaultMessage: 'You need to select a state', id: '9a4/mT' }),
    municipality_id: formatMessage({
      defaultMessage: 'You need to select a municipality',
      id: '+m/R6q',
    }),
    project_gallery: {
      min_lenth: formatMessage({ defaultMessage: 'Upload at least one picture', id: 'BG1UW6' }),
      max_length: formatMessage({ defaultMessage: 'Upload a maximum of six images', id: 'U6/vVg' }),
      max_pitcure_size: formatMessage({
        defaultMessage: 'The pictures must have a maximum size of 5 MB',
        id: 'TfAnzZ',
      }),
    },
    involved_project_developer: formatMessage({
      defaultMessage: 'Select if there are other project developers involved on the project',
      id: '2RaCKb',
    }),
    involved_project_developer_ids: formatMessage({
      defaultMessage: 'Select at least one project developer involved on the project',
      id: 'M+H+u+',
    }),
  };

  const schemas = [
    object().shape({
      name: string().required(messages.name),
      country_id: string().required(messages.country_id),
      department_id: string().required(messages.department_id),
      municipality_id: string().required(messages.municipality_id),
      project_gallery: mixed<FileList>()
        .test('max_length', messages.project_gallery.max_length, (value) => value?.length <= 6)
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
      involved_project_developer_ids: array()
        .of(string())
        .min(1, messages.involved_project_developer_ids)
        .when('involved_project_developer', {
          is: 1,
          then: array().required(messages.involved_project_developer_ids),
          otherwise: array().notRequired(),
        }),
      involved_project_developer_not_listed: boolean(),
    }),
  ];
  return schemas[page];
};
