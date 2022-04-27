import { FieldError } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import Sdgs from 'containers/forms/sdgs';

import ErrorMessage from 'components/forms/error-message';
import FieldInfo from 'components/forms/field-info';
import Tag from 'components/forms/tag';
import TagGroup from 'components/forms/tag-group';

import { ImpactProps } from '../types';

export const Impact = ({ register, errors, impacts, setValue, clearErrors }: ImpactProps) => {
  const { formatMessage } = useIntl();

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold mb-2.5">
        <FormattedMessage defaultMessage="Impact" id="W2JBdp" />
      </h1>
      <p className="mb-10 text-gray-600">
        <FormattedMessage
          defaultMessage="What’s the impact of your project and what do you want to achieve"
          id="BkLlj6"
        />
      </p>
      <form noValidate>
        <div className="mb-6.5">
          <fieldset name="impact_areas">
            <legend className="inline font-sans font-semibold text-sm text-gray-800 mb-4.5">
              <span className="mr-2.5">
                <FormattedMessage
                  defaultMessage="Select which areas your project will have an impact on"
                  id="hg7Mex"
                />
              </span>
              <FieldInfo
                infoText={formatMessage({
                  defaultMessage: 'This will help us measure the impact of your project',
                  id: 'eTuDrh',
                })}
              />
            </legend>
            <TagGroup
              name="impact_areas"
              setValue={setValue}
              errors={errors}
              clearErrors={clearErrors}
            >
              {impacts?.map((item) => (
                <Tag
                  key={item.id}
                  id={item.id}
                  name="impact_areas"
                  value={item.id}
                  aria-describedby="impact-areas-error"
                  register={register}
                >
                  {item.attributes.name}
                </Tag>
              ))}
            </TagGroup>
          </fieldset>
          <ErrorMessage
            id="impact-areas-error"
            errorText={
              Array.isArray(errors?.impact_areas)
                ? errors?.impact_areas[0].message
                : (errors.impact_areas as FieldError)?.message
            }
          />
        </div>
        <div className="mb-6.5">
          <fieldset name="sdgs">
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
