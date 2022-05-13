import { useMemo, useState, useEffect } from 'react';

import { useRouter } from 'next/router';

export const usePagination = (meta) => {
  const router = useRouter();
  const { query } = router;

  // We're keeping a because when data is being fetched, meta will be null.
  // This allows us to keep the pagination visible until new data arrives.
  const [paginationProps, setPaginationProps] = useState<{
    numItems: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
  }>({
    numItems: undefined,
    totalItems: undefined,
    currentPage: undefined,
    totalPages: undefined,
  });

  const queryParams = useMemo(
    () => ({
      page: parseInt(query.page as string) || 1,
      search: (query.search as string) || '',
    }),
    [query]
  );

  useEffect(() => {
    if (!meta) return;

    const { itemsPerPage, totalItems, currentPage, totalPages } = {
      itemsPerPage: parseInt(meta.per_page),
      totalItems: parseInt(meta.total),
      currentPage: parseInt(meta.page),
      totalPages: parseInt(meta.pages),
    };

    // If we're on the current page, the number of items being displayed may not match the
    // items per page. We can use the modulo operator to divide total items by the items per page
    // to get the remainder. If it's 0, the number of items is the same number as per page. If not
    // we use the remainder.
    const numItems = (() => {
      if (currentPage === totalPages) {
        const remainingItems = totalItems % itemsPerPage;
        return remainingItems === 0 ? itemsPerPage : remainingItems;
      } else {
        return itemsPerPage;
      }
    })();

    setPaginationProps({ numItems, totalItems, currentPage, totalPages });
  }, [meta]);

  const handlePageClick = (page: number) => {
    router.push({ query: { ...queryParams, page } });
  };

  if (!paginationProps) return null;

  return {
    props: {
      ...paginationProps,
      onPageClick: handlePageClick,
    },
  };
};
