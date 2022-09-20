import { FC } from 'react';

import { FieldError } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import Sdgs from 'containers/forms/sdgs';

import ErrorMessage from 'components/forms/error-message';
import FieldInfo from 'components/forms/field-info';
import Label from 'components/forms/label';
import Tag from 'components/forms/tag';
import TagGroup from 'components/forms/tag-group';
import TextTag from 'components/tag';

import { ImpactProps } from '../types';

export const Impact: FC<ImpactProps> = ({
  register,
  errors,
  impacts,
  getValues,
  setValue,
  clearErrors,
}) => {
  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold mb-2.5">
        <FormattedMessage defaultMessage="Impact" id="W2JBdp" />
      </h1>
      <p className="mb-10 text-gray-900">
        <FormattedMessage
          defaultMessage="This information will help us understand what is the impact you want to have. This information will be <n>public</n> except the one marked as <n>private</n> which will only be visible for admins."
          id="F6axhK"
          values={{
            n: (chunk: string) => <span className="font-semibold">{chunk}</span>,
          }}
        />
      </p>
      <form noValidate>
        <div className="mb-6.5">
          <fieldset className="flex items-center">
            <legend className="float-left font-sans text-sm font-semibold text-gray-800">
              <FormattedMessage
                defaultMessage="Have you previously invested in impact?"
                id="8XJceA"
              />
            </legend>
            <div className="flex">
              <div className="flex items-center mx-4 font-normal">
                <input
                  id="previously-invested-yes"
                  type="radio"
                  value={1}
                  {...register('previously_invested')}
                />
                <Label htmlFor="previously-invested-yes" className="ml-1 font-normal">
                  <FormattedMessage defaultMessage="Yes" id="a5msuh" />
                </Label>
              </div>
              <div className="flex items-center font-normal">
                <input
                  id="previously-invested-no"
                  type="radio"
                  value={0}
                  {...register('previously_invested')}
                />
                <Label htmlFor="previously-invested-no" className="ml-1 font-normal">
                  <FormattedMessage defaultMessage="No" id="oUWADl" />
                </Label>
              </div>
            </div>
            <TextTag
              size="smallest"
              className="font-medium leading-[14px] text-sm  text-gray-800 bg-beige ml-6"
            >
              <FormattedMessage defaultMessage="Private" id="viXE32" />
            </TextTag>
            <ErrorMessage
              id="previously-invested-error"
              errorText={errors?.previously_invested?.message}
            />
          </fieldset>
        </div>

        <div className="mb-6.5">
          <fieldset>
            <legend className="inline font-sans font-semibold text-sm text-gray-800 mb-4.5">
              <span className="mr-2.5">
                <FormattedMessage
                  defaultMessage="Select the impacts that you prioritize"
                  id="uyxTSu"
                />
              </span>
              <FieldInfo
                content={
                  <ul>
                    {impacts?.map(({ id, name, description }) => (
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
            <TagGroup name="impacts" setValue={setValue} errors={errors} clearErrors={clearErrors}>
              {impacts?.map((item) => (
                <Tag
                  key={item.id}
                  id={item.id}
                  name="impacts"
                  value={item.id}
                  aria-describedby="impact-areas-error"
                  register={register}
                >
                  {item.name}
                </Tag>
              ))}
            </TagGroup>
          </fieldset>
          <ErrorMessage
            id="impact-areas-error"
            errorText={
              Array.isArray(errors?.impacts)
                ? errors?.impacts[0].message
                : (errors.impacts as FieldError)?.message
            }
          />
        </div>
        <div className="mb-6.5">
          <fieldset>
            <legend className="inline font-sans font-semibold text-sm text-gray-800 mb-4.5">
              <span className="mr-2.5">
                <FormattedMessage
                  defaultMessage="Select in which SDG’s your project will have impact"
                  id="CPO6eS"
                />
              </span>
            </legend>
            <Sdgs
              name="sdgs"
              setValue={setValue}
              errors={errors}
              clearErrors={clearErrors}
              register={register}
              aria-describedby="sdgs-error"
              defaultValues={getValues('sdgs')}
            />
          </fieldset>
          <ErrorMessage
            id="sdgs-error"
            errorText={
              Array.isArray(errors?.sdgs)
                ? errors?.sdgs[0].message
                : (errors.sdgs as FieldError)?.message
            }
          />
        </div>
      </form>
    </div>
  );
};

export default Impact;
