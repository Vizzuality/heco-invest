import { withLocalizedRequests } from 'hoc/locale';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import Carousel from 'containers/home/carousel';
import FooterBanner from 'containers/home/footer-banner';
import Hero from 'containers/home/hero';
import HowItWorks from 'containers/home/how-it-works';
import Priorities from 'containers/home/priorities';
import UsePlatform from 'containers/home/use-platform';

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
