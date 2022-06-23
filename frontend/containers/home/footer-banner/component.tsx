import { FormattedMessage } from 'react-intl';

import Button from 'components/button';
import LayoutContainer from 'components/layout-container';

export const FooterBanner = () => (
  <div className="bg-green-dark bg-cover bg-center bg-[url('/images/home-hero.jpg')]">
    <LayoutContainer className="py-16 text-center text-white sm:pt-24 sm:pb-20">
      <h2 className="font-serif text-3xl font-bold md:text-4xl">
        <FormattedMessage defaultMessage="Start making an impact now" id="t7lNU8" />
      </h2>
      <div className="grid max-w-5xl grid-rows-2 gap-4 mx-auto mt-12 text-base md:mt-16 md:grid-rows-none md:grid-cols-2 md:gap-6 sm:text-lg md:text-xl">
        <div className="p-3 text-left text-black bg-white shadow-lg md:p-5 lg:p-10 rounded-2xl">
          <h3 className="text-xl font-semibold uppercase">
            <FormattedMessage defaultMessage="Investors" id="zdIaHp" />
          </h3>
          <p className="mt-2 text-base md:mt-4 lg:leading-8">
            <FormattedMessage
              defaultMessage="Find projects, start-ups or create an open call to locate opportunities for investment or funding that make an impact."
              id="sx8Bco"
            />
          </p>
        </div>
        <div className="p-3 text-left text-black bg-white shadow-lg md:p-5 lg:p-10 rounded-2xl">
          <h3 className="text-xl font-semibold uppercase">
            <FormattedMessage defaultMessage="Project developers" id="0wBg9P" />
          </h3>
          <p className="mt-2 text-base md:mt-4 lg:leading-8">
            <FormattedMessage
              defaultMessage="Promote your idea, project or business and connect it with investors and funding sources to generate impact in the Amazon region."
              id="9pXx8c"
            />
          </p>
        </div>
      </div>
      <Button theme="primary-green" size="small" className="mt-12 md:mt-16" disabled>
        <FormattedMessage defaultMessage="Create account" id="huqKGl" />
      </Button>
    </LayoutContainer>
  </div>
);

export default FooterBanner;
