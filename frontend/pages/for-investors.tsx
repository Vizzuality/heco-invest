import { useState } from 'react';

import { ChevronRight, ChevronLeft } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import Image from 'next/image';

import { withLocalizedRequests } from 'hoc/locale';

import { groupBy } from 'lodash-es';
import { InferGetStaticPropsType } from 'next';

import { useBreakpoint } from 'hooks/use-breakpoint';

import { loadI18nMessages } from 'helpers/i18n';
import { getMosaicsWithProjectsNumber } from 'helpers/pages';

import ProjectCard from 'containers/for-public-pages/project-card';
import ImpactModal from 'containers/modals/impact';

import Button from 'components/button';
import Head from 'components/head';
import Icon from 'components/icon';
import LayoutContainer from 'components/layout-container';
import { Paths } from 'enums';
import { StaticPageLayoutProps } from 'layouts/static-page';
import { PageComponent } from 'types';
import { CategoryType } from 'types/category';
import { Enum } from 'types/enums';
import { Project } from 'types/project';

import { getEnums } from 'services/enums/enumService';
import { getProjects } from 'services/projects/projectService';

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
  const { formatMessage } = useIntl();
  const [impactModalOpen, setImpactModalOpen] = useState(false);
  const [whatCanDoIndex, setWhatCanDoIndex] = useState(0);
  const breakpoint = useBreakpoint();
  const isMd = breakpoint('sm');
  const isLg = breakpoint('lg');
  const isXl = breakpoint('xl');

  const { category: categoryEnums, mosaic: mosaicEnums } = groupBy(enums, 'type');
  const projectsGroupedByCategory = groupBy(projects, 'category');

  const mosaicsWithProjectsNumber = getMosaicsWithProjectsNumber(mosaicEnums, projects);

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

      <LayoutContainer className="bg-background-light">
        <div className="mb-10 lg:pt-8">
          <h1 className="font-serif text-3xl font-bold lg:text-6xl text-green-dark">
            <FormattedMessage defaultMessage="Start having the greatest impact" id="o0+PZ+" />
          </h1>
        </div>
        <div className="mt-8 lg:mt-0 lg:flex lg:flex-col lg:gap-y-10 pb-15 lg:pb-0">
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

      <LayoutContainer className="mt-5 md:mt-32">
        <div className="flex flex-col mdpy-14 md:grid md:grid-cols-2">
          <div className="flex flex-col justify-center order-2 p-6 pb-10 overflow-hidden text-white md:py-10 md:order-1 md:-mt-28 rounded-b-2xl md:rounded-3xl md:rounded-br-none bg-green-dark md:px-14">
            <div className="font-serif text-3xl font-bold lg:text-4xl xl:text-5xl">
              <FormattedMessage defaultMessage="30 million" id="m1w8ew" />
            </div>
            <p className="mt-4 mb-6">
              <FormattedMessage defaultMessage="people live in the Amazon region." id="xUR9nd" />
              <br />
              <FormattedMessage
                defaultMessage="1.5 million indigenous people and more than 5 million Afro-descendants."
                id="Sg5j0W"
              />
            </p>
            <div className="font-serif text-3xl font-bold lg:text-4xl xl:text-5xl">
              <FormattedMessage defaultMessage="123.000 million" id="2HumLB" />
            </div>
            <p className="mt-4 mb-6">
              <FormattedMessage
                defaultMessage="tons of carbon are stored in the Amazon."
                id="Ejc7dP"
              />
              <br />
              <FormattedMessage
                defaultMessage="It is one of the most important terrestrial carbon sink on Earth, helping to mitigate climate change."
                id="7mgGgs"
              />
            </p>
            <div className="font-serif text-3xl font-bold lg:text-4xl xl:text-5xl">
              <FormattedMessage defaultMessage="10%" id="HlDhAh" />
            </div>
            <p className="mt-4">
              <FormattedMessage
                defaultMessage="of the planet’s known biodiversity lives in the Amazon, the largest tropical rainforest on the planet."
                id="iUt7so"
              />
            </p>
          </div>
          <div className="order-1 md:order-2">
            <div className="flex items-center justify-center w-full h-full bg-[url('/images/for-investor/for-investors-why-to-invest.jpg')] rounded-t-2xl md:rounded-3xl md:rounded-l-none">
              <div className="max-w-lg p-6 pt-10 text-white md:p-10 md:max-w-md">
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

      <LayoutContainer className="pr-0 mt-28 sm:pr-0 md:pr-6">
        <h2 className="font-serif text-3xl font-bold md:hidden">
          <FormattedMessage defaultMessage="Discover projects by category" id="des5Rg" />
        </h2>
        <div className="grid pb-6 overflow-x-scroll grid-rows-[minmax(auto,_1fr)] grid-cols-auto-1fr gap-x-4 gap-y-14 md:gap-x-4 md:gap-y-6 md:overflow-x-hidden md:grid-cols-3 md:grid-row-2 xl:grid-cols-4 md:place-content-end px-1 md:px-0">
          {/* Repeating the header here to change the layout when md screens */}
          <h2 className="hidden row-span-1 font-serif text-3xl font-semibold md:block md:mb-10 md:col-span-1 lg:text-5xl xl:col-span-2 lg:mb-0 lg:w-auto">
            <FormattedMessage defaultMessage="Discover projects by category" id="des5Rg" />
          </h2>
          {categoryEnums.map(({ id, name, description }) => {
            const projectsQuantity = projectsGroupedByCategory[id]?.length || 0;
            return (
              <ProjectCard
                key={id}
                id={id}
                name={name}
                description={description}
                projectsQuantity={projectsQuantity}
                category={id as CategoryType}
              />
            );
          })}
        </div>
      </LayoutContainer>

      <LayoutContainer className="pr-0">
        <div className="flex items-end mt-18 mb-6 overflow-hidden w-full h-[285px]">
          <Image
            src="/images/for-investor/for-investor-category.png"
            width={isLg ? 918 : isMd ? 543 : 343}
            height={285}
            objectFit="cover"
            layout="intrinsic"
            alt=""
            className="rounded-xl"
          />
          <p className="absolute p-4 text-white text-2xs">© Luis Barreto / WWF-UK</p>
        </div>
        {/* For mobiles */}
        <div className="block mb-8 md:hidden">
          <h2 className="mt-8 font-serif text-3xl font-semibold md:text-5xl">
            <FormattedMessage defaultMessage="By priority landscapes" id="JcS7oJ" />
          </h2>
        </div>
        <div className="md:hidden block w-full max-h-[300px] mb-6 rounded-lg overflow-hidden">
          <Image
            src="/images/for-investor/for-investor-priority-landscapes.png"
            alt=""
            width={604}
            height={557}
            objectFit="cover"
            objectPosition="center"
            className="rounded-lg"
          />
          <div>
            <p className="mt-6 text-center text-gray-700 text-2xs">
              <FormattedMessage defaultMessage="Priority landscapes of HeCo" id="Zt7DBA" />
            </p>
          </div>
        </div>

        <div className="grid pb-6 md:pr-0 md:pl-0 overflow-x-scroll md:grid-rows-[minmax(auto,_1fr)] grid-cols-auto-1fr gap-x-4 gap-y-14 md:gap-x-6 md:gap-y-6 md:overflow-x-hidden md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 md:place-content-end md:container md:mx-auto md:px-8">
          {mosaicsWithProjectsNumber.map(({ id, name, projectsQuantity }, index) => {
            const description = priorityLandscapesDescriptions[id];
            return (
              <div
                key={id}
                className={cx('row-start-1', {
                  'md:row-start-2 lg:row-start-1': index === 0,
                  'md:row-start-2 lg:row-start-2': index === 1,
                  'md:row-start-2': index === 2,
                  'md:row-start-3 lg:row-start-3 lg:col-start-2': index === 3,
                })}
              >
                <ProjectCard
                  key={id}
                  id={id}
                  name={name}
                  description={description}
                  projectsQuantity={projectsQuantity}
                />
              </div>
            );
          })}
          {/* For desktop */}
          <div className="hidden col-span-3 md:block lg:col-span-2 lg:col-start-3 md:col-start-1 md:row-start-1 md:pb-4">
            <h2 className="mt-8 font-serif text-3xl font-semibold md:text-5xl">
              <FormattedMessage defaultMessage="By priority landscapes" id="JcS7oJ" />
            </h2>
          </div>
          <div className="hidden md:block w-[calc(100vw-32px)] max-h-[300px] md:w-auto col-start-1 row-start-2 md:col-span-2 md:col-start-2 md:row-span-2 md:row-start-3 lg:row-start-2 lg:col-start-3 rounded-lg overflow-hidden">
            <Image
              src="/images/for-investor/for-investor-priority-landscapes.png"
              alt=""
              width={604}
              height={557}
              objectFit="cover"
              objectPosition="center"
              className="rounded-lg"
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
                        'overflow-hidden rounded-2xl transition-all ease-in-out duration-700 sm:max-h-[250px] md:max-h-[350px] lg:max-h-[500px]',
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
                        width={isXl ? 1063.5 : isMd ? 709 : 340}
                        height={isXl ? 750 : isMd ? 500 : 250}
                        objectFit="cover"
                        objectPosition="center"
                        layout="fixed"
                        className="rounded-2xl"
                      />
                    </div>
                  );
                })}
              </div>
              <div className="lg:absolute p-7 -translate-y-8 lg:-translate-y-full max-w-full lg:max-w-[500px] lg:left-1/2 bg-background-light rounded-xl">
                <div className="flex justify-between mb-2 align-middle">
                  <div>
                    <p className="text-xl font-bold text-gray-600">
                      <span className="text-green-dark">0{whatCanDoIndex + 1}</span> / 03
                    </p>
                  </div>
                  <div className="flex gap-2.5">
                    <Button
                      theme="primary-white"
                      size="smallest"
                      className="justify-center w-8 h-8 border border-beige drop-shadow-lg focus-visible:!outline-green-dark"
                      onClick={() =>
                        setWhatCanDoIndex(whatCanDoIndex === 0 ? 2 : whatCanDoIndex - 1)
                      }
                    >
                      <span className="sr-only">
                        <FormattedMessage defaultMessage="Previous" id="JJNc3c" />
                      </span>
                      <Icon
                        icon={ChevronLeft}
                        className="text-black transition-colors duration-300 ease-in-out"
                      />
                    </Button>

                    <Button
                      theme="primary-white"
                      size="smallest"
                      className="justify-center w-8 h-8 border border-beige drop-shadow-lg focus-visible:!outline-green-dark"
                      onClick={() =>
                        setWhatCanDoIndex(whatCanDoIndex === 2 ? 0 : whatCanDoIndex + 1)
                      }
                    >
                      <span className="sr-only">
                        <FormattedMessage defaultMessage="Previous" id="JJNc3c" />
                      </span>
                      <Icon
                        icon={ChevronRight}
                        className="text-black transition-colors duration-300 ease-in-out"
                      />
                    </Button>
                  </div>
                </div>
                <div className="text-left text-black">
                  <h3 className="mb-6 font-serif text-2xl">
                    {whatHecoCanDoTexts[whatCanDoIndex].title}
                  </h3>
                  <p>{whatHecoCanDoTexts[whatCanDoIndex].description}</p>
                </div>
              </div>
            </div>
            <Button
              className="justify-center w-full md:w-auto"
              theme="secondary-white"
              to={Paths.SignUp}
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
