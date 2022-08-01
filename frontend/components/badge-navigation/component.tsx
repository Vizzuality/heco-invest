import { FC } from 'react';

import { useIntl } from 'react-intl';

import cx from 'classnames';

import Link from 'next/link';

import Tag from 'components/tag';

import { BadgeNavigationProps } from './types';

export const BadgeNavigation: FC<BadgeNavigationProps> = ({
  className,
  theme = 'default',
  orientation = 'horizontal',
  badgePosition = 'right',
  activeId,
  items,
}: BadgeNavigationProps) => {
  const intl = useIntl();

  const badgeElement = (number: number, isActive: boolean) => {
    if (!number) return null;

    return (
      <span
        className={cx({
          'flex items-center justify-center w-6 h-6 px-1 border text-xs font-semibold text-black rounded-full min-w-min border-beige':
            true,
          'bg-background-dark': theme !== 'simple',
          'bg-white': isActive && theme === 'simple',
          'ml-2': badgePosition === 'right',
          'mr-2': badgePosition === 'left',
        })}
      >
        {number}
      </span>
    );
  };

  return (
    <div className={className}>
      <nav className="relative mx-2">
        {orientation === 'horizontal' && theme !== 'simple' && (
          <span className="absolute left-0 right-0 border rounded-full top-2 bottom-2 border-beige" />
        )}
        <ol
          className={cx({
            'flex gap-2 py-2 whitespace-nowrap': true,
            'flex-col': orientation === 'vertical',
          })}
        >
          {items.map(({ id, name, link, number }) => {
            const isActive = id === activeId;

            return (
              <li key={link} className="transition-all">
                <Link href={link}>
                  <a
                    className="inline-flex rounded-full focus-visible:outline focus-visible:outline-green-dark focus-visible:outline-2 focus-visible:outline-offset-2"
                    aria-current={isActive ? 'location' : false}
                  >
                    <Tag
                      className={cx({
                        'text-sm hover:font-medium hover:text-black': true,
                        'font-semibold text-black': isActive,
                        'bg-white shadow-sm': isActive && theme !== 'simple',
                        'text-green-dark p-px': !isActive,
                        'border-none': !isActive || theme === 'simple',
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
