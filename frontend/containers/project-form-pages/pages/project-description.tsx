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

import { ProjectDescriptionProps } from '../types';

const ProjectDescription = ({
  errors,
  register,
  control,
  setValue,
  clearErrors,
  project_development_stage,
  category,
  target_group,
}: ProjectDescriptionProps) => {
  const { formatMessage } = useIntl();

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold mb-2.5">
        <FormattedMessage defaultMessage="Description of the project" id="35YoEI" />
      </h1>
      <p className="mb-10 text-gray-600">
        <FormattedMessage
          defaultMessage="Tell us what is the project about the problem and the solution to solve it"
          id="/m/QYW"
        />
      </p>
      <form>
        <div>
          <h2 className="mb-2.5 text-gray-600 text-base font-medium">
            <FormattedMessage defaultMessage="Development of the project" id="ztd20l" />
          </h2>
          <div className="md:flex md:gap-6">
            <div className="w-full">
              <Label htmlFor="development-stage" id="development-stage-label">
                <span className="mr-2.5">
                  <FormattedMessage
                    defaultMessage="Stage of development or maturity of the project"
                    id="jUgR7w"
                  />
                </span>
                <FieldInfo
                  infoText={formatMessage({
                    defaultMessage:
                      'Select the stage of development of the project or solution at the time of submitting this pitch',
                    id: '3hV8r4',
                  })}
                />
              </Label>
              <Combobox
                control={control}
                id="development-stage"
                name="development_stage"
                placeholder={formatMessage({ defaultMessage: 'select option', id: 'saBdZ2' })}
                controlOptions={{ disabled: false }}
                aria-required
                aria-describedby="development-stage-error"
                aria-labelledby="development-stage-label"
                className="mt-2.5"
              >
                {project_development_stage?.map(({ id, name }) => (
                  <Option key={id}>{name}</Option>
                ))}
              </Combobox>
              <ErrorMessage
                id="development-stage-error"
                errorText={errors?.development_stage?.message}
              />
            </div>
            <div className="w-full mb-2.5">
              <Label htmlFor="estimated-duration-in-months">
                <span className="mr-2.5">
                  <FormattedMessage
                    defaultMessage="Estimated duration for project in months"
                    id="l2HvdU"
                  />
                </span>
                <FieldInfo
                  infoText={formatMessage({
                    defaultMessage:
                      'Enter the estimated implementation duration for the project. MAX 24 months.',
                    id: '7eO+k/',
                  })}
                />
              </Label>
              <Input
                name="estimated_duration_in_months"
                id="estimated-duration-in-months"
                register={register}
                type="number"
                className="mt-2.5"
                aria-describedby="estimated-duration-in-months-error"
                placeholder={formatMessage({
                  defaultMessage: 'insert number (max 24)',
                  id: 'C0sD76',
                })}
              />
              <ErrorMessage
                id="estimated-duration-in-months-error"
                errorText={errors?.estimated_duration_in_months?.message}
              />
            </div>
          </div>
          <div className="mt-4 mb-8">
            <fieldset>
              <legend className="inline font-sans font-semibold text-sm text-gray-800 mb-4.5">
                <span className="mr-2.5">
                  <FormattedMessage
                    defaultMessage="Which of these topic/sector categories better describe your project?"
                    id="i2AgQl"
                  />
                </span>
                <FieldInfo infoText="MISSING" />
              </legend>
              <TagGroup
                name="category"
                setValue={setValue}
                errors={errors}
                clearErrors={clearErrors}
              >
                {category?.map((item) => (
                  <Tag
                    key={item.id}
                    id={item.id}
                    name="category"
                    value={item.id}
                    aria-describedby="target-groups-error"
                    register={register}
                    type="radio"
                  >
                    <CategoryTagDot category={item.id as CategoryType} />
                    {item.name}
                  </Tag>
                ))}
              </TagGroup>
            </fieldset>
            <ErrorMessage id="categories-error" errorText={errors?.category?.message} />
          </div>
        </div>
        <div className="mb-6.5">
          <Label htmlFor="problem">
            <span className="mr-2.5">
              <FormattedMessage defaultMessage="Problem you are solving" id="xBZz+E" />
            </span>
            <FieldInfo
              infoText={formatMessage({
                defaultMessage:
                  'Describe the problem or market need that your project or solution seeks to address. It should be a very specific problem, not a macro global issue like "climate change" or "poverty". Make sure that your showing that the problem is addressing a specific demand (is real) and it affects the poor and vulnerable population and/or the environment. We recommend using numbers to give a dimension of the problem.',
                id: '6xBvFx',
              })}
            />
          </Label>
          <Textarea
            className="mt-2.5"
            name="problem"
            placeholder={formatMessage({
              defaultMessage: 'insert your answer (max 600 characters)',
              id: 'hPsrc0',
            })}
            register={register}
          />
          <ErrorMessage id="problem-error" errorText={errors?.problem?.message} />
        </div>
        <div className="mb-6.5">
          <Label htmlFor="solution">
            <span className="mr-2.5">
              <FormattedMessage defaultMessage="The solution or opportunity proposed" id="OSAxiC" />
            </span>
            <FieldInfo
              infoText={formatMessage({
                defaultMessage:
                  'Describe the project or solution and describe clearly why you consider it is innovative, different from others and how it can generate an important change and impact towards the target groups. Highlight the characteristics that may attract partners, clients, or investors.',
                id: 'eXDHt0',
              })}
            />
          </Label>
          <Textarea
            className="mt-2.5"
            name="solution"
            placeholder={formatMessage({
              defaultMessage: 'insert your answer (max 600 characters)',
              id: 'hPsrc0',
            })}
            register={register}
          />
          <ErrorMessage id="solution-error" errorText={errors?.solution?.message} />
        </div>
        <div className="mb-6.5">
          <fieldset>
            <legend className="inline font-sans font-semibold text-sm text-gray-800 mb-4.5">
              <span className="mr-2.5">
                <FormattedMessage defaultMessage="Target group" id="0L/mZC" />
              </span>
              <FieldInfo
                infoText={formatMessage({
                  defaultMessage:
                    'Identify the target group(s) of this solution. Try to be very specific and do not cover an unrealistic range of beneficiaries or clients.',
                  id: 'Zht65f',
                })}
              />
            </legend>
            <TagGroup
              name="target_groups"
              setValue={setValue}
              errors={errors}
              clearErrors={clearErrors}
            >
              {target_group?.map((item) => (
                <Tag
                  key={item.id}
                  id={item.id}
                  name="target_groups"
                  value={item.id}
                  aria-describedby="target-groups-error"
                  register={register}
                >
                  {item.name}
                </Tag>
              ))}
            </TagGroup>
          </fieldset>
          <ErrorMessage
            id="target-groups-error"
            errorText={
              Array.isArray(errors?.target_groups)
                ? errors?.target_groups[0].message
                : (errors?.target_groups as unknown as FieldError)?.message
            }
          />
        </div>
        <div className="mb-6.5">
          <Label htmlFor="expected-impact">
            <span className="mr-2.5">
              <FormattedMessage defaultMessage="Expected impact" id="XgaRPC" />
            </span>
            <FieldInfo
              infoText={formatMessage({
                defaultMessage:
                  'Describe briefly the impact that the project is expected to generate to the identified users/beneficiaries. Try to explain how the solution or project will achieve this impact. Also try to give some estimates of the number of people impacted, at least to get an initial idea.',
                id: '4JFhNG',
              })}
            />
          </Label>
          <Textarea
            className="mt-2.5"
            name="expected_impact"
            placeholder={formatMessage({
              defaultMessage: 'insert your answer (max 600 characters)',
              id: 'hPsrc0',
            })}
            register={register}
          />
        </div>
      </form>
    </div>
  );
};

export default ProjectDescription;
