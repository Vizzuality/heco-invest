import { Heart as HeartIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import { withLocalizedRequests } from 'hoc/locale';

import { loadI18nMessages } from 'helpers/i18n';

import CardHoverToDelete from 'containers/dashboard/favorites/card-hover-to-delete';
import ProfileCard from 'containers/profile-card';

import Button from 'components/button';
import Icon from 'components/icon';
import { Paths } from 'enums';
import DashboardFavoritesLayout, {
  DashboardFavoritesLayoutProps,
} from 'layouts/dashboard-favorites';
import { PageComponent } from 'types';
import { Investor as InvestorType } from 'types/investor';

import { useFavoriteInvestor } from 'services/investors/investorsService';

export const getStaticProps = withLocalizedRequests(async ({ locale }) => {
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
});

type FavoritesInvestorsPageProps = {
  data: InvestorType[];
  meta: Record<string, string>;
};

export const FavoritesInvestorsPage: PageComponent<
  FavoritesInvestorsPageProps,
  DashboardFavoritesLayoutProps
> = ({ data: investors = [], meta }) => {
  const hasInvestors = investors?.length > 0;

  const favoriteInvestor = useFavoriteInvestor();

  const handleRemoveClick = (id: string) => {
    favoriteInvestor.mutate({ id, isFavourite: true });
  };

  return (
    <>
      <div className="top-0 left-0 flex justify-between w-full pb-1 pr-2 mx-1 mb-4 md:pt-10 md:-mt-10 md:px-1 lg:z-20 lg:sticky bg-background-dark">
        <div className="font-medium">
          <FormattedMessage defaultMessage="Investors" id="zdIaHp" />{' '}
          {meta?.total && `(${meta?.total})`}
        </div>
      </div>
      <div className="flex flex-col pt-2 md:pl-1 md:-mr-1">
        {hasInvestors ? (
          <div className="grid grid-cols-1 gap-6 p-1 2xl:grid-cols-2">
            {investors.map(({ id, investor_type, name, about, slug, picture, impacts }) => (
              <CardHoverToDelete key={slug} onClick={() => handleRemoveClick(id)}>
                <ProfileCard
                  className="h-full"
                  profileType="investor"
                  name={name}
                  type={investor_type}
                  description={about}
                  link={`${Paths.Investor}/${slug}`}
                  picture={picture?.small}
                  impacts={impacts}
                />
              </CardHoverToDelete>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center mt-10 lg:mt-20">
            <p className="text-lg text-gray-800 lg:text-xl">
              <FormattedMessage
                defaultMessage="Currently you don’t have any <b>Investors</b> in your favorites."
                id="qdQPNb"
                values={{
                  b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
                }}
              />
            </p>
            <p className="text-lg text-gray-800 lg:text-xl">
              <FormattedMessage
                defaultMessage="Discover investors and <heart></heart> them."
                id="RFAvvo"
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
            <Button className="mt-8" to={Paths.Investors}>
              <FormattedMessage defaultMessage="Discover investors" id="FFbWHO" />
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

FavoritesInvestorsPage.layout = {
  Component: DashboardFavoritesLayout,
};

export default FavoritesInvestorsPage;
