import { useState } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import Image from 'next/image';
import Link from 'next/link';

import { withLocalizedRequests } from 'hoc/locale';

import { groupBy } from 'lodash-es';
import { InferGetServerSidePropsType } from 'next';

import { useBreakpoint } from 'hooks/use-breakpoint';
import { FaqPaths } from 'hooks/useFaq';

import { loadI18nMessages } from 'helpers/i18n';

import Carousel from 'containers/for-public-pages/carousel';
import Description from 'containers/for-public-pages/description';
import PublicPageCard from 'containers/for-public-pages/public-page-card';
import ImpactModal from 'containers/modals/impact';

import Head from 'components/head';
import LayoutContainer from 'components/layout-container';
import { StaticPageLayoutProps } from 'layouts/static-page';
import { logEvent } from 'lib/analytics/ga';
import { PageComponent } from 'types';
import { Enum } from 'types/enums';
import { Locations } from 'types/locations';
import { Project } from 'types/project';

import { getEnums } from 'services/enums/enumService';
import { getPriorityLandscapes } from 'services/locations/locations';
import { getProjects } from 'services/projects/projectService';

export const getServerSideProps = withLocalizedRequests(async ({ locale }) => {
  let categoryEnums: Enum[] = [];
  let priorityLandscapes: Locations[] = [];

  let projectsByCategory: Record<string, Project[]> = {};
  let projectsByPriorityLandscape: Record<string, Project[]> = {};

  try {
    const projects: Project[] = await getProjects({
      'page[size]': 10000,
      includes: ['priority_landscape'],
      fields: ['category', 'priority_landscape'],
    }).then((res) => res.data);

    const enums: Enum[] = await getEnums();
    ({ category: categoryEnums } = groupBy(enums, 'type'));

    priorityLandscapes = await getPriorityLandscapes();

    projectsByCategory = groupBy(projects, 'category');
    projectsByPriorityLandscape = groupBy(projects, 'priority_landscape.id');
  } catch (e) {
    return { notFound: true };
  }
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
      categoryEnums,
      projectsByCategory,
      projectsByPriorityLandscape,
      priorityLandscapes,
    },
  };
});

type ForInvestorsPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const ForInvestorsPage: PageComponent<ForInvestorsPageProps, StaticPageLayoutProps> = ({
  categoryEnums,
  projectsByCategory,
  projectsByPriorityLandscape,
  priorityLandscapes,
}) => {
  const { formatMessage } = useIntl();

  const [impactModalOpen, setImpactModalOpen] = useState(false);
  const [hoveredPriorityLandscapeCode, setHoveredPriorityLandscapeCode] = useState<string>(null);

  const breakpoint = useBreakpoint();
  const isMd = breakpoint('sm');

  const priorityLandscapesDescriptionsByCode = {
    'priority-landscape-amazonian-piedmont-massif': (
      <FormattedMessage
        defaultMessage="Being a point of transition and meeting between the two most biodiverse biomes on Earth, the Tropical Andes and the Amazon, the Mosaic foothills represents one of the regions with <n>the greatest biodiversity in the world</n>."
        id="RBIeR5"
        values={{
          n: (chunk: string) => <span className="font-semibold">{chunk}</span>,
        }}
      />
    ),
    'priority-landscape-orinoquia-transition': (
      <FormattedMessage
        defaultMessage="Helps to ensure connectivity between the Andean, Orinocean and Amazonian ecosystems, allowing the conservation of flora, fauna, scenic beauties, geomorphological complexes, historical or cultural manifestations, the conservation and regulation of water systems."
        id="WJGIA3"
      />
    ),
    'priority-landscape-orinoquia': (
      <FormattedMessage
        defaultMessage="It is an ecoregion covered with savannahs of high floristic diversity and habitats representative of the evolutionary processes of the Guiana Shield. It includes both blackwater and whitewater rivers that feed the great Orinoco River, creating different types of seasonally flooded forests."
        id="pNNQA+"
      />
    ),
    'priority-landscape-amazon-heart': (
      <FormattedMessage
        defaultMessage="It is an area with a number of attributes related to heterogeneity that maintain the structure and ecological processes that characterize it as the Heart of the Amazon. It is also one of the most unique natural and cultural heritages in the colombian territory due to its exuberant cultural diversity."
        id="RAf4Za"
      />
    ),
    'priority-landscape-cordillera-central': (
      <FormattedMessage
        defaultMessage="It encompasses high mountain ecosystems: moors, Andean forests, wetlands, glaciers, and volcanic complexes. It has the highest proportion of glaciers in Colombia, with four of the remaining six snowy peaks. Additionally, it houses seven moor complexes, 20% of the national total. It plays a crucial role in water capture and regulation."
        id="F1bd4u"
      />
    ),
    // 'priority-landscape-cordillera-oriental': <FormattedMessage defaultMessage="" id="F1bd4u" />,
    'priority-landscape-caribe': (
      <FormattedMessage
        defaultMessage="A region of great diversity, it encompasses a complex system that includes one of the world's largest coastal mountain ranges, Colombia's largest coastal lagoon, mangroves, wetlands, moors, glaciers, dry ecosystems, and Andean ecosystems. Ethnic, rural, and fishing communities are found there."
        id="Vj8/7g"
      />
    ),
    // 'priority-landscape-transicion-pacifico-caribe': <FormattedMessage defaultMessage="" id="F1bd4u" />,
    'priority-landscape-pacifico-marino-costero': (
      <FormattedMessage
        defaultMessage="It hosts strategic ecosystems: beaches, mangroves, cliffs, and coral reefs, providing crucial benefits to communities such as water supply, nitrogen and carbon fixation, hydrological cycle control, and habitat for species. Inhabited mainly by ethnic communities, it plays a fundamental role in sustainability and human well-being."
        id="CFiYxa"
      />
    ),
  };

  const whatHecoCanDoTexts = [
    {
      title: <FormattedMessage defaultMessage="Create open calls" id="4EYbNW" />,
      description: (
        <FormattedMessage
          defaultMessage="As an investor or funder, if you do not find a project aligned with your interests, you can create your own call to challenge the <n>HeCo Invest community</n> and receive customized, quality proposals that are only visible to the users of your account."
          id="iMJ1Xr"
          values={{
            n: (chunk: string) => <span className="font-semibold">{chunk}</span>,
          }}
        />
      ),
    },
    {
      title: <FormattedMessage defaultMessage="Save your favorites" id="62pTkz" />,
      description: (
        <FormattedMessage
          defaultMessage="Save your favorites by clicking on the 'Heart'. You can save projects, project developers or even other investors and never loose track of them."
          id="qay06p"
        />
      ),
    },
    {
      title: <FormattedMessage defaultMessage="Contact access" id="nIbokM" />,
      description: (
        <FormattedMessage
          defaultMessage="Have access to all of the contacts of <n>project developers </n> and <n>investors</n>. Easily reach and connect so you can decide where to invest."
          id="/Jn84b"
          values={{ n: (chunk: string) => <span className="font-semibold">{chunk}</span> }}
        />
      ),
    },
  ];

  const whatHecoCanDoImages = [
    '/images/for-investor/for-investor-can-do-1.jpeg',
    '/images/for-investor/for-investor-can-do-2.jpeg',
    '/images/for-investor/for-investor-can-do-3.jpeg',
    '/images/for-investor/for-investor-can-do-1.jpeg',
    '/images/for-investor/for-investor-can-do-2.jpeg',
  ];

  return (
    <>
      <Head title={formatMessage({ defaultMessage: 'For investors', id: 'MfCYKW' })} />
      <ImpactModal impactModalOpen={impactModalOpen} setImpactModalOpen={setImpactModalOpen} />

      <Description
        title={<FormattedMessage defaultMessage="Start having the greatest impact" id="o0+PZ+" />}
        descriptions={[
          <FormattedMessage
            key="desc-1"
            defaultMessage="HeCo Invest manages a <n>wide range of investment and financing opportunities (investment opportunities for loan, equity or grant funding)</n> in various sector categories and priority landscapes for the conservation and development of the <n>Colombian Amazon region</n>."
            id="g69fjK"
            values={{
              n: (chunk: string) => <span className="font-semibold">{chunk}</span>,
            }}
          />,
          <FormattedMessage
            key="desc-2"
            defaultMessage="Thanks to our integration with <n>ARIES</n>, an ARtificial Intelligence tool that integrates <n>expert knowledge, Semantics</n> and <n>Machine Reasoning</n> technology, we can <n>estimate a projects’ impact</n> along our four dimensions of interest: <n>Climate, Biodiversity, Water, Community</n> to guide and track your investment decisions."
            id="0IYK8L"
            values={{
              n: (chunk: string) => <span className="font-semibold">{chunk}</span>,
            }}
          />,
        ]}
        leftTexts={[
          {
            id: 'population',
            title: <FormattedMessage defaultMessage="30 million" id="m1w8ew" />,
            description: (
              <>
                <FormattedMessage defaultMessage="people live in the Amazon region." id="xUR9nd" />
                <br />
                <FormattedMessage
                  defaultMessage="1.5 million indigenous people and more than 5 million Afro-descendants."
                  id="Sg5j0W"
                />
              </>
            ),
          },
          {
            id: 'carbon',
            title: <FormattedMessage defaultMessage="123.000 million" id="2HumLB" />,
            description: (
              <>
                <FormattedMessage
                  defaultMessage="tons of carbon are stored in the Amazon."
                  id="Ejc7dP"
                />
                <br />
                <FormattedMessage
                  defaultMessage="It is one of the most important terrestrial carbon sink on Earth, helping to mitigate climate change."
                  id="7mgGgs"
                />
              </>
            ),
          },
          {
            id: 'biodiversity',
            title: <FormattedMessage defaultMessage="10%" id="HlDhAh" />,
            description: (
              <FormattedMessage
                defaultMessage="of the planet’s known biodiversity lives in the Amazon, the largest tropical rainforest on the planet."
                id="iUt7so"
              />
            ),
          },
        ]}
        rightText={{
          title: <FormattedMessage defaultMessage="Why invest in the Amazon" id="mQk71L" />,
          description: (
            <FormattedMessage
              defaultMessage="Investing in the Amazon means contributing to improving the quality of life of more than 30 million people. It is also contributing to the development and conservation of a vital region for South America and the world."
              id="4zK41e"
            />
          ),
        }}
        page="for-investors"
      />

      <LayoutContainer className="mt-28">
        <h2 className="mb-8 font-serif text-3xl font-bold md:hidden">
          <FormattedMessage defaultMessage="Discover projects by category" id="des5Rg" />
        </h2>
        <div className="grid overflow-x-auto md:overflow-visible md:grid-rows-[minmax(auto,_1fr)] gap-x-4 gap-y-14 md:gap-x-4 md:gap-y-6 md:grid-cols-3 md:grid-row-2 xl:grid-cols-4 md:place-content-end px-4 py-6 -mx-4 md:py-0 sm:-mx-6 sm:px-6 md:mx-0 md:px-0">
          {/* Repeating the header here to change the layout when md screens */}
          <h2 className="hidden row-span-1 font-serif text-3xl font-semibold md:block md:mb-10 md:col-span-1 lg:text-5xl xl:col-span-2 lg:mb-0 lg:w-auto">
            <FormattedMessage defaultMessage="Discover projects by category" id="des5Rg" />
          </h2>
          {categoryEnums.map(({ id, name, description }) => {
            const projectsQuantity = projectsByCategory[id]?.length || 0;
            return (
              <div key={id} className="row-start-1 md:row-start-auto">
                <PublicPageCard
                  id={id}
                  name={name}
                  description={description}
                  quantity={projectsQuantity}
                  cardType="projects"
                  enumType="category"
                  filterName="category"
                  onClick={() => logEvent('for_investors_card', { card_name: id })}
                />
              </div>
            );
          })}
        </div>
      </LayoutContainer>

      <LayoutContainer>
        <div className="relative mb-6 overflow-hidden aspect-[6/5]  md:aspect-auto mt-8 md:mt-18">
          <Image
            src="/images/for-investor/for-investor-category.png"
            width={918}
            height={285}
            layout={isMd ? 'intrinsic' : 'fill'}
            objectFit="cover"
            objectPosition="center"
            alt=""
            className="rounded-lg"
          />
          <p className="absolute bottom-0 left-0 p-4 text-white text-2xs">
            © Luis Barreto / WWF-UK
          </p>
        </div>
        <h2 className="mt-8 mb-8 font-serif text-3xl font-semibold md:mt-14 md:text-5xl">
          <FormattedMessage defaultMessage="By priority landscapes" id="JcS7oJ" />
        </h2>
        <p className="max-w-[800px] mb-8">
          <FormattedMessage
            defaultMessage="The HeCo priority landscapes or conservation mosaics are geographic spaces of unique biodiversity conditions with sustainability and management plans developed by Heritage Colombia to ensure quality ecosystem services. <a>Read more</a>"
            id="TNwO58"
            values={{
              a: (chunks: string) => (
                <Link href={FaqPaths['what-are-heco-priority-landscapes']}>
                  <a className="underline text-green-dark focus-visible:outline focus-visible:outline-green-dark focus-visible:outline-2 focus-visible:outline-offset-2">
                    {chunks}
                  </a>
                </Link>
              ),
            }}
          />
        </p>
        <div className="grid grid-flow-row gap-6 lg:grid-flow-col lg:grid-cols-2 xl:gap-8">
          <figure className="block max-w-md mx-auto rounded-lg lg:max-w-none lg:col-start-2">
            <Image
              src={
                !hoveredPriorityLandscapeCode
                  ? '/images/for-investor/for-investor-priority-landscapes.png'
                  : `/images/for-investor/for-investor-${hoveredPriorityLandscapeCode}.png`
              }
              alt={formatMessage({ defaultMessage: 'HeCo priority landscapes', id: 'X+46wB' })}
              width={640}
              height={744}
              className="rounded-lg"
            />
            <figcaption className="mt-2 text-xs font-semibold text-center text-gray-700">
              <FormattedMessage defaultMessage="HeCo priority landscapes" id="X+46wB" />
            </figcaption>
          </figure>

          <div className="grid grid-flow-col px-4 py-6 -mx-4 overflow-x-auto lg:py-0 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 lg:grid-flow-row lg:overflow-visible lg:col-start-1 gap-x-4 xl:gap-6 lg:gap-y-6 xl:gap-y-8 lg:grid-cols-2">
            {priorityLandscapes.map(({ id, name, code }, index) => {
              const description = priorityLandscapesDescriptionsByCode[code];
              const projectsQuantity = projectsByPriorityLandscape[id]?.length || 0;
              return (
                <PublicPageCard
                  key={id}
                  id={id}
                  name={name}
                  description={description}
                  quantity={projectsQuantity}
                  cardType="projects"
                  enumType="mosaic"
                  filterName="priority_landscape"
                  onMouseEnter={() => setHoveredPriorityLandscapeCode(code)}
                  onMouseLeave={() => setHoveredPriorityLandscapeCode(null)}
                  onClick={() => logEvent('for_investors_card', { card_name: code })}
                />
              );
            })}
          </div>
        </div>
      </LayoutContainer>

      <Carousel
        subtitle={
          <FormattedMessage
            defaultMessage="Create a free account to start using all the benefits that HeCo Invest can offer to you and your team."
            id="WLDgff"
          />
        }
        images={whatHecoCanDoImages}
        texts={whatHecoCanDoTexts}
      />
    </>
  );
};

ForInvestorsPage.layout = {
  props: {
    footerProps: {
      className: 'mt-0',
    },
  },
};

export default ForInvestorsPage;
