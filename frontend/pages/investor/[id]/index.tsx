import { FormattedMessage, useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import { groupBy } from 'lodash-es';

import { loadI18nMessages } from 'helpers/i18n';

import Breadcrumbs from 'containers/breadcrumbs';
import ProfileHeader from 'containers/profile-header';
import SDGs from 'containers/sdgs';
import { ContactItemType } from 'containers/social-contact/contact-information-modal';
import { SocialType } from 'containers/social-contact/website-social';
import TagsGrid, { TagsGridRowType } from 'containers/tags-grid';

import Head from 'components/head';
import LayoutContainer from 'components/layout-container';
import { StaticPageLayoutProps } from 'layouts/static-page';
import { PageComponent } from 'types';
import { GroupedEnums } from 'types/enums';
import { Investor } from 'types/investor';

import { getEnums } from 'services/enums/enumService';
import { getInvestor, useInvestor, useFavoriteInvestor } from 'services/investors/investorsService';

export const getServerSideProps = withLocalizedRequests(async ({ params: { id }, locale }) => {
  let investor = null;

  // If getting the project fails, it's most likely because the record has not been found. Let's return a 404. Anything else will trigger a 500 by default.
  try {
    investor = await getInvestor(id as string);
  } catch (e) {
    return { notFound: true };
  }

  const enums = await getEnums();

  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
      enums: groupBy(enums, 'type'),
      investor: investor,
    },
  };
});

type InvestorPageProps = {
  investor: Investor;
  enums: GroupedEnums;
};

const InvestorPage: PageComponent<InvestorPageProps, StaticPageLayoutProps> = ({
  investor: investorProp,
  enums,
}) => {
  const intl = useIntl();
  const router = useRouter();

  const { data: investor } = useInvestor(router.query.id as string, investorProp);

  const {
    name,
    twitter,
    facebook,
    linkedin,
    instagram,
    contact_email,
    contact_phone,
    website,
    categories,
    picture,
    ticket_sizes,
    instrument_types,
    impacts,
    sdgs,
    about,
    mission,
    investor_type,
    other_information,
    language,
    prioritized_projects_description,
  } = investor;

  const {
    category: allCategories,
    ticket_size: allTicketSizes,
    instrument_type: allInstrumentTypes,
    impact: allImpacts,
    investor_type: allInvestorTypes,
    sdg: allSdgs,
  } = enums;

  const getSocialInfo = () => {
    const social: SocialType[] = [
      { id: 'linkedin', url: linkedin },
      { id: 'twitter', url: twitter },
      { id: 'facebook', url: facebook },
      { id: 'instagram', url: instagram },
    ];
    return social.filter(({ url }) => !!url);
  };

  const contact: ContactItemType = {
    email: contact_email,
    phone: contact_phone,
    name,
    picture: picture?.medium,
  };

  const logo = picture?.small || '/images/avatar.svg';

  const tagsGridRows: TagsGridRowType[] = [
    {
      id: 'category',
      title: intl.formatMessage({ defaultMessage: 'Invests in', id: 'i9cSUD' }),
      type: 'category',
      tags: allCategories.filter(({ id }) => categories?.includes(id)),
    },
    {
      id: 'ticket-size',
      title: intl.formatMessage({ defaultMessage: 'Ticket size', id: 'lfx6Nc' }),
      tags: allTicketSizes
        .filter(({ id }) => ticket_sizes?.includes(id))
        .map((ticket) => ({ ...ticket, name: ticket.description })),
    },
    {
      id: 'instrument-size',
      title: intl.formatMessage({ defaultMessage: 'Instrument size', id: '2AZiFU' }),
      tags: allInstrumentTypes.filter(({ id }) => instrument_types?.includes(id)),
    },
    {
      id: 'impact',
      title: intl.formatMessage({ defaultMessage: 'Impact they invest on', id: '4y9VoH' }),
      tags: allImpacts.filter(({ id }) => impacts?.includes(id)),
    },
  ];

  const investorTypeName = allInvestorTypes?.find(({ id }) => id === investor_type)?.name;

  const favoriteInvestor = useFavoriteInvestor();

  const handleFavoriteClick = () => {
    // This mutation uses a 'DELETE' request when the isFavorite is true, and a 'POST' request when is false.
    favoriteInvestor.mutate({ id: investor.id, isFavourite: investor.favourite });
  };

  return (
    <>
      <Head title={name} description={about} />

      <LayoutContainer className="px-0 -mt-10 md:mt-0 lg:-mt-16">
        <LayoutContainer>
          <Breadcrumbs
            substitutions={{
              id: { name },
            }}
          />
        </LayoutContainer>

        <ProfileHeader
          className="mt-3 sm:mt-6"
          logo={logo}
          title={name}
          subtitle={investorTypeName}
          text={about}
          website={website}
          social={getSocialInfo()}
          contact={contact}
          originalLanguage={language}
          isFavorite={investor.favourite}
          onFavoriteClick={handleFavoriteClick}
          favoriteLoading={favoriteInvestor.isLoading}
        />
      </LayoutContainer>

      <LayoutContainer layout="narrow" className="mb-10 sm:mb-20 mt-18 sm:mt-24 lg:mt-40">
        <section aria-labelledby="profile-investment-info">
          <h2
            id="profile-investment-info"
            className="font-serif text-3xl font-semibold text-green-dark"
          >
            <FormattedMessage defaultMessage="Investment info" id="m3Dnav" />
          </h2>

          <TagsGrid className="mt-8 sm:mt-10 md:mt-14" rows={tagsGridRows} />

          {!!sdgs && (
            <>
              <h3 className="mt-10 mb-3 text-xl font-semibold md:mt-14">
                <FormattedMessage defaultMessage="SDG's" id="d3TPmn" />
              </h3>
              <SDGs
                className="my-3"
                sdgs={allSdgs.filter(({ id }) => sdgs?.includes(Number(id)))}
                size="large"
              />
            </>
          )}

          {!!mission && (
            <>
              <h3 className="mt-10 mb-3 text-xl font-semibold md:mt-14">
                <FormattedMessage defaultMessage="Mission" id="RXoqkD" />
              </h3>
              <p className="my-3">{mission}</p>
            </>
          )}

          {!!prioritized_projects_description && (
            <>
              <h3 className="mt-10 mb-3 text-xl font-semibold md:mt-14">
                <FormattedMessage defaultMessage="Type of prioritized projects" id="5y6ZTQ" />
              </h3>
              <p className="my-3">{prioritized_projects_description}</p>
            </>
          )}
          <h3 className="mt-10 mb-3 text-xl font-semibold md:mt-14">
            <FormattedMessage defaultMessage="Other information" id="kX7oGR" />
          </h3>
          <p className="my-3">{other_information}</p>
        </section>
      </LayoutContainer>
    </>
  );
};

InvestorPage.layout = {};

export default InvestorPage;
