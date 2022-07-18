import { useState } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import Image from 'next/image';

import { withLocalizedRequests } from 'hoc/locale';

import { groupBy } from 'lodash-es';
import { InferGetStaticPropsType } from 'next';

import { useBreakpoint } from 'hooks/use-breakpoint';

import { loadI18nMessages } from 'helpers/i18n';
import { getMosaicsWithProjectsNumber } from 'helpers/pages';

import Carousel from 'containers/for-public-pages/carousel';
import Description from 'containers/for-public-pages/description';
import PublicPageCard from 'containers/for-public-pages/public-page-card';
import ImpactModal from 'containers/modals/impact';

import Head from 'components/head';
import LayoutContainer from 'components/layout-container';
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
  const breakpoint = useBreakpoint();
  const isMd = breakpoint('sm');
  const isLg = breakpoint('lg');

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

      <Description
        title={<FormattedMessage defaultMessage="Start having the greatest impact" id="o0+PZ+" />}
        descriptions={[
          <FormattedMessage
            key="desc-1"
            defaultMessage="HeCo Invest manages a <n>wide range of investment and financing opportunities</n> in various sector categories and priority landscapes for the conservation and development of the <n>Colombian Amazon region</n>."
            id="NG6Ull"
            values={{
              n: (chunk: string) => <span className="font-semibold">{chunk}</span>,
            }}
          />,
          <FormattedMessage
            key="desc-2"
            defaultMessage="Thanks to our integration with <n>ARIES</n>, an Artificial Intelligence tool that integrates <n>expert knowledge, Semantics</n> and <n>Machine Reasoning</n> technology, we can <n>estimate a projects’ impact</n> along our four dimensions of interest: <n>Climate, Biodiversity, Water, Community</n> to guide and track your investment decisions."
            id="LmyoPR"
            values={{
              n: (chunk: string) => <span className="font-semibold">{chunk}</span>,
            }}
          />,
        ]}
        leftTexts={[
          {
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
              <PublicPageCard
                key={id}
                id={id}
                name={name}
                description={description}
                quantity={projectsQuantity}
                cardType="projects"
                enumType="category"
                filterName="category"
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
        <div className="block max-w-full mb-6 mr-4 rounded-lg sm:mr-0 md:hidden">
          <Image
            src="/images/for-investor/for-investor-priority-landscapes.png"
            alt=""
            width={686}
            height={632}
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
                <PublicPageCard
                  key={id}
                  id={id}
                  name={name}
                  description={description}
                  quantity={projectsQuantity}
                  cardType="projects"
                  enumType="mosaic"
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
          <div className="hidden md:block w-[calc(100vw-32px)] md:w-auto col-start-1 row-start-2 md:col-span-2 md:col-start-2 md:row-span-2 md:row-start-3 lg:row-start-2 lg:col-start-3 rounded-lg">
            <Image
              src="/images/for-investor/for-investor-priority-landscapes.png"
              alt=""
              width={1124}
              height={1306}
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
      className: 'mt-0 sm:mt-24 lg:mt-0',
    },
  },
};

export default ForInvestorsPage;
