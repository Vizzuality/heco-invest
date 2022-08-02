import { Heart as HeartIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import { withLocalizedRequests } from 'hoc/locale';

import { loadI18nMessages } from 'helpers/i18n';

import ProfileCard from 'containers/profile-card';

import Button from 'components/button';
import Icon from 'components/icon';
import { Paths } from 'enums';
import DashboardFavoritesLayout, {
  DashboardFavoritesLayoutProps,
} from 'layouts/dashboard-favorites';
import { PageComponent } from 'types';
import { Investor as InvestorType } from 'types/investor';

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

  const handleRemoveAllClick = () => {
    console.log('unfavorite all investors');
  };

  return (
    <>
      <div className="flex justify-between mx-1 mb-4">
        <div className="font-medium">
          <FormattedMessage defaultMessage="Investors" id="zdIaHp" />{' '}
          {meta?.total && `(${meta?.total})`}
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
        {hasInvestors ? (
          <div className="grid grid-cols-1 gap-6 p-1 2xl:grid-cols-2">
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
