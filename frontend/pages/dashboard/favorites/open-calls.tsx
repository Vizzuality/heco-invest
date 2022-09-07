import { Heart as HeartIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import { withLocalizedRequests } from 'hoc/locale';

import { loadI18nMessages } from 'helpers/i18n';

import CardHoverToDelete from 'containers/dashboard/favorites/card-hover-to-delete';
import OpenCallCard from 'containers/open-call-card';

import Button from 'components/button';
import Icon from 'components/icon';
import { Paths } from 'enums';
import DashboardFavoritesLayout, {
  DashboardFavoritesLayoutProps,
} from 'layouts/dashboard-favorites';
import { PageComponent } from 'types';
import { OpenCall as OpenCallType } from 'types/open-calls';

import { useFavoriteOpenCall } from 'services/open-call/open-call-service';

export const getStaticProps = withLocalizedRequests(async ({ locale }) => {
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
});

type FavoritesOpenCallsPageProps = {
  data: OpenCallType[];
  meta: Record<string, string>;
};

export const FavoritesOpenCallsPage: PageComponent<
  FavoritesOpenCallsPageProps,
  DashboardFavoritesLayoutProps
> = ({ data: openCalls = [], meta }) => {
  const hasOpenCalls = openCalls?.length > 0;

  const favoriteOpenCall = useFavoriteOpenCall();

  const handleRemoveClick = (id: string) => {
    favoriteOpenCall.mutate({ id, isFavourite: true });
  };

  return (
    <>
      <div className="top-0 left-0 flex justify-between w-full pb-1 pr-2 mx-1 mb-4 md:pt-10 md:-mt-10 md:px-1 lg:z-20 lg:sticky bg-background-dark">
        <div className="font-medium">
          <FormattedMessage defaultMessage="Open calls" id="OBhULP" /> (
          {meta?.total && `${meta?.total}`})
        </div>
      </div>
      <div className="flex flex-col pt-2 md:pl-1 md:-mr-1">
        {hasOpenCalls ? (
          <div className="grid grid-cols-1 gap-6 p-1 2xl:grid-cols-2">
            {openCalls.map((openCall) => (
              <CardHoverToDelete key={openCall.slug} onClick={() => handleRemoveClick(openCall.id)}>
                <OpenCallCard className="h-full" key={openCall.id} openCall={openCall} />
              </CardHoverToDelete>
            ))}
          </div>
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
