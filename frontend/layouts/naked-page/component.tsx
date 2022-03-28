import React from 'react';

import { NakedPageLayoutProps } from './types';

export const NakedPageLayout: React.FC<NakedPageLayoutProps> = ({
  children,
  ...rest
}: NakedPageLayoutProps) => <div {...rest}>{children}</div>;

export default NakedPageLayout;
