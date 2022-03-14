import React from 'react';

import cx from 'classnames';

import { omit } from 'lodash-es';

import Footer from './footer';
import Header from './header';
import { StaticPageLayoutProps } from './types';

export const StaticPageLayout: React.FC<StaticPageLayoutProps> = ({
  children,
  headerProps,
  mainProps,
  footerProps,
  ...rest
}: StaticPageLayoutProps) => (
  <div {...rest}>
    <Header props={headerProps} />
    <main
      {...omit(mainProps, 'className')}
      className={cx({
        'mt-28 lg:mt-44': true,
        [mainProps?.className]: !!mainProps?.className,
      })}
    >
      {children}
    </main>
    <Footer props={footerProps} />
  </div>
);

export default StaticPageLayout;
