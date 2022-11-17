import React, { FC, useCallback, useEffect, useState } from 'react';

import { ChevronDown, ChevronUp, X as CloseIcon } from 'react-feather';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import { groupBy, isEmpty } from 'lodash-es';

import {
  transformFilterInputsToParams,
  transformFilterParamsToInputs,
  useSearch,
} from 'helpers/pages';

import Button from 'components/button';
import FieldInfo from 'components/forms/field-info';
import Tag from 'components/forms/tag';
import TagGroup from 'components/forms/tag-group';
import Icon from 'components/icon';
import Loading from 'components/loading';
import { EnumTypes, LocationsTypes, Paths } from 'enums';
import { logEvent } from 'lib/analytics/ga';
import { Enum } from 'types/enums';

import { usePriorityLandscapes } from 'services/locations/locations';

import { FiltersProps, FilterForm } from './types';

export const Filters: FC<FiltersProps> = ({ closeFilters, filtersData, filters }) => {
  const { formatMessage } = useIntl();
  const { pathname } = useRouter();

  const doSearch = useSearch();

  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<FilterForm>({
    defaultValues: {
      category: [],
      impact: [],
      instrument_type: [],
      sdg: [],
      ticket_size: [],
      priority_landscape: [],
    },
  });

  const { category, impact, ticket_size, instrument_type, priority_landscape, sdg } = groupBy<Enum>(
    filtersData,
    'type'
  );

  const { priorityLandscapes } = usePriorityLandscapes();

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
        priority_landscape?.map(({ id, name }) => ({
          id,
          type: LocationsTypes.PriorityLandscapes,
          name,
        })) ?? [],
    },
  ];

  const onClearFilters = useCallback(() => {
    if (!isEmpty(filters)) {
      // Perform new search to remove filters only if are filters applied
      doSearch(undefined, {});
    }
    reset();
    closeFilters();
  }, [closeFilters, doSearch, filters, reset]);

  const onSubmitFilters = useCallback(() => {
    const newFilterParams = transformFilterInputsToParams(getValues());
    doSearch(undefined, newFilterParams);
    closeFilters();
  }, [closeFilters, doSearch, getValues]);

  const onClickFilter = useCallback(
    (filterId: string, filterType: keyof FilterForm) => {
      const filterFormValue = getValues(filterType);

      // Whether the filter was just toggled on (but still not applied)
      const toggledOn = Array.isArray(filterFormValue)
        ? !!filterFormValue.find((v) => v === filterId)
        : filterFormValue === filterId;

      if (!toggledOn) {
        // We're just sending the analytics event if the user is toggling on a new filter
        return;
      }

      let filterName = filterId;

      if (filterType === 'priority_landscape' && !!priorityLandscapes?.length) {
        filterName =
          priorityLandscapes.find((priorityLandscape) => priorityLandscape.id === filterName)
            ?.code ?? filterName;
      } else if (filterType === 'sdg') {
        filterName = `sdg-${filterName}`;
      }

      logEvent(pathname !== Paths.Home ? 'discover_filter_selected' : 'homepage_filter_selected', {
        filter_name: filterName,
      });
    },
    [pathname, priorityLandscapes, getValues]
  );

  /* VERIFICATION FILTERS: HIDDEN
  const onCheckboxChange = (ev: any) => {
    const { name, checked } = ev.target;
    setValue(name, checked);
    setFiltersInputValue({ ...filtersInputValue, [name]: checked });
  };
  */

  useEffect(() => {
    const filterInputs = transformFilterParamsToInputs(filters);
    Object.entries(filterInputs).forEach(([key, value]) => {
      setValue(key as keyof FilterForm, value);
    });
  }, [filters, setValue]);

  return (
    <div
      id="filters"
      role="region"
      aria-labelledby="filters-button"
      className="flex-grow w-full overflow-hidden bg-white border-t-2 sm:absolute border-t-gray-200 sm:rounded-b-3xl"
    >
      {!filters ? (
        <Loading />
      ) : (
        <form
          className="relative flex flex-col justify-between h-full overflow-hidden"
          onSubmit={handleSubmit(onSubmitFilters)}
        >
          <Button
            theme="naked"
            size="smallest"
            className="absolute hidden sm:block top-6 right-6"
            onClick={closeFilters}
          >
            <span className="sr-only">
              <FormattedMessage defaultMessage="Close filters" id="78vrMq" />
            </span>
            <CloseIcon className="w-4 h-4 transition-transform rotate-0 hover:rotate-180" />
          </Button>
          <div className="p-6 pb-0 overflow-y-auto">
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
            <div className="flex flex-col flex-wrap px-1 gap-y-4">
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
                          type="checkbox"
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
                                onChange: () => onClickFilter(id, type),
                              }}
                              type="checkbox"
                              isfilterTag
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
            <div className="flex px-1 my-4">
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
                className="px-1 mb-4"
                id="more-filters"
                role="region"
                aria-labelledby="more-filters-button"
              >
                <fieldset>
                  <legend className="inline mb-3 font-sans text-base font-medium text-black sm:mb-2">
                    <FormattedMessage defaultMessage="SDGs" id="JQjEP9" />
                  </legend>

                  <div className="flex flex-wrap gap-4">
                    <TagGroup
                      name="sdg"
                      type="checkbox"
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
                            onChange: () => onClickFilter(id, type as keyof FilterForm),
                          }}
                          type="checkbox"
                          isfilterTag
                        >
                          <span className="block">{name}</span>
                        </Tag>
                      ))}
                    </TagGroup>
                  </div>
                </fieldset>
              </div>
            )}
            <p className="mb-4 text-sm text-gray-600 sm:hidden sm:mb-0">
              <FormattedMessage
                defaultMessage="Note: Some filters don't apply to all tabs"
                id="mzDeDO"
              />
            </p>
          </div>
          <div className="flex-shrink-0 p-4 sm:items-center sm:justify-between sm:flex sm:gap-2 sm:mb-0 sm:ml-0 sm:w-auto shadow-lg-top sm:shadow-none sm: sm:p-6 sm:relative sm:pt-4">
            <p className="hidden mb-4 text-sm text-gray-600 sm:block sm:mb-0">
              <FormattedMessage
                defaultMessage="Note: Some filters don't apply to all tabs"
                id="mzDeDO"
              />
            </p>
            <div className="flex justify-between w-full gap-2 sm:mt-0 sm:gap-4 sm:px-0 sm:py-0 sm:w-auto">
              {/* Don't show this button on home page, because there will never have filters applied */}
              {pathname !== Paths.Home && (
                <Button
                  theme="secondary-green"
                  className="justify-center sm:justify-between"
                  onClick={onClearFilters}
                >
                  <FormattedMessage defaultMessage="Clear filters" id="F4gyn3" />
                </Button>
              )}
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
