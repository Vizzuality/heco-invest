import { useIntl } from 'react-intl';

import { yupResolver } from '@hookform/resolvers/yup';
import { SchemaOf, object, string, ref } from 'yup';

import { ChangePassword } from 'types/user';

export const useChangePasswordResolver = () => {
  const { formatMessage } = useIntl();

  const schema: SchemaOf<ChangePassword> = object().shape({
    current_password: string()
      .required(
        formatMessage({
          defaultMessage: 'You need to enter your current password.',
          id: 'AXCPbS',
        })
      )
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{12,}$/, {
        message: formatMessage({
          defaultMessage:
            'The password must contain at least 12 characters, with at least one uppercase letter, one lowercase letter and a number.',
          id: 'rJnXTe',
        }),
      }),
    password: string()
      .required(
        formatMessage({
          defaultMessage: 'You need to enter a new password.',
          id: 'HrWuWv',
        })
      )
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{12,}$/, {
        message: formatMessage({
          defaultMessage:
            'The new password must contain at least 12 characters, with at least one uppercase letter, one lowercase letter and a number.',
          id: 'aVk9a9',
        }),
      }),
    password_confirmation: string()
      .oneOf(
        [ref('password'), null],
        formatMessage({ defaultMessage: "The passwords don't match.", id: 'weOT3A' })
      )
      .required(
        formatMessage({
          defaultMessage: 'You need to confirm the new password.',
          id: '64TO4B',
        })
      ),
    reset_password_token: string(),
  });

  return yupResolver(schema);
};
