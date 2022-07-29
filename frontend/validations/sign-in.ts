import { useIntl } from 'react-intl';

import { yupResolver } from '@hookform/resolvers/yup';
import { SchemaOf, object, string, ref } from 'yup';

import { ResetPassword, ForgotPassword, SignIn } from 'types/sign-in';

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

  const schema: SchemaOf<ForgotPassword> = object().shape({
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

export const useResetPasswordResolver = () => {
  const { formatMessage } = useIntl();

  const schema: SchemaOf<ResetPassword> = object().shape({
    password: string()
      .required(
        formatMessage({
          defaultMessage: 'You need to enter a password.',
          id: 'zeCjLr',
        })
      )
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{12,}$/, {
        message: formatMessage({
          defaultMessage:
            'The password must contain at least 12 characters, with at least one uppercase letter, one lowercase letter and a number.',
          id: 'rJnXTe',
        }),
      }),
    password_confirmation: string()
      .oneOf(
        [ref('password'), null],
        formatMessage({ defaultMessage: "The passwords don't match.", id: 'weOT3A' })
      )
      .required(
        formatMessage({
          defaultMessage: 'You need to confirm the password.',
          id: '+UvbBR',
        })
      ),
    reset_password_token: string(),
  });

  return yupResolver(schema);
};
