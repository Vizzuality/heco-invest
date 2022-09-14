import { FC, useMemo } from 'react';

import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { omitBy } from 'lodash-es';

import { transformFilterInputsToParams, useSearch } from 'helpers/pages';

import Tag from 'components/forms/tag';
import TagGroup from 'components/forms/tag-group';
import { Enum } from 'types/enums';

import { ActiveFilterProps } from '.';

export const ActiveFilters: FC<ActiveFilterProps> = ({ filters = {}, filtersData }) => {
  const doSearch = useSearch();

  const activeFilters: Enum[] = useMemo(
    () =>
      Object.entries(filters).reduce((prev, [key, value]) => {
        const data = !!value && filtersData?.find((data) => data.id === value);
        if (data) return [...prev, data];
        return prev;
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

  const handleDeleteActiveFilter = (filterId: string) => {
    const newFilters = omitBy(filters, (value, key) => value === filterId);
    const newFilterParams = transformFilterInputsToParams(newFilters);
    doSearch(undefined, newFilterParams);
  };

  return (
    <div className="flex items-center w-full px-6 py-4 bg-white border-t-2 border-t-gray-200 rounded-b-3xl">
      <span className="mr-2 text-gray-700">
        <FormattedMessage defaultMessage="Active filters" id="tjunxL" />
      </span>
      <TagGroup
        className="inline"
        isFilterTag
        clearErrors={clearErrors}
        setValue={setValue}
        errors={errors}
        thresholdToShowSelectAll={Infinity}
      >
        {activeFilters?.map(({ name, id }) => (
          <Tag
            type="checkbox"
            name="appliedFilters"
            id={id}
            register={register}
            registerOptions={{
              onChange: () => handleDeleteActiveFilter(id),
            }}
            key={id}
            isfilterTag
            checked
            showDeleteIcon
          >
            {name}
          </Tag>
        ))}
      </TagGroup>
    </div>
  );
};

export default ActiveFilters;
