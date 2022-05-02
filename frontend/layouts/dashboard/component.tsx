import React from 'react';

import cx from 'classnames';

import { omit } from 'lodash-es';

import Header from 'layouts/static-page/header';

import { DashboardLayoutProps } from './types';

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  headerProps,
  mainProps,
  ...rest
}: DashboardLayoutProps) => (
  <div {...rest}>
    <Header props={headerProps} />
    <main
      {...omit(mainProps, 'className')}
      className={cx({
        'bg-background-dark': true,
        [mainProps?.className]: !!mainProps?.className,
      })}
    >
      {children}
    </main>
  </div>
);

export default DashboardLayout;
