import { useIntl } from 'react-intl';

import { yupResolver } from '@hookform/resolvers/yup';
import { SchemaOf, object, string, boolean, ref } from 'yup';

import { SignupFormI } from 'types/user';

export const useSignupResolver = () => {
  const { formatMessage } = useIntl();

  const schema: SchemaOf<SignupFormI> = object().shape({
    first_name: string().required(
      formatMessage({
        defaultMessage: 'You need to enter a name.',
        id: 'Pl5xI4',
      })
    ),
    last_name: string().required(
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
        12,
        formatMessage({
          defaultMessage: 'The password must have at least 12 characters.',
          id: 'eKEHsg',
        })
      )
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{12,}$/, {
        message: formatMessage({
          defaultMessage:
            'The password must contain at least one uppercase letter, one lowercase letter and one number.',
          id: 'Y4hw30',
        }),
      }),
    confirm_password: string()
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
    accept_terms: boolean().oneOf(
      [true],
      formatMessage({
        defaultMessage: 'You need to accept the Terms and Privacy Policy.',
        id: 'tkP6dd',
      })
    ),
  });

  return yupResolver(schema);
};
