import { useRouter } from 'next/router';

import { useQueryParams } from 'helpers/pages';

export const useSortChange = ({
  substitutions = {},
}: {
  substitutions: Record<string, string>;
}) => {
  const router = useRouter();
  const queryParams = useQueryParams();

  const sortChangeHandler = ({
    sortBy,
    sortOrder,
  }: {
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  }) => {
    const [querySortBy, querySortOrder] = queryParams.sorting.split(' ');
    if (querySortBy === (substitutions[sortBy] || sortBy) && querySortOrder === sortOrder) return;

    router.push({
      query: {
        ...queryParams,
        sorting: `${substitutions[sortBy] || sortBy} ${sortOrder}`,
      },
    });
  };

  return sortChangeHandler;
};
