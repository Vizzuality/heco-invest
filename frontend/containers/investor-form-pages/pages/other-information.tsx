import { FC } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import ErrorMessage from 'components/forms/error-message';
import Label from 'components/forms/label';
import Textarea from 'components/forms/textarea';

import { OtherInformationsProps } from '../types';

export const OtherInformations: FC<OtherInformationsProps> = ({ register, errors }) => {
  const { formatMessage } = useIntl();
  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold mb-2.5">
        <FormattedMessage defaultMessage="Other relevant information" id="ee3r6Y" />
      </h1>

      <form noValidate>
        <div>
          <Label
            htmlFor="other-information"
            className="block mb-2 text-base font-normal text-gray-600"
          >
            <FormattedMessage
              defaultMessage="Complete your profile with relevant information to make your relationship with project developers as precise as possible. For example the very particular topics you are interested in or the activities and items you definitely do not finance or invest in. "
              id="I2VJMv"
            />
          </Label>
          <Textarea
            id="other-information"
            name="other_information"
            aria-describedby="other-information-error"
            register={register}
            placeholder={formatMessage({
              defaultMessage: 'insert your answer (max 600 characters)',
              id: 'hPsrc0',
            })}
            className="min-h-[240px]"
          />
          <ErrorMessage
            id="other-information-error"
            errorText={errors?.other_information?.message}
          />
        </div>
      </form>
    </div>
  );
};

export default OtherInformations;
