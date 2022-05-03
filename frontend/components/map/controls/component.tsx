import { FC } from 'react';

import cx from 'classnames';

import type { ControlsProps } from './types';

export const Controls: FC<ControlsProps> = ({
  className = 'absolute bottom-10 left-2',
  children,
}: ControlsProps) => (
  <div
    className={cx({
      [className]: !!className,
    })}
  >
    {children}
  </div>
);

export default Controls;
