import Button from 'components/button';
import Head from 'components/head';
import LayoutContainer from 'components/layout-container';
import { StaticPageLayoutProps } from 'layouts/static-page';
import { PageComponent } from 'types';

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
    <LayoutContainer className="mt-16 md:mt-20">
      <h1>Welcome to HeCo Invest!</h1>
      <p>Site map:</p>
      <ol>
        <li>/</li>
        <li>/investors</li>
        <li>/project-developers</li>
        <li>/about</li>
        <li>/faq</li>
        <li>/privacy-policy</li>
        <li>/discover/:tab?</li>
        <li>/project/:id</li>
        <li>/project-developer/:id</li>
        <li>/open-call/:id</li>
        <li>/investor/:id</li>
        <li>/500</li>
        <li>/404</li>
      </ol>
    </LayoutContainer>

    <LayoutContainer>
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
            <h3 className="text-2xl md:text-3xl font-serif font-semibold text-white">
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
            <h3 className="text-2xl md:text-3xl font-serif font-semibold text-white">Climate</h3>
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
            <h3 className="text-2xl md:text-3xl font-serif font-semibold text-white">Community</h3>
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
            <h3 className="text-2xl md:text-3xl font-serif font-semibold text-white">Water</h3>
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
