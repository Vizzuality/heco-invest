import React, { ChangeEvent, useEffect, useState } from 'react';

import { Controller } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import ErrorMessage from 'components/forms/error-message';
import Input from 'components/forms/input';
import Label from 'components/forms/label';
import Textarea from 'components/forms/textarea';
import { ProjectForm } from 'types/project';

import { ProjectFormPagesProps } from '..';

const OtherInformation = ({
  control,
  getValues,
  setValue,
  register,
  errors,
}: ProjectFormPagesProps<ProjectForm>) => {
  const { formatMessage } = useIntl();
  const [defaultRisksIdentified, setDefaultRisksIdentified] = useState<boolean>();

  useEffect(() => {
    const risksIdentified = getValues('climate_change_risks_identified');
    if (typeof risksIdentified !== 'number') {
      setDefaultRisksIdentified(risksIdentified);
    }
  }, [getValues]);

  const handleChangeRisksIdentified = (e: ChangeEvent<HTMLInputElement>) => {
    setDefaultRisksIdentified(!!Number(e.target.value));
    setValue('climate_change_risks_identified', !!Number(e.target.value));
  };

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold mb-2.5">
        <FormattedMessage defaultMessage="Other information" id="kX7oGR" />
      </h1>
      <p className="mb-10 text-gray-900">
        <FormattedMessage
          defaultMessage="This description should summarize your project in a few words. This might include relevant financial information that you want potential investors to know about. This information will be public except the one marked as <n>private</n> which will only be visible for admins."
          id="l2Jd2p"
          values={{
            n: (chunk: string) => <span className="font-semibold">{chunk}</span>,
          }}
        />
      </p>
      <form noValidate>
        <div className="mb-6.5">
          <Label htmlFor="description" className="block mb-2.5">
            <span className="mr-2.5">
              <FormattedMessage defaultMessage="Short description of the project" id="YWQkk+" />
            </span>
          </Label>
          <Textarea
            placeholder={formatMessage({
              defaultMessage: 'insert your answer (max 600 characters)',
              id: 'hPsrc0',
            })}
            id="description"
            name="description"
            register={register}
            aria-describedby="description-error"
          />
          <ErrorMessage id="description-error" errorText={errors?.description?.message} />
        </div>
        <div className="mb-6.5">
          <Label htmlFor="relevant-links" className="block mb-2.5">
            <span className="mr-2.5">
              <FormattedMessage defaultMessage="Relevant links (optional)" id="jKdvln" />
            </span>
          </Label>
          <Textarea
            placeholder={formatMessage({
              defaultMessage: 'insert your answer (max 600 characters)',
              id: 'hPsrc0',
            })}
            id="relevant-links"
            name="relevant_links"
            register={register}
            aria-describedby="relevant-links-error"
          />
          <ErrorMessage id="relevant-links-error" errorText={errors?.relevant_links?.message} />
        </div>
        <div className="mb-6.5">
          <Label htmlFor="positive_financial_returns" className="block mb-2.5">
            <span className="mr-2.5">
              <FormattedMessage
                defaultMessage="If your current business model generates positive financial returns, please explain what they consist of (optional)"
                id="TnP0xP"
              />
            </span>
          </Label>
          <Textarea
            placeholder={formatMessage({
              defaultMessage: 'insert your answer (max 600 characters)',
              id: 'hPsrc0',
            })}
            id="positive_financial_returns"
            name="positive_financial_returns"
            register={register}
            aria-describedby="positive_financial_returns-error"
          />
          <ErrorMessage
            id="positive_financial_returns-error"
            errorText={errors?.positive_financial_returns?.message}
          />
        </div>
        <div className="mb-6.5">
          <Label htmlFor="last_year_sales_revenue" className="block mb-2.5">
            <span className="mr-2.5">
              <FormattedMessage
                defaultMessage="What was the sales revenue in US$ in the last fiscal year-end? (optional)"
                id="cmhwn3"
              />
            </span>
          </Label>
          <Input
            placeholder={formatMessage({
              defaultMessage: 'insert a value between 2 and 9 digits',
              id: 'z+apzl',
            })}
            type="number"
            id="last_year_sales_revenue"
            name="last_year_sales_revenue"
            register={register}
            aria-describedby="last_year_sales_revenue-error"
          />
          <ErrorMessage
            id="last_year_sales_revenue-error"
            errorText={errors?.last_year_sales_revenue?.message}
          />
        </div>

        <div className="mb-6.5">
          <fieldset className="flex items-center mt-4.5">
            <legend className="float-left mr-4 font-sans text-sm font-semibold text-gray-800">
              <span className="mr-2.5">
                <FormattedMessage
                  defaultMessage="Has the project identified the risks of climate change to which the business is exposed and potential mitigation strategies?"
                  id="Cv28CA"
                />
              </span>
            </legend>
            <div className="flex items-center">
              <Label
                htmlFor="climate_change_risks_identified_yes"
                className="flex items-center pt-0.5 font-normal"
              >
                <Controller
                  control={control}
                  name="climate_change_risks_identified"
                  render={(field) => (
                    <input
                      {...field}
                      id="lclimate_change_risks_identified-yes"
                      type="radio"
                      value={1}
                      checked={defaultRisksIdentified}
                      className="mr-2"
                      aria-describedby="climate_change_risks_identified-error"
                      onChange={handleChangeRisksIdentified}
                    />
                  )}
                ></Controller>
                <FormattedMessage defaultMessage="Yes" id="a5msuh" />
              </Label>
              <Label
                htmlFor="looking_for_funding-no"
                className="flex items-center pt-0.5 ml-4 font-normal"
              >
                <Controller
                  control={control}
                  name="climate_change_risks_identified"
                  render={(field) => (
                    <input
                      {...field}
                      id="climate_change_risks_identified-no"
                      type="radio"
                      value={0}
                      checked={defaultRisksIdentified === false}
                      className="mr-2"
                      aria-describedby="climate_change_risks_identified-error"
                      onChange={handleChangeRisksIdentified}
                    />
                  )}
                ></Controller>

                <FormattedMessage defaultMessage="No" id="oUWADl" />
              </Label>
            </div>
          </fieldset>
        </div>
        <div
          className={cx('transition-all ease bg-background-middle rounded-md px-4', {
            'h-0 opacity-0 py-0 mt-0 hidden': !defaultRisksIdentified,
            'opacity-100 h-fit py-4.5 mt-4.5 block': !!defaultRisksIdentified,
          })}
        >
          <div className="mb-6.5">
            <Label htmlFor="climate_change_risks_details" className="block mb-2.5">
              <span className="mr-2.5">
                <FormattedMessage defaultMessage="Please explain" id="KsHMRK" />
              </span>
            </Label>
            <Textarea
              placeholder={formatMessage({
                defaultMessage: 'insert your answer (max 600 characters)',
                id: 'hPsrc0',
              })}
              id="climate_change_risks_details"
              name="climate_change_risks_details"
              register={register}
              aria-describedby="climate_change_risks_details-error"
            />
            <ErrorMessage
              id="climate_change_risks_details-error"
              errorText={errors?.climate_change_risks_details?.message}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default OtherInformation;
