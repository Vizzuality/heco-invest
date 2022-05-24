import { X as CloseIcon } from 'react-feather';

import { useRouter } from 'next/router';

import { omit } from 'lodash-es';

import { useQueryParams } from 'helpers/pages';

import Button from 'components/button';
import Icon from 'components/icon';
import sdgs from 'mockups/sdgs.json';

export const FilterTags = () => {
  const { page, search, sorting, ...filters } = useQueryParams();
  const { push } = useRouter();

  const removeFilter = (filterName: string) => {
    const newFilters = omit(filters, filterName);
    push({
      query: {
        page,
        search,
        sorting,
        ...newFilters,
      },
    });
  };

  return (
    <div className="flex justify-center w-full gap-2 mb-4">
      {Object.entries(filters).map(([key, value]) => {
        let tagName = value;
        if (key.includes('sdg')) {
          tagName = sdgs.find(({ id }) => id === value)?.name;
        }
        if (key.includes('verified')) {
          tagName = 'verified';
        }
        return (
          <Button
            key={key}
            theme="naked"
            className="block px-4 py-2 border text-md border-green-dark text-green-dark bg-green-light bg-opacity-20"
            onClick={() => removeFilter(key)}
            // size="small"
          >
            <span className="truncate">{tagName}</span>
            <Icon icon={CloseIcon} width={10} height={10} />
          </Button>
        );
      })}
    </div>
  );
};

export default FilterTags;
