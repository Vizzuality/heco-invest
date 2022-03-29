import { FC } from 'react';

import cx from 'classnames';

import { FieldErrorProps } from './types';

const FieldError: FC<FieldErrorProps> = ({ id, children }: FieldErrorProps) => (
  <div id={id} className="mt-1 ml-2 font-sans text-xs text-red-700 font-regular">
    {children}
  </div>
);

export default FieldError;
