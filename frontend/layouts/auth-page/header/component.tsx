import { FC } from 'react';

import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import Link from 'next/link';
import { useRouter } from 'next/router';

import LanguageSelector from 'containers/layouts/language-selector';
import Logo from 'containers/layouts/logo';

import LayoutContainer from 'components/layout-container';
import { Paths } from 'enums';

import { HeaderProps } from './types';

export const Header: FC<HeaderProps> = ({
  props: { className, pageType = 'sign-in' } = {},
}: HeaderProps) => {
  const { query } = useRouter();

  const href =
    (pageType === 'sign-in' || pageType === 'forgot-password' ? Paths.SignUp : Paths.SignIn) +
    (!!query.invitation_token ? '?invitation_token=' + query.invitation_token : '');

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
              <span className="mr-2 text-sm text-gray-600">
                {pageType === 'sign-in' || pageType === 'forgot-password' ? (
                  <FormattedMessage defaultMessage="Don't have an account?" id="25WwxF" />
                ) : (
                  <FormattedMessage defaultMessage="Already have an account?" id="uCk8r+" />
                )}
              </span>
              <Link href={href} passHref>
                <a className="text-sm font-medium text-green-dark">
                  {pageType === 'sign-in' || pageType === 'forgot-password' ? (
                    <FormattedMessage defaultMessage="Sign Up" id="39AHJm" />
                  ) : (
                    <FormattedMessage defaultMessage="Sign In" id="Ub+AGc" />
                  )}
                </a>
              </Link>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </LayoutContainer>
    </header>
  );
};

export default Header;
