import Link from 'next/link';

import Button from 'components/button';
import Head from 'components/head';
import Icon from 'components/icon';
import LayoutContainer from 'components/layout-container';
import { StaticPageLayoutProps } from 'layouts/static-page';
import { PageComponent } from 'types';

import ConnectIcon from 'svgs/home/connect.svg?sprite';
import ReportBackIcon from 'svgs/home/report-back.svg?sprite';
import SearchFindIcon from 'svgs/home/search-find.svg?sprite';

const Home: PageComponent<{}, StaticPageLayoutProps> = () => (
  <>
    <Head />
    <div className="-mt-28 lg:-mt-44 pt-24 sm:pt-40 md:pt-56 bg-cover bg-center bg-green-dark bg-[url('/images/home-hero.jpg')]">
      <div className="text-center">
        <h1 className="max-w-md sm:max-w-xl md:max-w-5xl mx-auto font-serif text-3xl md:text-6xl font-bold text-green-light">
          Be part of the biggest change in the Colombian Amazon
        </h1>
        <p className="mt-2 max-w-md md:max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white">
          Connecting investors, donors and philanthropists with carefully identified investment
          opportunities.
        </p>
      </div>
      <LayoutContainer className="sm:mt-5 md:mt-9">
        <div className="sm:mx-auto sm:max-w-2xl md:max-w-3xl h-[4.5rem] translate-y-1/2 flex justify-center items-center bg-white rounded-full shadow-search">
          Search
        </div>
      </LayoutContainer>
    </div>

    <LayoutContainer className="mt-24 lg:mt-28">
      <h2 className="max-w-md sm:max-w-xl md:max-w-4xl mx-auto font-serif font-bold text-center text-2xl sm:text-3xl md:text-5xl text-green-dark">
        Why use this platform
      </h2>

      <div className="relative mt-12 lg:mt-24 md:grid md:grid-cols-2 md:gap-3 lg:items-center">
        <div className="mt-10 lg:mt-0 lg:pr-24">
          <img
            className="relative mx-auto"
            width={490}
            src="/images/home-investor-illustration.svg"
            alt=""
          />
        </div>
        <div className="relative mt-12 lg:mt-0">
          <h3 className="text-xl lg:text-2xl font-semibold text-green-dark">
            As an Investor / Funder
          </h3>
          <div className="mt-8">
            <dl className="md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-16 space-y-10 md:space-y-0">
              <div>
                <dt className="text-base sm:text-lg md:text-xl font-semibold">Create open calls</dt>
                <dd className="mt-1 text-black/70">
                  <Link href="/discover/project-developer">
                    <a className="text-green-dark font-bold underline">Call on our community</a>
                  </Link>{' '}
                  of project developers to identify opportunities in your preferred sectors and
                  geographies.
                </dd>
              </div>
              <div>
                <dt className="text-base sm:text-lg md:text-xl font-semibold">
                  Enable positive impact
                </dt>
                <dd className="mt-1 text-black/70">
                  Find opportunities that have the greatest impact on challenges like biodiversity,
                  climate, community and water.
                </dd>
              </div>
              <div>
                <dt className="text-base sm:text-lg md:text-xl font-semibold">
                  In line with your priorities
                </dt>
                <dd className="mt-1 text-black/70">
                  Set your priorities and HeCo Invest will connect you with the best opportunities.
                </dd>
              </div>
              <div>
                <dt className="text-base sm:text-lg md:text-xl font-semibold">
                  Projects of all sizes
                </dt>
                <dd className="mt-1 text-black/70">
                  Invest in small, medium or big project opportunities.
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
            Features for investors
          </Button>
        </div>
      </div>

      <div className="relative mt-20 lg:mt-52 md:grid md:grid-cols-2 md:gap-3 lg:items-center">
        <div className="relative mt-12 lg:mt-0">
          <h3 className="text-xl lg:text-2xl font-semibold text-green-dark">
            As a Project Developer
          </h3>
          <div className="mt-8">
            <dl className="md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-16 space-y-10 md:space-y-0">
              <div>
                <dt className="text-base sm:text-lg md:text-xl font-semibold">Guiding tools</dt>
                <dd className="mt-1 text-black/70">
                  Access user-friendly tools that help turn a good idea into a proposal ready to be
                  reviewed by an investor or funder.
                </dd>
              </div>
              <div>
                <dt className="text-base sm:text-lg md:text-xl font-semibold">
                  Create partnerships
                </dt>
                <dd className="mt-1 text-black/70">
                  Find other people with similar interests. Join forces, secure more investment and
                  create a greater impact.
                </dd>
              </div>
              <div>
                <dt className="text-base sm:text-lg md:text-xl font-semibold">Curated database</dt>
                <dd className="mt-1 text-black/70">
                  Explore our curated database featuring the contacts you need to take your project
                  or business to the next level.
                </dd>
              </div>
              <div>
                <dt className="text-base sm:text-lg md:text-xl font-semibold">
                  Apply to open calls
                </dt>
                <dd className="mt-1 text-black/70">
                  <Link href="/discover/open-call">
                    <a className="text-green-dark font-bold underline">Browse the open calls</a>
                  </Link>{' '}
                  posted by our investor community to identify new areas for project development.
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
            Features for project developers
          </Button>
        </div>
        <div className="mt-10 lg:mt-0 lg:pl-24">
          <img
            className="relative mx-auto"
            width={490}
            src="/images/home-project-developer-illustration.svg"
            alt=""
          />
        </div>
      </div>
    </LayoutContainer>

    <div className="mt-24 py-16 sm:py-28 bg-background-middle">
      <LayoutContainer>
        <h2 className="max-w-md sm:max-w-xl md:max-w-4xl mx-auto font-serif font-bold text-center text-2xl sm:text-3xl md:text-5xl">
          How it works
        </h2>
        <p className="mt-4 md:mt-8 max-w-md sm:max-w-xl md:max-w-4xl mx-auto text-center text-base sm:text-lg md:text-xl">
          Reach out for what you are looking for, from either{' '}
          <span className="font-semibold">Investors</span> or{' '}
          <span className="font-semibold">Project Developers</span> and{' '}
          <span className="font-semibold">start the conversation</span>. Make sure to update us to
          help us track your contribution to preserving the Amazon:{' '}
          <span className="font-semibold">the future is in your hands too!</span>
        </p>
        <div className="mt-12 md:mt-20 grid grid-rows-3 md:grid-rows-none md:grid-cols-3 gap-6">
          <div className="py-6 md:py-10 px-6 bg-green-light/20 rounded-4xl text-center">
            <Icon
              icon={SearchFindIcon}
              className="mx-auto w-24 h-24 p-3 text-green-dark bg-white rounded-full"
            />
            <h3 className="mt-4 md:mt-14 font-medium text-xl uppercase">Search and find</h3>
            <p className="mt-2 md:mt-2.5 text-black/70">
              Use our Artificial Intellience tool powered by ARIES, to help you identify what best
              fits your specific needs.
            </p>
          </div>
          <div className="py-6 md:py-10 px-6 bg-green-light/20 rounded-4xl text-center">
            <Icon
              icon={ConnectIcon}
              className="mx-auto w-24 h-24 p-3 text-green-dark bg-white rounded-full"
            />
            <h3 className="mt-4 md:mt-14 font-medium text-xl uppercase">Connect</h3>
            <p className="mt-2 md:mt-2.5 text-black/70">
              Start connecting with people to create impact. You can find investors, opportunities
              to invest in and much much more...
            </p>
          </div>
          <div className="py-6 md:py-10 px-6 bg-green-light/20 rounded-4xl text-center">
            <Icon
              icon={ReportBackIcon}
              className="mx-auto w-24 h-24 p-3 text-green-dark bg-white rounded-full"
            />
            <h3 className="mt-4 md:mt-14 font-medium text-xl uppercase">Report back</h3>
            <p className="mt-2 md:mt-2.5 text-black/70">
              Inspire and educate other users by coming back to the platform and updating us on your
              progress. We’ll be able to track the Amazon’s improvement thanks to your contribution!
            </p>
          </div>
        </div>
      </LayoutContainer>
    </div>

    <LayoutContainer className="mt-14 md:pb-56">
      <div className="relative py-6 sm:py-12 px-4 sm:px-8 md:pt-20 md:pb-60 lg:pb-72 bg-green-dark rounded-3xl">
        <h2 className="max-w-md sm:max-w-xl md:max-w-4xl mx-auto font-serif font-bold text-center text-2xl sm:text-3xl md:text-4xl text-white">
          Identified priorities by the HeCo program
        </h2>
        <p className="mt-4 md:mt-8 max-w-md sm:max-w-xl md:max-w-5xl mx-auto text-center text-base sm:text-lg md:text-xl text-white/70">
          HeCo Invest manages a wide range of investment and financing opportunities in various
          sectors and priority geographies for the conservation and development of the Colombian
          Amazon region.
        </p>
        <div className="mt-8 md:mt-0 md:px-8 xl:px-0 w-full max-w-5xl md:absolute left-1/2 bottom-0 md:-translate-x-1/2 md:translate-y-1/2">
          <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 gap-8">
            <div className="p-3 md:p-5 lg:p-10 pt-[40%] md:pt-[40%] lg:pt-[40%] bg-white bg-top bg-contain bg-no-repeat bg-[url('/images/home-priority-geographies.jpg')] rounded-2xl shadow-lg">
              <h3 className="font-medium text-xl uppercase">Geographies</h3>
              <p className="mt-2 md:mt-4 text-black/70 lg:leading-8">
                The opportunities are located in geographies that are are unique due to of their
                biodiversity, cultural heritages, and regulation of water systems. As such, these
                projects will have the greatest impact for people and nature.
              </p>
            </div>
            <div className="p-3 md:p-5 lg:p-10 pt-[40%] md:pt-[40%] lg:pt-[40%] bg-white bg-top bg-contain bg-no-repeat bg-[url('/images/home-priority-categories.jpg')] rounded-2xl shadow-lg">
              <h3 className="font-medium text-xl uppercase">Categories</h3>
              <p className="mt-2 md:mt-4 text-black/70 lg:leading-8">
                You can choose from a variety of opportunities that range from sustainable landscape
                management tools and solutions, to forest-friendly products and business models.
                From social welfare solutions, to climate solutions and sustainable businesses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </LayoutContainer>

    <LayoutContainer className="mt-24 lg:mt-48">
      <h2 className="max-w-md sm:max-w-xl md:max-w-4xl mx-auto font-serif font-bold text-center text-2xl sm:text-3xl md:text-4xl text-green-dark">
        Invest in the most meaningful way to have the biggest impact
      </h2>
      <p className="mt-4 md:mt-8 max-w-md sm:max-w-xl md:max-w-5xl mx-auto text-center text-base sm:text-lg md:text-xl">
        Through accessing <span className="font-semibold">ARIES</span> (Artificial Intelligence for
        Environmental Sustainability) and using Machine Reasoning modelling algorithms, this
        platform accesses the most relevant information to inform you on project and investment
        potential impact along four key dimensions:{' '}
        <span className="font-semibold">Biodiversity</span>,{' '}
        <span className="font-semibold">Climate</span>,{' '}
        <span className="font-semibold">Community</span> and{' '}
        <span className="font-semibold">Water</span>.
      </p>
    </LayoutContainer>

    <div className="mt-7 md:mt-16 lg:relative">
      <div className="lg:h-screen lg:sticky top-0 bg-green-dark">
        <figure className="relative w-full lg:w-1/2 h-64 sm:h-72 md:h-96 lg:h-full lg:absolute lg:inset-y-0 lg:left-0">
          <img
            src="/images/home-biodiversity.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <figcaption className="absolute left-4 md:left-6 bottom-3 md:bottom-6 text-2xs text-white">
            © Luis Barreto / WWF-UK
          </figcaption>
        </figure>
        <div className="mx-auto pt-16 pb-20 w-full max-w-7xl lg:h-full lg:flex items-center text-center lg:text-left">
          <div className="lg:ml-auto px-4 sm:px-8 xl:pl-28 lg:w-1/2 ">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-white">
              Biodiversity
            </h3>
            <p className="mt-3 md:mt-6 mx-auto lg:mx-0 max-w-md text-base sm:text-lg md:text-xl text-white opacity-70">
              Contribute to the conservation and restoration of the most diverse terrestrial
              ecosystems on the planet. These ecosystems support countless endemic species and
              contribute to mitigate the impacts of the climate crisis.
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              <Button theme="secondary-white" size="small" to="/discover?s=biodiversity">
                Search biodiversity
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:h-screen lg:sticky top-0 bg-green-dark">
        <figure className="relative w-full lg:w-1/2 h-64 sm:h-72 md:h-96 lg:h-full lg:absolute lg:inset-y-0 lg:left-0">
          <img
            src="/images/home-climate.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <figcaption className="absolute left-4 md:left-6 bottom-3 md:bottom-6 text-2xs text-white">
            © Luis Barreto / WWF-UK
          </figcaption>
        </figure>
        <div className="mx-auto pt-16 pb-20 w-full max-w-7xl lg:h-full lg:flex items-center text-center lg:text-left">
          <div className="lg:ml-auto px-4 sm:px-8 xl:pl-28 lg:w-1/2 ">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-white">
              Climate
            </h3>
            <p className="mt-3 md:mt-6 mx-auto lg:mx-0 max-w-md text-base sm:text-lg md:text-xl text-white opacity-70">
              Contribute to climate solutions through investments that reduce CO2 emissions and
              conserve or restore forest-related carbon sinks.
              <br />
              <br />
              Nature based solutions are estimated to compensate up to 30% of global emissions.
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              <Button theme="secondary-white" size="small" to="/discover?s=climate">
                Search climate
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:h-screen lg:sticky top-0 bg-green-dark">
        <figure className="relative w-full lg:w-1/2 h-64 sm:h-72 md:h-96 lg:h-full lg:absolute lg:inset-y-0 lg:left-0">
          <img
            src="/images/home-community.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <figcaption className="absolute left-4 md:left-6 bottom-3 md:bottom-6 text-2xs text-white">
            © Luis Barreto / WWF-UK
          </figcaption>
        </figure>
        <div className="mx-auto pt-16 pb-20 w-full max-w-7xl lg:h-full lg:flex items-center text-center lg:text-left">
          <div className="lg:ml-auto px-4 sm:px-8 xl:pl-28 lg:w-1/2 ">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-white">
              Community
            </h3>
            <p className="mt-3 md:mt-6 mx-auto lg:mx-0 max-w-md text-base sm:text-lg md:text-xl text-white opacity-70">
              Contribute to improving the production systems and livelihoods of local communities
              and indigenous people, to ensure their basic needs are met, while enhancing their
              adaptation to climate change.
              <br />
              <br />
              Support the consolidation of their lands governance structures and capacities for
              sound management.
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              <Button theme="secondary-white" size="small" to="/discover?s=community">
                Search community
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:h-screen lg:sticky top-0 bg-green-dark">
        <figure className="relative w-full lg:w-1/2 h-64 sm:h-72 md:h-96 lg:h-full lg:absolute lg:inset-y-0 lg:left-0">
          <img
            src="/images/home-water.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <figcaption className="absolute left-4 md:left-6 bottom-3 md:bottom-6 text-2xs text-white">
            © Luis Barreto / WWF-UK
          </figcaption>
        </figure>
        <div className="mx-auto pt-16 pb-20 w-full max-w-7xl lg:h-full lg:flex items-center text-center lg:text-left">
          <div className="lg:ml-auto px-4 sm:px-8 xl:pl-28 lg:w-1/2 ">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-white">
              Water
            </h3>
            <p className="mt-3 md:mt-6 mx-auto lg:mx-0 max-w-md text-base sm:text-lg md:text-xl text-white opacity-70">
              Support the protection of water availability and regulation. These approaches are
              vital for reducing risks such as floods and droughts, which in the face of climate
              change can become more frequent and larger in magnitude.
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              <Button theme="secondary-white" size="small" to="/discover?s=water">
                Search water
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-green-dark bg-cover bg-center bg-[url('/images/home-hero.jpg')]">
      <LayoutContainer className="py-16 sm:pt-24 sm:pb-20 text-center text-white">
        <h2 className="font-serif text-3xl md:text-4xl font-bold">Start making an impact now!</h2>
        <div className="mx-auto mt-12 md:mt-16 max-w-5xl grid grid-rows-2 md:grid-rows-none md:grid-cols-2 gap-4 md:gap-6 text-base sm:text-lg md:text-xl">
          <p className="px-4">
            Find projects, start-ups or create an open call to locate opportunities for investment
            that make an impact.
          </p>
          <p className="px-4">
            Promote your idea, project or business and connect it with investors and funding sources
            to generate impact in the Amazon region.
          </p>
        </div>
        <Button theme="primary-white" size="small" className="mt-12 md:mt-16" disabled>
          Create your profile
        </Button>
      </LayoutContainer>
    </div>
  </>
);

Home.layout = {
  props: {
    headerProps: {
      transparent: true,
    },
  },
};

export default Home;
