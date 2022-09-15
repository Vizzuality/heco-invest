import React from 'react';

import cx from 'classnames';

import { omit } from 'lodash-es';

import LayoutContainer from 'components/layout-container';

import Aside from './aside';
import Header from './header';
import { AuthPageLayoutProps } from './types';

export const AuthPageLayout: React.FC<AuthPageLayoutProps> = ({
  children,
  headerProps,
  mainProps,
  asideProps,
  ...rest
}: AuthPageLayoutProps) => (
  <div {...rest}>
    <div className="lg:fixed lg:top-0 lg:bottom-0 lg:left-0 lg:right-0 lg:overflow-y-auto">
      <Header props={headerProps} />
      <LayoutContainer>
        <div className="relative flex flex-col mt-20 md:gap-14 lg:gap-20 xl:gap-28 lg:flex-row-reverse">
          <main
            {...omit(mainProps, 'className')}
            className={cx({
              'flex-1 md:my-10': true,
              [mainProps?.className]: !!mainProps?.className,
            })}
          >
            {children}
          </main>
          <Aside props={asideProps} />
        </div>
      </LayoutContainer>
    </div>
  </div>
);

export default AuthPageLayout;
