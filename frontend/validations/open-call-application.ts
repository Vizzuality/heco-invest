import { useIntl } from 'react-intl';

import { yupResolver } from '@hookform/resolvers/yup';
import { SchemaOf, object, string } from 'yup';

import { OpenCallApplicationForm } from 'types/open-call-applications';

export const useApplyToOpenCallResolver = () => {
  const { formatMessage } = useIntl();

  const schema: SchemaOf<Omit<OpenCallApplicationForm, 'open_call_id'>> = object().shape({
    project_id: string()
      .nullable()
      .required(
        formatMessage({
          defaultMessage: 'You need to select a project.',
          id: 'L/i942',
        })
      ),
    message: string()
      .max(
        600,
        formatMessage({
          defaultMessage: 'The message can have a maximum of 600 characters',
          id: '0ZgDo2',
        })
      )
      .required(
        formatMessage({
          defaultMessage: 'You need to enter a message.',
          id: 'i8NU3I',
        })
      ),
  });

  return yupResolver(schema);
};
