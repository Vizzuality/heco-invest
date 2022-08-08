import { FC } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import SDGs from 'containers/forms/sdgs';

import ErrorMessage from 'components/forms/error-message';
import FieldInfo from 'components/forms/field-info';
import Label from 'components/forms/label';
import Textarea from 'components/forms/textarea';

import { OpenCallExpectedImpactProps } from '../types';

export const OpenCallExpectedImpact: FC<OpenCallExpectedImpactProps> = ({
  register,
  errors,
  clearErrors,
  setValue,
}) => {
  const { formatMessage } = useIntl();

  return (
    <div>
      <div className="mb-10">
        <h1 className="mb-2 font-serif text-3xl font-semibold">
          <FormattedMessage defaultMessage="Expected impact" id="XgaRPC" />
        </h1>
        <p className="text-gray-600">
          <FormattedMessage
            defaultMessage="Tell us what’s the impact that you expect with this open call."
            id="N5k7R7"
          />
        </p>
      </div>
      <form>
        <div className="mt-6">
          <div className="mb-2.5">
            <Label htmlFor="expected_impact" className="mr-2">
              <FormattedMessage defaultMessage="Expected impact" id="XgaRPC" />
            </Label>
            <FieldInfo
              infoText={formatMessage({
                defaultMessage:
                  'Describe briefly the impact that the project is expected to generate.',
                id: 'jqCFCY',
              })}
            />
          </div>
          <Textarea
            className="mt-2.5"
            name="expected_impact"
            id="expected_impact"
            register={register}
            placeholder={formatMessage({
              defaultMessage: 'insert your answer (max 600 characters)',
              id: 'hPsrc0',
            })}
            aria-describedby="description-error"
          />
          <ErrorMessage id="expected_impact-error" errorText={errors.expected_impact?.message} />
        </div>
        <div className="mt-4.5">
          <Label htmlFor="sdgs" className="mr-2">
            <FormattedMessage
              defaultMessage="Select the SDG’s you expect to have impact (optional)"
              id="LFNAet"
            />
          </Label>
          <SDGs
            className="mt-3"
            clearErrors={clearErrors}
            errors={errors}
            name="sdgs"
            register={register}
            setValue={setValue}
          />
          <ErrorMessage id="description-error" errorText={errors.sdgs?.[0]?.message} />
        </div>
      </form>
    </div>
  );
};
