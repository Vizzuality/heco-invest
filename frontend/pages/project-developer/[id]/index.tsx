// import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { FormattedMessage } from 'react-intl';

import { chunk } from 'lodash-es';

import { loadI18nMessages } from 'helpers/i18n';

import ProfileHeader from 'containers/profile-header';
import ProjectCard from 'containers/project-card';
import { SocialType } from 'containers/social-contact/website-social-contact';
import TagsGrid, { TagsGridRowType } from 'containers/tags-grid';

import Carousel, { Slide } from 'components/carousel';
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
    logo: string;
    name: string;
    description: string;
    text: string;
    website: string;
    social: SocialType[];
    contact: string;
  } = {
    name: 'Herencia Columbia',
    description: 'Non Governamental Agency',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis gravida auctor enim, id nisl nisl sem tristique. Rhoncus vestibulum vitae diam dignissim imperdiet. Lacus, morbi non cras maecenas cras scelerisque eget. Rutrum tincidunt sed elit rhoncus nunc nisl pulvinar consectetur tincidunt. Nunc quisque potenti velit suscipit volutpat tellus',
    logo: '/images/placeholders/profile-logo.png',
    website: 'https://www.site.com',
    social: [
      { id: 'linked-in', url: 'https://www.linkedin.com' },
      { id: 'twitter', url: 'https://www.twitter.com' },
      { id: 'facebook', url: 'https://www.facebook.com' },
      { id: 'instagram', url: 'https://www.instagram.com' },
    ],
    contact: 'Joel Bean',
  };

  const tagsGridRows: TagsGridRowType[] = [
    {
      title: 'Categories of interest',
      type: 'category',
      tags: [
        { id: 'tourism-and-recreation', name: 'Tourism & Recreation' },
        { id: 'non-timber-forest-production', name: 'Non-timber forest production' },
      ],
    },
    {
      title: 'Areas of work',
      tags: ['Corazón Amazonía'],
    },
    {
      title: 'Impact',
      tags: ['Biodiversity', 'Social'],
    },
  ];

  const projects = [...Array(6)].map((_, index) => {
    return {
      id: `project-${index}`,
      name: `Circulo de Creaciones Cidaticas Circreadi ${index}`,
      category: 'Tourism & recreation',
      instrument: 'Grant',
      amount: 25000,
    };
  });

  return (
    <>
      <Head title={`${aboutInfo.name} - ${aboutInfo.description}`} description={aboutInfo.text} />

      <ProfileHeader
        logo={aboutInfo.logo}
        title={aboutInfo.name}
        subtitle={aboutInfo.description}
        text={aboutInfo.text}
        website={aboutInfo.website}
        social={aboutInfo.social}
        contact={aboutInfo.contact}
        numNotFunded={10}
        numFunded={3}
      />

      <LayoutContainer layout="narrow" className="mt-24 mb-20 md:mt-40">
        <section aria-labelledby="project-developer-overview">
          <h2
            id="project-developer-overview"
            className="mt-12 font-serif text-2xl font-semibold md:mt-20 sm:text-3xl text-green-dark"
          >
            <FormattedMessage defaultMessage="Overview" id="9uOFF3" />
          </h2>

          <h3 className="mt-10 mb-3 text-xl font-semibold md:mt-14">
            <FormattedMessage defaultMessage="Mission" id="RXoqkD" />
          </h3>
          <p className="my-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt enim pharetra velit
            tortor mauris aenean. Adipiscing sed ornare at ipsum pellentesque.Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Tincidunt enim pharetra velit tortor mauris aenean.
            Adipiscing sed ornare at ipsum pellentesque.
          </p>

          <TagsGrid className="mt-10 md:mt-14" rows={tagsGridRows} />
        </section>

        {projects.length > 0 && (
          <>
            <hr className="mt-12 md:mt-20" />

            <h2 className="mt-12 font-serif text-2xl font-semibold md:mt-20 sm:text-3xl text-green-dark">
              <FormattedMessage defaultMessage="Projects" id="UxTJRa" />
              <span className="ml-3">({projects.length})</span>
            </h2>

            <Carousel className="mt-12">
              {chunk(projects, 3).map((projectsChunk, index) => (
                <Slide key={`slide-${index}`} className="flex flex-col gap-2">
                  {projectsChunk.map(({ id, category, name, instrument, amount }) => (
                    <ProjectCard
                      key={id}
                      id={id}
                      category={category}
                      name={name}
                      instrument={instrument}
                      amount={amount}
                      link={`/project/${id}`}
                    />
                  ))}
                </Slide>
              ))}
            </Carousel>
          </>
        )}
      </LayoutContainer>
    </>
  );
};

InvestorPage.layout = {
  props: {
    headerProps: {
      transparent: true,
    },
    mainProps: {
      topMargin: false,
    },
  },
};

export default InvestorPage;
