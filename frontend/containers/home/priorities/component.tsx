import { FormattedMessage } from 'react-intl';

import LayoutContainer from 'components/layout-container';

export const Priorities = () => (
  <>
    <LayoutContainer className="mt-14 md:pb-56">
      <div className="relative px-4 py-6 sm:py-12 sm:px-8 md:pt-20 md:pb-60 lg:pb-72 bg-green-dark rounded-3xl">
        <h2 className="max-w-md mx-auto font-serif text-3xl font-bold text-white sm:text-center sm:max-w-xl md:max-w-4xl md:text-4xl">
          <FormattedMessage
            defaultMessage="Identified priorities by the HeCo program"
            id="XQuzr9"
          />
        </h2>
        <p className="max-w-md mx-auto mt-6 text-base sm:text-center md:mt-8 sm:max-w-xl md:max-w-5xl sm:text-lg md:text-xl text-white/70">
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
      <h2 className="max-w-md mx-auto font-serif text-3xl font-bold sm:text-center sm:max-w-xl md:max-w-4xl md:text-4xl text-green-dark">
        <FormattedMessage
          defaultMessage="Invest in the most meaningful way to have the biggest impact"
          id="4EE+gM"
        />
      </h2>
      <p className="max-w-md mx-auto mt-6 text-base sm:text-center md:mt-8 sm:max-w-xl md:max-w-5xl sm:text-lg md:text-xl">
        <FormattedMessage
          defaultMessage="Through accessing <span>ARIES</span> (Artificial Intelligence for Environmental Sustainability) and using Machine Reasoning modelling algorithms, this platform accesses the most relevant information to inform you on project and investment potential impact along four key dimensions: <span>Biodiversity</span>, <span>Climate</span>, <span>Community</span> and <span>Water</span>."
          id="yJVljq"
          values={{
            span: (chunks) => <span className="font-semibold">{chunks}</span>,
          }}
        />
      </p>
    </LayoutContainer>
  </>
);

export default Priorities;
