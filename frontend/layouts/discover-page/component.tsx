import React, { FC, useEffect, useMemo, useRef, useState } from 'react';

import cx from 'classnames';

import { useRouter } from 'next/router';

import { cleanQueryParams, useQueryParams } from 'helpers/pages';

import DiscoverSearch from 'containers/layouts/discover-search';

import LayoutContainer from 'components/layout-container';
import ScrollToTopButton from 'components/scroll-to-top-button';
import SortingButtons, { SortingOrderType } from 'components/sorting-buttons';
import { SortingOptionKey } from 'components/sorting-buttons/types';
import { Paths, Queries } from 'enums';

import Header from './header';
import {
  useSortingByOptions,
  SortingByTargetType,
  defaultSorting,
  useDiscoverData,
} from './helpers';
import Navigation from './navigation';
import { DiscoverPageLayoutProps } from './types';

export const DiscoverPageLayout: FC<DiscoverPageLayoutProps> = ({
  screenHeightLg = false,
  children,
}: DiscoverPageLayoutProps) => {
  const { push, pathname } = useRouter();

  const mainRef = useRef<HTMLDivElement>();

  const [sorting, setSorting] =
    useState<{ sortBy: SortingOptionKey; sortOrder: SortingOrderType }>(defaultSorting);

  const sortingOptionsTarget = useMemo(() => {
    if (pathname.startsWith(Paths.Projects)) return Queries.Project;
  }, [pathname]) as SortingByTargetType;

  const sortingOptions = useSortingByOptions(sortingOptionsTarget);
  const queryParams = useQueryParams();

  useEffect(() => {
    const [sortBy, sortOrder]: [SortingOptionKey, SortingOrderType] = queryParams?.sorting?.split(
      ' '
    ) || [defaultSorting.sortBy, defaultSorting.sortOrder];

    setSorting({ sortBy, sortOrder });
  }, [queryParams?.sorting]);

  const handleSorting = ({
    sortBy,
    sortOrder,
  }: {
    sortBy: string;
    sortOrder: SortingOrderType;
  }) => {
    push({
      query: cleanQueryParams({
        ...queryParams,
        sorting: `${sortBy || sorting.sortBy} ${sortOrder || sorting.sortOrder}`,
      }),
    });
  };

  const sortingButtonsProps = {
    sortBy: sorting.sortBy,
    sortOrder: sorting.sortOrder as SortingOrderType,
    options: sortingOptions,
    onChange: handleSorting,
  };

  const { data, stats } = useDiscoverData();

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, data);
    }

    return child;
  });

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 h-full bg-background-dark">
      <div className="flex flex-col h-full sm:overflow-auto bg-gradient-to-t from-background-green-dark to-background-green-dark bg-[length:100%_164px] bg-no-repeat sm:bg-none">
        <div className="z-10 h-min">
          <Header />
          <LayoutContainer className="z-10 flex justify-center mt-1 sm:pt-1 sm:mb-2 xl:pb-0 xl:mb-0 xl:-mt-10">
            <DiscoverSearch className="w-full max-w-3xl" />
          </LayoutContainer>
        </div>
        <main
          ref={mainRef}
          className="z-0 flex flex-col flex-grow h-[calc(100%-180px)] sm:h-screen sm:overflow-y-auto"
        >
          <LayoutContainer className="">
            <div className="relative flex flex-wrap justify-between gap-2 pb-2 mt-1 mb-2 sm:items-center sm:mt-4 sm:mb-6 sm:-ml-1 sm:-mr-1 md:mb-1 md:mt-2 lg:gap-6 md:pb-0">
              <Navigation stats={stats} />
              <SortingButtons {...sortingButtonsProps} className="ml-4" />
            </div>
          </LayoutContainer>
          <LayoutContainer
            className={cx({
              'list sm:mb-4 md:mb-0 md:overflow-y-auto sm:h-auto overflow-y-auto': true,
              'sm:h-screen': !screenHeightLg,
              'flex-grow md:overflow-hidden': screenHeightLg,
            })}
          >
            {childrenWithProps}
          </LayoutContainer>
        </main>
      </div>
      <LayoutContainer className="flex justify-end">
        <ScrollToTopButton containerRef={mainRef} />
      </LayoutContainer>
    </div>
  );
};

export default DiscoverPageLayout;
