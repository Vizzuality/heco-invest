import { InputHTMLAttributes } from 'react';

import { IconProps } from 'components/icon';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  theme?: 'dark' | 'light';
  status?: 'none' | 'valid' | 'error' | 'disabled';
  mode?: 'dashed' | 'normal';
  input?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  icon?: IconProps['icon'];
}
