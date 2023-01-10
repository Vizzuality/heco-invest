import React from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import Image from 'next/image';
import Link from 'next/link';

// import Icon from 'components/icon';
import LayoutContainer from 'components/layout-container';
import { Paths } from 'enums';

// import FacebookIcon from 'svgs/social/facebook.svg';
// import TwitterIcon from 'svgs/social/twitter.svg';

import { FooterProps } from './types';

export const Footer: React.FC<FooterProps> = ({
  props = {
    hidden: false,
  },
}: FooterProps) => {
  const intl = useIntl();

  if (props.hidden) return null;

  return (
    <footer
      aria-labelledby="footer-heading"
      className={cx({
        'pt-8 sm:pt-20 pb-7 bg-gray-900 text-sm text-white': true,
        [props.className]: !!props.className,
      })}
    >
      <h2 id="footer-heading" className="sr-only">
        <FormattedMessage defaultMessage="Footer" id="Vge+RX" />
      </h2>
      <LayoutContainer>
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="xl:col-span-1">
            <Link href={Paths.Home} passHref>
              <a className="flex items-center text-base font-semibold">
                <Image
                  width={120}
                  height={25}
                  objectFit="contain"
                  objectPosition="left"
                  src="/images/logos/heco_logo_white.png"
                  alt="Heco invest"
                />
                <span className="text-green-dark bg-white rounded-sm py-0.5 px-1 text-xs">
                  βeta
                </span>
              </a>
            </Link>
            <p className="max-w-xs mt-2 font-serif text-xl font-semibold leading-7">
              <FormattedMessage
                defaultMessage="Be part of the biggest change in the colombian Amazon"
                id="GOg6XJ"
              />
            </p>
            <p className="mt-5 text-xs font-medium">
              <FormattedMessage defaultMessage="Partnership between:" id="o+Vt3t" />
            </p>
            <div className="flex mt-2 gap-x-2.5">
              <a
                href="https://www.iadb.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                title={intl.formatMessage({
                  defaultMessage: 'Inter-American Development Bank',
                  id: 'AC6emZ',
                })}
              >
                <span className="sr-only">
                  <FormattedMessage defaultMessage="Inter-American Development Bank" id="AC6emZ" />
                </span>
                <div className="flex items-center justify-center w-10 h-10 bg-white rounded">
                  <Image
                    src="/images/footer-iadb.png"
                    width={32}
                    height={32}
                    alt={intl.formatMessage({
                      defaultMessage: 'Inter-American Development Bank',
                      id: 'AC6emZ',
                    })}
                  />
                </div>
              </a>
              <a
                href="https://bidlab.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                title={intl.formatMessage({
                  defaultMessage: 'Inter-American Development Bank Lab',
                  id: 'QDj3j7',
                })}
              >
                <span className="sr-only">
                  <FormattedMessage
                    defaultMessage="Inter-American Development Bank Lab"
                    id="QDj3j7"
                  />
                </span>
                <div className="flex items-center justify-center w-10 h-10 bg-white rounded">
                  <Image
                    src="/images/footer-iadb-lab.png"
                    width={32}
                    height={32}
                    alt={intl.formatMessage({
                      defaultMessage: 'Inter-American Development Bank Lab',
                      id: 'QDj3j7',
                    })}
                  />
                </div>
              </a>
              <a
                href="https://www.worldwildlife.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                title={intl.formatMessage({ defaultMessage: 'WWF', id: 'cT6b2H' })}
              >
                <span className="sr-only">
                  <FormattedMessage defaultMessage="WWF" id="cT6b2H" />
                </span>
                <div className="flex items-center justify-center w-10 h-10 bg-white rounded">
                  <Image
                    src="/images/footer-wwf.png"
                    width={32}
                    height={32}
                    alt={intl.formatMessage({ defaultMessage: 'WWF', id: 'cT6b2H' })}
                  />
                </div>
              </a>
              <a
                href="https://www.paulsoninstitute.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                title={intl.formatMessage({ defaultMessage: 'Paulson Institute', id: 'JRfERD' })}
              >
                <span className="sr-only">
                  <FormattedMessage defaultMessage="Paulson Institute" id="JRfERD" />
                </span>
                <div className="flex items-center justify-center w-10 h-10 bg-white rounded">
                  <Image
                    src="/images/footer-paulson-institute.png"
                    width={32}
                    height={32}
                    alt={intl.formatMessage({ defaultMessage: 'Paulson Institute', id: 'JRfERD' })}
                  />
                </div>
              </a>
              <a
                href="https://www.bc3research.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                title={intl.formatMessage({
                  defaultMessage: 'Basque Centre for Climate Change',
                  id: '6ukMW9',
                })}
              >
                <span className="sr-only">
                  <FormattedMessage defaultMessage="Basque Centre for Climate Change" id="6ukMW9" />
                </span>
                <div className="flex items-center justify-center w-10 h-10 bg-white rounded">
                  <Image
                    src="/images/footer-bc3.png"
                    width={32}
                    height={32}
                    alt={intl.formatMessage({
                      defaultMessage: 'Basque Centre for Climate Change',
                      id: '6ukMW9',
                    })}
                  />
                </div>
              </a>
              <a
                href="https://cloud.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                title={intl.formatMessage({ defaultMessage: 'Google Cloud', id: 'QlBsxM' })}
              >
                <span className="sr-only">
                  <FormattedMessage defaultMessage="Google Cloud" id="QlBsxM" />
                </span>
                <div className="flex items-center justify-center w-10 h-10 bg-white rounded">
                  <Image
                    src="/images/footer-google.png"
                    width={32}
                    height={32}
                    alt={intl.formatMessage({ defaultMessage: 'Google Cloud', id: 'QlBsxM' })}
                  />
                </div>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-12 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-gray-600">
                  <FormattedMessage defaultMessage="Discover" id="cE4Hfw" />
                </h3>
                <ul className="mt-2 space-y-2">
                  <li>
                    <Link href="/discover/projects">
                      <a className="hover:underline">
                        <FormattedMessage defaultMessage="Projects" id="UxTJRa" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/discover/open-calls">
                      <a className="hover:underline">
                        <FormattedMessage defaultMessage="Open Calls" id="wpyHb9" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/discover/investors">
                      <a className="hover:underline">
                        <FormattedMessage defaultMessage="Investors" id="zdIaHp" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/discover/project-developers">
                      <a className="hover:underline">
                        <FormattedMessage defaultMessage="Project developers" id="0wBg9P" />
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-gray-600">
                  <FormattedMessage defaultMessage="Learn" id="IbrSk1" />
                </h3>
                <ul className="mt-2 space-y-2">
                  <li>
                    <Link href={Paths.ForInvestors}>
                      <a className="hover:underline">
                        <FormattedMessage defaultMessage="For investors" id="MfCYKW" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={Paths.ForProjectDevelopers}>
                      <a className="hover:underline">
                        <FormattedMessage defaultMessage="For project developers" id="F1+h/t" />
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-gray-600">
                  <FormattedMessage defaultMessage="Other" id="/VnDMl" />
                </h3>
                <ul className="mt-2 space-y-2">
                  <li>
                    <Link href="/about">
                      <a className="hover:underline">
                        <FormattedMessage defaultMessage="About" id="g5pX+a" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={Paths.FAQ}>
                      <a className="hover:underline">
                        <FormattedMessage defaultMessage="FAQ’s" id="qIvPIE" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={Paths.TermsConditions} passHref>
                      <a className="hover:underline">
                        <FormattedMessage defaultMessage="Terms & Conditions" id="arPp4e" />
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-gray-600">
                  <FormattedMessage defaultMessage="Contact" id="zFegDD" />
                </h3>
                <ul className="mt-2 space-y-2">
                  {/* <li>
                    <FormattedMessage defaultMessage="+123456789" id="6//v4m" />
                  </li> */}
                  <li>
                    <a className="cursor-pointer hover:underline" href="mailto:info@hecoinvest.org">
                      <FormattedMessage defaultMessage="info@hecoinvest.org" id="+2I7uh" />
                    </a>
                  </li>
                  {/* <li>
                    <p className="text-gray-600">
                      <FormattedMessage defaultMessage="Social media" id="ZEEVQX" />
                    </p>
                    <div className="flex my-3 space-x-5">
                      <Icon icon={FacebookIcon} className="w-4 h-4 fill-gray-400" />

                      <Icon icon={TwitterIcon} className="w-4 h-4 fill-gray-400" />
                    </div>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 mt-10 border-t border-gray-100">
          <p className="xl:text-center">
            <FormattedMessage
              defaultMessage="© {date} HeCo Invest. All rights reserved."
              id="Cra78t"
              values={{ date: new Date().getFullYear() }}
            />
          </p>
        </div>
      </LayoutContainer>
    </footer>
  );
};

export default Footer;
