import { FC, useEffect, useMemo } from 'react';

import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import {
  transformFilterInputsToParams,
  transformFilterParamsToInputs,
  useSearch,
} from 'helpers/pages';

import { FilterForm } from 'containers/forms/filters/types';

import Button from 'components/button';
import Tag from 'components/forms/tag';
import { EnumTypes } from 'enums';

import { SeachAutoSuggestionProps } from './types';

export const SearchAutoSuggestion: FC<SeachAutoSuggestionProps> = ({
  searchText,
  filters,
  filtersData,
  closeSuggestions,
}) => {
  const selectedFilters = useMemo(() => Object.values(filters), [filters]);
  const doSearch = useSearch();

  const { register, setValue, getValues } = useForm<Partial<FilterForm>>({});

  useEffect(() => {
    Object.entries(transformFilterParamsToInputs(filters)).forEach(([key, value]) => {
      setValue(key as keyof FilterForm, value);
    });
  }, [filters, setValue]);

  const handleFilterSuggestion = () => {
    const newFilterParams = transformFilterInputsToParams(getValues());
    doSearch(undefined, newFilterParams);
  };

  const handleSearchSuggestion = () => {
    doSearch(searchText, filters);
    closeSuggestions();
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
      className={cx('w-full bg-white border-t-2 border-t-gray-200 h-[calc(100vh-56px)] sm:h-auto', {
        'rounded-b-3xl': !selectedFilters?.length,
        'sm:rounded-b-none': !!selectedFilters?.length,
      })}
    >
      {searchText?.length >= 1 && (
        <div className="h-full px-4 py-2 sm:py-5 sm:px-9">
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
            className={cx('h-full', {
              hidden: !autoSuggestions?.length,
              block: !!autoSuggestions?.length,
            })}
          >
            <fieldset className="h-full">
              <legend className="py-2 text-sm text-gray-800">
                <FormattedMessage defaultMessage="Filters" id="zSOvI0" />
              </legend>
              <div className="flex flex-wrap h-full gap-2 overflow-y-auto">
                {autoSuggestions?.map((filter) => {
                  return (
                    <Tag
                      type="checkbox"
                      name={filter.type}
                      id={filter.id}
                      key={filter.id}
                      register={register}
                      registerOptions={{
                        onChange: handleFilterSuggestion,
                      }}
                      isfilterTag
                      className="inline"
                      value={filter.id}
                    >
                      {filter.type === EnumTypes.TicketSize ? filter.description : filter.name}
                    </Tag>
                  );
                })}
              </div>
            </fieldset>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAutoSuggestion;
