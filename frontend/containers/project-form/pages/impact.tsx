import { useMemo, useCallback } from 'react';

import { FieldError } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import Link from 'next/link';

import { groupBy } from 'lodash-es';

import { FaqPaths } from 'hooks/useFaq';

import Sdgs from 'containers/forms/sdgs';

import Alert from 'components/alert';
import ErrorMessage from 'components/forms/error-message';
import FieldInfo from 'components/forms/field-info';
import Tag from 'components/forms/tag';
import TagGroup from 'components/forms/tag-group';

import { ImpactProps } from '../types';

export const Impact = ({
  register,
  errors,
  impacts,
  impactAreas,
  setValue,
  clearErrors,
  getValues,
  watch,
}: ImpactProps) => {
  const { formatMessage } = useIntl();

  const watchedImpactAreas = watch('impact_areas');

  const impactsByDimension = useMemo(() => groupBy(impactAreas, 'impact'), [impactAreas]);

  /** For a specific impact dimension, return how many options can be selected */
  const getMaxSelectionForImpactDimension = useCallback(
    (impactDimension: string) => (impactsByDimension[impactDimension]?.length ?? 1) - 1,
    [impactsByDimension]
  );

  /** For a specific impact dimension, return how many options have been selected */
  const getImpactSelectionCountForDimension = useCallback(
    (impactDimension: string) => {
      const relevantImpacts = impactsByDimension[impactDimension];
      const impacts = Array.isArray(watchedImpactAreas) ? watchedImpactAreas : [];
      return impacts.filter((impact) => !!relevantImpacts.find(({ id }) => id === impact)).length;
    },
    [watchedImpactAreas, impactsByDimension]
  );

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
        <div className="mb-10">
          <fieldset>
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
            {impacts.map((impact) => (
              <div
                key={impact.id}
                className="mt-4 first-of-type:mt-0 px-4 py-4.5 bg-background-middle rounded-lg"
              >
                <fieldset>
                  <legend className="text-sm text-gray-800 mb-4.5">
                    <span className="font-semibold">{impact.name}</span> (
                    <FormattedMessage
                      defaultMessage="select <b>max. {areasCount}</b> areas"
                      id="xDgU8W"
                      values={{
                        areasCount: getMaxSelectionForImpactDimension(impact.id),
                        b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
                      }}
                    />
                    )
                  </legend>
                  <TagGroup
                    name="impact_areas"
                    setValue={setValue}
                    errors={errors}
                    clearErrors={clearErrors}
                    thresholdToShowSelectAll={Infinity}
                  >
                    {impactsByDimension[impact.id]?.map((item) => (
                      <Tag
                        key={item.id}
                        id={item.id}
                        name="impact_areas"
                        value={item.id}
                        aria-describedby="impact-areas-error"
                        register={register}
                      >
                        {item.name}
                      </Tag>
                    ))}
                  </TagGroup>
                  {getImpactSelectionCountForDimension(impact.id) >
                    getMaxSelectionForImpactDimension(impact.id) && (
                    <Alert type="warning" className="mt-4">
                      <p>
                        <FormattedMessage
                          defaultMessage="If you select <b>all areas</b>, the impact will be 0. Consider choosing only your main direct ones. <a>Learn more</a>"
                          id="uuxwc2"
                          values={{
                            b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
                            a: (chunks: string) => (
                              <Link href={FaqPaths['how-is-the-impact-calculated']}>
                                <a className="underline" target="_blank">
                                  {chunks}
                                </a>
                              </Link>
                            ),
                          }}
                        />
                      </p>
                    </Alert>
                  )}
                </fieldset>
              </div>
            ))}
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
