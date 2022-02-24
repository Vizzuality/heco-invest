import React from 'react';

import cx from 'classnames';

import Image from 'next/image';
import Link from 'next/link';

import { T, useT } from '@transifex/react';

import LayoutContainer from 'components/layout-container';

import { FooterProps } from './types';

export const Footer: React.FC<FooterProps> = ({ props = {} }: FooterProps) => {
  const t = useT();

  return (
    <footer
      aria-labelledby="footer-heading"
      className={cx({
        'pt-20 pb-7 bg-gray-900 text-sm text-white': true,
        [props.className]: !!props.className,
      })}
    >
      <h2 id="footer-heading" className="sr-only">
        <T _str="Footer" />
      </h2>
      <LayoutContainer>
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="xl:col-span-1">
            <p className="text-xs font-medium">HeCo Invest</p>
            <p className="max-w-xs mt-2 font-serif text-xl font-semibold leading-7">
              <T _str="Be part of the biggest change in the colombian Amazon" />
            </p>
            <p className="mt-5 text-xs font-medium">
              <T _str="Partnership between:" />
            </p>
            <div className="flex mt-2 space-x-6">
              <a
                href="https://www.iadb.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                title={t('Inter-American Development Bank')}
              >
                <span className="sr-only">
                  <T _str="Inter-American Development Bank" />
                </span>
                <div className="flex items-center justify-center w-10 h-10 bg-white rounded">
                  <Image
                    src="/images/footer-iadb.png"
                    width={32}
                    height={32}
                    alt="Inter-American Development Bank"
                  />
                </div>
              </a>
              <a
                href="https://bidlab.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                title={t('Inter-American Development Bank Lab')}
              >
                <span className="sr-only">
                  <T _str="Inter-American Development Bank Lab" />
                </span>
                <div className="flex items-center justify-center w-10 h-10 bg-white rounded">
                  <Image
                    src="/images/footer-iadb-lab.png"
                    width={32}
                    height={32}
                    alt="Inter-American Development Bank Lab"
                  />
                </div>
              </a>
              <a
                href="https://www.worldwildlife.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                title={t('WWF')}
              >
                <span className="sr-only">
                  <T _str="WWF" />
                </span>
                <div className="flex items-center justify-center w-10 h-10 bg-white rounded">
                  <Image src="/images/footer-wwf.png" width={32} height={32} alt="WWF" />
                </div>
              </a>
              <a
                href="https://www.paulsoninstitute.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                title={t('Paulson Institute')}
              >
                <span className="sr-only">
                  <T _str="Paulson Institute" />
                </span>
                <div className="flex items-center justify-center w-10 h-10 bg-white rounded">
                  <Image
                    src="/images/footer-paulson-institute.png"
                    width={32}
                    height={32}
                    alt="Paulson Institute"
                  />
                </div>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-12 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-gray-600">
                  <T _str="Discover" />
                </h3>
                <ul className="mt-2 space-y-2">
                  <li>
                    <Link href="/discover/projects">
                      <a className="hover:underline">
                        <T _str="Projects" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/discover/open-calls">
                      <a className="hover:underline">
                        <T _str="Open calls" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/discover/investors">
                      <a className="hover:underline">
                        <T _str="Investors" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/discover/project-developers">
                      <a className="hover:underline">
                        <T _str="Project developers" />
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-gray-600">
                  <T _str="Learn" />
                </h3>
                <ul className="mt-2 space-y-2">
                  <li>
                    <Link href="/investors">
                      <a className="hover:underline">
                        <T _str="For investors" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/project-developers">
                      <a className="hover:underline">
                        <T _str="For project developers" />
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-gray-600">
                  <T _str="Other" />
                </h3>
                <ul className="mt-2 space-y-2">
                  <li>
                    <Link href="/about">
                      <a className="hover:underline">
                        <T _str="About" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq">
                      <a className="hover:underline">
                        <T _str="FAQ’s" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">
                      <a className="hover:underline">
                        <T _str="Privacy policy" />
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-gray-600">
                  <T _str="Contact" />
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 mt-10 border-t border-gray-100">
          <p className="xl:text-center">
            <T _str="© {date} HeCo Invest. All rights reserved." date={new Date().getFullYear()} />
          </p>
        </div>
      </LayoutContainer>
    </footer>
  );
};

export default Footer;
