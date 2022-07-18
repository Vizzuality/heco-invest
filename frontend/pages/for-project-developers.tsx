import { useState } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import Image from 'next/image';

import { withLocalizedRequests } from 'hoc/locale';

import { groupBy } from 'lodash-es';
import { InferGetStaticPropsType } from 'next';

import { useBreakpoint } from 'hooks/use-breakpoint';

import { loadI18nMessages } from 'helpers/i18n';

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
      fields: ['category', 'priority_landscape', 'ticket_size'],
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

type ForProjectDevelopersProps = InferGetStaticPropsType<typeof getStaticProps>;

const ForProjectDevelopers: PageComponent<ForProjectDevelopersProps, StaticPageLayoutProps> = ({
  projects,
  enums,
}) => {
  const { formatMessage } = useIntl();
  const [impactModalOpen, setImpactModalOpen] = useState(false);
  const breakpoint = useBreakpoint();
  const isMd = breakpoint('sm');
  const isLg = breakpoint('lg');
  const { category: categoryEnums, ticket_size: ticketSizeEnums } = groupBy(enums, 'type');

  const projectsGroupedByCategory = groupBy(projects, 'category');
  const projectsGroupedByTicketSize = groupBy(projects, 'ticket_size');

  const whatHecoCanDoTexts = [
    {
      title: <FormattedMessage defaultMessage="Have a public profile page" id="xupvNr" />,
      description: (
        <FormattedMessage
          defaultMessage="With an HeCo account you can have a public profile page, making it easier for Investors and other Project Developers to find and reach you."
          id="WSvHHP"
          values={{
            n: (chunk: string) => <span className="font-semibold">{chunk}</span>,
          }}
        />
      ),
    },
    {
      title: <FormattedMessage defaultMessage="Apply to open calls" id="txaU6M" />,
      description: (
        <FormattedMessage
          defaultMessage="Discover our current calls from investors. Apply with your project and receive funding."
          id="EOsYCo"
        />
      ),
    },
    {
      title: <FormattedMessage defaultMessage="Contact access" id="nIbokM" />,
      description: (
        <FormattedMessage
          defaultMessage="Have access to all of the contacts of <n>Investors</n> and <n>Project Developers</n>. Easily reach and connect so you can find the best investment or partnership."
          id="RyOOZR"
          values={{ n: (chunk: string) => <span className="font-semibold">{chunk}</span> }}
        />
      ),
    },
  ];

  const whatHecoCanDoImages = [
    '/images/for-pd/for-pd-carrousel-1.jpeg',
    '/images/for-pd/for-pd-carrousel-2.jpeg',
    '/images/for-pd/for-pd-carrousel-3.jpeg',
    '/images/for-pd/for-pd-carrousel-1.jpeg',
    '/images/for-pd/for-pd-carrousel-2.jpeg',
  ];

  return (
    <>
      <Head title={formatMessage({ defaultMessage: 'For Project Developers', id: 'QcPpQd' })} />
      <ImpactModal impactModalOpen={impactModalOpen} setImpactModalOpen={setImpactModalOpen} />

      <Description
        title={
          <FormattedMessage
            defaultMessage="Find the support and ressources to grow your business or project"
            id="wGWm2r"
          />
        }
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
            defaultMessage="Thanks to our <n>model ARIES</n>, an Artificial Intelligence tool, you can <n>reach investors</n> that are interested in your project and <n>learn how your activity impacts</n> the environment and your community."
            id="jHyKQ2"
            values={{
              n: (chunk: string) => <span className="font-semibold">{chunk}</span>,
            }}
          />,
        ]}
        leftTexts={[
          {
            title: (
              <span className="block text-2xl leading-10 md:text-3xl font-semibold md:leading-[48px]">
                <FormattedMessage
                  defaultMessage="Do you have a project or a start-up business in the Colombian Amazon?"
                  id="eu+7Vl"
                />
              </span>
            ),
            description: (
              <FormattedMessage
                defaultMessage="Create an attractive project profile with well-defined attributes to intelligently connect with potential funders and investors."
                id="NpcyZ1"
              />
            ),
          },
          {
            title: (
              <span className="block text-2xl leading-10 md:text-3xl font-semibold md:leading-[48px]">
                <FormattedMessage defaultMessage="Looking for the highest impact?" id="mgsoLa" />
              </span>
            ),
            description: (
              <FormattedMessage
                defaultMessage="When you create your project profile, the platform's artificial intelligence engine will define the type of impact it will have for its geographical location and connect with suitable sources of support."
                id="+pH0Po"
              />
            ),
          },
        ]}
        rightText={{
          title: '',
          description: (
            <FormattedMessage
              defaultMessage="HeCo Invest takes you step-by-step through the presentation of your proposal and then intelligently connects you with the community and potential sources of support and funding."
              id="7rePKd"
            />
          ),
        }}
      />

      <LayoutContainer className="pr-0 mt-28 sm:pr-0 md:pr-6">
        <h2 className="mb-6 font-serif text-3xl font-bold md:hidden">
          <FormattedMessage defaultMessage="Discover investors by budget/ticket size" id="eItis6" />
        </h2>
        <div className="grid pb-6 overflow-x-scroll grid-rows-[minmax(auto,_1fr)] grid-cols-auto-1fr gap-x-4 gap-y-14 md:gap-x-4 md:gap-y-6 md:overflow-x-hidden md:grid-cols-3 md:grid-row-2 xl:grid-cols-4 md:place-content-end px-1 md:px-0">
          {/* Repeating the header here to change the layout when md screens */}
          <h2 className="hidden row-span-1 pt-6 font-serif text-3xl font-semibold md:block md:mb-10 md:col-span-4 lg:text-4xl xl:text-5xl xl:col-span-2 lg:mb-0 md:w-auto">
            <FormattedMessage
              defaultMessage="Discover investors by budget/ticket size"
              id="eItis6"
            />
          </h2>
          {ticketSizeEnums.map(({ id, description, name }, index) => {
            const projectsQuantity = projectsGroupedByTicketSize[id]?.length || 0;
            return (
              <div
                className={cx('row-start-1 md:row-start-2 xl:row-start-auto', {
                  'md:col-start-2 md:row-start-3': index === 2,
                  'md:col-start-3 md:row-start-3': index === 3,
                })}
                key={id}
              >
                <PublicPageCard
                  id={id}
                  name={description}
                  description={name}
                  quantity={projectsQuantity}
                  filterName="ticket_size"
                  enumType="ticket_size"
                  cardType="investors"
                />
              </div>
            );
          })}
        </div>
      </LayoutContainer>

      <LayoutContainer>
        <div className="flex items-end w-full mt-6">
          <Image
            src="/images/for-pd/for-pd-discover.jpeg"
            width={isLg ? 1232 : isMd ? 543 : 343}
            height={269}
            objectFit="cover"
            objectPosition="center"
            alt=""
            className="rounded-3xl"
          />
          <p className="absolute p-4 text-white text-2xs">© Luis Barreto / WWF-UK</p>
        </div>
      </LayoutContainer>

      <LayoutContainer className="pr-0 mt-6 sm:pr-0 md:pr-6">
        <h2 className="mb-6 font-serif text-3xl font-bold md:hidden">
          <FormattedMessage defaultMessage="Discover investors by category" id="vViagZ" />
        </h2>
        <div className="grid pb-6 overflow-x-scroll grid-rows-[minmax(auto,_1fr)] grid-cols-auto-1fr gap-x-4 gap-y-14 md:gap-x-4 md:gap-y-6 md:overflow-x-hidden md:grid-cols-3 md:grid-row-2 xl:grid-cols-4 md:place-content-end px-1 md:px-0">
          {/* Repeating the header here to change the layout when md screens */}
          <h2 className="hidden row-span-1 pt-6 font-serif text-3xl font-semibold md:block md:mb-10 lg:text-4xl xl:text-5xl xl:col-span-2 lg:mb-0 lg:w-auto">
            <FormattedMessage defaultMessage="Discover investors by category" id="vViagZ" />
          </h2>
          {categoryEnums.map(({ id, name, description }, index) => {
            const projectsQuantity = projectsGroupedByCategory[id]?.length || 0;
            return (
              <div
                className={cx('row-start-1 md:row-start-auto', {
                  'xl:col-start-2': index === 2,
                })}
                key={id}
              >
                <PublicPageCard
                  key={id}
                  id={id}
                  name={name}
                  description={description}
                  quantity={projectsQuantity}
                  cardType="investors"
                  filterName="category"
                  enumType="category"
                />
              </div>
            );
          })}
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

ForProjectDevelopers.layout = {
  props: {
    footerProps: {
      className: 'mt-0 sm:mt-24 lg:mt-0',
    },
  },
};

export default ForProjectDevelopers;
