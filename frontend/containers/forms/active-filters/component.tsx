import { FC, useMemo } from 'react';

import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import {
  transformFilterInputsToParams,
  transformFilterParamsToInputs,
  useSearch,
} from 'helpers/pages';

import Tag from 'components/forms/tag';
import TagGroup from 'components/forms/tag-group';
import { EnumTypes } from 'enums';
import { Enum } from 'types/enums';

import { ActiveFilterProps } from '.';

export const ActiveFilters: FC<ActiveFilterProps> = ({ filters = {}, filtersData }) => {
  const doSearch = useSearch();

  const activeFilters: Enum[] = useMemo(
    () =>
      Object.entries(transformFilterParamsToInputs(filters)).reduce((prev, [key, value]) => {
        const filters =
          value?.length > 0
            ? filtersData.filter((data) => data.type === key && value.includes(data.id))
            : [];

        return [...prev, ...filters];
      }, []),
    [filters, filtersData]
  );

  const {
    register,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<{ activeFilters: string[] }>({
    defaultValues: { activeFilters: activeFilters.map(({ id }) => id) },
  });

  const handleDeleteActiveFilter = (activeFilter: Enum) => {
    const newFilters = transformFilterParamsToInputs(filters);
    newFilters[activeFilter.type] = newFilters[activeFilter.type].filter(
      (value) => value !== activeFilter.id
    );
    doSearch(undefined, transformFilterInputsToParams(newFilters));
  };

  return (
    <div className="hidden w-full px-6 py-4 bg-white border-t-2 sm:flex sm:items-center border-t-gray-200 rounded-b-3xl">
      <fieldset className="w-full">
        <legend className="float-left mr-2 text-gray-700">
          <FormattedMessage defaultMessage="Active filters" id="tjunxL" />
        </legend>
        <TagGroup
          isFilterTag
          clearErrors={clearErrors}
          setValue={setValue}
          errors={errors}
          thresholdToShowSelectAll={Infinity}
        >
          {activeFilters?.map((filter) => (
            <Tag
              key={`${filter.type}-${filter.id}`}
              type="checkbox"
              name="active-filters"
              id={`${filter.type}-${filter.id}`}
              register={register}
              registerOptions={{
                onChange: () => handleDeleteActiveFilter(filter),
              }}
              isfilterTag
              checked
              showDeleteIcon
            >
              {filter.type === EnumTypes.TicketSize ? filter.description : filter.name}
            </Tag>
          ))}
        </TagGroup>
      </fieldset>
    </div>
  );
};

export default ActiveFilters;
