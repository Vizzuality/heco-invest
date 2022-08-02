import { Heart as HeartIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import { withLocalizedRequests } from 'hoc/locale';

import { loadI18nMessages } from 'helpers/i18n';

import Button from 'components/button';
import Icon from 'components/icon';
import { Paths } from 'enums';
import DashboardFavoritesLayout, {
  DashboardFavoritesLayoutProps,
} from 'layouts/dashboard-favorites';
import { PageComponent } from 'types';

export const getStaticProps = withLocalizedRequests(async ({ locale }) => {
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
});

type FavoritesOpenCallsPageProps = {
  data: any[]; // OpenCallType
  meta: Record<string, string>;
};

export const FavoritesOpenCallsPage: PageComponent<
  FavoritesOpenCallsPageProps,
  DashboardFavoritesLayoutProps
> = ({ data: openCalls = [], meta }) => {
  const hasOpenCalls = openCalls?.length > 0;

  const handleRemoveAllClick = () => {
    console.log('unfavorite all open calls');
  };

  return (
    <>
      <div className="flex justify-between mx-1 mb-4">
        <div className="font-medium">
          <FormattedMessage defaultMessage="Open calls" id="OBhULP" />{' '}
          {/*meta?.total && `(${meta?.total})`*/}(0)
        </div>
        <div>
          <Button
            size="smallest"
            theme="naked"
            className="text-sm underline text-green-dark focus-visible:outline-green-dark"
            onClick={handleRemoveAllClick}
          >
            <FormattedMessage defaultMessage="Remove all" id="jNai7b" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col">
        {hasOpenCalls ? (
          <div className="grid grid-cols-1 gap-6 p-1 2xl:grid-cols-2">{/* TODO */}</div>
        ) : (
          <div className="flex flex-col items-center mt-10 lg:mt-20">
            <p className="text-lg text-gray-800 lg:text-xl">
              <FormattedMessage
                defaultMessage="Currently you don’t have any <b>Open calls</b> in your favorites."
                id="SNyd7j"
                values={{
                  b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
                }}
              />
            </p>
            <p className="text-lg text-gray-800 lg:text-xl">
              <FormattedMessage
                defaultMessage="Discover open calls and <heart></heart> them."
                id="FyUIBK"
                values={{
                  heart: () => (
                    <Icon
                      aria-hidden={true}
                      icon={HeartIcon}
                      className="inline-block w-6 h-6 mb-1 text-green-dark shrink-0 fill-background-green-dark"
                    />
                  ),
                }}
              />
            </p>
            <Button className="mt-8" to={Paths.OpenCalls}>
              <FormattedMessage defaultMessage="Discover open calls" id="azx2BO" />
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

FavoritesOpenCallsPage.layout = {
  Component: DashboardFavoritesLayout,
};

export default FavoritesOpenCallsPage;
