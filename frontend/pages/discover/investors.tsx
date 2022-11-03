import { useRef } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import { withLocalizedRequests } from 'hoc/locale';

import { useScrollOnQuery } from 'hooks/use-scroll-on-query';
import { usePagination } from 'hooks/usePagination';

import { loadI18nMessages } from 'helpers/i18n';

import ProfileCard from 'containers/profile-card';

import Head from 'components/head';
import Loading from 'components/loading';
import Pagination from 'components/pagination';
import { Paths } from 'enums';
import DiscoverPageLayout, { DiscoverPageLayoutProps } from 'layouts/discover-page';
import { PageComponent } from 'types';
import { Investor as InvestorType } from 'types/investor';

export const getServerSideProps = withLocalizedRequests(async ({ locale }) => {
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
});

type InvestorsPageProps = {
  data: InvestorType[];
  meta: Record<string, string>;
  loading: boolean;
};

const InvestorsPage: PageComponent<InvestorsPageProps, DiscoverPageLayoutProps> = ({
  data: investors = [],
  loading = false,
  meta,
}) => {
  const intl = useIntl();
  const investorsContainerRef = useRef(null);
  const { props: paginationProps } = usePagination(meta);

  useScrollOnQuery({ ref: investorsContainerRef });

  const hasInvestors = investors?.length > 0 || false;

  return (
    <>
      <Head title={intl.formatMessage({ defaultMessage: 'Discover Investors', id: 'nWf75J' })} />
      <div className="flex h-full">
        <div className="relative flex flex-col w-full lg:overflow-hidden">
          <div
            ref={investorsContainerRef}
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
                    hasInvestors,
                  'my-40': !hasInvestors,
                })}
              >
                <Loading visible={loading} iconClassName="w-10 h-10" />
              </span>
            )}
            <div className="grid grid-cols-1 gap-2 p-0.5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
              {investors.map(({ investor_type, name, about, slug, picture, impacts }) => (
                <ProfileCard
                  profileType="investor"
                  key={slug}
                  name={name}
                  type={investor_type}
                  description={about}
                  link={`${Paths.Investor}/${slug}`}
                  picture={picture?.small}
                  impacts={impacts}
                />
              ))}
              {!loading && !hasInvestors && (
                <FormattedMessage defaultMessage="No investors" id="jX0V8C" />
              )}
            </div>
          </div>
          {hasInvestors && <Pagination className="w-full pt-2 -mb-2" {...paginationProps} />}
        </div>
      </div>
    </>
  );
};

InvestorsPage.layout = {
  Component: DiscoverPageLayout,
  props: {
    screenHeightLg: true,
  },
};

export default InvestorsPage;
