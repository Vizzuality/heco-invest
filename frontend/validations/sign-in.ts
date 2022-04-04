import { useIntl } from 'react-intl';

import { yupResolver } from '@hookform/resolvers/yup';
import { SchemaOf, object, string, boolean, ref } from 'yup';

import { SignInFormI } from 'types/sign-in';

export const useSignInResolver = () => {
  const { formatMessage } = useIntl();

  const schema: SchemaOf<SignInFormI> = object().shape({
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
    password: string()
      .required(
        formatMessage({
          defaultMessage: 'You need to enter a password.',
          id: 'zeCjLr',
        })
      )
      .min(
        8,
        formatMessage({
          defaultMessage: 'The password must have at least 8 characters.',
          id: 'TiXJ+4',
        })
      ),
  });

  return yupResolver(schema);
};
