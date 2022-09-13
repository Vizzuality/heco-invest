import React, { FC, useEffect, useState } from 'react';

import { ChevronDown, ChevronUp, X as CloseIcon } from 'react-feather';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { groupBy } from 'lodash-es';

import {
  transformFilterInputsToParams,
  transformFilterParamsToInputs,
  useSearch,
} from 'helpers/pages';

import Button from 'components/button';
import Checkbox from 'components/forms/checkbox';
import FieldInfo from 'components/forms/field-info';
import Tag from 'components/forms/tag';
import TagGroup from 'components/forms/tag-group';
import Icon from 'components/icon';
import Loading from 'components/loading';
import { EnumTypes, LocationsTypes } from 'enums';
import { Enum } from 'types/enums';

import { FiltersProps, FilterForm } from './types';

export const Filters: FC<FiltersProps> = ({ closeFilters, filtersData, filters }) => {
  const { formatMessage } = useIntl();

  const [filtersInputValue, setFiltersInputValue] = useState<Partial<FilterForm>>({});
  const doSearch = useSearch();

  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FilterForm>();

  const { category, impact, ticket_size, instrument_type, priorityLandscapes, sdg } = groupBy<Enum>(
    filtersData,
    'type'
  );

  const filterTexts = [
    { title: formatMessage({ defaultMessage: 'Category', id: 'ccXLVi' }), values: category },
    { title: formatMessage({ defaultMessage: 'Impact', id: 'W2JBdp' }), values: impact },
    { title: formatMessage({ defaultMessage: 'Ticket size', id: 'lfx6Nc' }), values: ticket_size },
    {
      title: formatMessage({ defaultMessage: 'Instrument', id: 'wduJme' }),
      values: instrument_type,
    },
    {
      title: formatMessage({ defaultMessage: 'Priority landscape', id: 'dwB95+' }),
      description: formatMessage(
        {
          defaultMessage:
            'Priority landscapes are <b>unique regions</b> due to their biodiversity, cultural heritages, and regulation of water systems. As such, the projects located in these landscapes will have the greatest impact on people and nature.',
          id: 'zyG32m',
        },
        {
          b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
        }
      ),
      values:
        priorityLandscapes?.map(({ id, name }) => ({
          id,
          type: LocationsTypes.PriorityLandscapes,
          name,
        })) ?? [],
    },
  ];

  const handleClear = () => {
    doSearch(undefined, {});
    reset();
    closeFilters();
  };

  useEffect(() => {
    const filterInputs = transformFilterParamsToInputs(filters);
    Object.entries(filterInputs).forEach(([key, value]) => {
      setValue(key as keyof FilterForm, value);
    });
    setFiltersInputValue(filterInputs);
  }, [filters, setValue]);

  const onChange = (ev: any) => {
    const { value, name } = ev.target;
    // Remove check when clicking on a checked tag
    if (filtersInputValue[name] === value) {
      setValue(name, undefined);
      setFiltersInputValue({ ...filtersInputValue, [name]: undefined });
      return;
    }

    setValue(name, value);
    setFiltersInputValue({ ...filtersInputValue, [name]: value });
  };

  const onSubmitFilters = () => {
    const newFilterParams = transformFilterInputsToParams(filtersInputValue);
    doSearch(undefined, newFilterParams);
    closeFilters();
  };

  /* VERIFICATION FILTERS: HIDDEN
  const onCheckboxChange = (ev: any) => {
    const { name, checked } = ev.target;
    setValue(name, checked);
    setFiltersInputValue({ ...filtersInputValue, [name]: checked });
  };
  */

  return (
    <div
      id="filters"
      role="region"
      aria-labelledby="filters-button"
      className="w-full overflow-hidden bg-white border-t-2 border-t-gray-200 rounded-b-3xl"
    >
      {!filters ? (
        <Loading />
      ) : (
        <form className="relative flex flex-col p-6" onSubmit={handleSubmit(onSubmitFilters)}>
          <Button
            theme="naked"
            size="smallest"
            className="absolute top-6 right-6"
            onClick={closeFilters}
          >
            <span className="sr-only">
              <FormattedMessage defaultMessage="Close filters" id="78vrMq" />
            </span>
            <CloseIcon className="w-4 h-4 transition-transform rotate-0 hover:rotate-180" />
          </Button>
          <div className="overflow-y-auto">
            {/* VERIFICATION FILTERS: HIDDEN
            <div className="flex justify-between">
              <div className="flex items-center mb-4">
                <Checkbox
                  id="verified"
                  name="only_verified"
                  register={register}
                  registerOptions={{ onChange: onCheckboxChange }}
                />
                <label htmlFor="verified" className="mt-1 text-sm font-normal text-gray-800">
                  <FormattedMessage defaultMessage="Show verified content only" id="i9eK6b" />
                </label>
              </div>
            </div> */}
            <div className="flex flex-col flex-wrap gap-y-4">
              {filterTexts?.map((filter) => {
                return (
                  <div key={filter.title}>
                    <fieldset>
                      <legend className="inline mb-3 font-sans text-base font-medium text-black">
                        <span className="mr-2 font-sans text-sm font-semibold text-gray-800">
                          {filter.title}
                        </span>
                        <FieldInfo
                          content={
                            filter.description ? (
                              filter.description
                            ) : (
                              <ul>
                                {filter.values?.map((value) => (
                                  <li key={value.id} className="mb-2">
                                    <p className="font-bold ">{value.name}</p>
                                    {!!value.description && <p>{value.description}</p>}
                                  </li>
                                ))}
                              </ul>
                            )
                          }
                        />
                      </legend>

                      {!!filter.values?.length && (
                        <TagGroup
                          name={filter.values?.[0].type}
                          type="radio"
                          clearErrors={clearErrors}
                          setValue={setValue}
                          errors={errors}
                          thresholdToShowSelectAll={Infinity}
                          className="flex flex-wrap gap-2"
                          isFilterTag
                        >
                          {filter.values.map(({ name, id, type, description }) => (
                            <Tag
                              key={id}
                              id={`${id}-tag`}
                              name={type}
                              value={id}
                              register={register}
                              registerOptions={{
                                disabled: false,
                                onChange,
                              }}
                              type="radio"
                              isfilterTag
                              onClick={onChange}
                            >
                              <span className="block">
                                {type === EnumTypes.TicketSize ? description : name}
                              </span>
                            </Tag>
                          ))}
                        </TagGroup>
                      )}
                    </fieldset>
                  </div>
                );
              })}
            </div>
            <div className="flex my-4">
              {/* More filters accordion header https://www.w3.org/WAI/ARIA/apg/example-index/accordion/accordion.html */}
              <h3>
                <Button
                  onClick={() => setShowMoreFilters(!showMoreFilters)}
                  theme="naked"
                  className="px-0 py-0 font-sans text-base font-medium text-black"
                  id="more-filters-button"
                  aria-expanded={showMoreFilters}
                  aria-controls="more-filters"
                >
                  <FormattedMessage defaultMessage="More filters" id="vdJRZj" />
                  <Icon className="w-5 h-5 ml-1" icon={showMoreFilters ? ChevronUp : ChevronDown} />
                </Button>
              </h3>
            </div>
            {/* More filters accordion pannel */}
            {showMoreFilters && (
              <div
                className="mb-4"
                id="more-filters"
                role="region"
                aria-labelledby="more-filters-button"
              >
                <fieldset>
                  <legend className="inline mb-3 font-sans text-base font-medium text-black sm:mb-2">
                    <FormattedMessage defaultMessage="SDG's" id="d3TPmn" />
                  </legend>

                  <div className="flex flex-wrap gap-4">
                    <TagGroup
                      name="sdg"
                      type="radio"
                      clearErrors={clearErrors}
                      setValue={setValue}
                      errors={errors}
                      thresholdToShowSelectAll={Infinity}
                      isFilterTag
                    >
                      {sdg.map(({ name, type, id }) => (
                        <Tag
                          key={id}
                          id={`${id}-tag`}
                          name={type}
                          value={id}
                          register={register}
                          registerOptions={{
                            disabled: false,
                            onChange,
                          }}
                          type="radio"
                          isfilterTag
                          onClick={onChange}
                        >
                          <span className="block">{name}</span>
                        </Tag>
                      ))}
                    </TagGroup>
                  </div>
                </fieldset>
              </div>
            )}
          </div>
          <div className="items-center justify-between flex-shrink-0 gap-4 pt-2 sm:pt-4 sm:flex">
            <p className="mb-4 text-sm text-gray-600 sm:mb-0">
              <FormattedMessage
                defaultMessage="Note: Some filters not apply to all tabs"
                id="j4lBL7"
              />
            </p>
            <div className="flex flex-col gap-2 sm:gap-4 sm:flex-row">
              <Button
                theme="secondary-green"
                className="justify-center sm:justify-between"
                onClick={handleClear}
              >
                <FormattedMessage defaultMessage="Clear filters" id="F4gyn3" />
              </Button>
              <Button
                theme="primary-green"
                className="justify-center sm:justify-between"
                type="submit"
              >
                <FormattedMessage defaultMessage="Search" id="xmcVZ0" />
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Filters;
