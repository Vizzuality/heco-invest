import React, { FC, useEffect, useState } from 'react';

import { ChevronDown, ChevronUp, X as CloseIcon } from 'react-feather';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import Button from 'components/button';
import Checkbox from 'components/forms/checkbox';
import FieldInfo from 'components/forms/field-info';
import Tag from 'components/forms/tag';
import TagGroup from 'components/forms/tag-group';
import Icon from 'components/icon';
import Loading from 'components/loading';
import { EnumTypes, LocationsTypes } from 'enums';

import { useEnums } from 'services/enums/enumService';
import { usePriorityLandscapes } from 'services/locations/locations';

import { FiltersProps, FilterForm } from './types';

export const Filters: FC<FiltersProps> = ({
  closeFilters,
  setFiltersInputValue,
  filtersInputValue,
  onSubmitFilters,
}) => {
  const { formatMessage } = useIntl();

  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FilterForm>();

  const {
    data: { category, ticket_size, instrument_type, impact, sdg },
    isLoading,
  } = useEnums();

  const { priorityLandscapes } = usePriorityLandscapes();

  const filters = [
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
    onSubmitFilters({});
    reset();
  };

  useEffect(() => {
    // If I have the search params when the component mounts, I set the for values according to them.
    Object.entries(filtersInputValue).forEach(([key, value]) => {
      setValue(key as keyof FilterForm, value);
    });
    // The dependencies are empty because we just need it to run on mounting and to avoid a infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (ev: any) => {
    const { value, name } = ev.target;
    // Remove check when clicking on a ckecked tag
    if (filtersInputValue[name] === value) {
      setValue(name, undefined);
      setFiltersInputValue({ ...filtersInputValue, [name]: undefined });
      return;
    }

    setValue(name, value);
    setFiltersInputValue({ ...filtersInputValue, [name]: value });
  };

  const onCheckboxChange = (ev: any) => {
    const { name, checked } = ev.target;
    setValue(name, checked);
    setFiltersInputValue({ ...filtersInputValue, [name]: checked });
  };

  return isLoading ? (
    <Loading />
  ) : (
    <form
      className="relative p-6 max-h-[75vh] flex flex-col"
      onSubmit={handleSubmit(onSubmitFilters)}
    >
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
        </div>

        <div className="flex flex-col flex-wrap gap-y-4">
          {filters?.map((filter) => {
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
                            {filter.values.map((value) => (
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

                  {!!filter.values.length && (
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
          <FormattedMessage defaultMessage="Note: Some filters not apply to all tabs" id="j4lBL7" />
        </p>
        <div className="flex flex-col gap-2 sm:gap-4 sm:flex-row">
          <Button
            theme="secondary-green"
            className="justify-center sm:justify-between"
            onClick={handleClear}
          >
            <FormattedMessage defaultMessage="Clear filters" id="F4gyn3" />
          </Button>
          <Button theme="primary-green" className="justify-center sm:justify-between" type="submit">
            <FormattedMessage defaultMessage="Search" id="xmcVZ0" />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Filters;
