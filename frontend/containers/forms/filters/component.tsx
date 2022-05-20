import React, { FC, useEffect, useState } from 'react';

import { ChevronDown, ChevronUp } from 'react-feather';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import { useQueryParams } from 'helpers/pages';

import Button from 'components/button';
import Checkbox from 'components/forms/checkbox';
import Combobox, { Option } from 'components/forms/combobox';
import FieldInfo from 'components/forms/field-info';
import Label from 'components/forms/label';
import Tag from 'components/forms/tag';
import TagGroup from 'components/forms/tag-group';
import Icon from 'components/icon';
import sdg from 'mockups/sdgs.json';

import { useEnums } from 'services/enums/enumService';

import { FiltersProps, FilterForm, FilterParams } from './types';

export const Filters: FC<FiltersProps> = ({ closeFilters }) => {
  const { formatMessage } = useIntl();
  const { push } = useRouter();
  const { page, search, ...initialFilters } = useQueryParams();

  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const {
    register,
    reset,
    control,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FilterForm>();

  const {
    data: { category, ticket_size, instrument_type },
  } = useEnums();

  const filters = [instrument_type, ticket_size, category, sdg];

  const legends = [
    formatMessage({ defaultMessage: 'Instrument', id: 'wduJme' }),
    formatMessage({ defaultMessage: 'Ticket size', id: 'lfx6Nc' }),
    formatMessage({ defaultMessage: 'Category', id: 'ccXLVi' }),
    formatMessage({ defaultMessage: 'SDG', id: 'JUqdD1' }),
  ];

  const handleFilter = (filterParams?: FilterParams) => {
    if (filterParams) {
      // Replace or add the new filters to the search params
      push({ query: { page: 1, search, ...filterParams } }, undefined, {
        shallow: true,
      });
    } else {
      // Clear the filters removing them from the search params
      push({ query: { page: 1, search } }, undefined, {
        shallow: true,
      });
    }
    closeFilters();
  };

  const onSubmit: SubmitHandler<FilterForm> = (filters) => {
    let filterParams: FilterParams | {} = {};
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
    if (initialFilters) {
      // If I have the search params when the component mouts, I set the for values according to them.
      Object.entries(initialFilters as FilterParams).forEach(([key, value]) => {
        // Change the filter param name to the form input name
        const filterName = key.replace('filter[', '').replace(']', '');
        // The only_verified field is a boolean, so it is parsed from a string. The other ones are string arrays, so they are parsed from string to array using split
        const filterValue: boolean | string =
          filterName === 'only_verified' ? JSON.parse(value) : value;
        setValue(filterName as keyof FilterForm, filterValue);
      });
    }
  }, [initialFilters, setValue]);

  const onChange = (ev: any) => {
    // The imputs that are both on the tags and comboboxes need to be controled.
    const { value, name } = ev.target;
    setValue(name, value);
  };

  return (
    <form className="p-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div>
          <fieldset>
            <legend className="inline font-sans text-base font-medium text-black mb-4.5">
              <FormattedMessage defaultMessage="Suggested searches" id="ELAH/f" />
            </legend>

            <div className="flex flex-wrap gap-4">
              {category &&
                instrument_type &&
                [category, instrument_type].map((item) => {
                  return (
                    <TagGroup
                      key={item[0].type}
                      name={item[0].type}
                      type="radio"
                      clearErrors={clearErrors}
                      setValue={setValue}
                      errors={errors}
                      thresholdToShowSelectAll={Infinity}
                    >
                      {item.map(({ name, id, type }) => (
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
                          filterTags
                        >
                          <span className="block">{name}</span>
                        </Tag>
                      ))}
                    </TagGroup>
                  );
                })}
            </div>
          </fieldset>
        </div>

        <div className="flex">
          <Button
            onClick={() => setShowMoreFilters(!showMoreFilters)}
            theme="naked"
            className="px-0 py-0 font-sans text-base font-medium text-black"
          >
            <FormattedMessage defaultMessage="More filters" id="vdJRZj" />
            <Icon className="w-5 h-5 ml-1" icon={showMoreFilters ? ChevronUp : ChevronDown} />
          </Button>
        </div>

        {showMoreFilters && (
          <div>
            <div className="w-full grid-cols-6 gap-4 sm:grid">
              {filters.map((filter, index) => {
                const filterName = filter[0].type as keyof FilterForm;
                return (
                  <div key={filterName} className="mb-4 sm:mb-0 sm:col-span-3">
                    <Label
                      className="block mb-2 font-semibold text-gray-800 text-small"
                      htmlFor={filterName}
                    >
                      <span className="mr-2">{legends[index]}</span>
                      {(filterName === 'category' || filterName === 'instrument_type') && (
                        <FieldInfo
                          infoText={
                            <ul>
                              {filter.map((item) => (
                                <li key={item.id}>
                                  <p className="mb-0.5 font-semibold">{item.name}</p>
                                  <p className="mb-4">{item.description}</p>
                                </li>
                              ))}
                            </ul>
                          }
                        />
                      )}
                    </Label>
                    <Combobox
                      id={filterName}
                      name={filterName}
                      control={control}
                      controlOptions={{
                        disabled: false,
                        onChange,
                      }}
                      className="w-full"
                      placeholder={formatMessage({ defaultMessage: 'Select', id: 'kQAf2d' })}
                    >
                      {filter.map(({ id, name, type, ...rest }) => (
                        <Option key={id}>
                          {type === 'ticket_size' ? `${rest.description} (${name})` : name}
                        </Option>
                      ))}
                    </Combobox>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center mt-4">
              <Checkbox id="verified" name="only_verified" register={register} />
              <label htmlFor="verified" className="mt-1 text-sm font-normal text-gray-800">
                <FormattedMessage defaultMessage="Only show verified content" id="Ju/JXa" />
              </label>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-4">
          <Button theme="secondary-green" onClick={handleClear}>
            <FormattedMessage defaultMessage="Clear filters" id="F4gyn3" />
          </Button>
          <Button theme="primary-green" type="submit">
            <FormattedMessage defaultMessage="Apply" id="EWw/tK" />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Filters;
