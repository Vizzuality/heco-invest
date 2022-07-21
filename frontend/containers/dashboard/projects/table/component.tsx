import { FC } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { useQueryParams } from 'helpers/pages';

import NoSearchResults from 'containers/dashboard/no-search-results';
import RowMenu, { RowMenuItem } from 'containers/dashboard/row-menu';
import SearchAndInfo from 'containers/dashboard/search-and-info';

import Button from 'components/button';
import Table from 'components/table';
import { Paths, ProjectStatus } from 'enums';

import { useAccountProjectsList } from 'services/account';
import { useEnums } from 'services/enums/enumService';

import { ProjectsTableProps } from '.';

export const ProjectsTable: FC<ProjectsTableProps> = () => {
  const intl = useIntl();
  const router = useRouter();

  const queryOptions = { keepPreviousData: true, refetchOnMount: true };
  const queryParams = useQueryParams();

  const {
    data: {
      category: allCategories,
      instrument_type: allInstrumentTypes,
      ticket_size: allTicketSizes,
    },
    isLoading: isLoadingEnums,
  } = useEnums();

  const {
    data: { data: projects } = { data: [] },
    isLoading: isLoadingProjects,
    isFetching: isFetchingProjects,
  } = useAccountProjectsList(
    { ...queryParams, includes: ['municipality', 'country'] },
    queryOptions
  );

  const isSearching = !!queryParams.search;
  const isLoading = isLoadingEnums || isLoadingProjects || isFetchingProjects;
  const hasProjects = !!projects.length;

  const handleRowMenuItemClick = ({ key, slug }: { key: string; slug: string }) => {
    switch (key) {
      case 'edit':
        router.push(
          `${Paths.Project}/${slug}/edit?returnPath=${encodeURIComponent(router.asPath)}`,
          `${Paths.Project}/${slug}/edit`
        );
        return;
      case 'preview':
        router.push(`${Paths.Project}/${slug}/preview`);
        return;
      case 'open':
        router.push(`${Paths.Project}/${slug}`);
        return;
      case 'delete':
        // TODO
        console.log('Delete:', slug);
        return;
    }
  };

  const tableProps = {
    columns: [
      { Header: intl.formatMessage({ defaultMessage: 'Title', id: '9a9+ww' }), accessor: 'name' },
      {
        Header: intl.formatMessage({ defaultMessage: 'Category', id: 'ccXLVi' }),
        accessor: 'category',
      },
      {
        Header: intl.formatMessage({ defaultMessage: 'Country', id: 'vONi+O' }),
        accessor: 'country',
      },
      {
        Header: intl.formatMessage({ defaultMessage: 'Municipality', id: '9I1zvK' }),
        accessor: 'municipality',
      },
      {
        Header: intl.formatMessage({ defaultMessage: 'Instrument type', id: 'fDd10o' }),
        accessor: 'instrumentType',
      },
      {
        Header: intl.formatMessage({ defaultMessage: 'Value', id: 'GufXy5' }),
        accessor: 'ticketSize',
        canSort: false,
      },
      {
        Header: intl.formatMessage({ defaultMessage: 'Status', id: 'tzMNF3' }),
        accessor: 'status',
        Cell: ({ cell: { value } }) => {
          return (
            <span
              className={cx({
                'bg-opacity-20 text-sm px-2.5 py-0.5 rounded-2xl': true,
                'bg-gray-800 text-gray-800': value === 'draft',
                'bg-green-light text-green-dark': value === 'verified',
                'bg-orange text-orange': value === 'unverified',
              })}
            >
              {value === 'draft' && <FormattedMessage defaultMessage="Draft" id="W6nwjo" />}
              {value === 'verified' && <FormattedMessage defaultMessage="Verified" id="Z8971h" />}
              {value === 'unverified' && (
                <FormattedMessage defaultMessage="Unverified" id="n9fdaJ" />
              )}
            </span>
          );
        },
      },
      {
        accessor: 'actions',
        canSort: false,
        hideHeader: true,
        width: 0,
        Cell: ({
          cell: {
            row: {
              original: { slug, status },
            },
          },
        }) => {
          return (
            <div className="flex items-center justify-center gap-3">
              <Link
                href={`${Paths.Project}/${slug}/edit?returnPath=${encodeURIComponent(
                  router.asPath
                )}`}
                as={`${Paths.Project}/${slug}/edit`}
              >
                <a className="px-2 py-1 text-sm transition-all text-green-dark focus-visible:outline-green-dark rounded-2xl">
                  <FormattedMessage defaultMessage="Edit" id="wEQDC6" />
                </a>
              </Link>
              <RowMenu onAction={(key: string) => handleRowMenuItemClick({ key, slug })}>
                <RowMenuItem key="edit">
                  <FormattedMessage defaultMessage="Edit" id="wEQDC6" />
                </RowMenuItem>
                {status === ProjectStatus.Draft ? (
                  <RowMenuItem key="preview">
                    <FormattedMessage defaultMessage="Preview project page" id="EvP1Ut" />
                  </RowMenuItem>
                ) : (
                  <RowMenuItem key="open">
                    <FormattedMessage defaultMessage="View project page" id="ToXG99" />
                  </RowMenuItem>
                )}
                <RowMenuItem key="delete">
                  <FormattedMessage defaultMessage="Delete" id="K3r6DQ" />
                </RowMenuItem>
              </RowMenu>
            </div>
          );
        },
      },
    ],
    data: projects.map((project) => ({
      slug: project.slug,
      name: project.name,
      category: allCategories.find(({ id }) => id === project.category)?.name,
      country: project.country.name,
      municipality: project.municipality.name,
      instrumentType: allInstrumentTypes
        ?.filter(({ id }) => project.instrument_types?.includes(id))
        .map(({ name }, idx) => (idx === 0 ? name : name.toLowerCase()))
        .join(', '),
      status: project.status === 'draft' ? 'draft' : project.trusted ? 'verified' : 'unverified',
      ticketSize: allTicketSizes?.find(({ id }) => project.ticket_size === id)?.description,
    })),
    loading: isLoading,
    sortingEnabled: true,
    manualSorting: false,
    className: 'h-screen',
  };

  return (
    <>
      <SearchAndInfo className="mt-4 mb-6">
        <FormattedMessage
          defaultMessage="Total <span>{numProjects}</span> {numProjects, plural, one {project} other {projects}}"
          id="0iaD3T"
          values={{
            span: (chunks: string) => <span className="px-1 font-semibold">{chunks}</span>,
            numProjects: projects.length,
          }}
        />
      </SearchAndInfo>
      {(isLoading || hasProjects) && <Table {...tableProps} />}
      {!isLoading && !hasProjects && (
        <div className="flex flex-col items-center mt-10 lg:mt-20">
          {isSearching ? (
            <NoSearchResults />
          ) : (
            <>
              <p className="text-lg text-gray-800 lg:text-xl">
                <FormattedMessage
                  defaultMessage="Currently you don’t have any <b>Projects</b>."
                  id="itfsqC"
                  values={{
                    b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
                  }}
                />
              </p>
              <Button className="mt-8" to={Paths.ProjectCreation}>
                <FormattedMessage defaultMessage="Create project" id="VUN1K7" />
              </Button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ProjectsTable;
