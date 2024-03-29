import { FC } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import { useQueryParams } from 'helpers/pages';

import NoSearchResults from 'containers/dashboard/no-search-results';
import SearchAndInfo from 'containers/dashboard/search-and-info';

import Button from 'components/button';
import Table from 'components/table';
import { Paths } from 'enums';

import { useEnums } from 'services/enums/enumService';
import { useAccountOpenCallList } from 'services/open-call/open-call-service';

import CellActions from './cells/actions';
import CellApplications from './cells/applications';
import CellInstrumentTypes from './cells/instrument-types';
import CellStatus from './cells/status';

import { OpenCallsTableProps } from '.';

export const OpenCallsTable: FC<OpenCallsTableProps> = () => {
  const intl = useIntl();
  const { locale } = useRouter();
  const { search } = useQueryParams();

  const {
    data: { instrument_type: allInstrumentTypes },
    isLoading: isLoadingEnums,
  } = useEnums();

  const {
    openCalls,
    isLoading: isLoadingOpenCalls,
    isFetching: isFetchingOpenCalls,
  } = useAccountOpenCallList({
    includes: ['municipality', 'country'],
    fields: [
      'name',
      'slug',
      'country',
      'municipality',
      'instrument_types',
      'maximum_funding_per_project',
      'status',
      'open_call_applications_count',
    ],
    filter: search,
  });

  const isSearching = !!search;
  const isLoading = isLoadingEnums || isLoadingOpenCalls || isFetchingOpenCalls;
  const hasOpenCalls = !!openCalls?.length;

  const tableProps = {
    columns: [
      {
        Header: intl.formatMessage({ defaultMessage: 'Title', id: '9a9+ww' }),
        accessor: 'name',
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
        Header: intl.formatMessage({ defaultMessage: 'Instrument types', id: '0zLVGQ' }),
        accessor: 'instrumentTypes',
        canSort: false,
        Cell: CellInstrumentTypes,
        width: 200,
      },
      {
        Header: intl.formatMessage({ defaultMessage: 'Value', id: 'GufXy5' }),
        accessor: 'maximumFundingPerProject',
        width: 100,
        Cell: ({ cell: { value } }) => `$${value?.toLocaleString(locale)}`,
      },
      {
        Header: intl.formatMessage({ defaultMessage: 'Applications', id: 'DqD1yK' }),
        accessor: 'applicationsCount',
        Cell: CellApplications,
      },
      {
        Header: intl.formatMessage({ defaultMessage: 'Status', id: 'tzMNF3' }),
        accessor: 'status',
        Cell: CellStatus,
      },
      {
        accessor: 'actions',
        canSort: false,
        hideHeader: true,
        Cell: CellActions,
      },
    ],
    data: openCalls?.map((openCall) => ({
      slug: openCall.slug,
      name: openCall.name,
      status: openCall.status,
      country: openCall.country?.name,
      municipality: openCall.municipality?.name,
      instrumentTypes: allInstrumentTypes
        ?.filter(({ id }) => openCall.instrument_types?.includes(id))
        .map(({ name }, idx) => (idx === 0 ? name : name.toLowerCase())),
      maximumFundingPerProject: openCall.maximum_funding_per_project,
      applicationsCount: openCall.open_call_applications_count,
    })),
    loading: isLoading,
    sortingEnabled: true,
    className: 'h-screen',
  };

  return (
    <>
      <SearchAndInfo className="mt-4 mb-6">
        {!isLoading && (
          <FormattedMessage
            defaultMessage="Total <span>{numOpenCalls}</span> {numOpenCalls, plural, one {openCall} other {openCalls}}"
            id="cDSTwv"
            values={{
              span: (chunks: string) => <span className="px-1 font-semibold">{chunks}</span>,
              numOpenCalls: openCalls?.length || 0,
            }}
          />
        )}
      </SearchAndInfo>
      {hasOpenCalls && <Table {...tableProps} />}
      {!hasOpenCalls && !isLoading && (
        <div className="flex flex-col items-center mt-10 lg:mt-20">
          {isSearching ? (
            <NoSearchResults />
          ) : (
            <>
              <p className="text-lg text-gray-800 lg:text-xl">
                <FormattedMessage
                  defaultMessage="Currently you don’t have any <b>Open Call</b>."
                  id="NJOWFQ"
                  values={{
                    b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
                  }}
                />
              </p>
              <Button className="mt-8" to={Paths.OpenCallCreation}>
                <FormattedMessage defaultMessage="Create open call" id="DIA26W" />
              </Button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default OpenCallsTable;
