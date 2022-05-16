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
      <nav className="relative mx-2">
        <span className="absolute left-0 right-0 border rounded-full top-2 bottom-2 border-beige" />
        <ol className="flex gap-2 py-2 whitespace-nowrap">
          {items.map(({ id, name, link, number }) => {
            const isActive = id === activeId;

            return (
              <li key={link} className="z-10 transition-all">
                <Link href={link}>
                  <a
                    className="flex rounded-full focus-visible:outline focus-visible:outline-green-dark focus-visible:outline-2 focus-visible:outline-offset-2"
                    aria-current={isActive ? 'location' : false}
                  >
                    <Tag
                      className={cx({
                        'text-sm hover:font-medium hover:text-black': true,
                        'bg-white font-semibold text-black shadow-sm': isActive,
                        'text-green-dark border-none p-px': !isActive,
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
