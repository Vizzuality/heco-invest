import React from 'react';

import cx from 'classnames';

import Image from 'next/image';
import Link from 'next/link';

import LayoutContainer from 'components/layout-container';

import { FooterProps } from './types';

export const Footer: React.FC<FooterProps> = ({ props = {} }: FooterProps) => (
  <footer
    aria-labelledby="footer-heading"
    className={cx({
      'pt-20 pb-7 bg-gray-900 text-sm text-white': true,
      [props.className]: !!props.className,
    })}
  >
    <h2 id="footer-heading" className="sr-only">
      Footer
    </h2>
    <LayoutContainer>
      <div className="xl:grid xl:grid-cols-3 xl:gap-8">
        <div className="xl:col-span-1">
          <p className="text-xs font-medium">HeCo Invest</p>
          <p className="mt-2 max-w-xs font-serif font-semibold text-[1.5rem] leading-7">
            Be part of the biggest change in the colombian Amazon
          </p>
          <p className="mt-5 text-xs font-medium">Partnership between:</p>
          <div className="mt-2 flex space-x-6">
            <a
              href="https://www.iadb.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              title="Inter-American Development Bank"
            >
              <span className="sr-only">Inter-American Development Bank</span>
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                <Image src="/images/footer-iadb.png" width={32} height={32} />
              </div>
            </a>
            <a
              href="https://bidlab.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              title="Inter-American Development Bank Lab"
            >
              <span className="sr-only">Inter-American Development Bank Lab</span>
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                <Image src="/images/footer-iadb-lab.png" width={32} height={32} />
              </div>
            </a>
            <a
              href="https://www.worldwildlife.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              title="WWF"
            >
              <span className="sr-only">WWF</span>
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                <Image src="/images/footer-wwf.png" width={32} height={32} />
              </div>
            </a>
            <a
              href="https://www.paulsoninstitute.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              title="Paulson Institute"
            >
              <span className="sr-only">Paulson Institute</span>
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                <Image src="/images/footer-paulson-institute.png" width={32} height={32} />
              </div>
            </a>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 className="text-gray-600">Discover</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link href="/discover/projects">
                    <a className="hover:underline">Projects</a>
                  </Link>
                </li>
                <li>
                  <Link href="/discover/open-calls">
                    <a className="hover:underline">Open calls</a>
                  </Link>
                </li>
                <li>
                  <Link href="/discover/investors">
                    <a className="hover:underline">Investors</a>
                  </Link>
                </li>
                <li>
                  <Link href="/discover/project-developers">
                    <a className="hover:underline">Project developers</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mt-12 md:mt-0">
              <h3 className="text-gray-600">Learn</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link href="/investors">
                    <a className="hover:underline">For investors</a>
                  </Link>
                </li>
                <li>
                  <Link href="/project-developers">
                    <a className="hover:underline">For project developers</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 className="text-gray-600">Other</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link href="/about">
                    <a className="hover:underline">About</a>
                  </Link>
                </li>
                <li>
                  <Link href="/faq">
                    <a className="hover:underline">FAQ’s</a>
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy">
                    <a className="hover:underline">Privacy policy</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mt-12 md:mt-0">
              <h3 className="text-gray-600">Contact</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-gray-200 pt-8">
        <p className="xl:text-center">
          &copy; {new Date().getFullYear()} HeCo Invest. All rights reserved.
        </p>
      </div>
    </LayoutContainer>
  </footer>
);

export default Footer;
