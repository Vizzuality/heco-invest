import React, { FC } from 'react';

import { FieldError } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { CategoryTagDot } from 'containers/category-tag';

import ErrorMessage from 'components/forms/error-message';
import FieldInfo from 'components/forms/field-info';
import Tag from 'components/forms/tag';
import TagGroup from 'components/forms/tag-group';
import { CategoryType } from 'types/category';

import { InvestmentInformationProps } from '../types';

const InvestmentInformation: FC<InvestmentInformationProps> = ({
  errors,
  register,
  setValue,
  clearErrors,
  categories,
  ticket_sizes,
  instrument_types,
}: InvestmentInformationProps) => {
  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold mb-2.5">
        <FormattedMessage defaultMessage="Investment information" id="770IIS" />
      </h1>
      <p className="mb-10 text-gray-600">
        <FormattedMessage
          defaultMessage="This information will help us understand what you are interested in invest or funding."
          id="M7261y"
        />
      </p>
      <form noValidate>
        <div>
          <div className="mt-4 mb-8">
            <fieldset>
              <legend className="inline font-sans font-semibold text-sm text-gray-800 mb-4.5">
                <span className="mr-2.5">
                  <FormattedMessage
                    defaultMessage="Select the topics/sector categories that interests you"
                    id="ZikI+j"
                  />
                </span>
                <FieldInfo
                  content={
                    <ul>
                      {categories?.map(({ id, name, description }) => (
                        <li key={id}>
                          <p className="font-sans text-sm font-semibold text-white">{name}</p>
                          <p className="mb-4 font-sans text-sm font-normal text-white">
                            {description}
                          </p>
                        </li>
                      ))}
                    </ul>
                  }
                />
              </legend>
              <TagGroup
                name="categories"
                setValue={setValue}
                errors={errors}
                clearErrors={clearErrors}
                type="checkbox"
              >
                {categories?.map((item) => (
                  <Tag
                    key={item.id}
                    id={item.id}
                    name="categories"
                    value={item.id}
                    aria-describedby="categories-error"
                    register={register}
                    type="checkbox"
                  >
                    <CategoryTagDot category={item.id as CategoryType} />
                    {item.name}
                  </Tag>
                ))}
              </TagGroup>
            </fieldset>
            <ErrorMessage
              id="categories-error"
              errorText={errors?.categories?.length && errors?.categories[0]?.message}
            />
          </div>

          <div className="mt-4 mb-8">
            <fieldset>
              <legend className="inline font-sans font-semibold text-sm text-gray-800 mb-4.5">
                <FormattedMessage
                  defaultMessage="Select the ticket size(s) that you provide"
                  id="G6tmT0"
                />
              </legend>
              <TagGroup
                name="ticket_sizes"
                setValue={setValue}
                errors={errors}
                clearErrors={clearErrors}
                type="checkbox"
              >
                {ticket_sizes?.map((item) => (
                  <Tag
                    key={item.id}
                    id={item.id}
                    name="ticket_sizes"
                    value={item.id}
                    aria-describedby="ticket-sizes-error"
                    register={register}
                    type="checkbox"
                    flexLabel={true}
                  >
                    <span className="text-base font-normal">{item.description}</span>
                    <span className="text-gray-600">{item.name}</span>
                  </Tag>
                ))}
              </TagGroup>
            </fieldset>
            <ErrorMessage
              id="ticket-sizes-error"
              errorText={
                Array.isArray(errors?.ticket_sizes)
                  ? errors?.ticket_sizes[0]?.message
                  : (errors?.ticket_sizes as FieldError)?.message
              }
            />
          </div>

          <div className="mt-4 mb-8">
            <fieldset>
              <legend className="inline font-sans font-semibold text-sm text-gray-800 mb-4.5">
                <span className="mr-2.5">
                  <FormattedMessage
                    defaultMessage="Select the intrument type(s) you provide"
                    id="XDC7Vp"
                  />
                </span>
                <FieldInfo
                  content={
                    <ul>
                      {instrument_types?.map(({ id, name, description }) => (
                        <li key={id}>
                          <p className="font-sans text-sm font-semibold text-white">{name}</p>
                          <p className="mb-4 font-sans text-sm font-normal text-white">
                            {description}
                          </p>
                        </li>
                      ))}
                    </ul>
                  }
                />
              </legend>
              <TagGroup
                name="instrument_types"
                setValue={setValue}
                errors={errors}
                clearErrors={clearErrors}
                type="checkbox"
              >
                {instrument_types?.map((item) => (
                  <Tag
                    key={item.id}
                    id={item.id}
                    name="instrument_types"
                    value={item.id}
                    aria-describedby="instrument-types-error"
                    register={register}
                    type="checkbox"
                  >
                    {item.name}
                  </Tag>
                ))}
              </TagGroup>
            </fieldset>
            <ErrorMessage
              id="instrument-types-error"
              errorText={
                Array.isArray(errors?.instrument_types)
                  ? errors?.instrument_types[0]?.message
                  : (errors?.instrument_types as FieldError)?.message
              }
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default InvestmentInformation;
