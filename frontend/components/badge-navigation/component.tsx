import { FC } from 'react';

import cx from 'classnames';

import Link from 'next/link';

import Tag from 'components/tag';

import { BadgeNavigationProps } from './types';

export const BadgeNavigation: FC<BadgeNavigationProps> = ({
  className,
  theme = 'default',
  type = 'square',
  orientation = 'horizontal',
  badgePosition = 'right',
  activeId,
  items,
}: BadgeNavigationProps) => {
  const badgeElement = (number: number, isActive: boolean) => {
    if (Number.isNaN(number)) return null;

    return (
      <span
        className={cx({
          'flex items-center justify-center text-xs sm:text-sm font-semibold min-w-min': true,
          'w-5 h-5': theme === 'default',
          'sm:bg-green-dark bg-white sm:text-white text-green-dark':
            theme === 'default' && isActive,
          'bg-beige text-gray-700': !isActive && theme === 'default',

          'w-6 h-6 px-1': theme === 'simple',
          border: theme === 'simple',
          'bg-white ': isActive && theme === 'simple',
          'text-black': theme === 'simple',

          'sm:rounded-sm': type === 'square',
          'rounded-full border border-beige': type === 'pill',

          'ml-2.5': badgePosition === 'right',
          'mr-2.5': badgePosition === 'left',
        })}
      >
        {number}
      </span>
    );
  };

  return (
    <div className={className}>
      <nav className="relative mx-2">
        <ol
          className={cx({
            'flex py-2 whitespace-nowrap': true,
            'gap-2': type === 'pill',
            'gap-px': type === 'square',
            'flex-col': orientation === 'vertical',
          })}
        >
          {items.map(({ id, name, link, number }) => {
            const isActive = id === activeId;

            return (
              <li
                key={link}
                className={cx({
                  'relative transition-all': true,
                  'after:inline after:bg-white sm:after:bg-green-dark after:absolute after:left-0 after:bottom-0':
                    isActive && theme === 'default' && type === 'square',
                  'after:h-full after:w-0.5':
                    isActive && theme === 'default' && orientation === 'vertical',
                  'after:w-full after:h-0.5':
                    isActive && theme === 'default' && orientation === 'horizontal',
                })}
              >
                <Link href={link}>
                  <a
                    className={cx({
                      'relative inline-flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2':
                        true,
                      'focus-visible:outline-white sm:focus-visible:outline-green-dark':
                        theme === 'default',
                      'focus-visible:outline-green-dark': theme === 'simple',
                      'rounded-sm': type === 'square',
                      'rounded-full': type === 'pill',
                    })}
                    aria-current={isActive ? 'location' : false}
                  >
                    <Tag
                      border={false}
                      className={cx({
                        'text-sm': true,
                        'border border-beige': type === 'pill' && theme !== 'simple',
                        'bg-white shadow-sm': isActive && type === 'pill' && theme === 'default',
                        'hover:text-white sm:hover:text-green-dark': theme === 'default',
                        'text-white sm:text-green-dark':
                          (isActive && theme === 'default') || (!isActive && theme === 'simple'),
                        'text-gray-400 sm:text-gray-700 font-normal sm:font-semibold':
                          !isActive && theme === 'default',
                        'hover:text-black': theme === 'simple',
                        'text-black': isActive && theme === 'simple',
                        'font-semibold': theme === 'default' || (isActive && theme === 'simple'),
                      })}
                    >
                      {badgePosition === 'left' && badgeElement(number, isActive)}
                      {name}
                      {badgePosition === 'right' && badgeElement(number, isActive)}
                    </Tag>
                  </a>
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default BadgeNavigation;
