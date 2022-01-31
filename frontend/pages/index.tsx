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
    <div className="mt-7 bg-green-dark bg-cover bg-center bg-[url('/images/home-hero.jpg')]">
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
