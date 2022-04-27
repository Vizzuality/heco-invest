import React, { ChangeEvent, useEffect, useState } from 'react';

import { FieldError } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import ErrorMessage from 'components/forms/error-message';
import FieldInfo from 'components/forms/field-info';
import Input from 'components/forms/input';
import Label from 'components/forms/label';
import Tag from 'components/forms/tag';
import TagGroup from 'components/forms/tag-group';
import Textarea from 'components/forms/textarea';

import { FundingProps } from '../types';

const Funding = ({
  errors,
  register,
  getValues,
  setValue,
  clearErrors,
  instrument_type,
  ticket_sizes,
}: FundingProps) => {
  const { formatMessage } = useIntl();
  const [showLookingForFundingFields, setShowLookingForFundingFields] = useState(false);
  const [showReceivedFundedFields, setShowReceivedFundedFields] = useState(false);

  useEffect(() => {
    setShowLookingForFundingFields(!!Number(getValues('looking_for_funding')));
    setShowReceivedFundedFields(!!Number(getValues('received_funding')));
  }, [getValues]);

  const handleChangeLookingForFunding = (e: ChangeEvent<HTMLInputElement>) => {
    setShowLookingForFundingFields(!!Number(e.target.value));
  };

  const handleChangeReceivedFunded = (e: ChangeEvent<HTMLInputElement>) => {
    setShowReceivedFundedFields(!!Number(e.target.value));
  };

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold mb-2.5">
        <FormattedMessage defaultMessage="Funding information" id="mEYG82" />
      </h1>
      <p className="mb-10 text-gray-600">
        <FormattedMessage
          defaultMessage="Financial information about your project and what are the needs"
          id="pcRRCK"
        />
      </p>
      <form>
        <div>
          <div>
            <fieldset>
              <div className="flex items-center">
                <legend className="inline mr-4 font-sans text-sm font-semibold text-gray-800">
                  <span className="mr-2.5">
                    <FormattedMessage
                      defaultMessage="Are you currently looking for funding?"
                      id="u/E7xG"
                    />
                  </span>
                  <FieldInfo
                    infoText={formatMessage({
                      defaultMessage:
                        'If you are not looking for funding and just want to publish your project, select No.',
                      id: 'OWnChd',
                    })}
                  />
                </legend>
                <Label
                  htmlFor="looking_for_funding-yes"
                  className="flex items-center pt-0.5 font-normal"
                >
                  <input
                    id="looking_for_funding-yes"
                    type="radio"
                    value={1}
                    className="mr-2"
                    {...register('looking_for_funding', {
                      onChange: handleChangeLookingForFunding,
                    })}
                  />
                  <FormattedMessage defaultMessage="Yes" id="a5msuh" />
                </Label>
                <Label
                  htmlFor="looking_for_funding-no"
                  className="flex items-center pt-0.5 ml-4 font-normal"
                >
                  <input
                    id="looking_for_funding-no"
                    type="radio"
                    value={0}
                    className="mr-2"
                    {...register('looking_for_funding', {
                      onChange: handleChangeLookingForFunding,
                    })}
                  />
                  <FormattedMessage defaultMessage="No" id="oUWADl" />
                </Label>
              </div>
              <div>
                <ErrorMessage
                  id="looking_for_funding-error"
                  errorText={errors?.looking_for_funding?.message}
                />
              </div>
            </fieldset>
          </div>
          <div
            className={cx('transition-all ease bg-background-middle rounded-md px-4', {
              'h-0 opacity-0 py-0 mt-0 hidden': !showLookingForFundingFields,
              'opacity-100 h-fit py-4.5 mt-4.5 block': showLookingForFundingFields,
            })}
          >
            <div>
              <fieldset>
                <legend className="inline font-sans font-semibold text-sm text-gray-800 mb-4.5">
                  <FormattedMessage
                    defaultMessage="Select the amount of money that you need"
                    id="yqJ5XD"
                  />
                </legend>
                <TagGroup
                  name="ticket_size"
                  setValue={setValue}
                  errors={errors}
                  clearErrors={clearErrors}
                >
                  {ticket_sizes?.map((item) => (
                    <Tag
                      key={item.id}
                      id={item.id}
                      name="ticket_size"
                      value={item.id}
                      aria-describedby="ticket_size-error"
                      register={register}
                      type="radio"
                      flexLabel
                    >
                      <span className="block">{item.attributes.description}</span>
                      <span className="block text-gray-600">{item.attributes.name}</span>
                    </Tag>
                  ))}
                </TagGroup>
              </fieldset>
              <ErrorMessage id="ticket_size-error" errorText={errors?.ticket_size?.message} />
            </div>

            <div className="mt-4.5">
              <fieldset>
                <legend className="inline font-sans font-semibold text-sm text-gray-800 mb-4.5">
                  <span className="mr-2.5">
                    <FormattedMessage defaultMessage="Select the intrument type(s)" id="hWhIuU" />
                  </span>
                  <FieldInfo
                    infoText={formatMessage({
                      defaultMessage:
                        'What type of financing are you looking for to implement your project or solution?',
                      id: 'ADBj6Y',
                    })}
                  />
                </legend>
                <TagGroup
                  name="instrument_types"
                  setValue={setValue}
                  errors={errors}
                  clearErrors={clearErrors}
                >
                  {instrument_type?.map((item) => (
                    <Tag
                      key={item.id}
                      id={item.id}
                      name="instrument_types"
                      value={item.id}
                      aria-describedby="instrument_type-error"
                      register={register}
                      type="checkbox"
                    >
                      {item.attributes.name}
                    </Tag>
                  ))}
                </TagGroup>
              </fieldset>
              <ErrorMessage
                id="instrument_type-error"
                errorText={
                  Array.isArray(errors?.instrument_types)
                    ? errors?.instrument_types[0].message
                    : (errors?.instrument_types as FieldError)?.message
                }
              />
            </div>
            <div className="mt-4.5">
              <Label htmlFor="funding-plan" className="block mb-2.5">
                <span className="mr-2.5">
                  <FormattedMessage defaultMessage="How will the money be used?" id="1t1fGY" />
                </span>
                <FieldInfo
                  infoText={formatMessage({
                    defaultMessage:
                      'Please briefly describe the main groups of activities or components for the implementation of the project. It is not necessary to be very detailed, just a logical sequence of the general lines of action. These groups of activities should be used to define the estimated budget below. No more than three groups of activities or components',
                    id: 'Ec0M9T',
                  })}
                />
              </Label>
              <Textarea
                placeholder={formatMessage({
                  defaultMessage: 'insert your answer (max 600 characters)',
                  id: 'hPsrc0',
                })}
                id="funding-plan"
                name="funding_plan"
                register={register}
                aria-describedby="funding-plan-error"
              />
              <ErrorMessage
                id="funding-plan-error"
                errorText={
                  Array.isArray(errors?.funding_plan)
                    ? errors?.funding_plan[0].message
                    : (errors?.funding_plan as FieldError)?.message
                }
              />
            </div>
          </div>

          <div>
            <fieldset>
              <div className="flex items-center mt-4.5">
                <legend className="inline mr-4 font-sans text-sm font-semibold text-gray-800">
                  <FormattedMessage
                    defaultMessage="Has this project been funded before?"
                    id="GdS9Mk"
                  />
                </legend>
                <Label
                  htmlFor="received_funding-yes"
                  className="flex items-center pt-0.5 font-normal"
                >
                  <input
                    id="received_funding-yes"
                    type="radio"
                    value={1}
                    className="mr-2"
                    aria-describedby="received_funding-error"
                    {...register('received_funding', {
                      onChange: handleChangeReceivedFunded,
                    })}
                  />
                  <FormattedMessage defaultMessage="Yes" id="a5msuh" />
                </Label>
                <Label
                  htmlFor="received_funding-no"
                  className="flex items-center pt-0.5 ml-4 font-normal"
                >
                  <input
                    id="received_funding-no"
                    type="radio"
                    value={0}
                    className="mr-2"
                    aria-describedby="received_funding-error"
                    {...register('received_funding', {
                      onChange: handleChangeReceivedFunded,
                    })}
                  />
                  <FormattedMessage defaultMessage="No" id="oUWADl" />
                </Label>
              </div>
              <div>
                <ErrorMessage
                  id="received_funding-error"
                  errorText={errors?.received_funding?.message}
                />
              </div>
            </fieldset>
          </div>
          <div
            className={cx(
              'z-1 transition-all bg-background-middle px-4 py-4.5 mt-4.5 rounded-md flex gap-6',
              {
                'h-0 opacity-0': !showReceivedFundedFields,
                'opacity-100 h-auto': showReceivedFundedFields,
              }
            )}
          >
            <div className="w-full">
              <Label htmlFor="received-funding-amount">
                <FormattedMessage
                  defaultMessage="How much money did the project received or raised?"
                  id="Nqe54a"
                />
                <Input
                  type="number"
                  placeholder={formatMessage({
                    defaultMessage: 'insert the amount of money',
                    id: 'bWygLM',
                  })}
                  name="received_funding_amount_usd"
                  id="received-funding-amount"
                  register={register}
                />
              </Label>
            </div>
            <div className="w-full">
              <Label htmlFor="received-funding-investor">
                <FormattedMessage defaultMessage="From which investor or funder?" id="SXKvVa" />
                <Input
                  placeholder={formatMessage({
                    defaultMessage: 'insert the name of the investor/funder',
                    id: 'e0c9xF',
                  })}
                  type="text"
                  name="received_funding_investor"
                  id="received-funding-investor"
                  register={register}
                />
              </Label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Funding;
