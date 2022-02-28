import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import Image from 'next/image';
import Link from 'next/link';

import { T } from '@transifex/react';
import { InferGetStaticPropsType } from 'next';
import { useInViewRef } from 'rooks';

import { loadI18nMessages } from 'helpers/i18n';

import Button from 'components/button';
import Head from 'components/head';
import Icon from 'components/icon';
import LayoutContainer from 'components/layout-container';
import { StaticPageLayoutProps } from 'layouts/static-page';
import { PageComponent } from 'types';

import ConnectIcon from 'svgs/home/connect.svg';
import ReportBackIcon from 'svgs/home/report-back.svg';
import SearchFindIcon from 'svgs/home/search-find.svg';

export async function getStaticProps(ctx) {
  return {
    props: {
      intlMessages: await loadI18nMessages(ctx),
    },
  };
}

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
            <T _str="Be part of the biggest change in the Colombian Amazon" />
          </h1>
          <p className="max-w-md mx-auto mt-2 text-base text-white md:max-w-2xl sm:text-lg md:text-xl">
            <T _str="Connecting investors, donors and philanthropists with carefully identified investment opportunities." />
          </p>
        </div>
        <LayoutContainer className="sm:mt-5 md:mt-9">
          <div className="sm:mx-auto sm:max-w-2xl md:max-w-3xl h-[4.5rem] translate-y-1/2 flex justify-center items-center bg-white rounded-full shadow-search">
            <T _str="Search" />
          </div>
        </LayoutContainer>
      </div>

      <LayoutContainer className="mt-24 lg:mt-28">
        <h2 className="max-w-md mx-auto font-serif text-2xl font-bold text-center sm:max-w-xl md:max-w-4xl sm:text-3xl md:text-5xl text-green-dark">
          <T _str="Why use this platform" />
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
              <T _str="As an Investor / Funder" />
            </h3>
            <div className="mt-8">
              <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-16 md:space-y-0">
                <div>
                  <dt className="text-base font-semibold sm:text-lg md:text-xl">
                    <T _str="Create open calls" />
                  </dt>
                  <dd className="mt-1 text-black/70">
                    <T
                      _str="{link} of project developers to identify opportunities in your preferred sectors and geographies."
                      link={
                        <Link href="/discover/project-developer">
                          <a className="font-bold underline text-green-dark">
                            <T _str="Call on our community" />
                          </a>
                        </Link>
                      }
                    />
                  </dd>
                </div>
                <div>
                  <dt className="text-base font-semibold sm:text-lg md:text-xl">
                    <T _str="Enable positive impact" />
                  </dt>
                  <dd className="mt-1 text-black/70">
                    <T _str="Find opportunities that have the greatest impact on challenges like biodiversity, climate, community and water." />
                  </dd>
                </div>
                <div>
                  <dt className="text-base font-semibold sm:text-lg md:text-xl">
                    <T _str="In line with your priorities" />
                  </dt>
                  <dd className="mt-1 text-black/70">
                    <T _str="Set your priorities and HeCo Invest will connect you with the best opportunities." />
                  </dd>
                </div>
                <div>
                  <dt className="text-base font-semibold sm:text-lg md:text-xl">
                    <T _str="Projects of all sizes" />
                  </dt>
                  <dd className="mt-1 text-black/70">
                    <T _str="Invest in small, medium or big project opportunities." />
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
              <T _str="Features for investors" />
            </Button>
          </div>
        </div>

        <div className="relative mt-20 lg:mt-52 md:grid md:grid-cols-2 md:gap-3 lg:items-center">
          <div className="relative mt-12 lg:mt-0">
            <h3 className="text-xl font-semibold lg:text-2xl text-green-dark">
              <T _str="As a Project Developer" />
            </h3>
            <div className="mt-8">
              <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-16 md:space-y-0">
                <div>
                  <dt className="text-base font-semibold sm:text-lg md:text-xl">
                    <T _str="Guiding tools" />
                  </dt>
                  <dd className="mt-1 text-black/70">
                    <T _str="Access user-friendly tools that help turn a good idea into a proposal ready to be reviewed by an investor or funder." />
                  </dd>
                </div>
                <div>
                  <dt className="text-base font-semibold sm:text-lg md:text-xl">
                    <T _str="Create partnerships" />
                  </dt>
                  <dd className="mt-1 text-black/70">
                    <T _str="Find other people with similar interests. Join forces, secure more investment and create a greater impact." />
                  </dd>
                </div>
                <div>
                  <dt className="text-base font-semibold sm:text-lg md:text-xl">
                    <T _str="Curated database" />
                  </dt>
                  <dd className="mt-1 text-black/70">
                    <T _str="Explore our curated database featuring the contacts you need to take your project or business to the next level." />
                  </dd>
                </div>
                <div>
                  <dt className="text-base font-semibold sm:text-lg md:text-xl">
                    <T _str="Apply to open calls" />
                  </dt>
                  <dd className="mt-1 text-black/70">
                    <T
                      _str="{link} posted by our investor community to identify new areas for project development."
                      link={
                        <Link href="/discover/open-call">
                          <a className="font-bold underline text-green-dark">
                            <T _str="Browse the open calls" />
                          </a>
                        </Link>
                      }
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
              <T _str="Features for project developers" />
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

      <div className="py-16 mt-24 sm:py-28 bg-background-middle">
        <LayoutContainer>
          <h2 className="max-w-md mx-auto font-serif text-2xl font-bold text-center sm:max-w-xl md:max-w-4xl sm:text-3xl md:text-5xl">
            <T _str="How it works" />
          </h2>
          <p className="max-w-md mx-auto mt-4 text-base text-center md:mt-8 sm:max-w-xl md:max-w-4xl sm:text-lg md:text-xl">
            <T
              _str="Reach out for what you are looking for, from either {span1} or {span2} and {span3}. Make sure to update us to help us track your contribution to preserving the Amazon: {span4}"
              span1={
                <span className="font-semibold">
                  <T _str="Investors" />
                </span>
              }
              span2={
                <span className="font-semibold">
                  <T _str="Project Developers" />
                </span>
              }
              span3={
                <span className="font-semibold">
                  <T _str="start the conversation" />
                </span>
              }
              span4={
                <span className="font-semibold">
                  <T _str="the future is in your hands too!" />
                </span>
              }
            />
          </p>
          <div className="grid grid-rows-3 gap-6 mt-12 md:mt-20 md:grid-rows-none md:grid-cols-3">
            <div className="px-6 py-6 text-center md:py-10 bg-green-light/20 rounded-4xl">
              <Icon
                icon={SearchFindIcon}
                className="w-24 h-24 p-3 mx-auto bg-white rounded-full text-green-dark"
              />
              <h3 className="mt-4 text-xl font-medium uppercase md:mt-14">
                <T _str="Search and find" />
              </h3>
              <p className="mt-2 md:mt-2.5 text-black/70">
                <T _str="Use our Artificial Intellience tool powered by ARIES, to help you identify what best fits your specific needs." />
              </p>
            </div>
            <div className="px-6 py-6 text-center md:py-10 bg-green-light/20 rounded-4xl">
              <Icon
                icon={ConnectIcon}
                className="w-24 h-24 p-3 mx-auto bg-white rounded-full text-green-dark"
              />
              <h3 className="mt-4 text-xl font-medium uppercase md:mt-14">
                <T _str="Connect" />
              </h3>
              <p className="mt-2 md:mt-2.5 text-black/70">
                <T _str="Start connecting with people to create impact. You can find investors, opportunities to invest in and much much more..." />
              </p>
            </div>
            <div className="px-6 py-6 text-center md:py-10 bg-green-light/20 rounded-4xl">
              <Icon
                icon={ReportBackIcon}
                className="w-24 h-24 p-3 mx-auto bg-white rounded-full text-green-dark"
              />
              <h3 className="mt-4 text-xl font-medium uppercase md:mt-14">
                <T _str="Report back" />
              </h3>
              <p className="mt-2 md:mt-2.5 text-black/70">
                <T _str="Inspire and educate other users by coming back to the platform and updating us on your progress. We’ll be able to track the Amazon’s improvement thanks to your contribution!" />
              </p>
            </div>
          </div>
        </LayoutContainer>
      </div>

      <LayoutContainer className="mt-14 md:pb-56">
        <div className="relative px-4 py-6 sm:py-12 sm:px-8 md:pt-20 md:pb-60 lg:pb-72 bg-green-dark rounded-3xl">
          <h2 className="max-w-md mx-auto font-serif text-2xl font-bold text-center text-white sm:max-w-xl md:max-w-4xl sm:text-3xl md:text-4xl">
            <T _str="Identified priorities by the HeCo program" />
          </h2>
          <p className="max-w-md mx-auto mt-4 text-base text-center md:mt-8 sm:max-w-xl md:max-w-5xl sm:text-lg md:text-xl text-white/70">
            <T _str="HeCo Invest manages a wide range of investment and financing opportunities in various sectors and priority geographies for the conservation and development of the Colombian Amazon region." />
          </p>
          <div className="bottom-0 w-full max-w-5xl mt-8 md:mt-0 md:px-8 xl:px-0 md:absolute left-1/2 md:-translate-x-1/2 md:translate-y-1/2">
            <div className="grid grid-rows-2 gap-8 md:grid-rows-none md:grid-cols-2">
              <div className="p-3 md:p-5 lg:p-10 pt-[40%] md:pt-[40%] lg:pt-[40%] bg-white bg-top bg-contain bg-no-repeat bg-[url('/images/home-priority-geographies.jpg')] rounded-2xl shadow-lg">
                <h3 className="text-xl font-medium uppercase">
                  <T _str="Geographies" />
                </h3>
                <p className="mt-2 md:mt-4 text-black/70 lg:leading-8">
                  <T _str="The opportunities are located in geographies that are are unique due to of their biodiversity, cultural heritages, and regulation of water systems. As such, these projects will have the greatest impact for people and nature." />
                </p>
              </div>
              <div className="p-3 md:p-5 lg:p-10 pt-[40%] md:pt-[40%] lg:pt-[40%] bg-white bg-top bg-contain bg-no-repeat bg-[url('/images/home-priority-categories.jpg')] rounded-2xl shadow-lg">
                <h3 className="text-xl font-medium uppercase">
                  <T _str="Categories" />
                </h3>
                <p className="mt-2 md:mt-4 text-black/70 lg:leading-8">
                  <T _str="You can choose from a variety of opportunities that range from sustainable landscape management tools and solutions, to forest-friendly products and business models. From social welfare solutions, to climate solutions and sustainable businesses." />
                </p>
              </div>
            </div>
          </div>
        </div>
      </LayoutContainer>

      <LayoutContainer className="mt-24 lg:mt-48">
        <h2 className="max-w-md mx-auto font-serif text-2xl font-bold text-center sm:max-w-xl md:max-w-4xl sm:text-3xl md:text-4xl text-green-dark">
          <T _str="Invest in the most meaningful way to have the biggest impact" />
        </h2>
        <p className="max-w-md mx-auto mt-4 text-base text-center md:mt-8 sm:max-w-xl md:max-w-5xl sm:text-lg md:text-xl">
          <T
            _str="Through accessing {span1} (Artificial Intelligence for Environmental Sustainability) and using Machine Reasoning modelling algorithms, this platform accesses the most relevant information to inform you on project and investment potential impact along four key dimensions: {span2}, {span3}, {span4} and {span5}."
            span1={
              <span className="font-semibold">
                <T _str="ARIES" />
              </span>
            }
            span2={
              <span className="font-semibold">
                <T _str="Biodiversity" />
              </span>
            }
            span3={
              <span className="font-semibold">
                <T _str="Climate" />
              </span>
            }
            span4={
              <span className="font-semibold">
                <T _str="Community" />
              </span>
            }
            span5={
              <span className="font-semibold">
                <T _str="Water" />
              </span>
            }
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
            <T _str="© Luis Barreto / WWF-UK" />
          </figcaption>
        </figure>
        <div className="mx-auto lg:mt-[-50vh] lg:mb-[50vh] pt-16 lg:pt-0 pb-20 lg:pb-0 w-full max-w-7xl lg:-translate-y-1/2 lg:flex items-center text-center lg:text-left">
          <div className="px-4 lg:ml-auto sm:px-8 xl:pl-28 lg:w-1/2 ">
            <h3 className="font-serif text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
              <T _str="Biodiversity" />
            </h3>
            <p className="max-w-md mx-auto mt-3 text-base text-white md:mt-6 lg:mx-0 sm:text-lg md:text-xl opacity-70">
              <T _str="Contribute to the conservation and restoration of the most diverse terrestrial ecosystems on the planet. These ecosystems support countless endemic species and contribute to mitigate the impacts of the climate crisis." />
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              <Button theme="secondary-white" size="small" to="/discover?s=biodiversity">
                <T _str="Search biodiversity" />
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
            <T _str="© Luis Barreto / WWF-UK" />
          </figcaption>
        </figure>
        <div className="mx-auto lg:mt-[-50vh] lg:mb-[50vh] pt-16 lg:pt-0 pb-20 lg:pb-0 w-full max-w-7xl lg:-translate-y-1/2 lg:flex items-center text-center lg:text-left">
          <div className="px-4 lg:ml-auto sm:px-8 xl:pl-28 lg:w-1/2 ">
            <h3 className="font-serif text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
              <T _str="Climate" />
            </h3>
            <p className="max-w-md mx-auto mt-3 text-base text-white md:mt-6 lg:mx-0 sm:text-lg md:text-xl opacity-70">
              <T _str="Contribute to climate solutions through investments that reduce CO2 emissions and conserve or restore forest-related carbon sinks." />
              <br />
              <br />
              <T _str="Nature based solutions are estimated to compensate up to 30% of global emissions." />
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              <Button theme="secondary-white" size="small" to="/discover?s=climate">
                <T _str="Search climate" />
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
            <T _str="© Luis Barreto / WWF-UK" />
          </figcaption>
        </figure>
        <div className="mx-auto lg:mt-[-50vh] lg:mb-[50vh] pt-16 lg:pt-0 pb-20 lg:pb-0 w-full max-w-7xl lg:-translate-y-1/2 lg:flex items-center text-center lg:text-left">
          <div className="px-4 lg:ml-auto sm:px-8 xl:pl-28 lg:w-1/2 ">
            <h3 className="font-serif text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
              <T _str="Community" />
            </h3>
            <p className="max-w-md mx-auto mt-3 text-base text-white md:mt-6 lg:mx-0 sm:text-lg md:text-xl opacity-70">
              <T _str="Contribute to improving the production systems and livelihoods of local communities and indigenous people, to ensure their basic needs are met, while enhancing their adaptation to climate change." />
              <br />
              <br />
              <T _str="Support the consolidation of their lands governance structures and capacities for sound management." />
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              <Button theme="secondary-white" size="small" to="/discover?s=community">
                <T _str="Search community" />
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
              <T _str="© Luis Barreto / WWF-UK" />
            </figcaption>
          </figure>
          <div className="items-center w-full pt-16 pb-20 mx-auto text-center max-w-7xl lg:h-full lg:flex lg:text-left">
            <div className="px-4 lg:ml-auto sm:px-8 xl:pl-28 lg:w-1/2 ">
              <h3 className="font-serif text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
                <T _str="Water" />
              </h3>
              <p className="max-w-md mx-auto mt-3 text-base text-white md:mt-6 lg:mx-0 sm:text-lg md:text-xl opacity-70">
                <T _str="Support the protection of water availability and regulation. These approaches are vital for reducing risks such as floods and droughts, which in the face of climate change can become more frequent and larger in magnitude." />
              </p>
              <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                <Button theme="secondary-white" size="small" to="/discover?s=water">
                  <T _str="Search water" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-dark bg-cover bg-center bg-[url('/images/home-hero.jpg')]">
        <LayoutContainer className="py-16 text-center text-white sm:pt-24 sm:pb-20">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">
            <T _str="Start making an impact now!" />
          </h2>
          <div className="grid max-w-5xl grid-rows-2 gap-4 mx-auto mt-12 text-base md:mt-16 md:grid-rows-none md:grid-cols-2 md:gap-6 sm:text-lg md:text-xl">
            <p className="px-4">
              <T _str="Find projects, start-ups or create an open call to locate opportunities for investment that make an impact." />
            </p>
            <p className="px-4">
              <T _str="Promote your idea, project or business and connect it with investors and funding sources to generate impact in the Amazon region." />
            </p>
          </div>
          <Button theme="primary-white" size="small" className="mt-12 md:mt-16" disabled>
            <T _str="Create your profile" />
          </Button>
        </LayoutContainer>
      </div>
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
