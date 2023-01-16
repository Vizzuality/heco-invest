import { useEffect, useRef, useState } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import { withLocalizedRequests } from 'hoc/locale';

import { useScrollOnQuery } from 'hooks/use-scroll-on-query';
import { usePagination } from 'hooks/usePagination';

import { loadI18nMessages } from 'helpers/i18n';

import DiscoverNoResults from 'containers/discover-no-results';
import DiscoverNotice from 'containers/discover-notice';
import OpenCallCard from 'containers/open-call-card';

import Head from 'components/head';
import Loading from 'components/loading';
import Pagination from 'components/pagination';
import DiscoverPageLayout, { DiscoverPageLayoutProps } from 'layouts/discover-page';
import { PageComponent } from 'types';
import { OpenCall as OpenCallType } from 'types/open-calls';

export const getServerSideProps = withLocalizedRequests(async ({ locale }) => {
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
});

type OpenCallsPageProps = {
  data: OpenCallType[];
  meta: Record<string, string>;
  loading: boolean;
};

const OpenCallsPage: PageComponent<OpenCallsPageProps, DiscoverPageLayoutProps> = ({
  data: openCalls = [],
  loading = false,
  meta,
}) => {
  const intl = useIntl();
  const openCallsContainerRef = useRef(null);
  const { props: paginationProps } = usePagination(meta);
  const [showNotice, setShowNotice] = useState<boolean>(false);

  useScrollOnQuery({ ref: openCallsContainerRef });

  const hasOpenCalls = openCalls?.length > 0 || false;

  useEffect(() => {
    const isClosed = localStorage.getItem('discover-open-calls-notice-closed');
    setShowNotice(!isClosed);
  }, []);

  const handleCloseNoticeClick = () => {
    localStorage.setItem('discover-open-calls-notice-closed', 'true');
    setShowNotice(false);
  };

  return (
    <>
      <Head title={intl.formatMessage({ defaultMessage: 'Discover Open Calls', id: 'Y9+L0O' })} />
      <div className="flex h-full">
        <div className="relative flex flex-col w-full lg:overflow-hidden ">
          <DiscoverNotice className="mb-1" isVisible={showNotice} onClose={handleCloseNoticeClick}>
            <FormattedMessage
              defaultMessage="Open calls are funding offers from investors requesting project developer proposals to grow their businesses. Note that these open proposals are available for a limited time and have unique application requirements."
              id="Cf2YAW"
            />
          </DiscoverNotice>
          {!loading && !hasOpenCalls && <DiscoverNoResults />}
          <div
            ref={openCallsContainerRef}
            className={cx({
              'relative flex-grow': true,
              'lg:overflow-y-auto': !loading,
              'lg:pointer-events-none lg:overflow-hidden': loading,
            })}
          >
            {loading && (
              <span
                className={cx({
                  'flex items-center justify-center bg-gray-600 bg-opacity-20': true,
                  'absolute bottom-0.5 md:bottom-0 z-20 top-0.5 left-0.5 right-0.5 border':
                    hasOpenCalls,
                  'my-40': !hasOpenCalls,
                })}
              >
                <Loading visible={loading} iconClassName="w-10 h-10" />
              </span>
            )}
            <div className="grid grid-cols-1 gap-2 p-0.5 sm:gap-6 md:grid-cols-2">
              {openCalls.map((openCall) => (
                <OpenCallCard key={openCall.id} openCall={openCall} />
              ))}
            </div>
          </div>
          {hasOpenCalls && <Pagination className="w-full pt-2 -mb-2" {...paginationProps} />}
        </div>
      </div>
    </>
  );
};

OpenCallsPage.layout = {
  Component: DiscoverPageLayout,
  props: {
    screenHeightLg: true,
  },
};

export default OpenCallsPage;
