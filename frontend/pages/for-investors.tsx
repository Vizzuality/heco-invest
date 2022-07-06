import { useState } from 'react';

import { ChevronRight, ChevronLeft } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import { groupBy } from 'lodash-es';
import { InferGetStaticPropsType } from 'next';

import { useBreakpoint } from 'hooks/use-breakpoint';

import { loadI18nMessages } from 'helpers/i18n';
import { getCategoryColor } from 'helpers/pages';

import ImpactModal from 'containers/modals/impact';

import Button from 'components/button';
import Head from 'components/head';
import Icon from 'components/icon';
import LayoutContainer from 'components/layout-container';
import { Paths } from 'enums';
import { StaticPageLayoutProps } from 'layouts/static-page';
import { PageComponent } from 'types';
import { Enum } from 'types/enums';
import { Project } from 'types/project';

import { getEnums } from 'services/enums/enumService';
import { getProjects } from 'services/projects/projectService';

import ArrowIcon from 'svgs/project/project-card-arrow.svg';

export const getStaticProps = withLocalizedRequests(async ({ locale }) => {
  let projects: Project[] = [];
  let enums: Enum[] = [];
  try {
    projects = await getProjects({
      'page[size]': 10000,
      includes: ['priority_landscape'],
      fields: ['category', 'priority_landscape'],
    }).then((res) => res.data);
    enums = await getEnums();
  } catch (e) {
    return { notFound: true };
  }
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
      enums,
      projects,
    },
  };
});

type ForInvestorsPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const ForInvestorsPage: PageComponent<ForInvestorsPageProps, StaticPageLayoutProps> = ({
  projects,
  enums,
}) => {
  const { push } = useRouter();
  const [impactModalOpen, setImpactModalOpen] = useState(false);
  const [whatCanDoIndex, setWhatCanDoIndex] = useState(0);
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint('lg');
  const isXl = breakpoint('xl');
  const { category: categoryEnums, mosaic: mosaicEnums } = groupBy(enums, 'type');
  const projectsGroupedByCategory = groupBy(projects, 'category');

  const groupedProjectsByMosaic = mosaicEnums.map((mosaic) => {
    const key = mosaic.name.trim().toLowerCase().replace(/-|\s/g, '');
    const projectsQuantity =
      projects.filter(
        (project) =>
          project.priority_landscape?.name?.trim().toLowerCase().replace(/-|\s/g, '') === key
      )?.length || 0;
    return { ...mosaic, projectsQuantity };
  });

  const priorityLandscapesDescriptions = {
    'amazonian-piedmont-massif': (
      <FormattedMessage
        defaultMessage="Being a point of transition and meeting between the two most biodiverse biomes on Earth, the Tropical Andes and the Amazon, the Mosaic foothills represents one of the regions with <n>the greatest biodiversity in the world</n>."
        id="RBIeR5"
        values={{
          n: (chunk: string) => <span className="font-bold">{chunk}</span>,
        }}
      />
    ),
    'orinoquia-transition': (
      <FormattedMessage
        defaultMessage="Helps to ensure connectivity between the Andean, Orinocean and Amazonian ecosystems, allowing the conservation of flora, fauna, scenic beauties, geomorphological complexes, historical or cultural manifestations, the conservation and regulation of water systems."
        id="WJGIA3"
      />
    ),
    orinoquia: (
      <FormattedMessage
        defaultMessage="Helps to ensure connectivity between the Andean, Orinocean and Amazonian ecosystems, allowing the conservation of flora, fauna, scenic beauties, geomorphological complexes, historical or cultural manifestations, the conservation and regulation of water systems."
        id="WJGIA3"
      />
    ),
    'amazon-heart': (
      <FormattedMessage
        defaultMessage="It is an area with a number of attributes related to heterogeneity that maintain the structure and ecological processes that characterize it as the Heart of the Amazon, it is also one of the most unique natural and cultural heritages in the national territory due to its exuberant cultural diversity."
        id="QI4yO9"
      />
    ),
  };

  const whatHecoCanDoImages = [
    '/images/for-investor/for-investor-can-do-1.jpeg',
    '/images/for-investor/for-investor-can-do-2.jpeg',
    '/images/for-investor/for-investor-can-do-3.jpeg',
    '/images/for-investor/for-investor-can-do-1.jpeg',
    '/images/for-investor/for-investor-can-do-2.jpeg',
  ];

  const projectsCard = (
    id: string,
    name: string,
    description: string,
    projectsQuantity: number,
    categoryColor?: string
  ) => (
    <div
      className="w-[80vw] h-full md:w-auto row-start-2 md:row-start-auto lg:max-w-full flex flex-col justify-between p-4 transition-all duration-500 bg-white rounded-lg shadow-sm group drop-shadow-none hover:drop-shadow-lg ease min-h-[290px]"
      key={id}
    >
      <div className="flex justify-between mb-2">
        <h3 className="font-serif text-xl font-bold xl:text-2xl max-w-[80%]">{name}</h3>
        {!!categoryColor && (
          <div className={`absolute right-4 bg-category-${categoryColor} w-8 h-8 rounded-full`} />
        )}
      </div>
      <div>
        <p className="mb-4 text-sm text-gray-800 transition-all duration-500 md:opacity-0 group-hover:opacity-100 ease">
          {description}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-base text-gray-600">
          <span className="font-bold text-black">{projectsQuantity}</span>{' '}
          <FormattedMessage
            defaultMessage="{projectsQuantity, plural, one {project} other {projects}}"
            id="gbcj32"
            values={{ projectsQuantity }}
          />
        </p>
        <Button
          theme="naked"
          onClick={() =>
            push({
              pathname: Paths.Discover,
              // TODO: CHANGE TO FILTER BY PROIORITY LANDSCAPE
              query: !!categoryColor ? { 'filter[category]': id } : { search: name },
            })
          }
        >
          <Icon
            icon={ArrowIcon}
            className="transition-all duration-500 md:opacity-0 w-15 group-hover:opacity-100 ease"
          />
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Head title="About" />
      <ImpactModal impactModalOpen={impactModalOpen} setImpactModalOpen={setImpactModalOpen} />
      <LayoutContainer className="bg-background-light">
        <div className="mb-10 lg:pt-8">
          <h1 className="font-serif text-3xl font-bold lg:text-6xl text-green-dark">
            <FormattedMessage defaultMessage="Start having the greatest impact" id="o0+PZ+" />
          </h1>
        </div>
        <div className="mt-8 lg:mt-0 lg:flex lg:flex-col lg:gap-y-10 mb-15 lg:mb-0">
          <div className="mb-8 lg:flex lg:gap-80 lg:mb-0">
            <p className="flex-1">
              <FormattedMessage
                defaultMessage="HeCo Invest manages a <n>wide range of investment and financing opportunities</n> in various sector categories and priority landscapes for the conservation and development of the <n>Colombian Amazon region</n>."
                id="NG6Ull"
                values={{
                  n: (chunk: string) => <span className="font-semibold">{chunk}</span>,
                }}
              />
            </p>
            <div className="flex-1"></div>
          </div>
          <div className="lg:flex lg:gap-x-80">
            <div className="flex-1"></div>
            <p className="flex-1">
              <FormattedMessage
                defaultMessage="Thanks to our integration with <n>ARIES</n>, an Artificial Intelligence tool that integrates <n>expert knowledge, Semantics</n> and <n>Machine Reasoning</n> technology, we can <n>estimate a projects’ impact</n> along our four dimensions of interest: <n>Climate, Biodiversity, Water, Community</n> to guide and track your investment decisions."
                id="LmyoPR"
                values={{
                  n: (chunk: string) => <span className="font-semibold">{chunk}</span>,
                }}
              />
            </p>
          </div>
        </div>
      </LayoutContainer>

      <LayoutContainer className="mt-5 lg:mt-32">
        <div className="flex flex-col lg:py-14 lg:grid lg:grid-cols-2">
          <div className="flex flex-col justify-center order-2 p-6 pb-10 overflow-hidden text-white lg:py-10 lg:order-1 lg:-mt-28 rounded-b-2xl lg:rounded-3xl lg:rounded-br-none bg-green-dark lg:px-14">
            <h2 className="font-serif text-3xl font-bold lg:text-4xl xl:text-5xl">
              <FormattedMessage defaultMessage="30 million" id="m1w8ew" />
            </h2>
            <p className="mt-4 mb-6">
              <FormattedMessage
                defaultMessage="people live in the Amazon region1.5 million indigenous people and more than 5 million Afro-descendants."
                id="duKl7d"
              />
            </p>
            <h2 className="font-serif text-3xl font-bold lg:text-4xl xl:text-5xl">
              <FormattedMessage defaultMessage="123.000 million" id="2HumLB" />
            </h2>
            <p className="mt-4 mb-6">
              <FormattedMessage
                defaultMessage="tons of carbon are stored in the Amazon.It is one of the most important terrestrial carbon sink on Earth, helping to mitigate climate change."
                id="tzQB5d"
              />
            </p>
            <h2 className="font-serif text-3xl font-bold lg:text-4xl xl:text-5xl">
              <FormattedMessage defaultMessage="10%" id="HlDhAh" />
            </h2>
            <p className="mt-4">
              <FormattedMessage
                defaultMessage="of the planet’s known biodiversity lives in the Amazon, the largest tropical rainforest on the planet."
                id="iUt7so"
              />
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <div className="flex items-center justify-center w-full h-full bg-[url("/images/for-investor/for-investors-why-to-invest.jpg")] rounded-t-2xl lg:rounded-3xl lg:rounded-l-none">
              <div className="max-w-lg p-6 pt-10 text-white lg:p-10 lg:max-w-md">
                <h2 className="mb-6 font-serif text-3xl font-bold lg:text-4xl">
                  <FormattedMessage defaultMessage="Why invest in the Amazon" id="mQk71L" />
                </h2>
                <p className="text-lg">
                  <FormattedMessage
                    defaultMessage="Investing in the Amazon means contributing to improving the quality of life of more than 30 million people. It is also contributing to the development and conservation of a vital region for South America and the world."
                    id="4zK41e"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </LayoutContainer>

      <div className="pl-4 mt-20 mb-6 sm:mt-24 lg:mt-40">
        <h2 className="font-serif text-3xl font-bold md:hidden">
          <FormattedMessage defaultMessage="Discover projects by category" id="des5Rg" />
        </h2>
        <div className="grid pb-6 pr-4 overflow-x-scroll grid-rows-[minmax(auto,_1fr)] grid-cols-auto-1fr gap-x-4 gap-y-14 md:gap-x-6 md:gap-y-6 md:overflow-x-hidden md:grid-cols-3 md:grid-row-2 xl:grid-cols-4 md:place-content-end md:container md:mx-auto sm:px-6 md:px-8">
          {/* Repeating the header here to change the layout when md screens */}
          <h2 className="hidden row-span-1 font-serif text-3xl font-semibold md:block md:mb-10 md:col-span-1 lg:text-5xl xl:col-span-2 lg:mb-0 lg:w-auto">
            <FormattedMessage defaultMessage="Discover projects by category" id="des5Rg" />
          </h2>
          {categoryEnums.map(({ id, name, description }) => {
            const categoryColor = getCategoryColor(id);
            const projectsQuantity = projectsGroupedByCategory[id]?.length || 0;
            return projectsCard(id, name, description, projectsQuantity, categoryColor);
          })}
        </div>
      </div>

      <LayoutContainer>
        <div className="flex items-end mb-6 overflow-hidden rounded-xl">
          <Image
            src="/images/for-investor/for-investor-category.png"
            width={isDesktop ? 918 : 343}
            height={isDesktop ? 285 : 285}
            objectFit="cover"
            alt=""
          />
          <p className="absolute p-4 text-white text-2xs">© Luis Barreto / WWF-UK</p>
        </div>
        {/* <div className="md:grid-cols-4 md:gap-6 md:grid"> */}
        <div className="grid pb-6 pr-4 md:pr-0 md:pl-0 overflow-x-scroll grid-rows-[minmax(auto,_1fr)] grid-cols-auto-1fr gap-x-4 gap-y-14 md:gap-x-6 md:gap-y-6 md:overflow-x-hidden md:grid-cols-3 md:grid-row-2 xl:grid-cols-4 md:place-content-end md:container md:mx-auto sm:px-6 md:px-8">
          {groupedProjectsByMosaic.map(({ id, name, projectsQuantity }, index) => {
            const gridPosition =
              index === 0
                ? 'lg:row-start-1'
                : index === 3
                ? 'lg:row-start-3 lg:col-start-2'
                : 'lg:row-start-2';
            const description = priorityLandscapesDescriptions[id];
            return (
              <div key={id} className={`row-start-3 ${gridPosition}`}>
                {projectsCard(id, name, description, projectsQuantity)}
              </div>
            );
          })}
          <div className="w-[calc(100vw-32px)] lg:w-auto col-span-auto md:col-span-2 md:col-start-3">
            <h2 className="mt-8 font-serif text-3xl font-semibold md:text-5xl">
              <FormattedMessage defaultMessage="By priority landscapes" id="JcS7oJ" />
            </h2>
          </div>
          <div className="w-[calc(100vw-32px)] lg:w-auto col-start-1 row-start-2 col-span- lg:col-span-2 lg:col-start-3 lg:row-span-2 lg:row-start-2">
            <Image
              src="/images/for-investor/for-investor-priority-landscapes.png"
              alt=""
              width={604}
              height={557}
              objectFit="cover"
              objectPosition="center"
              layout="responsive"
            />
            <div>
              <p className="mt-6 text-center text-gray-700 text-2xs">
                <FormattedMessage defaultMessage="Priority landscapes of HeCo" id="Zt7DBA" />
              </p>
            </div>
          </div>
        </div>
      </LayoutContainer>

      <div className="py-20 mt-20 bg-green-dark">
        <LayoutContainer>
          <div className="flex flex-col items-center text-center text-white">
            <h2 className="mb-6 font-serif text-3xl font-bold lg:text-4xl">
              <FormattedMessage defaultMessage="What HeCo Invest can do for you" id="2sU5tO" />
            </h2>
            <p className="max-w-xl mb-12 lg:text-lg">
              <FormattedMessage
                defaultMessage="Create a free account to start using all the benefits that HeCo Invest can offer to you and your team."
                id="WLDgff"
              />
            </p>
            <div className="w-[calc(100vw-20px)] overflow-hidden bg-green-dark mb-0 lg:mb-12">
              <div
                className={cx(
                  'flex lg:gap-6 2xl:gap-10 w-[500vw] lg:w-[183vw] transition-all ease-in-out duration-700',
                  {
                    'translate-x-0 lg:translate-x-24': whatCanDoIndex === 0,
                    'translate-x-[calc(-100vw+20px)] lg:translate-x-[calc(-33.33vw+88px)]':
                      whatCanDoIndex === 1,
                    'translate-x-[calc(-200vw+40px)] lg:translate-x-[calc(-66.66vw+78px)]':
                      whatCanDoIndex === 2,
                  }
                )}
              >
                {whatHecoCanDoImages.map((imageSrc, index) => {
                  return (
                    <div
                      key={imageSrc + index}
                      className={cx(
                        'overflow-hidden rounded-2xl transition-all ease-in-out duration-700',
                        {
                          'w-[calc(100vw-20px)] lg:w-[50vw] opacity-100': index === whatCanDoIndex,
                          'w-[calc(100vw-20px)] lg:w-[33.33vw]': index !== whatCanDoIndex,
                          'opacity-40': index > whatCanDoIndex,
                          'opacity-0': index < whatCanDoIndex,
                        }
                      )}
                    >
                      <Image
                        src={imageSrc}
                        alt=""
                        width={isXl ? 1063.5 : 709}
                        height={isXl ? 750 : 500}
                        objectFit="cover"
                        objectPosition="center"
                        layout="fixed"
                        className="rounded-2xl"
                      />
                    </div>
                  );
                })}
              </div>
              <div className="lg:absolute p-7 -translate-y-8 lg:-translate-y-full max-w-full lg:max-w-[500px] lg:left-1/2 bg-background-light rounded-xl -mt-1.5">
                <div className="flex justify-between mb-2 align-middle">
                  <div>
                    <p className="text-xl font-bold text-gray-600">
                      <span className="text-green-dark">0{whatCanDoIndex + 1}</span> / 03
                    </p>
                  </div>
                  <div className="flex gap-2.5">
                    <button
                      className="flex items-center justify-center w-8 h-8 px-0 py-0 border rounded-full border-beige drop-shadow-lg "
                      onClick={() =>
                        setWhatCanDoIndex(whatCanDoIndex === 0 ? 2 : whatCanDoIndex - 1)
                      }
                    >
                      <Icon
                        icon={ChevronLeft}
                        className="text-black transition-colors duration-300 ease-in-out hover:text-beige"
                      />
                    </button>
                    <button
                      className="flex items-center justify-center w-8 h-8 p-0 border rounded-full drop-shadow-lg "
                      onClick={() =>
                        setWhatCanDoIndex(whatCanDoIndex === 2 ? 0 : whatCanDoIndex + 1)
                      }
                    >
                      <Icon
                        icon={ChevronRight}
                        className="text-black transition-colors duration-300 ease-in-out hover:text-beige"
                      />
                    </button>
                  </div>
                </div>
                <div className="text-left text-black">
                  <h4 className="mb-6 font-serif text-2xl">
                    <FormattedMessage defaultMessage="Create open calls" id="4EYbNW" />
                  </h4>
                  <p>
                    <FormattedMessage
                      defaultMessage="As an investor or funder, if you do not find a project aligned with your interests, you can create your own call to challenge the <n>HeCo Invest community</n> and receive customized, quality proposals that are only visible to the users of your account."
                      id="iMJ1Xr"
                      values={{
                        n: (chunk: string) => <span className="font-bold">{chunk}</span>,
                      }}
                    />
                  </p>
                </div>
              </div>
            </div>
            <Button
              className="justify-center w-full md:w-auto"
              theme="secondary-white"
              href={Paths.SignUp}
            >
              <FormattedMessage defaultMessage="Create account" id="huqKGl" />
            </Button>
          </div>
        </LayoutContainer>
      </div>
    </>
  );
};

ForInvestorsPage.layout = {
  props: {
    footerProps: {
      className: 'mt-0 sm:mt-24 lg:mt-0',
    },
  },
};

export default ForInvestorsPage;
