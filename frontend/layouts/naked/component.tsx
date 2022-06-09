import React from 'react';

import { NakedLayoutProps } from './types';

export const NakedLayout: React.FC<NakedLayoutProps> = ({
  children,
  ...rest
}: NakedLayoutProps) => <div {...rest}>{children}</div>;

export default NakedLayout;
