import { useState } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import { InferGetStaticPropsType } from 'next';

import { useBreakpoint } from 'hooks/use-breakpoint';

import { loadI18nMessages } from 'helpers/i18n';

import OurAllies from 'containers/about/our-allies';
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
  const isDesktop = breakpoint('lg');

  return (
    <>
      <Head title="About" />
      <ImpactModal impactModalOpen={impactModalOpen} setImpactModalOpen={setImpactModalOpen} />
      <LayoutContainer className="bg-background-light">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 xl:gap-x-40">
          <div className="row-start-1 lg:pt-8 lg:self-center">
            <h1 className="font-serif text-5xl font-bold lg:text-4xl text-green-dark lg:text-black">
              <FormattedMessage defaultMessage="About the platform" id="eM7TKf" />
            </h1>
          </div>
          <div className="row-start-3 mt-8 lg:mt-0 lg:row-start-2">
            <p className="mb-6">
              <FormattedMessage
                defaultMessage="HeCo Invest supports the Heritage Colombia program in its efforts to stimulate and channel funding for high-impact projects in the Amazon region of Colombia."
                id="n6CdYH"
              />
            </p>
            <p className="mb-6">
              <FormattedMessage
                defaultMessage="The platform will use the most advanced technologies and Artificial Intelligence applications to provide in one place data and tools to connect investors, donors and philanthropists with carefully selected projects in high priority locations defined by Heritage Colombia."
                id="f/pQG4"
              />
            </p>
            <p>
              <FormattedMessage
                defaultMessage="The <n>IDB Lab</n>, the <n>Paulson Institute</n>, the <n>World Wildlife Fund</n>, the <n>Spanish Cooperation Fund</n>, the <n>Basque Center for Climate Change</n> and <n>Google Cloud</n> are joining forces to launch this platform which can later be deployed across all Amazonian countries."
                id="frQ5VJ"
                values={{
                  n: (chunk: string) => <span className="font-semibold">{chunk}</span>,
                }}
              />
            </p>
          </div>
          <div className="row-start-2 mt-8 lg:mt-0 lg:row-start-1 lg:row-span-2">
            <div className="hidden xl:block">
              <Image
                src="/images/about/about-intro.png"
                height={695}
                width={772}
                layout="responsive"
                alt=""
                priority
              />
            </div>
            <div className="block xl:hidden">
              <Image
                src="/images/about/about-intro-mobile.png"
                height={591}
                width={514}
                layout="responsive"
                alt=""
                priority
              />
            </div>
          </div>
        </div>
      </LayoutContainer>

      <LayoutContainer className="mt-5 lg:mt-24 lg:pt-14">
        <div className="flex flex-col lg:py-14 lg:grid lg:grid-cols-2">
          <div className="overflow-hidden h-52 lg:h-auto lg:-mt-28 rounded-t-2xl lg:rounded-3xl lg:rounded-br-none">
            <Image
              src="/images/about/about-heco.jpg"
              height={691}
              width={724}
              objectFit="cover"
              objectPosition="bottom"
              layout="responsive"
              alt=""
              className="lg:rounded-bl-3xl"
            />
          </div>
          <div className="px-6 pt-6 pb-10 text-white lg:p-10 2xl:p-24 bg-green-dark rounded-b-2xl lg:pt-14 lg:rounded-3xl lg:rounded-tl-none xl:rounded-l-none">
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
              <FormattedMessage defaultMessage="About HeCo" id="5zAKQ7" />
            </h2>
            <p className="mt-4 font-normal lg:mt-8">
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
                defaultMessage="HeCo will support the improved management of ecosystems in the Amazon, Andes, Orinoco, Pacific, and Caribbean regions. This aims to ensure the <n>long-term sustainability</n> of natural capital, through creating and channeling new and additional financial flows from the public and private sectors into specific projects and initiatives."
                id="ikyoJL"
                values={{ n: (chunk: string) => <span className="font-semibold">{chunk}</span> }}
              />
            </p>
          </div>
        </div>
      </LayoutContainer>

      <LayoutContainer className="mt-20 sm:mt-24 lg:mt-40">
        <h2 className="font-serif text-3xl font-bold md:text-4xl">
          <FormattedMessage defaultMessage="About the partners" id="0CAqpl" />
        </h2>
        <div className="mt-8 space-y-6 md:mt-16 lg:space-y-0 lg:grid lg:grid-cols-2 xl:grid-cols-3 md:gap-6">
          <div className="p-4 sm:p-6 xl:p-10 bg-background-middle rounded-2xl">
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
            <p className="hidden mt-3 md:block sm:mt-6">
              <FormattedMessage
                defaultMessage="The Inter-American Development Bank (IDB) is the main source of multilateral financing and expertise for sustainable economic, social and institutional development in Latin America and the Caribbean. The IDB Natural Capital Lab works to drive innovation in natural capital finance by looking at nature as an asset."
                id="WJcNiD"
              />
            </p>
          </div>
          <div className="p-4 sm:p-6 xl:p-10 bg-background-middle rounded-2xl">
            <div className="text-center">
              <Image
                src="/images/logos/wwf.png"
                width={348}
                height={124}
                objectFit="contain"
                alt={intl.formatMessage({ defaultMessage: 'WWF', id: 'cT6b2H' })}
              />
            </div>
            <p className="hidden mt-3 md:block sm:mt-6">
              <FormattedMessage
                defaultMessage="World Wildlife Fund (WWF) is the largest international conservation organization in the world, with more than 50 offices implementing conservation projects across more than 100 countries and has a membership of almost five million people. WWF has extensive experience working in the Amazon region, with offices in all seven signatory countries of the Leticia Pact. In Colombia, WWF has been working in partnership with the government and a consortium of civil society organizations on Heritage Colombia since 2015."
                id="zkonnO"
              />
            </p>
          </div>
          <div className="p-4 sm:p-6 xl:p-10 bg-background-middle rounded-2xl">
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
            <p className="hidden mt-3 md:block sm:mt-6">
              <FormattedMessage
                defaultMessage="IDB Lab is the innovation laboratory of the Inter-American Development Back Group, the leading source of financing for improving lives in Latin America and the Caribbean. The IDB Lab promotes development through the private sector by identifying, supporting, testing, and piloting new solutions to development challenges. It seeks to create opportunities for poor and vulnerable populations affected by economic, social, or environmental factors in Latin America and the Caribbean."
                id="Gpyrow"
              />
            </p>
          </div>
          <div className="p-4 sm:p-6 xl:p-10 bg-background-middle rounded-2xl">
            <div className="text-center">
              <Image
                src="/images/logos/paulson-institute.png"
                width={348}
                height={124}
                alt={intl.formatMessage({ defaultMessage: 'Paulson Institute', id: 'JRfERD' })}
              />
            </div>
            <p className="hidden mt-3 md:block sm:mt-6">
              <FormattedMessage
                defaultMessage="Paulson Institute: The Paulson Institute (PI) is a non-partisan, independent “think and do tank” delivering solutions that contribute to a more resilient and sustainable world. PI operates at the intersection of economics, financial markets, and environmental protection by promoting market-based solutions to ensure green economic growth. Under their Financing Nature initiative, they are working to identify and implement innovative mechanisms that can rapidly mobilize substantial amounts of funding for nature conservation."
                id="qPKAOa"
              />
            </p>
          </div>
          <div className="p-4 sm:p-6 xl:p-10 bg-background-middle rounded-2xl">
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
            <p className="hidden mt-3 md:block sm:mt-6">
              <FormattedMessage
                defaultMessage="BC3's mission is to generate valuable knowledge for policy and decision making, integrating the environmental, socio-economic and ethical dimensions of climate change. Through the production of collaborative and open-source tools such as ARIES, which can track and forecast progress towards sustainable environmental and economic goals, BC3 plays a key role in enhancing regional, national and international economic development."
                id="HVQtvr"
              />
            </p>
          </div>
          <div className="p-4 sm:p-6 xl:p-10 bg-background-middle rounded-2xl">
            <div className="text-center">
              <Image
                src="/images/logos/about-google.png"
                width={348}
                height={124}
                alt={intl.formatMessage({
                  defaultMessage: 'Google Cloud',
                  id: 'QlBsxM',
                })}
              />
            </div>
            <p className="hidden mt-3 md:block sm:mt-6">
              <FormattedMessage
                defaultMessage="Google Cloud accelerates every organization’s ability to digitally transform its business. We deliver enterprise-grade solutions that leverage Google’s cutting-edge technology – all on the cleanest cloud in the industry. Customers in more than 200 countries and territories turn to Google Cloud as their trusted partner to enable growth and solve their most critical business problems."
                id="Ob7+Ly"
              />
            </p>
          </div>
          <div className="p-4 sm:p-6 xl:p-10 bg-background-middle rounded-2xl">
            <div className="text-center">
              <Image
                src="/images/logos/about-fao-azul.png"
                width={348}
                height={124}
                alt={intl.formatMessage({
                  defaultMessage: 'Food and Agriculture Organization of the United Nations - FAO',
                  id: 'shhSYM',
                })}
              />
            </div>
            <p className="hidden mt-3 md:block sm:mt-6">
              <FormattedMessage
                defaultMessage="The FAO representation in Colombia seeks to improve agriculture and food through technical cooperation with the Government. It collaborates with governmental institutions, cooperation agencies, civil society, academia, and the private sector in areas such as food, agriculture, livestock, fishing, aquaculture, forestry management, and sustainable natural resource management. Additionally, the FAO supports the implementation of Point 1 of the Peace Agreement: Comprehensive Rural Reform. Its support to the national government aims to promote social and territorial cohesion in areas affected by the conflict."
                id="kmtD3U"
              />
            </p>
          </div>
          <div className="p-4 sm:p-6 xl:p-10 bg-background-middle rounded-2xl">
            <div className="text-center">
              <Image
                src="/images/logos/about-ue.png"
                width={348}
                height={124}
                alt={intl.formatMessage({
                  defaultMessage: 'Delegation of the European Union to Colombia',
                  id: 'zuK4F3',
                })}
              />
            </div>
            <p className="hidden mt-3 md:block sm:mt-6">
              <FormattedMessage
                defaultMessage="The entry into force of the Lisbon Treaty on December 1, 2009, marked the beginning of the European External Action Service. In 2011, the Delegation of the European Commission became the Delegation of the European Union in Colombia, with the status of a diplomatic embassy. Its Ambassador officially represents the European Union in Colombia. Adapting to contemporary challenges includes the defense of human rights, the preservation of peace, international security, and the prevention of internal conflicts—fundamental objectives of the EU's foreign policy."
                id="mILEhu"
              />
            </p>
          </div>
          <div className="p-4 sm:p-6 xl:p-10 bg-background-middle rounded-2xl">
            <div className="text-center">
              <Image
                src="/images/logos/about-maetd.png"
                width={348}
                height={124}
                alt={intl.formatMessage({
                  defaultMessage: 'Government of Spain',
                  id: 'AS8i3c',
                })}
              />
            </div>
            <p className="hidden mt-3 md:block sm:mt-6">
              {/* TODO: Add missing description (not yet available) */}
              {/* <FormattedMessage defaultMessage="" id="JH1fXz" /> */}
            </p>
          </div>
        </div>
      </LayoutContainer>

      <LayoutContainer className="mt-20 sm:mt-24 lg:mt-40">
        <OurAllies />
      </LayoutContainer>

      <div id="aries" className="scroll-mt-24 bg-green-dark">
        <LayoutContainer className="py-16 mt-12 text-white md:mt-20 sm:pt-24 sm:pb-20 md:grid md:grid-cols-2 md:gap-12 xl:gap-6">
          <div className="lg:pr-12 xl:pr-24">
            <h2 className="font-serif text-2xl font-bold sm:text-3xl lg:text-4xl">
              <FormattedMessage
                defaultMessage="Powered by ARIES: The First AI-powered 'Knowledge Commons'"
                id="uIp9ro"
              />
            </h2>
            <p className="mt-6 text-base font-semibold lg:font-normal sm:text-lg md:text-xl">
              <FormattedMessage
                defaultMessage="The climate crisis is where short-term thinking and long-term consequences collide. How to think long-term in a short-term world?"
                id="VR21hO"
              />
            </p>
          </div>
          <p className="mt-4 md:mt-0">
            <FormattedMessage
              defaultMessage="ARtificial Intelligence for Environment & Sustainability (ARIES) is an international research project intending to make the first Artificial Intelligence (AI)-powered 'Knowledge Commons' to integrate citizens and scientists' multidisciplinary knowledge and achieve climate adaptation and mitigation faster."
              id="4v9Q37"
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
            <br />
            <br />
            <a
              href="https://aries.integratedmodelling.org/"
              target="_blank"
              rel="noreferrer noopener"
              className="underline focus-visible:outline focus-visible:outline-white focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <FormattedMessage defaultMessage="More about ARIES" id="apgkuO" />
            </a>
          </p>
        </LayoutContainer>
      </div>

      <LayoutContainer className="mt-12 lg:mt-26 lg:pt-14">
        <div className="flex flex-col gap-6 py-6 sm:py-12 lg:mb-14 lg:grid lg:gap-x-20 2xl:gap-x-40 lg:gap-y-0 lg:grid-cols-2 rounded-3xl">
          <h2 className="font-serif text-3xl font-semibold lg:self-end lg:mb-8 sm:text-3xl lg:text-4xl">
            <FormattedMessage defaultMessage="About the impact" id="DQoGRx" />
          </h2>
          <div className="m-auto lg:row-start-1 lg:col-start-2 lg:row-span-2">
            <Image src="/images/about/about-impact-lg.png" width={597} height={600} alt="" />
          </div>
          <p className="md:mt-8 lg:mt-0 lg:row-start-2 lg:col-start-1">
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
              defaultMessage="Investments in HeCo Invest will contribute to climate change mitigation and adaptation. Investments will conserve the natural capital and associated environmental services of some of the most biodiverse landscapes on the planet."
              id="RqplOy"
            />
          </p>
        </div>
      </LayoutContainer>

      <div className="bg-background-middle">
        <LayoutContainer className="px-4 py-10 lg:pt-28 lg:pb-44">
          <div className="lg:text-center">
            <div className="max-w-4xl m-auto lg:mb-12">
              <h2 className="mb-6 font-serif text-3xl font-semibold sm:text-3xl md:text-4xl">
                <FormattedMessage defaultMessage="How is the impact calculated?" id="9cE0nR" />
              </h2>
              <p>
                <FormattedMessage
                  defaultMessage="ARIES estimate - in a scientifically-informed and accurate manner - the impact of each project in each one of our <n>four dimensions</n> of interest based on existing knowledge and data. These impacts are calculated on a scale from <n>0 (low impact) to 10 (high impact)</n>."
                  id="lkNGwt"
                  values={{ n: (chunk: string) => <span className="font-semibold">{chunk}</span> }}
                />
              </p>
            </div>
            <div className="justify-center lg:flex lg:gap-6 xl:gap-8">
              <div className="flex items-center justify-center mt-8 mb-6 overflow-hidden rounded-4xl lg:rounded-full lg:w-60 2xl:w-64 opacity-80">
                <div className="absolute flex flex-col items-center justify-center px-10 text-center text-white z-1 lg:w-60 2xl:w-64 lg:px-2 lg:ml-0">
                  <h3 className="mb-1 text-lg font-semibold">
                    <FormattedMessage defaultMessage="Biodiversity" id="mbTJWV" />
                  </h3>
                  <p>
                    <FormattedMessage
                      defaultMessage="endemism, conservation restoration potential, landscape connectivity"
                      id="dXDORY"
                    />
                  </p>
                </div>
                <div className="w-full h-full -z-10 bg-green-dark">
                  <Image
                    src="/images/about/about-biodiversity.jpeg"
                    width={isDesktop ? 300 : 411.6}
                    height={isDesktop ? 300 : 182}
                    alt=""
                    layout="responsive"
                    objectFit="cover"
                    objectPosition="center"
                    className="mix-blend-multiply"
                  />
                </div>
              </div>
              <div className="flex items-center justify-center mt-8 mb-6 overflow-hidden rounded-4xl lg:rounded-full lg:w-60 2xl:w-64 opacity-80">
                <div className="absolute flex flex-col items-center justify-center px-10 text-center text-white z-1 lg:w-60 2xl:w-64 lg:px-2 lg:ml-0">
                  <h3 className="mb-1 text-lg font-semibold">
                    <FormattedMessage defaultMessage="Climate" id="MuOp0t" />
                  </h3>
                  <p>
                    <FormattedMessage
                      defaultMessage="wood and soil biomass, application of sustainable forest measures"
                      id="tx5s63"
                    />
                  </p>
                </div>
                <div className="w-full h-full -z-10 bg-green-dark">
                  <Image
                    src="/images/about/about-climate.jpeg"
                    width={isDesktop ? 300 : 411.6}
                    height={isDesktop ? 300 : 182}
                    alt=""
                    layout="responsive"
                    objectFit="cover"
                    objectPosition="center"
                    className="mix-blend-multiply"
                  />
                </div>
              </div>
              <div className="flex items-center justify-center mt-8 mb-6 overflow-hidden rounded-4xl lg:rounded-full lg:w-60 2xl:w-64 opacity-80">
                <div className="absolute flex flex-col items-center justify-center px-10 text-center text-white z-1 lg:w-60 2xl:w-64 lg:px-2 lg:ml-0">
                  <h3 className="mb-1 text-lg font-semibold">
                    <FormattedMessage defaultMessage="Community" id="4CrCbD" />
                  </h3>
                  <p>
                    <FormattedMessage defaultMessage="income, sustainable projects" id="T6AbTI" />
                  </p>
                </div>
                <div className="w-full h-full -z-10 bg-green-dark">
                  <Image
                    src="/images/about/about-community.jpg"
                    width={isDesktop ? 300 : 411.6}
                    height={isDesktop ? 300 : 182}
                    alt=""
                    layout="responsive"
                    objectFit="cover"
                    objectPosition="center"
                    className="mix-blend-multiply"
                  />
                </div>
              </div>
              <div className="flex items-center justify-center mt-8 mb-6 overflow-hidden rounded-4xl lg:rounded-full lg:w-60 2xl:w-64 opacity-80">
                <div className="absolute flex flex-col items-center justify-center px-10 text-center text-white z-1 lg:w-60 2xl:w-64 lg:px-2 lg:ml-0">
                  <h3 className="mb-1 text-lg font-semibold">
                    <FormattedMessage defaultMessage="Water" id="t7YvMF" />
                  </h3>
                  <p>
                    <FormattedMessage
                      defaultMessage=" water cycling, quality, and risk management"
                      id="EzGCO8"
                    />
                  </p>
                </div>
                <div className="w-full h-full -z-10 bg-green-dark">
                  <Image
                    src="/images/about/about-water.jpg"
                    width={isDesktop ? 300 : 411.6}
                    height={isDesktop ? 300 : 182}
                    alt=""
                    layout="responsive"
                    objectFit="cover"
                    objectPosition="center"
                    className="mix-blend-multiply"
                  />
                </div>
              </div>
            </div>
          </div>
        </LayoutContainer>
      </div>

      <div className="bg-green-dark">
        <LayoutContainer className="py-10 text-white lg:py-18 lg:mt-0">
          <p className="max-w-md mx-auto text-base text-center sm:max-w-xl lg:max-w-3xl xl:max-w-5xl sm:text-lg md:text-xl">
            <FormattedMessage
              defaultMessage="These investments will support the country’s ambitious climate, biodiversity, and sustainable development goals. They will create resilient landscapes that serve as spaces for inclusion and peacebuilding, with opportunities for improved human well-being and development."
              id="cvyJC+"
            />
          </p>
          <Button
            to={Paths.Discover}
            theme="secondary-white"
            className="justify-center w-full m-auto mt-8 lg:w-52"
          >
            <FormattedMessage defaultMessage="Explore projects" id="4VKVh6" />
          </Button>
        </LayoutContainer>
      </div>
    </>
  );
};

AboutPage.layout = {
  props: {
    footerProps: {
      className: 'mt-0',
    },
  },
};

export default AboutPage;
