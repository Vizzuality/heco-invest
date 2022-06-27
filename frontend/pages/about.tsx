import { useState } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import Image from 'next/image';
import Link from 'next/link';

import { withLocalizedRequests } from 'hoc/locale';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import ImpactModal from 'containers/modals/impact';

import Button from 'components/button';
import Head from 'components/head';
import LayoutContainer from 'components/layout-container';
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

  const [impactModalOpen, setImpactModalOpen] = useState(false);

  return (
    <>
      <Head title="About" />
      <ImpactModal impactModalOpen={impactModalOpen} setImpactModalOpen={setImpactModalOpen} />
      <LayoutContainer>
        <div className="md:grid md:grid-cols-2 md:gap-6 lg:gap-40">
          <div className="lg:pt-20">
            <h1 className="font-serif text-2xl font-bold sm:text-3xl md:text-4xl">
              <FormattedMessage defaultMessage="About the platform" id="eM7TKf" />
            </h1>
            <div className="mt-8">
              <p>
                <FormattedMessage
                  defaultMessage="HeCo Invest was created following the Leticia Pact, and the commitment of the seven Heads of State to increase capital flows for sustainable development in the <span>Amazon</span>."
                  id="JI99E2"
                  values={{
                    span: (chunks) => <span className="font-semibold">{chunks}</span>,
                  }}
                />
                <br />
                <br />
                <FormattedMessage
                  defaultMessage="The <span>IDB Lab</span>, the <span>Paulson Institute</span> and the <span>World Wildlife Fund</span> are working together to develop a digital platform that connects governments, investors, donors, and philanthropists with carefully identified investment opportunities in <span>high priority locations</span> identified by programs such as Herencia Colombia (HeCo)."
                  id="KvhWhT"
                  values={{
                    span: (chunks) => <span className="font-semibold">{chunks}</span>,
                  }}
                />
                <br />
                <br />
                <FormattedMessage
                  defaultMessage="HeCo Invest is considered as a pilot effort. It will then scale to include all the signatory countries of the Pact."
                  id="2aOaT4"
                />
              </p>
            </div>
          </div>
          <div className="mt-8 md:mt-0">
            <Image
              src="/images/about-intro.png"
              height={1209}
              width={1204}
              layout="responsive"
              alt=""
            />
          </div>
        </div>
      </LayoutContainer>

      <LayoutContainer className="mt-24 lg:pt-14">
        <div className="flex flex-col-reverse gap-8 px-4 py-6 sm:py-12 md:pt-14 md:pb-16 lg:pb-14 sm:px-8 xl:px-24 md:gap-0 md:grid md:grid-cols-2 bg-green-dark rounded-3xl">
          <div className="overflow-hidden lg:-mt-28 lg:pr-10 rounded-2xl md:rounded-none">
            <Image
              src="/images/about-about-section.png"
              height={1096}
              width={1072}
              layout="responsive"
              alt=""
            />
          </div>
          <div className="md:pl-6 xl:pl-16 xl:pr-16">
            <h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">
              <FormattedMessage defaultMessage="About HeCo" id="5zAKQ7" />
            </h2>
            <p className="mt-4 text-white md:mt-8">
              <FormattedMessage
                defaultMessage="<a>Heritage Colombia (HeCo)</a> is a national initiative led by the Colombian Ministry of Environment. The initiative is to secure 20 million hectares of sustainable landscape over the next 20 years, through investments in conservation and sustainable development."
                id="DAJK4J"
                values={{
                  a: (chunks) => (
                    <Link href="https://cop26.minambiente.gov.co/herencia-colombia/">
                      <a className="underline" target="_blank" rel="noopener noreferrer">
                        {chunks}
                      </a>
                    </Link>
                  ),
                }}
              />
              <br />
              <br />
              <FormattedMessage
                defaultMessage="HeCo will support the improved management of ecosystems in the Amazon, Andes, Orinoco, Pacific, and Caribbean regions. This aims to ensure the long-term sustainability of natural capital, through creating and channeling new and additional financial flows from the public and private sectors into specific projects and initiatives."
                id="4bznpU"
              />
            </p>
          </div>
        </div>
      </LayoutContainer>

      <LayoutContainer className="mt-24 lg:mt-40">
        <h2 className="font-serif text-2xl font-bold sm:text-3xl md:text-4xl">
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
            <p className="mt-3 sm:mt-6">
              <FormattedMessage
                defaultMessage="The Inter-American Development Bank (IDB) is the largest source of development financing for Latin America and the Caribbean. Established in 1959, the IDB supports Latin American and Caribbean economic development, social development and regional integration by lending to governments and government agencies, including State corporations."
                id="URLNhk"
              />
            </p>
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
            <p className="mt-3 sm:mt-6">
              <FormattedMessage
                defaultMessage="IDB Lab is the innovation laboratory of the Inter-American Development Bank Group, the leading source of financing for improving lives in Latin America and the Caribbean. The IDB Lab promotes development through the private sector by identifying, supporting, testing, and piloting new solutions to development challenges. It seeks to create opportunities for poor and vulnerable populations affected by economic, social, or environmental factors in Latin America and the Caribbean."
                id="W4Jolw"
              />
            </p>
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
            <p className="mt-3 sm:mt-6">
              <FormattedMessage
                defaultMessage="World Wildlife Fund (WWF) is the largest international conservation organization in the world, with more than 50 offices implementing conservation projects across more than 100 countries and has a membership of almost five million people. WWF has extensive experience working in the Amazon region, with offices in all seven signatory countries of the Leticia Pact. In Colombia, WWF has been working in partnership with the government and a consortium of civil society organizations on Heritage Colombia since 2015."
                id="zkonnO"
              />
            </p>
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
            <p className="mt-3 sm:mt-6">
              <FormattedMessage
                defaultMessage="Paulson Institute: The Paulson Institute (PI) is a non-partisan, independent “think and do tank” delivering solutions that contribute to a more resilient and sustainable world. PI operates at the intersection of economics, financial markets, and environmental protection by promoting market-based solutions to ensure green economic growth. Under their Financing Nature initiative, they are working to identify and implement innovative mechanisms that can rapidly mobilize substantial amounts of funding for nature conservation."
                id="qPKAOa"
              />
            </p>
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
            <p className="mt-3 sm:mt-6">
              <FormattedMessage
                defaultMessage="BC3's mission is to generate valuable knowledge for policy and decision making, integrating the environmental, socio-economic and ethical dimensions of climate change. Through the production of collaborative and open-source tools such as ARIES, which can track and forecast progress towards sustainable environmental and economic goals, BC3 plays a key role in enhancing regional, national and international economic development."
                id="HVQtvr"
              />
            </p>
          </div>
        </div>
      </LayoutContainer>

      <div className="mt-12 md:mt-20 bg-green-dark">
        <LayoutContainer className="py-16 text-white sm:pt-24 sm:pb-20 md:grid md:grid-cols-2 md:gap-12 xl:gap-6">
          <div className="lg:pr-12 xl:pr-24">
            <h2 className="font-serif text-3xl font-bold lg:text-4xl">
              <FormattedMessage
                defaultMessage="Powered by ARIES: The First AI-powered 'Knowledge Commons'"
                id="uIp9ro"
              />
            </h2>
            <p className="mt-2 text-base sm:text-lg md:text-xl">
              <FormattedMessage
                defaultMessage="The climate crisis is where short-term thinking and long-term consequences collide. How to think long-term in a short-term world?"
                id="VR21hO"
              />
            </p>
          </div>
          <p className="mt-12 md:mt-0">
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

      <LayoutContainer className="mt-24 lg:mt-52 xl:mt-60 lg:pt-14">
        <div className="flex flex-col gap-8 px-4 py-6 sm:py-12 md:pt-14 md:pb-16 lg:pb-14 sm:px-8 xl:px-24 md:gap-0 md:grid md:grid-cols-2 bg-green-light/20 rounded-3xl">
          <div className="lg:-mt-36 md:pr-6 xl:pr-16 xl:pl-16">
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl md:text-4xl">
              <FormattedMessage defaultMessage="About the impact" id="DQoGRx" />
            </h2>
            <p className="mt-4 md:mt-8 lg:mt-24">
              <FormattedMessage
                defaultMessage="HeCo Invest will benefit poor and vulnerable people living in HeCo priority landscapes."
                id="CYTiug"
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
              <br />
              <br />
              <Button theme="secondary-green" size="small" onClick={() => setImpactModalOpen(true)}>
                <FormattedMessage defaultMessage="How is the impact calculated?" id="9cE0nR" />
              </Button>
            </p>
          </div>
          <div className="overflow-hidden lg:-mt-36 lg:pl-10 rounded-2xl md:rounded-none">
            <Image
              src="/images/about-impact.png"
              height={1092}
              width={1092}
              layout="responsive"
              alt=""
            />
          </div>
        </div>
      </LayoutContainer>

      <LayoutContainer className="mt-24 lg:mt-32">
        <p className="max-w-md mx-auto text-base text-center sm:max-w-xl lg:max-w-3xl xl:max-w-5xl sm:text-lg md:text-xl">
          <FormattedMessage
            defaultMessage="These investments will support the country’s ambitious climate, biodiversity, and sustainable development goals. They will create resilient landscapes that serve as spaces for inclusion and peacebuilding, with opportunities for improved human well-being and development."
            id="cvyJC+"
          />
        </p>
      </LayoutContainer>
    </>
  );
};

AboutPage.layout = {
  props: {
    footerProps: {
      className: 'mt-24 lg:mt-32',
    },
  },
};

export default AboutPage;
