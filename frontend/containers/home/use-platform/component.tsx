import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import Image from 'next/image';
import Link from 'next/link';

import { useBreakpoint } from 'hooks/use-breakpoint';

import Button from 'components/button';
import LayoutContainer from 'components/layout-container';

export const UsePlatform = () => {
  const breakpoint = useBreakpoint();
  const intl = useIntl();

  const MAIN_IMAGE = breakpoint('sm')
    ? '/images/home-investor-illustration.svg'
    : '/images/home-investor-illustration-mobile.svg';

  const MAIN_IMAGE_HEIGHT = breakpoint('sm') ? 544 : 138;
  const MAIN_IMAGE_WIDTH = breakpoint('sm') ? 490 : 143;

  return (
    <LayoutContainer className="mt-24 lg:mt-28">
      <h2 className="max-w-md mx-auto font-serif text-3xl font-bold text-center sm:max-w-xl md:max-w-4xl md:text-5xl text-green-dark">
        <FormattedMessage defaultMessage="Why use this platform" id="VCODFJ" />
      </h2>

      <div className="relative mt-20 md:mt-12 lg:mt-24 md:grid md:grid-cols-2 md:gap-3 lg:items-center">
        <div className="flex items-end space-x-2">
          <div
            className={cx({
              'md:mt-10 lg:mt-0 lg:pr-24': true,
            })}
          >
            <Image
              className="relative mx-auto"
              height={MAIN_IMAGE_HEIGHT}
              width={MAIN_IMAGE_WIDTH}
              src={MAIN_IMAGE}
              alt={intl.formatMessage({
                defaultMessage: 'Why use this platform',
                id: 'VCODFJ',
              })}
            />
          </div>
          <h3
            className={cx({
              'text-lg font-semibold text-green-dark pb-1.5': true,
              hidden: breakpoint('sm'),
            })}
          >
            <FormattedMessage
              defaultMessage="As an Investor or <br></br> Funder"
              id="xqjjPY"
              values={{ br: () => <br /> }}
            />
          </h3>
        </div>

        <div className="relative mt-12 lg:mt-0">
          <h3
            className={cx({
              'text-xl font-semibold lg:text-2xl text-green-dark': true,
              hidden: !breakpoint('sm'),
            })}
          >
            <FormattedMessage defaultMessage="As an Investor or Funder" id="7qB5i4" />
          </h3>
          <div className="mt-8">
            <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-16 md:space-y-0">
              <div>
                <dt className="text-base font-semibold sm:text-lg md:text-xl">
                  <FormattedMessage defaultMessage="Create open calls" id="4EYbNW" />
                </dt>
                <dd className="mt-1 text-black/70">
                  <FormattedMessage
                    defaultMessage="Call on our community of project developers to identify opportunities in your preferred sectors and geographies."
                    id="yqBX7I"
                  />
                </dd>
              </div>
              <div>
                <dt className="text-base font-semibold sm:text-lg md:text-xl">
                  <FormattedMessage defaultMessage="Enable positive impact" id="J4w7T/" />
                </dt>
                <dd className="mt-1 text-black/70">
                  <FormattedMessage
                    defaultMessage="Find opportunities that have the greatest impact on challenges like biodiversity, climate, community and water."
                    id="p1NkQY"
                  />
                </dd>
              </div>
              <div>
                <dt className="text-base font-semibold sm:text-lg md:text-xl">
                  <FormattedMessage defaultMessage="In line with your priorities" id="ZRwGVc" />
                </dt>
                <dd className="mt-1 text-black/70">
                  <FormattedMessage
                    defaultMessage="Set your priorities and HeCo Invest will connect you with the best opportunities."
                    id="ctfKNN"
                  />
                </dd>
              </div>
              <div>
                <dt className="text-base font-semibold sm:text-lg md:text-xl">
                  <FormattedMessage defaultMessage="Projects of all sizes" id="dkNQOz" />
                </dt>
                <dd className="mt-1 text-black/70">
                  <FormattedMessage
                    defaultMessage="Invest in small, medium or big project opportunities."
                    id="URdlN+"
                  />
                </dd>
              </div>
            </dl>
          </div>
          <Button
            theme="secondary-green"
            size="small"
            to="/investors"
            className="inline-block mt-12 md:mt-16"
          >
            <FormattedMessage defaultMessage="Investors features" id="wsk6Y/" />
          </Button>
        </div>
      </div>

      <div className="relative mt-20 lg:mt-52 md:grid md:grid-cols-2 md:gap-3 lg:items-center">
        <div className="relative mt-12 lg:mt-0">
          <h3 className="text-xl font-semibold lg:text-2xl text-green-dark">
            <FormattedMessage defaultMessage="As a Project Developer" id="pgfBG8" />
          </h3>
          <div className="mt-8">
            <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-16 md:space-y-0">
              <div>
                <dt className="text-base font-semibold sm:text-lg md:text-xl">
                  <FormattedMessage defaultMessage="Guiding tools" id="Obr4XP" />
                </dt>
                <dd className="mt-1 text-black/70">
                  <FormattedMessage
                    defaultMessage="Access user-friendly tools that help turn a good idea into a proposal ready to be reviewed by an investor or funder."
                    id="FJfVJJ"
                  />
                </dd>
              </div>
              <div>
                <dt className="text-base font-semibold sm:text-lg md:text-xl">
                  <FormattedMessage defaultMessage="Create partnerships" id="NvzZkI" />
                </dt>
                <dd className="mt-1 text-black/70">
                  <FormattedMessage
                    defaultMessage="Find other people with similar interests. Join forces, secure more investment and create a greater impact."
                    id="bNpbHr"
                  />
                </dd>
              </div>
              <div>
                <dt className="text-base font-semibold sm:text-lg md:text-xl">
                  <FormattedMessage defaultMessage="Curated database" id="aDn1WM" />
                </dt>
                <dd className="mt-1 text-black/70">
                  <FormattedMessage
                    defaultMessage="Explore our curated database featuring the contacts you need to take your project or business to the next level."
                    id="Nye7xC"
                  />
                </dd>
              </div>
              <div>
                <dt className="text-base font-semibold sm:text-lg md:text-xl">
                  <FormattedMessage defaultMessage="Apply to open calls" id="txaU6M" />
                </dt>
                <dd className="mt-1 text-black/70">
                  <FormattedMessage
                    defaultMessage="<a>Browse the open calls</a> posted by our investor community to identify new areas for project development."
                    id="btdgGc"
                    values={{
                      a: (chunks) => (
                        <Link href="/discover/open-call">
                          <a className="font-bold underline text-green-dark">{chunks}</a>
                        </Link>
                      ),
                    }}
                  />
                </dd>
              </div>
            </dl>
          </div>
          <Button
            theme="secondary-green"
            size="small"
            to="/investors"
            className="inline-block mt-12 md:mt-16"
          >
            <FormattedMessage defaultMessage="Project developer features" id="DIrN6T" />
          </Button>
        </div>
        <div className="mt-10 lg:mt-0 lg:pl-24">
          <Image
            className="relative mx-auto"
            height={520}
            width={490}
            src="/images/home-project-developer-illustration.svg"
            alt=""
          />
        </div>
      </div>
    </LayoutContainer>
  );
};

export default UsePlatform;
