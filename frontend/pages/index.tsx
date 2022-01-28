import Head from 'next/head';

import LayoutContainer from 'components/layout-container';
import { StaticPageLayoutProps } from 'layouts/static-page';
import { PageComponent } from 'types';

const Home: PageComponent<{}, StaticPageLayoutProps> = () => (
  <>
    <Head>
      <title>HeCo Invest</title>
    </Head>
    <LayoutContainer>
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
  </>
);

Home.layout = {
  props: {
    mainProps: {
      className: 'mb-7 lg:mb-24',
    },
  },
};

export default Home;
