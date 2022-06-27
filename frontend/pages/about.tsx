import { useState } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import { InferGetStaticPropsType } from 'next';

import { useBreakpoint } from 'hooks/use-breakpoint';

import { loadI18nMessages } from 'helpers/i18n';

import ImpactModal from 'containers/modals/impact';

import Button from 'components/button';
import Head from 'components/head';
import LayoutContainer from 'components/layout-container';
import { Paths } from 'enums';
import { StaticPageLayoutProps } from 'layouts/static-page';
import { PageComponent } from 'types';

export const getStaticProps = withLocalizedRequests(async ({ locale }) => {
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
});

type AboutPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const AboutPage: PageComponent<AboutPageProps, StaticPageLayoutProps> = () => {
  const intl = useIntl();
  const { push } = useRouter();

  const [impactModalOpen, setImpactModalOpen] = useState(false);

  const breakpoint = useBreakpoint();
  const isMobile = breakpoint('xs');

  return (
    <>
      <Head title="About" />
      <ImpactModal impactModalOpen={impactModalOpen} setImpactModalOpen={setImpactModalOpen} />
      <LayoutContainer className="bg-background-light">
        <div className="grid grid-cols-1 grid-rows-1-fr md:grid-cols-2 md:gap-x-6 lg:gap-x-40">
          <div className="md:pt-8 row-start-1">
            <h1 className="font-serif text-5xl font-bold md:text-4xl text-green-dark md:text-black">
              <FormattedMessage defaultMessage="About the platform" id="eM7TKf" />
            </h1>
          </div>
          <div className="mt-8 row-start-3 md:row-start-2">
            <p className="mb-6">
              <FormattedMessage
                defaultMessage=" HeCo Invest supports the Herencia Colombia program in its efforts to stimulate and channel funding for high impact projects in the Amazon region of Colombia."
                id="VRg5iy"
              />
            </p>
            <p className="mb-6">
              <FormattedMessage
                defaultMessage="The platform will use the most advanced technologies and Artificial Intelligence applications to provide in one place data and tools to connect investors, donors and philanthropists with carefully selected projects in high priority locations defined by Heremcia Colombia."
                id="ff0+bt"
              />
            </p>
            <p>
              <FormattedMessage
                defaultMessage="The <n>IDB Lab</n>, the <n>Paulson Institute</n>, the <n>World Wildlife Fund</n>, the <n>Spanish Cooperation Fund</n>, the <n>Basque Center for Climate Change</n> and <n>Google</n> are joining forces to launch this platform which can later be deployed across all Amazonian countries."
                id="jnYkhy"
                values={{
                  n: (chunk: string) => <span className="font-semibold">{chunk}</span>,
                }}
              />
            </p>
          </div>
          <div className="mt-8 md:mt-0 row-start-2 md:row-start-1 row-span-2">
            <Image
              src={isMobile ? '/images/about-intro-mobile.png' : '/images/about-intro.png'}
              height={isMobile ? 591 : 1209}
              width={isMobile ? 514 : 1204}
              layout="responsive"
              alt=""
            />
          </div>
        </div>
      </LayoutContainer>

      <LayoutContainer className="mt-5 sm:mt-24 lg:pt-14">
        <div className="flex flex-col gap-8 pb-10 sm:py-12 md:pt-14 md:pb-16 lg:pb-14 sm:px-8 xl:px-24 md:gap-0 md:grid md:grid-cols-2 bg-green-dark rounded-3xl">
          <div className="overflow-hidden h-52 sm:h-auto lg:-mt-28 lg:pr-10 rounded-2xl md:rounded-none">
            <Image
              src="/images/about-about-section.png"
              height={1096}
              width={1072}
              layout="responsive"
              alt=""
            />
          </div>
          <div className="px-6 md:pl-6 xl:pl-16 xl:pr-16 text-white">
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
              <FormattedMessage defaultMessage="About HeCo" id="5zAKQ7" />
            </h2>
            <p className="mt-4 font-normal md:mt-8">
              <FormattedMessage
                defaultMessage="<a>Heritage Colombia (HeCo)</a> is a national initiative led by the Colombian Ministry of Environment. The initiative is to secure <n>20 million hectares</n> of sustainable landscape over the next 20 years, through investments in <n>conservation and sustainable development</n>."
                id="sbodFR"
                values={{
                  a: (chunks) => (
                    <Link href="https://cop26.minambiente.gov.co/herencia-colombia/">
                      <a className="underline" target="_blank" rel="noopener noreferrer">
                        {chunks}
                      </a>
                    </Link>
                  ),
                  n: (chunk: string) => <span className="font-semibold">{chunk}</span>,
                }}
              />
            </p>
            <p className="mt-4">
              <FormattedMessage
                defaultMessage="HeCo will support the improved management of ecosystems in the Amazon, Andes, Orinoco, Pacific, and Caribbean regions. This aims to ensure the long-term sustainability of natural capital, through creating and channeling new and additional financial flows from the public and private sectors into specific projects and initiatives."
                id="4bznpU"
              />
            </p>
          </div>
        </div>
      </LayoutContainer>

      <LayoutContainer className="mt-20 sm:mt-24 lg:mt-40">
        <h2 className="font-serif text-3xl font-bold md:text-4xl">
          <FormattedMessage defaultMessage="About the partners" id="0CAqpl" />
        </h2>
        <div className="mt-8 space-y-6 md:mt-16 lg:space-y-0 lg:grid md:grid-cols-2 md:gap-6">
          <div className="p-4 sm:p-8 md:p-16 bg-background-middle rounded-2xl">
            <div className="text-center">
              <Image
                src="/images/logos/idb.png"
                width={348}
                height={124}
                alt={intl.formatMessage({
                  defaultMessage: 'Inter-American Development Bank',
                  id: 'AC6emZ',
                })}
              />
            </div>
            {/* <p className="mt-3 sm:mt-6">
              <FormattedMessage
                defaultMessage="The Inter-American Development Bank (IDB) is the largest source of development financing for Latin America and the Caribbean. Established in 1959, the IDB supports Latin American and Caribbean economic development, social development and regional integration by lending to governments and government agencies, including State corporations."
                id="URLNhk"
              />
            </p> */}
          </div>
          <div className="p-4 sm:p-8 md:p-16 bg-background-middle rounded-2xl">
            <div className="text-center">
              <Image
                src="/images/logos/idb-lab.png"
                width={348}
                height={124}
                alt={intl.formatMessage({
                  defaultMessage: 'Inter-American Development Bank Lab',
                  id: 'QDj3j7',
                })}
              />
            </div>
            {/* <p className="mt-3 sm:mt-6">
              <FormattedMessage
                defaultMessage="IDB Lab is the innovation laboratory of the Inter-American Development Bank Group, the leading source of financing for improving lives in Latin America and the Caribbean. The IDB Lab promotes development through the private sector by identifying, supporting, testing, and piloting new solutions to development challenges. It seeks to create opportunities for poor and vulnerable populations affected by economic, social, or environmental factors in Latin America and the Caribbean."
                id="W4Jolw"
              />
            </p> */}
          </div>
          <div className="p-4 sm:p-8 md:p-16 bg-background-middle rounded-2xl">
            <div className="text-center">
              <Image
                src="/images/logos/wwf.png"
                width={348}
                height={124}
                alt={intl.formatMessage({ defaultMessage: 'WWF', id: 'cT6b2H' })}
              />
            </div>
            {/* <p className="mt-3 sm:mt-6">
              <FormattedMessage
                defaultMessage="World Wildlife Fund (WWF) is the largest international conservation organization in the world, with more than 50 offices implementing conservation projects across more than 100 countries and has a membership of almost five million people. WWF has extensive experience working in the Amazon region, with offices in all seven signatory countries of the Leticia Pact. In Colombia, WWF has been working in partnership with the government and a consortium of civil society organizations on Heritage Colombia since 2015."
                id="zkonnO"
              />
            </p> */}
          </div>
          <div className="p-4 sm:p-8 md:p-16 bg-background-middle rounded-2xl">
            <div className="text-center">
              <Image
                src="/images/logos/paulson-institute.png"
                width={348}
                height={124}
                alt={intl.formatMessage({ defaultMessage: 'Paulson Institute', id: 'JRfERD' })}
              />
            </div>
            {/* <p className="mt-3 sm:mt-6">
              <FormattedMessage
                defaultMessage="Paulson Institute: The Paulson Institute (PI) is a non-partisan, independent “think and do tank” delivering solutions that contribute to a more resilient and sustainable world. PI operates at the intersection of economics, financial markets, and environmental protection by promoting market-based solutions to ensure green economic growth. Under their Financing Nature initiative, they are working to identify and implement innovative mechanisms that can rapidly mobilize substantial amounts of funding for nature conservation."
                id="qPKAOa"
              />
            </p> */}
          </div>
          <div className="p-4 sm:p-8 md:p-16 bg-background-middle rounded-2xl">
            <div className="text-center">
              <Image
                src="/images/logos/bc3.png"
                width={348}
                height={124}
                alt={intl.formatMessage({
                  defaultMessage: 'Basque Centre for Climate Change',
                  id: '6ukMW9',
                })}
              />
            </div>
            {/* <p className="mt-3 sm:mt-6">
              <FormattedMessage
                defaultMessage="BC3's mission is to generate valuable knowledge for policy and decision making, integrating the environmental, socio-economic and ethical dimensions of climate change. Through the production of collaborative and open-source tools such as ARIES, which can track and forecast progress towards sustainable environmental and economic goals, BC3 plays a key role in enhancing regional, national and international economic development."
                id="HVQtvr"
              />
            </p> */}
          </div>
          <div className="p-4 sm:p-8 md:p-16 bg-background-middle rounded-2xl">
            <div className="text-center">
              <Image
                src="/images/about-google.png"
                width={348}
                height={124}
                alt={intl.formatMessage({
                  defaultMessage: 'Basque Centre for Climate Change',
                  id: '6ukMW9',
                })}
              />
            </div>
          </div>
        </div>
      </LayoutContainer>

      <div className="mt-12 md:mt-20 bg-green-dark">
        <LayoutContainer className="py-16 text-white sm:pt-24 sm:pb-20 md:grid md:grid-cols-2 md:gap-12 xl:gap-6">
          <div className="lg:pr-12 xl:pr-24">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold lg:text-4xl">
              <FormattedMessage
                defaultMessage="Powered by ARIES: The First AI-powered 'Knowledge Commons'"
                id="uIp9ro"
              />
            </h2>
            <p className="mt-6 text-base font-semibold sm:text-lg md:text-xl">
              <FormattedMessage
                defaultMessage="The climate crisis is where short-term thinking and long-term consequences collide. How to think long-term in a short-term world?"
                id="VR21hO"
              />
            </p>
          </div>
          <p className="mt-4 md:mt-0">
            <FormattedMessage
              defaultMessage="Artificial Intelligence for Environment & Sustainability (ARIES) is an international research project intending to make the first Artificial Intelligence (AI)-powered 'Knowledge Commons' to integrate citizens and scientists' multidisciplinary knowledge and achieve climate adaptation and mitigation faster."
              id="nBHzO6"
            />
            <br />
            <br />
            <FormattedMessage
              defaultMessage="Only by understanding nature’s contributions to people and the economy can we push for policy-making where nature counts."
              id="xQ4XkB"
            />
            <br />
            <br />
            <FormattedMessage
              defaultMessage="This is why ARIES is developing a 'Wikipedia-like' platform, that is collaborative, open-source and enables interoperable models and data. For the first time, this generates new knowledge through integrating the existing platform with the ultimate scope of building a more sustainable and resilient future for all."
              id="JIehAU"
            />
          </p>
        </LayoutContainer>
      </div>

      <LayoutContainer className="mt-12 lg:mt-52 xl:mt-60 lg:pt-14">
        <div className="flex flex-col gap-8  py-6 sm:py-12 md:pt-14 md:pb-16 lg:pb-14 sm:px-8 xl:px-24 md:gap-0 md:grid md:grid-cols-2  rounded-3xl">
          <div className="lg:-mt-36 md:pr-6 xl:pr-16 xl:pl-16">
            <h2 className="font-serif mb-8 text-3xl font-semibold sm:text-3xl md:text-4xl">
              <FormattedMessage defaultMessage="About the impact" id="DQoGRx" />
            </h2>
            <div className="text-center">
              <Image
                src="/images/about-about-the-impact.png"
                width={414}
                height={600}
                alt={intl.formatMessage({
                  defaultMessage: 'Basque Centre for Climate Change',
                  id: '6ukMW9',
                })}
              />
            </div>
            <p className="mt-4 md:mt-8 lg:mt-24">
              <FormattedMessage
                defaultMessage="HeCo Invest will <n>benefit poor and vulnerable people</n> living in <n>HeCo priority landscapes in the Amazon region</n>."
                id="dHpDHe"
                values={{ n: (chunk: string) => <span className="font-semibold">{chunk}</span> }}
              />
              <br />
              <br />
              <FormattedMessage
                defaultMessage="In the face of the economic and social crisis caused by the coronavirus pandemic, there is an urgent need to support the transition to a green, fair, and resilient economy that creates jobs, addresses inequality, and drives inclusive growth."
                id="x/1DXz"
              />
              <br />
              <br />
              <FormattedMessage
                defaultMessage="Investments in HeCo will contribute to climate change mitigation and adaptation. Investments will conserve the natural capital and associated environmental services of some of the most biodiverse landscapes on the planet."
                id="9Er2U2"
              />
            </p>
          </div>
        </div>
      </LayoutContainer>

      <LayoutContainer className="px-4 py-10 bg-background-middle">
        <div>
          <h2 className="font-serif mb-6 text-3xl font-semibold sm:text-3xl md:text-4xl">
            <FormattedMessage defaultMessage="How is the impact calculated?" id="9cE0nR" />
          </h2>
          <p>
            <FormattedMessage
              defaultMessage="ARIES estimate - in a scientifically-informed and accurate manner - the impact of each project in each one of our <n>four dimensions</n> of interest based on existing knowledge and data. These impacts are calculated on a scale from <n>0 (low impact) to 10 (high impact)</n>."
              id="lkNGwt"
              values={{ n: (chunk: string) => <span className="font-semibold">{chunk}</span> }}
            />
          </p>
          <div className="rounded-4xl flex items-center mt-8 mb-6 overflow-hidden opacity-80">
            <div className="z-1 absolute text-white text-center -ml-4 px-10">
              <h3 className="text-lg font-semibold mb-1">
                <FormattedMessage defaultMessage="Biodiversity" id="mbTJWV" />
              </h3>
              <p>
                <FormattedMessage
                  defaultMessage="endemism, conservation/ restoration potential, landscape connectivity;"
                  id="gEdnC6"
                />
              </p>
            </div>
            <div className="-z-10">
              <Image
                src="/images/about-biodiversity.png"
                width={411.6}
                height={182}
                alt=""
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          </div>
          <div className="rounded-4xl flex items-center mt-8 mb-6 overflow-hidden opacity-80">
            <div className="z-1 absolute text-white text-center -ml-4 px-10">
              <h3 className="text-lg font-semibold mb-1">
                <FormattedMessage defaultMessage="Climate" id="MuOp0t" />
              </h3>
              <p>
                <FormattedMessage
                  defaultMessage="wood and soil biomass, application of sustainable forest measures;"
                  id="6IKs4G"
                />
              </p>
            </div>
            <div className="-z-10">
              <Image
                src="/images/about-climate.png"
                width={411.6}
                height={182}
                alt=""
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          </div>
          <div className="rounded-4xl flex items-center mt-8 mb-6 overflow-hidden opacity-80">
            <div className="z-1 absolute text-white text-center px-12">
              <h3 className="text-lg font-semibold mb-1">
                <FormattedMessage defaultMessage="Community" id="4CrCbD" />
              </h3>
              <p>
                <FormattedMessage defaultMessage="income, sustainable projects;" id="K/CKP5" />
              </p>
            </div>
            <div className="-z-10">
              <Image
                src="/images/about-community.png"
                width={411.6}
                height={182}
                alt=""
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          </div>
          <div className="rounded-4xl flex items-center mt-8 overflow-hidden opacity-80">
            <div className="z-1 absolute text-white text-center -ml-4 px-10">
              <h3 className="text-lg font-semibold mb-1">
                <FormattedMessage defaultMessage="Water" id="t7YvMF" />
              </h3>
              <p>
                <FormattedMessage
                  defaultMessage=" water cycling, quality, and risk management"
                  id="EzGCO8"
                />
              </p>
            </div>
            <div className="-z-10">
              <Image
                src="/images/about-water.png"
                width={411.6}
                height={182}
                alt=""
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          </div>
        </div>
      </LayoutContainer>

      <LayoutContainer className="py-10 lg:mt-32 text-white bg-green-dark">
        <p className="max-w-md mx-auto text-base sm:max-w-xl lg:max-w-3xl xl:max-w-5xl sm:text-lg md:text-xl">
          <FormattedMessage
            defaultMessage="These investments will support the country’s ambitious climate, biodiversity, and sustainable development goals. They will create resilient landscapes that serve as spaces for inclusion and peacebuilding, with opportunities for improved human well-being and development."
            id="cvyJC+"
          />
        </p>
        <Button
          onClick={() => push(Paths.Discover)}
          theme="secondary-white"
          className="w-full mt-8 justify-center"
        >
          <FormattedMessage defaultMessage="Explore projects" id="4VKVh6" />
        </Button>
      </LayoutContainer>
    </>
  );
};

AboutPage.layout = {
  props: {
    footerProps: {
      className: 'mt-0 sm:mt-24 lg:mt-32',
    },
  },
};

export default AboutPage;
