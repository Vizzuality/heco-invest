import { FC } from 'react';

import cx from 'classnames';

import type { IconProps } from './types';

export const Icon: FC<IconProps> = ({ icon: IconComponent, ...rest }: IconProps) => (
  <IconComponent
    {...rest}
    className={cx({
      'fill-current': true,
      'w-5 h-5': !rest.className,
      [rest.className]: !!rest.className,
    })}
  />
);

export default Icon;
