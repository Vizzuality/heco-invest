import { FC } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import dayjs from 'dayjs';

import { useQueryParams } from 'helpers/pages';

import NoSearchResults from 'containers/dashboard/no-search-results';
import SearchAndInfo from 'containers/dashboard/search-and-info';

import Button from 'components/button';
import Table from 'components/table';
import { Paths } from 'enums';

import { useAccountOpenCallApplicationsList } from 'services/open-call/application-service';

import CellActions from './cells/actions';

import { OpenCallApplicationsTableProps } from '.';

export const OpenCallApplicationsTable: FC<OpenCallApplicationsTableProps> = () => {
  const intl = useIntl();
  const { locale } = useRouter();
  const { search } = useQueryParams();

  const {
    openCallApplications,
    isLoading: isLoadingOpenCallApplications,
    isFetching: isFetchingOpenCallApplications,
  } = useAccountOpenCallApplicationsList({
    includes: ['investor', 'project', 'open_call'],
    filters: { search },
  });

  const isSearching = !!search;
  const isLoading = isLoadingOpenCallApplications || isFetchingOpenCallApplications;
  const hasOpenCallApplications = !!openCallApplications?.length;

  const tableProps = {
    columns: [
      {
        Header: intl.formatMessage({ defaultMessage: 'Open call name', id: '8Gp8gS' }),
        accessor: 'openCallName',
      },
      {
        Header: intl.formatMessage({ defaultMessage: 'Investor', id: 'nEvNJb' }),
        accessor: 'investorName',
      },
      {
        Header: intl.formatMessage({ defaultMessage: 'Application date', id: 'kUEzKa' }),
        accessor: 'applicationDate',
        Cell: ({ cell: { value } }) => dayjs(value).format('DD MMM YYYY'),
      },
      {
        Header: intl.formatMessage({ defaultMessage: 'Max. Funding', id: 'CIeYUa' }),
        accessor: 'maxOpenCallFunding',
        Cell: ({ cell: { value } }) => `$${value?.toLocaleString(locale)}`,
      },
      {
        Header: intl.formatMessage({ defaultMessage: 'Project', id: 'k36uSw' }),
        accessor: 'projectName',
      },
      {
        Header: intl.formatMessage({ defaultMessage: 'Actions', id: 'wL7VAE' }),
        accessor: 'actions',
        canSort: false,
        hideHeader: true,
        Cell: CellActions,
      },
    ],
    data: openCallApplications?.map((openCallApplication) => {
      const { open_call: openCall, project, investor } = openCallApplication;

      return {
        id: openCallApplication.id,
        openCallName: openCall.name,
        investorName: investor.name,
        applicationDate: openCallApplication.created_at,
        maxOpenCallFunding: openCall.maximum_funding_per_project,
        projectName: project.name,
        openCallApplication,
        openCall,
      };
    }),
    loading: isLoading,
    sortingEnabled: true,
    className: 'h-screen',
  };

  return (
    <>
      <SearchAndInfo className="mt-4 mb-6">
        {!isLoading && (
          <FormattedMessage
            defaultMessage="Total <span>{numOpenCallApplications}</span> {numOpenCallApplications, plural, one {application} other {applications}}"
            id="DYbC4X"
            values={{
              span: (chunks: string) => <span className="px-1 font-semibold">{chunks}</span>,
              numOpenCallApplications: openCallApplications?.length || 0,
            }}
          />
        )}
      </SearchAndInfo>
      {hasOpenCallApplications && <Table {...tableProps} />}
      {!hasOpenCallApplications && !isLoading && (
        <div className="flex flex-col items-center mt-10 lg:mt-20">
          {isSearching ? (
            <NoSearchResults />
          ) : (
            <>
              <p className="text-lg text-gray-800 lg:text-xl">
                <FormattedMessage
                  defaultMessage="Currently you don’t have any <b>Open Call Applications</b>."
                  id="c3w2Rt"
                  values={{
                    b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
                  }}
                />
              </p>
              <Button className="mt-8" to={Paths.OpenCalls}>
                <FormattedMessage defaultMessage="Discover open calls" id="azx2BO" />
              </Button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default OpenCallApplicationsTable;
