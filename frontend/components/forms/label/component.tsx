import { forwardRef } from 'react';

import cx from 'classnames';

import type { LabelProps } from './types';

const LabelComponent = ({ htmlFor, children, className, id }: LabelProps, ref) => (
  <label
    id={id}
    className={cx('font-sans text-gray-800 font-semibold text-sm', {
      [className]: !!className,
    })}
    htmlFor={htmlFor}
    ref={ref}
  >
    {children}
  </label>
);

export const Label = forwardRef<HTMLLabelElement, LabelProps>(LabelComponent);

export default Label;
