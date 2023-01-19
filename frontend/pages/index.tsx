import { withLocalizedRequests } from 'hoc/locale';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import Carousel from 'containers/home/carousel';
import Hero from 'containers/home/hero';
import Priorities from 'containers/home/priorities';
import StartBanner from 'containers/home/start-banner';
import UsePlatform from 'containers/home/use-platform';
import Working from 'containers/home/working';

import Head from 'components/head';
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
      <Hero />
      <UsePlatform />
      <Working />
      <Priorities />
      <Carousel />
      <StartBanner />
    </>
  );
};

Home.layout = {
  props: {
    headerProps: {
      transparent: true,
      whiteLogo: true,
    },
  },
};

export default Home;
