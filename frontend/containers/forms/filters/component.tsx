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
import { EnumTypes } from 'enums';

import { useEnums } from 'services/enums/enumService';

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

  const filters = [category, impact, ticket_size, instrument_type];

  const legends = [
    formatMessage({ defaultMessage: 'Category', id: 'ccXLVi' }),
    formatMessage({ defaultMessage: 'Impact', id: 'W2JBdp' }),
    formatMessage({ defaultMessage: 'Ticket size', id: 'lfx6Nc' }),
    formatMessage({ defaultMessage: 'Instrument', id: 'wduJme' }),
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
    <div className="p-6">
      <form onSubmit={handleSubmit(onSubmitFilters)}>
        <div>
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
            <Button theme="naked" className="px-0 py-0" onClick={closeFilters}>
              <CloseIcon className="w-4 h-4 transition-transform rotate-0 hover:rotate-180" />
            </Button>
          </div>

          <div className="flex flex-col flex-wrap sm:flex-row gap-y-4">
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
                    <legend className="inline mb-3 font-sans text-base font-medium text-black">
                      <span className="mr-2 font-sans text-sm font-semibold text-gray-800">
                        {legends[index]}
                      </span>
                      <FieldInfo
                        content={
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
                <legend className="inline mb-3 font-sans text-base font-medium text-black">
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
          <div className="items-center justify-between text-sm text-gray-600 sm:flex">
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
                <FormattedMessage defaultMessage="Search" id="xmcVZ0" />
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Filters;
