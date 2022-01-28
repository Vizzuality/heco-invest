import React, { forwardRef } from 'react';

import cx from 'classnames';

import omit from 'lodash/omit';

import Link from 'next/link';

import Icon from 'components/icon';

import { COMMON_CLASSES, COLOR_THEMES, SIZE_THEMES } from './constants';
import { isAnchorButton } from './helpers';
import { ButtonProps, HTMLButtonProps, HTMLAnchorProps } from './types';

export const Inner: React.ForwardRefRenderFunction<any, ButtonProps> = (
  { theme = 'primary-green', size = 'base', icon, children, ...rest }: ButtonProps,
  ref
) => {
  const className = cx({
    [COMMON_CLASSES]: true,
    [COLOR_THEMES[theme]]: true,
    [SIZE_THEMES[size]]: true,
    [rest.className]: !!rest.className,
    'font-medium': size === 'small' && theme !== 'naked',
    'text-lg': size === 'base' && theme !== 'naked',
    'text-sm': size === 'small' && theme !== 'naked',
  });

  const iconClassName = cx({
    'inline-block mr-2.5 align-text-bottom': true,
    'w-6 h-6': size === 'base',
    'w-4.5 h-4.5': size === 'small',
  });

  if (isAnchorButton(rest)) {
    const elementProps = omit(
      rest,
      'children',
      'theme',
      'className',
      'to',
      'external'
    ) as Partial<HTMLAnchorProps>;

    if (rest.external) {
      return (
        <a
          ref={ref}
          href={rest.to}
          rel="noopener noreferrer"
          target="_blank"
          className={className}
          {...elementProps}
        >
          {icon && <Icon icon={icon} className={iconClassName} />}
          {children}
        </a>
      );
    }

    return (
      <Link href={rest.to}>
        <a ref={ref} className={className} {...elementProps}>
          {icon && <Icon icon={icon} className={iconClassName} />}
          {children}
        </a>
      </Link>
    );
  }

  const elementProps = omit(rest, 'children', 'theme', 'className') as Partial<HTMLButtonProps>;

  return (
    <button ref={ref} type="button" className={className} {...elementProps}>
      {icon && <Icon icon={icon} className={iconClassName} />}
      {children}
    </button>
  );
};

export const Button = forwardRef(Inner);

export default Button;
