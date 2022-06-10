import { useIntl } from 'react-intl';

import { yupResolver } from '@hookform/resolvers/yup';
import { SchemaOf, object, string } from 'yup';

import { UsersInvitationForm } from 'types/user';

export const useInviteUsersResolver = () => {
  const { formatMessage } = useIntl();

  const schema: SchemaOf<UsersInvitationForm> = object().shape({
    email: string()
      .required(
        formatMessage({
          defaultMessage: 'You need to enter your email.',
          id: 'tCfD2Y',
        })
      )
      .email(
        formatMessage({
          defaultMessage: 'Invalid email format.',
          id: '05q+7T',
        })
      ),
  });

  return yupResolver(schema);
};
