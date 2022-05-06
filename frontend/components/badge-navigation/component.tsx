import { FC } from 'react';

import { useIntl } from 'react-intl';

import cx from 'classnames';

import Link from 'next/link';

import Tag from 'components/tag';

import { BadgeNavigationProps } from './types';

export const BadgeNavigation: FC<BadgeNavigationProps> = ({
  className,
  activeId,
  items,
}: BadgeNavigationProps) => {
  const intl = useIntl();

  return (
    <div className={className}>
      <nav aria-label={intl.formatMessage({ defaultMessage: 'Navigation', id: 'fBg+7V' })}>
        <ol className="flex gap-2 border rounded-full whitespace-nowrap border-beige">
          {items.map(({ id, name, link, number }) => {
            const isActive = id === activeId;

            return (
              <li key={link}>
                <Link href={link}>
                  <a aria-current={isActive ? 'location' : false}>
                    <Tag
                      className={cx({
                        'text-sm transition-colors border': true,
                        'bg-white font-semibold text-black': isActive,
                        'text-green-dark border-transparent': !isActive,
                      })}
                    >
                      {name}
                      {number !== undefined && (
                        <span className="flex items-center justify-center w-6 h-6 px-1 ml-2 text-xs font-semibold text-black border rounded-full min-w-min bg-background-dark border-beige">
                          {number}
                        </span>
                      )}
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
