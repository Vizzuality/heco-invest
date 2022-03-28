import { useIntl } from 'react-intl';

import { yupResolver } from '@hookform/resolvers/yup';
import { SchemaOf, object, string, boolean, ref } from 'yup';

import { SignupFormI } from 'types/signup';

export const useSignupResolver = () => {
  const { formatMessage } = useIntl();

  const schema: SchemaOf<SignupFormI> = object().shape({
    firstName: string().required(
      formatMessage({
        defaultMessage: 'You need to enter a name.',
        id: 'Pl5xI4',
      })
    ),
    lastName: string().required(
      formatMessage({
        defaultMessage: 'You need to enter a last name.',
        id: 'zPMPr9',
      })
    ),
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
    confirmPassword: string()
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
    acceptTerms: boolean().oneOf(
      [true],
      formatMessage({
        defaultMessage: 'You need to accept the Terms and Privacy Policy.',
        id: 'tkP6dd',
      })
    ),
  });

  return yupResolver(schema);
};
