import { FC, useMemo } from 'react';

import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { omitBy } from 'lodash-es';

import {
  transformFilterInputsToParams,
  transformFilterParamsToInputs,
  useSearch,
} from 'helpers/pages';

import Tag from 'components/forms/tag';
import TagGroup from 'components/forms/tag-group';
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

  const handleDeleteActiveFilter = (filterId: string) => {
    const newFilters = omitBy(filters, (value, key) => value === filterId);
    const newFilterParams = transformFilterInputsToParams(newFilters);
    doSearch(undefined, newFilterParams);
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
      </fieldset>
    </div>
  );
};

export default ActiveFilters;
