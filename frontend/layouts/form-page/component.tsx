import React from 'react';

import NextHead from 'next/head';

import { FormPageLayoutProps } from './types';

export const FormPageLayout: React.FC<FormPageLayoutProps> = ({
  children,
  ...rest
}: FormPageLayoutProps) => (
  <div {...rest}>
    <NextHead>
      <meta name="viewport" content="width=1024, initial-scale=1" />
    </NextHead>
    {children}
  </div>
);

export default FormPageLayout;
