import { useIntl } from 'react-intl';

import { object, string } from 'yup';

export default (page: number) => {
  const { formatMessage } = useIntl();
  const messages = {
    contactEmail: {
      required: formatMessage({
        defaultMessage: 'You need to enter an email',
        id: 'GkDTfx',
      }),
      isValid: formatMessage({
        defaultMessage: 'Invalid email format.',
        id: '05q+7T',
      }),
    },
  };

  const secondPageSchema = object().shape({
    contact_email: string()
      .email(messages.contactEmail.isValid)
      .required(messages.contactEmail.required),
  });

  return [secondPageSchema][page];
};
