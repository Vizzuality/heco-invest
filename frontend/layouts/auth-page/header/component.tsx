import { FC } from 'react';

import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import Link from 'next/link';

import LanguageSelector from 'containers/layouts/language-selector';
import Logo from 'containers/layouts/logo';

import LayoutContainer from 'components/layout-container';

import { HeaderProps } from './types';

export const Header: FC<HeaderProps> = ({
  props: { className, pageType = 'sign-in' } = {},
}: HeaderProps) => {
  return (
    <header
      className={cx({
        'fixed top-0 w-full h-16 lg:h-20 z-20 transition-colors': true,
        'bg-background-light/90 backdrop-blur-sm': true,
        [className]: !!className,
      })}
    >
      <LayoutContainer>
        <div className="flex items-center justify-between h-16 md:h-20 gap-x-8 md:gap-x-16">
          <Logo />
          <div className="flex items-center justify-end flex-1">
            <div className="mr-4">
              {pageType === 'sign-up' && (
                <>
                  <span className="mr-2 text-sm text-gray-600">
                    <FormattedMessage defaultMessage="Already have an account?" id="uCk8r+" />
                  </span>
                  <Link href="/sign-in">
                    <a className="text-sm font-medium text-green-dark">
                      <FormattedMessage defaultMessage="Sign In" id="Ub+AGc" />
                    </a>
                  </Link>
                </>
              )}
              {(pageType === 'sign-in' || pageType === 'forgot-password') && (
                <>
                  <span className="mr-2 text-sm text-gray-600">
                    <FormattedMessage defaultMessage="Don't have an account?" id="25WwxF" />
                  </span>
                  <Link href="/sign-up">
                    <a className="text-sm font-medium text-green-dark">
                      <FormattedMessage defaultMessage="Sign Up" id="39AHJm" />
                    </a>
                  </Link>
                </>
              )}
            </div>
            <LanguageSelector />
          </div>
        </div>
      </LayoutContainer>
    </header>
  );
};

export default Header;
