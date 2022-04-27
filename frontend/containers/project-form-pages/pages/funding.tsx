import React from 'react';

import { FieldError } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { CategoryTagDot } from 'containers/category-tag';

import Combobox, { Option } from 'components/forms/combobox';
import ErrorMessage from 'components/forms/error-message';
import FieldInfo from 'components/forms/field-info';
import Input from 'components/forms/input';
import Label from 'components/forms/label';
import Tag from 'components/forms/tag';
import TagGroup from 'components/forms/tag-group';
import Textarea from 'components/forms/textarea';
import { CategoryType } from 'types/category';

import { FundingProps } from '../types';

const Funding = ({
  errors,
  register,
  control,
  setValue,
  clearErrors,
  instrument_type,
  ticket_sizes,
}: FundingProps) => {
  const { formatMessage } = useIntl();

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
            <fieldset name="categories">
              <legend className="inline font-sans font-semibold text-sm text-gray-800 mb-4.5">
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
              <Label id="looking_for_funding-yes" className="block font-normal">
                <input
                  id="looking_for_funding-yes"
                  type="radio"
                  value={1}
                  className="mr-2"
                  {...register('looking_for_funding')}
                />
                <FormattedMessage defaultMessage="Yes" id="a5msuh" />
              </Label>
              <Label htmlFor="looking_for_funding-no" className="block mt-4 font-normal">
                <input
                  id="looking_for_funding-no"
                  type="radio"
                  value={0}
                  className="mr-2"
                  {...register('looking_for_funding')}
                />
                <FormattedMessage defaultMessage="No" id="oUWADl" />
              </Label>
              <ErrorMessage
                id="looking_for_funding-error"
                errorText={(errors?.involved_project_developer as FieldError)?.message}
              />
            </fieldset>
          </div>

          <div className="mt-4.5">
            <fieldset name="ticket_sizes">
              <legend className="inline font-sans font-semibold text-sm text-gray-800 mb-4.5">
                <FormattedMessage
                  defaultMessage="Select the amount of money that you need"
                  id="yqJ5XD"
                />
              </legend>
              <TagGroup
                name="ticket_sizes"
                setValue={setValue}
                errors={errors}
                clearErrors={clearErrors}
              >
                {ticket_sizes?.map((item) => (
                  <Tag
                    key={item.id}
                    id={item.id}
                    name="ticket_sizes"
                    value={item.id}
                    aria-describedby="ticket_sizes-error"
                    register={register}
                    type="radio"
                  >
                    {item.attributes.description || '<US$25,000'}
                    <span className="block text-gray-600">{item.attributes.name}</span>
                  </Tag>
                ))}
              </TagGroup>
            </fieldset>
            <ErrorMessage id="ticket_sizes-error" errorText={errors?.ticket_size?.message} />
          </div>

          <div className="mt-4.5">
            <fieldset name="ticket_sizes">
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
                name="ticket_sizes"
                setValue={setValue}
                errors={errors}
                clearErrors={clearErrors}
              >
                {instrument_type?.map((item) => (
                  <Tag
                    key={item.id}
                    id={item.id}
                    name="ticket_sizes"
                    value={item.id}
                    aria-describedby="ticket_sizes-error"
                    register={register}
                    type="radio"
                  >
                    {item.attributes.name}
                  </Tag>
                ))}
              </TagGroup>
            </fieldset>
            <ErrorMessage id="ticket_sizes-error" errorText={errors?.ticket_size?.message} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Funding;
