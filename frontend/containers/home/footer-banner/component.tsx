import { FormattedMessage } from 'react-intl';

import Button from 'components/button';
import LayoutContainer from 'components/layout-container';

export const FooterBanner = () => (
  <LayoutContainer className="relative mt-14 md:mt-20">
    <div className="bg-green-dark bg-cover bg-center bg-[url('/images/footer-banner.jpg')] rounded-3xl px-4 sm:px-8">
      <LayoutContainer className="py-16 text-center text-white sm:pt-24 sm:pb-40">
        <h2 className="font-serif text-3xl font-bold md:text-4xl">
          <FormattedMessage defaultMessage="Start making an impact now" id="t7lNU8" />
        </h2>
      </LayoutContainer>
    </div>
    <div className="w-full max-w-5xl mt-8 top-28 md:mt-0 md:px-8 xl:px-0 md:absolute left-1/2 md:-translate-x-1/2 md:translate-y-1/2">
      <div className="grid grid-rows-2 gap-8 md:grid-rows-none md:grid-cols-2">
        <div className="p-3 bg-white shadow-lg md:p-5 lg:p-10 rounded-2xl">
          <h3 className="text-xl font-semibold uppercase">
            <FormattedMessage defaultMessage="Investors" id="zdIaHp" />
          </h3>
          <p className="mt-2 md:mt-4 text-black/70 lg:leading-8">
            <p className="mt-2 text-base md:mt-4 lg:leading-8">
              <FormattedMessage
                defaultMessage="Find projects, start-ups or create an open call to locate opportunities for investment or funding that make an impact."
                id="sx8Bco"
              />
            </p>
          </p>
        </div>
        <div className="p-3 bg-white shadow-lg md:p-5 lg:p-10 rounded-2xl">
          <h3 className="text-xl font-semibold uppercase">
            <FormattedMessage defaultMessage="Project developers" id="0wBg9P" />
          </h3>
          <p className="mt-2 md:mt-4 text-black/70 lg:leading-8">
            <FormattedMessage
              defaultMessage="Promote your idea, project or business and connect it with investors and funding sources to generate impact in the Amazon region."
              id="9pXx8c"
            />
          </p>
        </div>
      </div>
    </div>
    <div className="flex justify-center w-full">
      <Button
        theme="primary-green"
        size="small"
        className="mt-12 text-sm md:mt-44 md:mb-20"
        disabled
      >
        <FormattedMessage defaultMessage="Create account" id="huqKGl" />
      </Button>
    </div>
  </LayoutContainer>
);

export default FooterBanner;
