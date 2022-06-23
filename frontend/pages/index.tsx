import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import Image from 'next/image';
import Link from 'next/link';

import { withLocalizedRequests } from 'hoc/locale';

import { InferGetStaticPropsType } from 'next';
import { useInViewRef } from 'rooks';

import { loadI18nMessages } from 'helpers/i18n';

import FooterBanner from 'containers/home/footer-banner';
import HowItWorks from 'containers/home/how-it-works';

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

type HomePageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Home: PageComponent<HomePageProps, StaticPageLayoutProps> = () => {
  const [slide2Ref, inViewSlide2] = useInViewRef(undefined, {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 1,
  });

  const [slide3Ref, inViewSlide3] = useInViewRef(undefined, {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 1,
  });

  const [slide4Ref, inViewSlide4] = useInViewRef(undefined, {
    root: null,
    rootMargin: '100% 0px 0px 0px',
    threshold: 1,
  });

  return (
    <>
      <Head />
      <div className="-mt-28 lg:-mt-44 pt-24 sm:pt-40 md:pt-56 bg-cover bg-center bg-green-dark bg-[url('/images/home-hero.jpg')]">
        <div className="text-center">
          <h1 className="max-w-md mx-auto font-serif text-3xl font-bold sm:max-w-xl md:max-w-5xl md:text-6xl text-green-light">
            <FormattedMessage
              defaultMessage="Be part of the biggest change in the Colombian Amazon"
              id="ZiErTG"
            />
          </h1>
          <p className="max-w-md mx-auto mt-2 text-base text-white md:max-w-2xl sm:text-lg md:text-xl">
            <FormattedMessage
              defaultMessage="Connecting investors, donors and philanthropists with carefully identified investment opportunities."
              id="8i6S4q"
            />
          </p>
        </div>
        <LayoutContainer className="sm:mt-5 md:mt-9">
          <div className="sm:mx-auto sm:max-w-2xl md:max-w-3xl h-[4.5rem] translate-y-1/2 flex justify-center items-center bg-white rounded-full shadow-search">
            <FormattedMessage defaultMessage="Search" id="xmcVZ0" />
          </div>
        </LayoutContainer>
      </div>

      <LayoutContainer className="mt-24 lg:mt-28">
        <h2 className="max-w-md mx-auto font-serif text-2xl font-bold text-center sm:max-w-xl md:max-w-4xl sm:text-3xl md:text-5xl text-green-dark">
          <FormattedMessage defaultMessage="Why use this platform" id="VCODFJ" />
        </h2>

        <div className="relative mt-12 lg:mt-24 md:grid md:grid-cols-2 md:gap-3 lg:items-center">
          <div className="mt-10 lg:mt-0 lg:pr-24">
            <Image
              className="relative mx-auto"
              height={544}
              width={490}
              src="/images/home-investor-illustration.svg"
              alt=""
            />
          </div>
          <div className="relative mt-12 lg:mt-0">
            <h3 className="text-xl font-semibold lg:text-2xl text-green-dark">
              <FormattedMessage defaultMessage="As an Investor / Funder" id="sMWFoV" />
            </h3>
            <div className="mt-8">
              <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-16 md:space-y-0">
                <div>
                  <dt className="text-base font-semibold sm:text-lg md:text-xl">
                    <FormattedMessage defaultMessage="Create open calls" id="4EYbNW" />
                  </dt>
                  <dd className="mt-1 text-black/70">
                    <FormattedMessage
                      defaultMessage="<a>Call on our community</a> of project developers to identify opportunities in your preferred sectors and geographies."
                      id="jWOeHy"
                      values={{
                        a: (chunks) => (
                          <Link href="/discover/project-developer">
                            <a className="font-bold underline text-green-dark">{chunks}</a>
                          </Link>
                        ),
                      }}
                    />
                  </dd>
                </div>
                <div>
                  <dt className="text-base font-semibold sm:text-lg md:text-xl">
                    <FormattedMessage defaultMessage="Enable positive impact" id="J4w7T/" />
                  </dt>
                  <dd className="mt-1 text-black/70">
                    <FormattedMessage
                      defaultMessage="Find opportunities that have the greatest impact on challenges like biodiversity, climate, community and water."
                      id="p1NkQY"
                    />
                  </dd>
                </div>
                <div>
                  <dt className="text-base font-semibold sm:text-lg md:text-xl">
                    <FormattedMessage defaultMessage="In line with your priorities" id="ZRwGVc" />
                  </dt>
                  <dd className="mt-1 text-black/70">
                    <FormattedMessage
                      defaultMessage="Set your priorities and HeCo Invest will connect you with the best opportunities."
                      id="ctfKNN"
                    />
                  </dd>
                </div>
                <div>
                  <dt className="text-base font-semibold sm:text-lg md:text-xl">
                    <FormattedMessage defaultMessage="Projects of all sizes" id="dkNQOz" />
                  </dt>
                  <dd className="mt-1 text-black/70">
                    <FormattedMessage
                      defaultMessage="Invest in small, medium or big project opportunities."
                      id="URdlN+"
                    />
                  </dd>
                </div>
              </dl>
            </div>
            <Button
              theme="secondary-green"
              size="small"
              to="/investors"
              className="inline-block mt-12 md:mt-16"
            >
              <FormattedMessage defaultMessage="Features for investors" id="i50XU3" />
            </Button>
          </div>
        </div>

        <div className="relative mt-20 lg:mt-52 md:grid md:grid-cols-2 md:gap-3 lg:items-center">
          <div className="relative mt-12 lg:mt-0">
            <h3 className="text-xl font-semibold lg:text-2xl text-green-dark">
              <FormattedMessage defaultMessage="As a Project Developer" id="pgfBG8" />
            </h3>
            <div className="mt-8">
              <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-16 md:space-y-0">
                <div>
                  <dt className="text-base font-semibold sm:text-lg md:text-xl">
                    <FormattedMessage defaultMessage="Guiding tools" id="Obr4XP" />
                  </dt>
                  <dd className="mt-1 text-black/70">
                    <FormattedMessage
                      defaultMessage="Access user-friendly tools that help turn a good idea into a proposal ready to be reviewed by an investor or funder."
                      id="FJfVJJ"
                    />
                  </dd>
                </div>
                <div>
                  <dt className="text-base font-semibold sm:text-lg md:text-xl">
                    <FormattedMessage defaultMessage="Create partnerships" id="NvzZkI" />
                  </dt>
                  <dd className="mt-1 text-black/70">
                    <FormattedMessage
                      defaultMessage="Find other people with similar interests. Join forces, secure more investment and create a greater impact."
                      id="bNpbHr"
                    />
                  </dd>
                </div>
                <div>
                  <dt className="text-base font-semibold sm:text-lg md:text-xl">
                    <FormattedMessage defaultMessage="Curated database" id="aDn1WM" />
                  </dt>
                  <dd className="mt-1 text-black/70">
                    <FormattedMessage
                      defaultMessage="Explore our curated database featuring the contacts you need to take your project or business to the next level."
                      id="Nye7xC"
                    />
                  </dd>
                </div>
                <div>
                  <dt className="text-base font-semibold sm:text-lg md:text-xl">
                    <FormattedMessage defaultMessage="Apply to open calls" id="txaU6M" />
                  </dt>
                  <dd className="mt-1 text-black/70">
                    <FormattedMessage
                      defaultMessage="<a>Browse the open calls</a> posted by our investor community to identify new areas for project development."
                      id="btdgGc"
                      values={{
                        a: (chunks) => (
                          <Link href="/discover/open-call">
                            <a className="font-bold underline text-green-dark">{chunks}</a>
                          </Link>
                        ),
                      }}
                    />
                  </dd>
                </div>
              </dl>
            </div>
            <Button
              theme="secondary-green"
              size="small"
              to="/investors"
              className="inline-block mt-12 md:mt-16"
            >
              <FormattedMessage defaultMessage="Features for project developers" id="HNpobe" />
            </Button>
          </div>
          <div className="mt-10 lg:mt-0 lg:pl-24">
            <Image
              className="relative mx-auto"
              height={520}
              width={490}
              src="/images/home-project-developer-illustration.svg"
              alt=""
            />
          </div>
        </div>
      </LayoutContainer>

      <HowItWorks />

      <LayoutContainer className="mt-14 md:pb-56">
        <div className="relative px-4 py-6 sm:py-12 sm:px-8 md:pt-20 md:pb-60 lg:pb-72 bg-green-dark rounded-3xl">
          <h2 className="max-w-md mx-auto font-serif text-2xl font-bold text-center text-white sm:max-w-xl md:max-w-4xl sm:text-3xl md:text-4xl">
            <FormattedMessage
              defaultMessage="Identified priorities by the HeCo program"
              id="XQuzr9"
            />
          </h2>
          <p className="max-w-md mx-auto mt-4 text-base text-center md:mt-8 sm:max-w-xl md:max-w-5xl sm:text-lg md:text-xl text-white/70">
            <FormattedMessage
              defaultMessage="HeCo Invest manages a wide range of investment and financing opportunities in various sectors and priority geographies for the conservation and development of the Colombian Amazon region."
              id="ZMvQxR"
            />
          </p>
          <div className="bottom-0 w-full max-w-5xl mt-8 md:mt-0 md:px-8 xl:px-0 md:absolute left-1/2 md:-translate-x-1/2 md:translate-y-1/2">
            <div className="grid grid-rows-2 gap-8 md:grid-rows-none md:grid-cols-2">
              <div className="p-3 md:p-5 lg:p-10 pt-[40%] md:pt-[40%] lg:pt-[40%] bg-white bg-top bg-contain bg-no-repeat bg-[url('/images/home-priority-geographies.jpg')] rounded-2xl shadow-lg">
                <h3 className="text-xl font-medium uppercase">
                  <FormattedMessage defaultMessage="Geographies" id="ghj0+t" />
                </h3>
                <p className="mt-2 md:mt-4 text-black/70 lg:leading-8">
                  <FormattedMessage
                    defaultMessage="The opportunities are located in geographies that are are unique due to of their biodiversity, cultural heritages, and regulation of water systems. As such, these projects will have the greatest impact for people and nature."
                    id="2inebt"
                  />
                </p>
              </div>
              <div className="p-3 md:p-5 lg:p-10 pt-[40%] md:pt-[40%] lg:pt-[40%] bg-white bg-top bg-contain bg-no-repeat bg-[url('/images/home-priority-categories.jpg')] rounded-2xl shadow-lg">
                <h3 className="text-xl font-medium uppercase">
                  <FormattedMessage defaultMessage="Categories" id="VKb1MS" />
                </h3>
                <p className="mt-2 md:mt-4 text-black/70 lg:leading-8">
                  <FormattedMessage
                    defaultMessage="You can choose from a variety of opportunities that range from sustainable landscape management tools and solutions, to forest-friendly products and business models. From social welfare solutions, to climate solutions and sustainable businesses."
                    id="5l/FHl"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </LayoutContainer>

      <LayoutContainer className="mt-24 lg:mt-48">
        <h2 className="max-w-md mx-auto font-serif text-2xl font-bold text-center sm:max-w-xl md:max-w-4xl sm:text-3xl md:text-4xl text-green-dark">
          <FormattedMessage
            defaultMessage="Invest in the most meaningful way to have the biggest impact"
            id="4EE+gM"
          />
        </h2>
        <p className="max-w-md mx-auto mt-4 text-base text-center md:mt-8 sm:max-w-xl md:max-w-5xl sm:text-lg md:text-xl">
          <FormattedMessage
            defaultMessage="Through accessing <span>ARIES</span> (Artificial Intelligence for Environmental Sustainability) and using Machine Reasoning modelling algorithms, this platform accesses the most relevant information to inform you on project and investment potential impact along four key dimensions: <span>Biodiversity</span>, <span>Climate</span>, <span>Community</span> and <span>Water</span>."
            id="yJVljq"
            values={{
              span: (chunks) => <span className="font-semibold">{chunks}</span>,
            }}
          />
        </p>
      </LayoutContainer>

      <div className="mt-7 md:mt-16 lg:relative bg-green-dark">
        <figure className="relative w-full h-64 lg:w-1/2 sm:h-72 md:h-96 lg:h-screen lg:sticky lg:top-0 lg:left-0">
          <Image
            src="/images/home-biodiversity.jpg"
            alt=""
            layout="fill"
            className="absolute inset-0 object-cover w-full h-full"
          />
          <figcaption className="absolute text-white left-4 md:left-6 bottom-3 md:bottom-6 text-2xs">
            <FormattedMessage defaultMessage="© Luis Barreto / WWF-UK" id="tH/CDj" />
          </figcaption>
        </figure>
        <div className="mx-auto lg:mt-[-50vh] lg:mb-[50vh] pt-16 lg:pt-0 pb-20 lg:pb-0 w-full max-w-7xl lg:-translate-y-1/2 lg:flex items-center text-center lg:text-left">
          <div className="px-4 lg:ml-auto sm:px-8 xl:pl-28 lg:w-1/2 ">
            <h3 className="font-serif text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
              <FormattedMessage defaultMessage="Biodiversity" id="mbTJWV" />
            </h3>
            <p className="max-w-md mx-auto mt-3 text-base text-white md:mt-6 lg:mx-0 sm:text-lg md:text-xl opacity-70">
              <FormattedMessage
                defaultMessage="Contribute to the conservation and restoration of the most diverse terrestrial ecosystems on the planet. These ecosystems support countless endemic species and contribute to mitigate the impacts of the climate crisis."
                id="7KLSqh"
              />
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              <Button theme="secondary-white" size="small" to="/discover?s=biodiversity">
                <FormattedMessage defaultMessage="Search biodiversity" id="PIZ1dD" />
              </Button>
            </div>
          </div>
        </div>

        <figure
          ref={slide2Ref}
          className={cx({
            'relative w-full lg:w-1/2 h-64 sm:h-72 md:h-96 lg:h-screen lg:sticky lg:top-0 lg:left-0 transition-opacity duration-300':
              true,
            'lg:opacity-0': !inViewSlide2,
            'opacity-100': inViewSlide2,
          })}
        >
          <Image
            src="/images/home-climate.jpg"
            alt=""
            layout="fill"
            className="absolute inset-0 object-cover w-full h-full"
          />
          <figcaption className="absolute text-white left-4 md:left-6 bottom-3 md:bottom-6 text-2xs">
            <FormattedMessage defaultMessage="© Luis Barreto / WWF-UK" id="tH/CDj" />
          </figcaption>
        </figure>
        <div className="mx-auto lg:mt-[-50vh] lg:mb-[50vh] pt-16 lg:pt-0 pb-20 lg:pb-0 w-full max-w-7xl lg:-translate-y-1/2 lg:flex items-center text-center lg:text-left">
          <div className="px-4 lg:ml-auto sm:px-8 xl:pl-28 lg:w-1/2 ">
            <h3 className="font-serif text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
              <FormattedMessage defaultMessage="Climate" id="MuOp0t" />
            </h3>
            <p className="max-w-md mx-auto mt-3 text-base text-white md:mt-6 lg:mx-0 sm:text-lg md:text-xl opacity-70">
              <FormattedMessage
                defaultMessage="Contribute to climate solutions through investments that reduce CO2 emissions and conserve or restore forest-related carbon sinks."
                id="PTr6+3"
              />
              <br />
              <br />
              <FormattedMessage
                defaultMessage="Nature based solutions are estimated to compensate up to 30% of global emissions."
                id="IMe8OV"
              />
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              <Button theme="secondary-white" size="small" to="/discover?s=climate">
                <FormattedMessage defaultMessage="Search climate" id="kUPAU5" />
              </Button>
            </div>
          </div>
        </div>

        <figure
          ref={slide3Ref}
          className={cx({
            'relative w-full lg:w-1/2 h-64 sm:h-72 md:h-96 lg:h-screen lg:sticky lg:top-0 lg:left-0 transition-opacity duration-300':
              true,
            'lg:opacity-0': !inViewSlide3,
            'opacity-100': inViewSlide3,
          })}
        >
          <Image
            src="/images/home-community.jpg"
            alt=""
            layout="fill"
            className="absolute inset-0 object-cover w-full h-full"
          />
          <figcaption className="absolute text-white left-4 md:left-6 bottom-3 md:bottom-6 text-2xs">
            <FormattedMessage defaultMessage="© Luis Barreto / WWF-UK" id="tH/CDj" />
          </figcaption>
        </figure>
        <div className="mx-auto lg:mt-[-50vh] lg:mb-[50vh] pt-16 lg:pt-0 pb-20 lg:pb-0 w-full max-w-7xl lg:-translate-y-1/2 lg:flex items-center text-center lg:text-left">
          <div className="px-4 lg:ml-auto sm:px-8 xl:pl-28 lg:w-1/2 ">
            <h3 className="font-serif text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
              <FormattedMessage defaultMessage="Community" id="4CrCbD" />
            </h3>
            <p className="max-w-md mx-auto mt-3 text-base text-white md:mt-6 lg:mx-0 sm:text-lg md:text-xl opacity-70">
              <FormattedMessage
                defaultMessage="Contribute to improving the production systems and livelihoods of local communities and indigenous people, to ensure their basic needs are met, while enhancing their adaptation to climate change."
                id="60xeYL"
              />
              <br />
              <br />
              <FormattedMessage
                defaultMessage="Support the consolidation of their lands governance structures and capacities for sound management."
                id="NIQVjS"
              />
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              <Button theme="secondary-white" size="small" to="/discover?s=community">
                <FormattedMessage defaultMessage="Search community" id="8R8Or7" />
              </Button>
            </div>
          </div>
        </div>

        <div className="top-0 lg:h-screen lg:sticky">
          <figure
            ref={slide4Ref}
            className={cx({
              'relative w-full lg:w-1/2 h-64 sm:h-72 md:h-96 lg:h-full lg:absolute lg:inset-y-0 lg:left-0 transition-opacity duration-300':
                true,
              'lg:opacity-0': !inViewSlide4,
              'opacity-100': inViewSlide4,
            })}
          >
            {' '}
            <Image
              src="/images/home-water.jpg"
              alt=""
              layout="fill"
              className="absolute inset-0 object-cover w-full h-full"
            />
            <figcaption className="absolute text-white left-4 md:left-6 bottom-3 md:bottom-6 text-2xs">
              <FormattedMessage defaultMessage="© Luis Barreto / WWF-UK" id="tH/CDj" />
            </figcaption>
          </figure>
          <div className="items-center w-full pt-16 pb-20 mx-auto text-center max-w-7xl lg:h-full lg:flex lg:text-left">
            <div className="px-4 lg:ml-auto sm:px-8 xl:pl-28 lg:w-1/2 ">
              <h3 className="font-serif text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
                <FormattedMessage defaultMessage="Water" id="t7YvMF" />
              </h3>
              <p className="max-w-md mx-auto mt-3 text-base text-white md:mt-6 lg:mx-0 sm:text-lg md:text-xl opacity-70">
                <FormattedMessage
                  defaultMessage="Support the protection of water availability and regulation. These approaches are vital for reducing risks such as floods and droughts, which in the face of climate change can become more frequent and larger in magnitude."
                  id="HmDmU1"
                />
              </p>
              <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                <Button theme="secondary-white" size="small" to="/discover?s=water">
                  <FormattedMessage defaultMessage="Search water" id="XJqnLu" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterBanner />
    </>
  );
};

Home.layout = {
  props: {
    headerProps: {
      transparent: true,
    },
  },
};

export default Home;
