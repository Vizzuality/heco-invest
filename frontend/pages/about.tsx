import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { T, useT } from '@transifex/react';

import Button from 'components/button';
import Head from 'components/head';
import LayoutContainer from 'components/layout-container';
import Modal from 'components/modal';
import { StaticPageLayoutProps } from 'layouts/static-page';
import { PageComponent } from 'types';

const AboutPage: PageComponent<{}, StaticPageLayoutProps> = () => {
  const t = useT();

  const [impactModalOpen, setImpactModalOpen] = useState(false);

  return (
    <>
      <Head title="About" />

      <Modal
        title={t('How is the impact calculated?')}
        open={impactModalOpen}
        onDismiss={() => setImpactModalOpen(false)}
      >
        <h1 className="font-serif text-2xl font-semibold sm:text-3xl">
          <T _str="How is the impact calculated?" />
        </h1>
        <div className="flex flex-col-reverse mt-8 2xl:grid 2xl:grid-cols-2 2xl:gap-8">
          <div className="mt-5 2xl:mt-0">
            <p>
              <T
                _str="HeCo Invest relies on the {span} model to estimate − in a scientifically-informed and accurate manner − the impact of each project in each one of our four dimensions of interest based on existing knowledge and data. These impacts are calculated on a scale from 0 to 10 as shown in the chart of impact."
                span={
                  <span className="font-semibold">
                    <T _str="ARIES Artificial Intelligence" />
                  </span>
                }
              />
            </p>
            <ol className="pl-5 mt-4 list-disc">
              <li>
                <T
                  _str="{span} endemism, conservation/restoration potential, landscape connectivity;"
                  span={
                    <span className="font-semibold">
                      <T _str="Biodiversity:" />
                    </span>
                  }
                />
              </li>
              <li>
                <T
                  _str="{span} wood and soil biomass, application of sustainable forest measures;"
                  span={
                    <span className="font-semibold">
                      <T _str="Climate:" />
                    </span>
                  }
                />
              </li>
              <li>
                <T
                  _str="{span} income, sustainable projects;"
                  span={
                    <span className="font-semibold">
                      <T _str="Community:" />
                    </span>
                  }
                />
              </li>
              <li>
                <T
                  _str="{span} water cycling, quality, and risk management."
                  span={
                    <span className="font-semibold">
                      <T _str="Water:" />
                    </span>
                  }
                />
              </li>
            </ol>
          </div>
          <div className="max-w-md mx-auto">
            <Image
              src="/images/about-impact-chart.svg"
              width={308}
              height={252}
              layout="intrinsic"
              alt=""
            />
          </div>
        </div>
        <div className="mt-5 text-center md:mt-12">
          <Button theme="primary-green" onClick={() => setImpactModalOpen(false)}>
            <T _str="Ok" />
          </Button>
        </div>
      </Modal>

      <LayoutContainer>
        <div className="md:grid md:grid-cols-2 md:gap-6 lg:gap-40">
          <div className="lg:pt-20">
            <h1 className="font-serif text-2xl font-bold sm:text-3xl md:text-4xl">
              <T _str="About the platform" />
            </h1>
            <div className="mt-8">
              <p>
                <T
                  _str="HeCo Invest was created following the Leticia Pact, and the commitment of the seven Heads of State to increase capital flows for sustainable development in the {span}."
                  span={
                    <span className="font-semibold">
                      <T _str="Amazon" />
                    </span>
                  }
                />
                <br />
                <br />
                <T
                  _str="The {span1}, the {span2} and the {span3} are working together to develop a digital platform that connects governments, investors, donors, and philanthropists with carefully identified investment opportunities in {span4} identified by programs such as Herencia Colombia (HeCo)."
                  span1={
                    <span className="font-semibold">
                      <T _str="IDB Lab" />
                    </span>
                  }
                  span2={
                    <span className="font-semibold">
                      <T _str="Paulson Institute" />
                    </span>
                  }
                  span3={
                    <span className="font-semibold">
                      <T _str="World Wildlife Fund" />
                    </span>
                  }
                  span4={
                    <span className="font-semibold">
                      <T _str="high priority locations" />
                    </span>
                  }
                />
                <br />
                <br />
                <T _str="HeCo Invest is considered as a pilot effort. It will then scale to include all the signatory countries of the Pact." />
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
              <T _str="About HeCo" />
            </h2>
            <p className="mt-4 text-white md:mt-8">
              <T
                _str="{link} is a national initiative led by the Colombian Ministry of Environment. The initiative is to secure 20 million hectares of sustainable landscape over the next 20 years, through investments in conservation and sustainable development."
                link={
                  <Link href="https://cop26.minambiente.gov.co/herencia-colombia/">
                    <a className="underline" target="_blank" rel="noopener noreferrer">
                      <T _str="Heritage Colombia (HeCo)" />
                    </a>
                  </Link>
                }
              />
              <br />
              <br />
              <T _str="HeCo will support the improved management of ecosystems in the Amazon, Andes, Orinoco, Pacific, and Caribbean regions. This aims to ensure the long-term sustainability of natural capital, through creating and channeling new and additional financial flows from the public and private sectors into specific projects and initiatives." />
            </p>
          </div>
        </div>
      </LayoutContainer>

      <LayoutContainer className="mt-24 lg:mt-40">
        <h2 className="font-serif text-2xl font-bold sm:text-3xl md:text-4xl">
          <T _str="About the partners" />
        </h2>
        <div className="mt-8 space-y-6 md:mt-16 lg:space-y-0 lg:grid md:grid-cols-2 md:gap-6">
          <div className="p-4 sm:p-8 md:p-16 bg-background-middle rounded-2xl">
            <div className="text-center">
              <Image
                src="/images/logos/idb.png"
                width={348}
                height={124}
                alt={t('Inter-American Development Bank')}
              />
            </div>
            <p className="mt-3 sm:mt-6">
              <T _str="The Inter-American Development Bank (IDB) is the largest source of development financing for Latin America and the Caribbean. Established in 1959, the IDB supports Latin American and Caribbean economic development, social development and regional integration by lending to governments and government agencies, including State corporations." />
            </p>
          </div>
          <div className="p-4 sm:p-8 md:p-16 bg-background-middle rounded-2xl">
            <div className="text-center">
              <Image
                src="/images/logos/idb-lab.png"
                width={348}
                height={124}
                alt={t('Inter-American Development Bank Lab')}
              />
            </div>
            <p className="mt-3 sm:mt-6">
              <T _str="IDB Lab is the innovation laboratory of the Inter-American Development Bank Group, the leading source of financing for improving lives in Latin America and the Caribbean. The IDB Lab promotes development through the private sector by identifying, supporting, testing, and piloting new solutions to development challenges. It seeks to create opportunities for poor and vulnerable populations affected by economic, social, or environmental factors in Latin America and the Caribbean." />
            </p>
          </div>
          <div className="p-4 sm:p-8 md:p-16 bg-background-middle rounded-2xl">
            <div className="text-center">
              <Image src="/images/logos/wwf.png" width={348} height={124} alt={t('WWF')} />
            </div>
            <p className="mt-3 sm:mt-6">
              <T _str="World Wildlife Fund (WWF) is the largest international conservation organization in the world, with more than 50 offices implementing conservation projects across more than 100 countries and has a membership of almost five million people. WWF has extensive experience working in the Amazon region, with offices in all seven signatory countries of the Leticia Pact. In Colombia, WWF has been working in partnership with the government and a consortium of civil society organizations on Heritage Colombia since 2015." />
            </p>
          </div>
          <div className="p-4 sm:p-8 md:p-16 bg-background-middle rounded-2xl">
            <div className="text-center">
              <Image
                src="/images/logos/paulson-institute.png"
                width={348}
                height={124}
                alt={t('Paulson Institute')}
              />
            </div>
            <p className="mt-3 sm:mt-6">
              <T _str="Paulson Institute: The Paulson Institute (PI) is a non-partisan, independent “think and do tank” delivering solutions that contribute to a more resilient and sustainable world. PI operates at the intersection of economics, financial markets, and environmental protection by promoting market-based solutions to ensure green economic growth. Under their Financing Nature initiative, they are working to identify and implement innovative mechanisms that can rapidly mobilize substantial amounts of funding for nature conservation." />
            </p>
          </div>
          <div className="p-4 sm:p-8 md:p-16 bg-background-middle rounded-2xl">
            <div className="text-center">
              <Image
                src="/images/logos/bc3.png"
                width={348}
                height={124}
                alt={t('Basque Centre for Climate Change')}
              />
            </div>
            <p className="mt-3 sm:mt-6">
              <T _str="BC3's mission is to generate valuable knowledge for policy and decision making, integrating the environmental, socio-economic and ethical dimensions of climate change. Through the production of collaborative and open-source tools such as ARIES, which can track and forecast progress towards sustainable environmental and economic goals, BC3 plays a key role in enhancing regional, national and international economic development." />
            </p>
          </div>
        </div>
      </LayoutContainer>

      <div className="mt-12 md:mt-20 bg-green-dark">
        <LayoutContainer className="py-16 text-white sm:pt-24 sm:pb-20 md:grid md:grid-cols-2 md:gap-12 xl:gap-6">
          <div className="lg:pr-12 xl:pr-24">
            <h2 className="font-serif text-3xl font-bold lg:text-4xl">
              <T _str="Powered by ARIES: The First AI-powered 'Knowledge Commons'" />
            </h2>
            <p className="mt-2 text-base sm:text-lg md:text-xl">
              <T _str="The climate crisis is where short-term thinking and long-term consequences collide. How to think long-term in a short-term world?" />
            </p>
          </div>
          <p className="mt-12 md:mt-0">
            <T _str="Artificial Intelligence for Environment & Sustainability (ARIES) is an international research project intending to make the first Artificial Intelligence (AI)-powered 'Knowledge Commons' to integrate citizens and scientists' multidisciplinary knowledge and achieve climate adaptation and mitigation faster." />
            <br />
            <br />
            <T _str="Only by understanding nature’s contributions to people and the economy can we push for policy-making where nature counts." />
            <br />
            <br />
            <T _str="This is why ARIES is developing a 'Wikipedia-like' platform, that is collaborative, open-source and enables interoperable models and data. For the first time, this generates new knowledge through integrating the existing platform with the ultimate scope of building a more sustainable and resilient future for all." />
          </p>
        </LayoutContainer>
      </div>

      <LayoutContainer className="mt-24 lg:mt-52 xl:mt-60 lg:pt-14">
        <div className="flex flex-col gap-8 px-4 py-6 sm:py-12 md:pt-14 md:pb-16 lg:pb-14 sm:px-8 xl:px-24 md:gap-0 md:grid md:grid-cols-2 bg-green-light/20 rounded-3xl">
          <div className="lg:-mt-36 md:pr-6 xl:pr-16 xl:pl-16">
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl md:text-4xl">
              <T _str="About the impact" />
            </h2>
            <p className="mt-4 md:mt-8 lg:mt-24">
              <T _str="HeCo Invest will benefit poor and vulnerable people living in HeCo priority landscapes." />
              <br />
              <br />
              <T _str="In the face of the economic and social crisis caused by the coronavirus pandemic, there is an urgent need to support the transition to a green, fair, and resilient economy that creates jobs, addresses inequality, and drives inclusive growth." />
              <br />
              <br />
              <T _str="Investments in HeCo will contribute to climate change mitigation and adaptation. Investments will conserve the natural capital and associated environmental services of some of the most biodiverse landscapes on the planet." />
              <br />
              <br />
              <Button theme="secondary-green" size="small" onClick={() => setImpactModalOpen(true)}>
                <T _str="How is the impact calculated?" />
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
          <T _str="These investments will support the country’s ambitious climate, biodiversity, and sustainable development goals. They will create resilient landscapes that serve as spaces for inclusion and peacebuilding, with opportunities for improved human well-being and development." />
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
