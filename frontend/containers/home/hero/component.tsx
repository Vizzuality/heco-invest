import { FormattedMessage } from 'react-intl';

import DiscoverSearch from 'containers/layouts/discover-search';

import LayoutContainer from 'components/layout-container';

export const Hero = () => {
  return (
    <div className="-mt-28 lg:-mt-44 pt-24 sm:pt-40 md:pt-56 bg-cover bg-center bg-green-dark bg-[url('/images/home-hero.jpg')]">
      <div className="px-4 sm:text-center sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl font-bold sm:mx-auto sm:max-w-xl md:max-w-5xl md:text-6xl text-green-light">
          <FormattedMessage
            defaultMessage="Be part of the biggest change in Colombia"
            id="t6aHUj"
          />
        </h1>
        <p className="mt-2 text-base text-white sm:mx-auto md:max-w-2xl sm:text-lg md:text-xl">
          <FormattedMessage
            defaultMessage="Connecting investors, donors and philanthropists with carefully identified investment opportunities."
            id="8i6S4q"
          />
        </p>
      </div>
      <LayoutContainer className="flex items-center justify-center h-0 sm:mt-5 md:mt-9 xl:relative sm:mx-auto pt-14">
        <DiscoverSearch
          className="w-full sm:max-w-2xl md:max-w-4xl"
          searchButtonText={<FormattedMessage id="2yqUYR" defaultMessage="See full catalog" />}
        />
      </LayoutContainer>
    </div>
  );
};

export default Hero;
