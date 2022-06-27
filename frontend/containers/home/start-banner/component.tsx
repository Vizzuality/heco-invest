import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import { useBreakpoint } from 'hooks/use-breakpoint';

import Button from 'components/button';
import LayoutContainer from 'components/layout-container';

export const StartBanner = () => {
  const breakpoint = useBreakpoint();
  return (
    <LayoutContainer className="px-0 sm:relative sm:mt-14 md:mt-20">
      <div className="bg-green-dark bg-cover bg-center bg-[url('/images/footer-banner.jpg')] sm:rounded-3xl sm:px-8">
        <LayoutContainer className="pb-6 text-center text-white pt-14 sm:pt-24 sm:pb-40">
          <h2 className="font-serif text-4xl text-left font semibold sm:font-bold sm:text-3xl md:text-4xl sm:text-center">
            <FormattedMessage defaultMessage="Start making an impact now" id="t7lNU8" />
          </h2>
        </LayoutContainer>
        {!breakpoint('sm') && (
          <>
            <div className="w-full max-w-5xl px-4 mt-8">
              <div className="grid grid-rows-2 gap-8">
                <div className="p-6 bg-white shadow-lg rounded-2xl">
                  <h3 className="text-lg font-semibold uppercase">
                    <FormattedMessage defaultMessage="Investors" id="zdIaHp" />
                  </h3>
                  <p className="mt-2 text-black/70">
                    <p className="mt-2 text-sm">
                      <FormattedMessage
                        defaultMessage="Find projects, start-ups or create an open call to locate opportunities for investment or funding that make an impact."
                        id="sx8Bco"
                      />
                    </p>
                  </p>
                </div>
                <div className="p-6 bg-white shadow-lg rounded-2xl">
                  <h3 className="text-lg font-semibold uppercase">
                    <FormattedMessage defaultMessage="Project developers" id="0wBg9P" />
                  </h3>
                  <p className="mt-2 text-sm text-black/70">
                    <FormattedMessage
                      defaultMessage="Promote your idea, project or business and connect it with investors and funding sources to generate impact in the Amazon region."
                      id="9pXx8c"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full px-4 pt-6 pb-16">
              <Button theme="primary-green" size="small" className="w-full text-lg" disabled>
                <FormattedMessage defaultMessage="Create account" id="huqKGl" />
              </Button>
            </div>
          </>
        )}
      </div>
      {breakpoint('sm') && (
        <>
          <div className="w-full max-w-5xl mt-8 md:top-28 md:mt-0 md:px-8 xl:px-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:translate-y-1/2">
            <div className="grid grid-rows-2 gap-8 md:grid-rows-none md:grid-cols-2">
              <div className="p-6 bg-white shadow-lg md:p-5 lg:p-10 rounded-2xl">
                <h3 className="text-lg font-semibold uppercase md:text-xl">
                  <FormattedMessage defaultMessage="Investors" id="zdIaHp" />
                </h3>
                <p className="mt-2 md:mt-4 text-black/70 lg:leading-8">
                  <p className="mt-2 text-sm md:text-base md:mt-4 lg:leading-8">
                    <FormattedMessage
                      defaultMessage="Find projects, start-ups or create an open call to locate opportunities for investment or funding that make an impact."
                      id="sx8Bco"
                    />
                  </p>
                </p>
              </div>
              <div className="p-6 bg-white shadow-lg md:p-5 lg:p-10 rounded-2xl">
                <h3 className="text-lg font-semibold uppercase md:text-xl">
                  <FormattedMessage defaultMessage="Project developers" id="0wBg9P" />
                </h3>
                <p className="mt-2 text-sm md:text-base md:mt-4 text-black/70 lg:leading-8">
                  <FormattedMessage
                    defaultMessage="Promote your idea, project or business and connect it with investors and funding sources to generate impact in the Amazon region."
                    id="9pXx8c"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <Button theme="primary-green" size="small" className="mb-20 text-sm mt-44" disabled>
              <FormattedMessage defaultMessage="Create account" id="huqKGl" />
            </Button>
          </div>
        </>
      )}
    </LayoutContainer>
  );
};

export default StartBanner;
