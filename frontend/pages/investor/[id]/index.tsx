// import { useRouter } from 'next/router';
import { Heart as HeartIcon } from 'react-feather';
import { useIntl } from 'react-intl';
import { FormattedMessage } from 'react-intl';

import Image from 'next/image';

import { loadI18nMessages } from 'helpers/i18n';

import ProfileAbout from 'containers/profile-about';
import SDGs, { SDGType } from 'containers/sdgs';
import TagsGrid, { TagsGridRowType } from 'containers/tags-grid';
import { SocialType } from 'containers/website-social-contact';

import Button from 'components/button';
import Head from 'components/head';
import LayoutContainer from 'components/layout-container';
import { StaticPageLayoutProps } from 'layouts/static-page';
import { PageComponent } from 'types';

export async function getStaticProps(ctx) {
  return {
    props: {
      intlMessages: await loadI18nMessages(ctx),
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

const InvestorPage: PageComponent<{}, StaticPageLayoutProps> = (props) => {
  const intl = useIntl();
  // const { query } = useRouter();
  // const { id } = query;

  const aboutInfo: {
    text: string;
    website: string;
    social: SocialType[];
    contact: string;
  } = {
    text: 'NESsT finances enterprises that generate dignified employment and sustain the planet. Since 1997, we have financed 200 enterprises that have sustained jobs for 70,000 individuals and improved 670,000 lives. We achieve our mission through an Incubator that provides pre-seed capital and business services to improve investment readiness; and the Enterprise Fund that deploys seed-state loans to enterprises seeking capital to scale',
    website: 'https://www.site.com',
    social: [
      { id: 'linked-in', url: 'https://www.linkedin.com' },
      { id: 'twitter', url: 'https://www.twitter.com' },
      { id: 'facebook', url: 'https://www.facebook.com' },
      { id: 'instagram', url: 'https://www.instagram.com' },
    ],
    contact: 'LoÏc Comolli',
  };

  const tagsGridRows: TagsGridRowType[] = [
    {
      title: 'Invests in',
      type: 'category',
      tags: [
        { id: 'tourism', title: 'Tourism & Recreation' },
        { id: 'production', title: 'Non-timber forest production' },
        { id: 'agrosystems', title: 'Sustainable agrosystems' },
        { id: 'forestry', title: 'Forestry & agroforestry' },
      ],
    },
    {
      title: 'Ticket size',
      tags: ['US$50k', '$50k - $500k', '$500k - $1M'],
    },
    {
      title: 'Instrument size',
      tags: ['Grand', 'Loan'],
    },
    {
      title: 'Impact they invest on',
      tags: ['Biodiversity', 'Community'],
    },
  ];

  const sdgsItems: SDGType[] = [
    { id: 'no-poverty', title: 'No poverty' },
    { id: 'gender-equality', title: 'Gender equality' },
    { id: 'decent-work', title: 'Decent work and economic growth' },
    { id: 'reduced-inequalities', title: 'Reduced inequalities' },
    { id: 'climate-action', title: 'Climate action' },
    { id: 'life-on-land', title: 'Life on land' },
  ];

  return (
    <>
      <Head title="Investor Profile" />

      <LayoutContainer layout="narrow" className="mb-20">
        <div className="relative mb-10 h-14">
          <Image
            className="mx-auto"
            src={`/images/temp-placeholders/nesst-logo.png`}
            alt={`NESst ${intl.formatMessage({ defaultMessage: 'logo', id: 'foSyCj' })}`}
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div className="text-center">
          <h1 id="profile-about" className="text-2xl font-semibold">
            NESsT
          </h1>
          <p className="mt-2 text-xl text-gray-800">Non-VC Investment vehicle</p>
        </div>

        <h3 className="mb-3 text-xl font-semibold mt-14">About</h3>
        <ProfileAbout
          text={aboutInfo.text}
          website={aboutInfo.website}
          social={aboutInfo.social}
          contact={aboutInfo.contact}
          buttons={
            <>
              <Button theme="secondary-green" icon={HeartIcon}>
                <FormattedMessage defaultMessage="Favorite" id="5Hzwqs" />
              </Button>
              <Button theme="primary-green">
                <FormattedMessage defaultMessage="Contact" id="zFegDD" />
              </Button>
            </>
          }
        />
      </LayoutContainer>

      <hr className="mb-24 -mt-2 md:-mt-5 md:mb-36" />

      <LayoutContainer layout="narrow" className="mb-20">
        <section aria-labelledby="profile-investment-info">
          <h2
            id="profile-investment-info"
            className="mt-12 font-serif text-2xl font-semibold md:mt-20 sm:text-3xl text-green-dark"
          >
            <FormattedMessage defaultMessage="Investment info" id="m3Dnav" />
          </h2>

          <TagsGrid className="mt-10 md:mt-14" rows={tagsGridRows} />

          <h3 className="mt-10 mb-3 text-xl font-semibold md:mt-14">
            <FormattedMessage defaultMessage="Invests in SDG's" id="7qgtEX" />
          </h3>
          <SDGs className="my-3" sdgs={sdgsItems} />

          <h3 className="mt-10 mb-3 text-xl font-semibold md:mt-14">
            <FormattedMessage defaultMessage="How do they work?" id="KtecFi" />
          </h3>
          <p className="my-3">
            We achieve our mission through an Incubator that provides pre-seed capital and business
            services to improve investment readiness; and the Enterprise Fund that deploys
            seed-state loans to enterprises seeking capital to scale.
          </p>
          <p className="my-3">We work across cross-cutting themes that include:</p>
          <ul className="pl-6 my-3 list-disc">
            <li>
              <span className="font-semibold">Climate Change: </span>
              Regenerative agriculture, circular economy, ecotourism
            </li>
            <li>
              <span className="font-semibold">Gender Equity: </span>
              Women in tech, financial empowerment
            </li>
            <li>
              <span className="font-semibold">Digital Economy: </span>
              Workforce development, youth inclusion, diversity hiring
            </li>
          </ul>
          <p>
            Our headquarters is in the U.S., and we operate in Latin America from local offices in
            Lima and San Martin (Peru), Bogota (Colombia), Sao Paulo and Para (Brazil), and Santiago
            (Chile).
          </p>

          <h3 className="mt-10 mb-3 text-xl font-semibold md:mt-14">
            <FormattedMessage defaultMessage="This makes a difference to them" id="lPkzC0" />
          </h3>
          <p className="my-3">
            Traditional businesses just aren&apos;t getting the job done in emerging market
            countries. People deserve access to good jobs, reliable income and the dignity that
            comes with supporting their families and contributing to their communities.
            Locally-based social enterprises are uniquely qualified to transform low-income,
            excluded and environmentally-vulnerable communities.
          </p>
          <p className="my-3">
            These enterprises are on the ground, have the trust of the communities and have created
            businesses aligned with their best interests. It&apos;s at the early stage of investing
            where we can first reach the most vulnerable – poor, excluded, and highly at risk
            individuals – that are often seen as candidates for charity and become the victims of
            donor fatigue or are simply ignored.
          </p>

          <h3 className="mt-10 mb-3 text-xl font-semibold md:mt-14">
            <FormattedMessage defaultMessage="Other information" id="kX7oGR" />
          </h3>
          <p className="my-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit ut libero ultricies ut nibh
            nibh. Ac lacinia sem ullamcorper felis cursus nec. Ornare mattis id quis amet. Sit sed
            malesuada nulla pharetra turpis sit. Eget in cras lobortis et et sed cras scelerisque
            erat. Consectetur quis consectetur semper sit aliquam fames. Egestas id in arcu placerat
            diam, pharetra dolor velit lectus.
          </p>
        </section>
      </LayoutContainer>
    </>
  );
};

InvestorPage.layout = {};

export default InvestorPage;
