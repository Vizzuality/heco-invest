import { FC, useMemo } from 'react';

import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import { omitBy } from 'lodash-es';

import { useSearch } from 'helpers/pages';

import Button from 'components/button';
import Tag from 'components/forms/tag';
import TagGroup from 'components/forms/tag-group';
import { Enum } from 'types/enums';

import { SeachAutoSuggestionProps } from './types';

export const SearchAutoSuggestion: FC<SeachAutoSuggestionProps> = ({
  searchText,
  filters,
  filtersData,
}) => {
  const selectedFilters = useMemo(() => Object.values(filters), [filters]);
  const doSearch = useSearch();

  const {
    register,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<{ sugestedFilters: Enum[] }>();

  const handleFilterSuggestion = (filter: Enum) => {
    const filterKey = `filter[${filter.type}]`;
    if (selectedFilters.includes(filter.id)) {
      const newFilters = omitBy(filters, (value, key) => value === filter.id);
      doSearch(undefined, newFilters);
    } else {
      doSearch(undefined, { ...filters, [filterKey]: filter.id });
    }
  };

  const handleSearchSuggestion = () => {
    doSearch(searchText, filters);
  };

  const autoSuggestions = useMemo(() => {
    if (searchText?.length >= 1) {
      return filtersData
        ?.filter(({ name }) => {
          return name.toLowerCase().includes(searchText.toLowerCase());
        })
        .sort((a) => {
          // Returns first the ones that match the beginning of the search text first
          return a.name.toLowerCase().startsWith(searchText.toLowerCase()) ||
            a.id[0] === searchText.toLowerCase()[0]
            ? -1
            : 1;
        });
    }
  }, [filtersData, searchText]);

  return (
    <div
      id="filters"
      role="region"
      aria-labelledby="filters-button"
      className={cx('w-full bg-white border-t-2 border-t-gray-200', {
        'rounded-b-3xl': !selectedFilters?.length,
        'rounded-b-3xl sm:rounded-b-none': !!selectedFilters?.length,
      })}
    >
      {searchText?.length >= 1 && (
        <div className="px-4 py-2 sm:py-5 sm:px-9">
          <div>
            <Button
              key="custom"
              theme="naked"
              className="flex flex-wrap px-0 py-2 focus-visible:outline-green-dark"
              onClick={handleSearchSuggestion}
            >
              <span className="text-left break-all">&quot;{searchText}&quot;</span>
              <span className="ml-2 text-gray-600">
                <FormattedMessage defaultMessage="Custom search" id="AoHRBG" />
              </span>
            </Button>
          </div>
          <div
            className={cx({
              hidden: !autoSuggestions?.length,
              block: !!autoSuggestions?.length,
            })}
          >
            <fieldset>
              <legend className="py-2 text-sm text-gray-800">
                <FormattedMessage defaultMessage="Filters" id="zSOvI0" />
              </legend>
              <div>
                <TagGroup
                  className="inline"
                  isFilterTag
                  clearErrors={clearErrors}
                  setValue={setValue}
                  errors={errors}
                  thresholdToShowSelectAll={Infinity}
                >
                  {autoSuggestions?.map((filter) => {
                    const isSelected = selectedFilters.includes(filter.id);
                    return (
                      <Tag
                        type="checkbox"
                        name="sugestedFilters"
                        id={filter.id}
                        key={filter.id}
                        register={register}
                        onClick={() => handleFilterSuggestion(filter)}
                        isfilterTag
                        className="inline"
                        checked={isSelected}
                      >
                        {filter.name}
                      </Tag>
                    );
                  })}
                </TagGroup>
              </div>
            </fieldset>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAutoSuggestion;
