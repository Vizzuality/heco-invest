import { useIntl } from 'react-intl';

import { yupResolver } from '@hookform/resolvers/yup';
import { SchemaOf, object, string } from 'yup';

import { ResetPassword, SignIn } from 'types/sign-in';

export const useSignInResolver = () => {
  const { formatMessage } = useIntl();

  const schema: SchemaOf<SignIn> = object().shape({
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
    password: string().required(
      formatMessage({
        defaultMessage: 'You need to enter your password.',
        id: 'fo1tCY',
      })
    ),
  });

  return yupResolver(schema);
};

export const useForgotPasswordResolver = () => {
  const { formatMessage } = useIntl();

  const schema: SchemaOf<ResetPassword> = object().shape({
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
