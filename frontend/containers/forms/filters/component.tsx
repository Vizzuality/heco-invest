import React, { FC, useEffect, useState } from 'react';

import { ChevronDown, ChevronUp, X as CloseIcon } from 'react-feather';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import { useRouter } from 'next/router';

import { useQueryParams } from 'helpers/pages';

import Button from 'components/button';
import Checkbox from 'components/forms/checkbox';
import FieldInfo from 'components/forms/field-info';
import Tag from 'components/forms/tag';
import TagGroup from 'components/forms/tag-group';
import Icon from 'components/icon';
import Loading from 'components/loading';
import { EnumTypes } from 'enums';

import { useEnums } from 'services/enums/enumService';

import { FiltersProps, FilterForm, FilterParams } from './types';

export const Filters: FC<FiltersProps> = ({ closeFilters }) => {
  const { formatMessage } = useIntl();
  const { push } = useRouter();
  const { page, search, sorting, ...initialFilters } = useQueryParams();

  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [filtersState, setFiltersState] = useState<Partial<FilterForm>>({});

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

  const filters = [category, impact, ticket_size, instrument_type];

  const legends = [
    formatMessage({ defaultMessage: 'Category', id: 'ccXLVi' }),
    formatMessage({ defaultMessage: 'Impact', id: 'W2JBdp' }),
    formatMessage({ defaultMessage: 'Ticket size', id: 'lfx6Nc' }),
    formatMessage({ defaultMessage: 'Instrument', id: 'wduJme' }),
  ];

  const handleFilter = (filterParams?: FilterParams) => {
    if (filterParams) {
      // Replace or add the new filters to the search params
      push({ query: { page: 1, search, sorting, ...filterParams } }, undefined, {
        shallow: true,
      });
    } else {
      // Clear the filters removing them from the search params
      push({ query: { page: 1, search, sorting } }, undefined, {
        shallow: true,
      });
    }
    closeFilters();
  };

  const onSubmit: SubmitHandler<FilterForm> = (filters) => {
    let filterParams: Partial<FilterParams> = {};
    if (filters) {
      // Create the search params with the API params format
      Object.entries(filters).forEach(([key, value]) => {
        // Just send the used filters
        if (value === true) {
          filterParams[`filter[${key}]`] = `${value}`;
        }
        if (typeof value === 'string') {
          filterParams[`filter[${key}]`] = value;
        }
      });
      // Replace the filter values
      handleFilter(filterParams as FilterParams);
    } else {
      // Remove the filters
      handleFilter();
    }
  };

  const handleClear = () => {
    handleFilter();
    reset();
  };

  useEffect(() => {
    // If I have the search params when the component mounts, I set the for values according to them.
    Object.entries(initialFilters as unknown as FilterParams).forEach(([key, value]) => {
      // Change the filter param name to the form input name
      const filterName = key.replace('filter[', '').replace(']', '');
      // The only_verified field is a boolean, so it is parsed from a string. The other ones are string arrays, so they are parsed from string to array using split
      const filterValue: boolean | string =
        filterName === 'only_verified' ? JSON.parse(value) : value;
      setValue(filterName as keyof FilterForm, filterValue);
      setFiltersState((initialFilterState) => ({
        ...initialFilterState,
        [filterName]: filterValue,
      }));
    });
    // The dependencies are empty because we just need it to run on mounting and to avoid a infinit loop
  }, []);

  const onChange = (ev: any) => {
    const { value, name } = ev.target;
    // Remove check when clicking on a ckecked tag
    if (filtersState[name] === value) {
      setValue(name, undefined);
      setFiltersState({ ...filtersState, [name]: undefined });
      return;
    }

    setValue(name, value);
    setFiltersState({ ...filtersState, [name]: value });
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="p-6">
      <Button
        theme="naked"
        icon={CloseIcon}
        className="absolute px-0 py-0 right-4"
        onClick={closeFilters}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="flex items-center mb-4">
            <Checkbox id="verified" name="only_verified" register={register} />
            <label htmlFor="verified" className="mt-1 text-sm font-normal text-gray-800">
              <FormattedMessage defaultMessage="Show verified content only" id="i9eK6b" />
            </label>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-y-4">
            {filters?.map((item, index) => {
              const fieldName = item[0].type;
              return (
                <div
                  key={fieldName}
                  className={cx({
                    'sm:w-2/3 sm:pr-10': index % 2 === 0,
                    'sm:w-1/3': index % 2 !== 0,
                  })}
                >
                  <fieldset>
                    <legend className="inline font-sans text-base font-medium text-black mb-3">
                      <span className="mr-2 font-sans font-semibold text-sm text-gray-800">
                        {legends[index]}
                      </span>
                      <FieldInfo
                        infoText={
                          <ul>
                            {item.map(({ name, id, description }) => (
                              <li key={id} className="mb-2">
                                <p className="font-bold ">{name}</p>
                                <p>{description}</p>
                              </li>
                            ))}
                          </ul>
                        }
                      />
                    </legend>

                    <TagGroup
                      key={fieldName}
                      name={fieldName}
                      type="radio"
                      clearErrors={clearErrors}
                      setValue={setValue}
                      errors={errors}
                      thresholdToShowSelectAll={Infinity}
                      className="flex flex-wrap gap-2"
                      isFilterTag
                    >
                      {item.map(({ name, id, type, description }) => (
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
              id="more-filters"
              role="region"
              aria-labelledby="more-filters-button"
              className="mb-6"
            >
              <fieldset>
                <legend className="inline font-sans text-base font-medium text-black mb-3">
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
          <div className="sm:flex justify-between items-center text-sm text-gray-600">
            <div className="mb-4 sm:mb-0">
              <p>
                <FormattedMessage
                  defaultMessage="Note: Some filters not apply to all tabs"
                  id="j4lBL7"
                />
              </p>
            </div>
            <div className="flex justify-end gap-4">
              <Button theme="secondary-green" onClick={handleClear}>
                <FormattedMessage defaultMessage="Clear filters" id="F4gyn3" />
              </Button>
              <Button theme="primary-green" type="submit">
                <FormattedMessage defaultMessage="Apply" id="EWw/tK" />
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Filters;
