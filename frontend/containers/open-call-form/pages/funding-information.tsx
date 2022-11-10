import { FC } from 'react';

import { FieldError } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import ErrorMessage from 'components/forms/error-message';
import FieldInfo from 'components/forms/field-info';
import Input from 'components/forms/input';
import Label from 'components/forms/label';
import Tag from 'components/forms/tag';
import TagGroup from 'components/forms/tag-group';
import Textarea from 'components/forms/textarea';

import { OpenCallFundingInformationProps } from '../types';

export const OpenCallFundingInformation: FC<OpenCallFundingInformationProps> = ({
  errors,
  register,
  setValue,
  clearErrors,
  instrument_types,
}) => {
  const { formatMessage } = useIntl();
  return (
    <div>
      <div className="mb-10">
        <h1 className="mb-2 font-serif text-3xl font-semibold">
          <FormattedMessage defaultMessage="Funding information" id="mEYG82" />
        </h1>
        <p className="text-gray-900">
          <FormattedMessage
            defaultMessage="How much money do you intend to give to this open call. This information will be <n>public</n>."
            id="k8US3O"
            values={{
              n: (chunk: string) => <span className="font-semibold">{chunk}</span>,
            }}
          />
        </p>
      </div>
      <form>
        <div>
          <div className="mb-2.5">
            <Label htmlFor="max_funding" className="mr-2">
              <FormattedMessage
                defaultMessage="How much funding do you have available for this open call? (US$)"
                id="VaDfA7"
              />
            </Label>
          </div>
          <Input
            type="number"
            className="mt-2.5"
            name="maximum_funding_per_project"
            id="max_funding"
            register={register}
            placeholder={formatMessage({
              defaultMessage: 'insert value',
              id: 'GDPNty',
            })}
            aria-describedby="max_funding-error"
          />
          <ErrorMessage
            id="max_funding-error"
            errorText={errors.maximum_funding_per_project?.message}
          />
        </div>

        <div className="mt-4.5 mb-8">
          <fieldset>
            <legend className="inline font-sans font-semibold text-sm text-gray-800 mb-4.5">
              <span className="mr-2.5">
                <FormattedMessage defaultMessage="Financial instruments available" id="EFVd2S" />
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
              thresholdToShowSelectAll={3}
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

        <div className="mt-4.5">
          <div className="mb-2.5">
            <Label htmlFor="funding_priorities" className="mr-2">
              <FormattedMessage defaultMessage="Funding priorities" id="P1f6hp" />
            </Label>
            <FieldInfo
              content={formatMessage({
                defaultMessage: 'What type of projects the funding is covering?',
                id: 'BVUSKd',
              })}
            />
          </div>
          <Textarea
            className="mt-2.5"
            name="funding_priorities"
            id="funding_priorities"
            register={register}
            placeholder={formatMessage({
              defaultMessage: 'insert your answer (max 600 characters)',
              id: 'hPsrc0',
            })}
            aria-describedby="funding_priorities-error"
          />
          <ErrorMessage
            id="funding_priorities-error"
            errorText={errors.funding_priorities?.message}
          />
        </div>

        <div className="mt-4.5">
          <div className="mb-2.5">
            <Label htmlFor="funding_exclusions" className="mr-2">
              <FormattedMessage defaultMessage="Funding exclusions" id="gQ16Mj" />
            </Label>
            <FieldInfo
              content={formatMessage({
                defaultMessage: 'What type of projects the funding is not covering?',
                id: '6z2cQS',
              })}
            />
          </div>
          <Textarea
            className="mt-2.5"
            name="funding_exclusions"
            id="funding_exclusions"
            register={register}
            placeholder={formatMessage({
              defaultMessage: 'insert your answer (max 600 characters)',
              id: 'hPsrc0',
            })}
            aria-describedby="funding_exclusions-error"
          />
          <ErrorMessage
            id="funding_exclusions-error"
            errorText={errors.funding_exclusions?.message}
          />
        </div>
      </form>
    </div>
  );
};
