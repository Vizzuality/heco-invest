import { FormattedMessage } from 'react-intl';

import { withLocalizedRequests } from 'hoc/locale';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import Carousel from 'containers/home/carousel';
import FooterBanner from 'containers/home/footer-banner';
import HowItWorks from 'containers/home/how-it-works';
import Priorities from 'containers/home/priorities';
import UsePlatform from 'containers/home/use-platform';

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

      <UsePlatform />
      <HowItWorks />
      <Priorities />
      <Carousel />

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
