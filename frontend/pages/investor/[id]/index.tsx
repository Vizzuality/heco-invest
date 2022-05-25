// import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';

import { decycle } from 'cycle';
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
import sdgsMock from 'mockups/sdgs.json';
import { PageComponent } from 'types';
import { GroupedEnums } from 'types/enums';
import { Investor } from 'types/investor';

import { getEnums } from 'services/enums/enumService';
import { getInvestor, useInvestor } from 'services/investors/investorsService';

export const getServerSideProps = async ({ params: { id }, locale }) => {
  let investor = null;

  // If getting the project fails, it's most likely because the record has not been found. Let's return a 404. Anything else will trigger a 500 by default.
  try {
    investor = await getInvestor(id);
  } catch (e) {
    return { notFound: true };
  }

  const enums = await getEnums();

  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
      enums: groupBy(enums, 'type'),
      investor: decycle(investor),
    },
  };
};

type InvestorPageProps = {
  investor: Investor;
  enums: GroupedEnums;
};

const InvestorPage: PageComponent<InvestorPageProps, StaticPageLayoutProps> = ({
  investor,
  enums,
}) => {
  const {
    investor: {
      name,
      website,
      twitter,
      facebook,
      linkedin,
      instagram,
      contact_email,
      contact_phone,
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
    },
  } = useInvestor(investor.id, investor);

  const {
    category: allCategories,
    ticket_size: allTicketSizes,
    instrument_type: allInstrumentTypes,
    impact: allImpacts,
    investor_type: allInvestorTypes,
  } = enums;

  const getSocialInfo = () => {
    const social: SocialType[] = [
      { id: 'linked-in', url: linkedin },
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
  };

  const logo = picture?.small || '/images/avatar.svg';

  const tagsGridRows: TagsGridRowType[] = [
    {
      title: 'Invests in',
      type: 'category',
      tags: allCategories.filter(({ id }) => categories?.includes(id)),
    },
    {
      title: 'Ticket size',
      tags: allTicketSizes.filter(({ id }) => ticket_sizes?.includes(id)),
    },
    {
      title: 'Instrument size',
      tags: allInstrumentTypes.filter(({ id }) => instrument_types?.includes(id)),
    },
    {
      title: 'Impact they invest on',
      tags: allImpacts.filter(({ id }) => impacts?.includes(id)),
    },
  ];

  const investorTypeName = allInvestorTypes?.find(({ id }) => id === investor_type)?.name;

  return (
    <>
      <Head title={name} description={about} />

      <LayoutContainer className="-mt-10 md:mt-0 lg:-mt-16">
        <Breadcrumbs
          className="px-4 sm:px-6 lg:px-8"
          substitutions={{
            id: { name },
          }}
        />

        <ProfileHeader
          className="mt-6"
          logo={logo}
          title={name}
          subtitle={investorTypeName}
          text={about}
          website={website}
          social={getSocialInfo()}
          contact={contact}
          originalLanguage={language}
        />
      </LayoutContainer>

      <LayoutContainer layout="narrow" className="mt-24 mb-20 md:mt-40">
        <section aria-labelledby="profile-investment-info">
          <h2
            id="profile-investment-info"
            className="mt-12 font-serif text-2xl font-semibold md:mt-20 sm:text-3xl text-green-dark"
          >
            <FormattedMessage defaultMessage="Investment info" id="m3Dnav" />
          </h2>

          <TagsGrid className="mt-10 md:mt-14" rows={tagsGridRows} />

          <h3 className="mt-10 mb-3 text-xl font-semibold md:mt-14">
            <FormattedMessage defaultMessage="SDG's" id="d3TPmn" />
          </h3>
          <SDGs className="my-3" sdgs={sdgsMock.filter(({ id }) => sdgs?.includes(Number(id)))} />

          <h3 className="mt-10 mb-3 text-xl font-semibold md:mt-14">
            <FormattedMessage defaultMessage="Mission" id="RXoqkD" />
          </h3>
          <p className="my-3">{mission}</p>

          <h3 className="mt-10 mb-3 text-xl font-semibold md:mt-14">
            <FormattedMessage defaultMessage="Type of prioritized projects" id="5y6ZTQ" />
          </h3>
          <p className="my-3">{prioritized_projects_description}</p>
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
