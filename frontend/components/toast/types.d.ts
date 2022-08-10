import { ReactNode } from 'react';

import { IconProps } from 'components/icon';

export type Level = 'info' | 'success' | 'warning' | 'error';

export interface ToastThemeOption {
  icon: IconProps['icon'];
  bg: string;
  hoverBg: string;
}

export type ToastContent = ReactNode | string;
export interface ToastProps {
  id: string;
  content: ToastContent;
  level: Level;
  autoDismiss?: boolean;
  onDismiss?: (id: string) => void;
  /** Size of the component. Defaults to 'medium' */
  size?: 'small' | 'medium' | 'large';
}

export interface ToastTheme {
  info: ToastThemeOption;
  success: ToastThemeOption;
  warning: ToastThemeOption;
  error: ToastThemeOption;
}
