import { FC, useState, useMemo } from 'react';

import {
  ChevronDown as ChevronDownIcon,
  List as ListIcon,
  ArrowDown as ArrowDownIcon,
} from 'react-feather';
import { useIntl, FormattedMessage } from 'react-intl';

import cx from 'classnames';

import { noop } from 'lodash-es';

import Button, { ButtonProps } from 'components/button';
import Menu, { MenuItem, MenuSection } from 'components/menu';

import { SortingButtonsProps } from './types';

export const SortingButtons: FC<SortingButtonsProps> = ({
  className,
  theme = 'text',
  sortBy,
  sortOrder,
  options,
  onChange = noop,
}: SortingButtonsProps) => {
  const intl = useIntl();

  const [sortByMenuOpen, setSortByMenuOpen] = useState<boolean>(false);

  const selectedSortByOption = useMemo(
    () => options.find(({ key }) => sortBy === key),
    [options, sortBy]
  );

  const buttonProps = {
    ...(theme === 'pill' && { size: 'small', theme: 'primary-white' }),
    ...(theme === 'text' && { size: 'smallest', theme: 'naked' }),
  } as ButtonProps;

  return (
    <div className={className}>
      <div className="flex gap-3">
        <Menu
          Trigger={
            <Button
              className={cx({
                'whitespace-nowrap': true,
                '!px-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark':
                  theme === 'text',
              })}
              aria-label={intl.formatMessage({
                defaultMessage: 'Choose the field to sort by',
                id: 'DCAMZh',
              })}
              aria-expanded={sortByMenuOpen}
              {...buttonProps}
            >
              <span className="py-0.5 -mx-2 flex items-center">
                <span className="text-sm font-medium text-gray-700">
                  <FormattedMessage defaultMessage="Sort by" id="hDI+JM" />
                  {theme === 'text' && ':'}
                </span>
                {theme === 'pill' && (
                  <span className="ml-2 text-sm text-black">
                    {selectedSortByOption.label.toLowerCase()}
                  </span>
                )}
                {theme === 'text' && (
                  <span className="ml-2 text-sm font-medium text-green-dark">
                    {selectedSortByOption?.label}
                  </span>
                )}
                <ChevronDownIcon
                  className={cx({
                    'w-4 h-4  transition-transform': true,
                    '-rotate-180': sortByMenuOpen,
                    'ml-2 text-black': theme === 'pill',
                    'ml-1 text-green-dark': theme === 'text',
                  })}
                />
              </span>
            </Button>
          }
          align="start"
          onAction={(key: string) => onChange({ sortBy: key })}
          onOpen={() => setSortByMenuOpen(true)}
          onClose={() => setSortByMenuOpen(false)}
          expandedKeys={[selectedSortByOption?.key]}
        >
          <MenuSection>
            {options.map(({ key, label }) => (
              <MenuItem key={key}>{label}</MenuItem>
            ))}
          </MenuSection>
        </Menu>
        <Button
          className={cx({
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark':
              theme === 'text',
            '!px-3': theme === 'pill',
            '!px-1': theme === 'text',
          })}
          onClick={() => onChange({ sortOrder: sortOrder === 'asc' ? 'desc' : 'asc' })}
          aria-label={
            sortOrder === 'asc'
              ? intl.formatMessage({
                  defaultMessage: 'Sort in descending order',
                  id: 'fwSVTQ',
                })
              : intl.formatMessage({
                  defaultMessage: 'Sort in ascending order',
                  id: 'C23He5',
                })
          }
          {...buttonProps}
        >
          <span className="relative">
            {theme === 'pill' && (
              <>
                <ListIcon className="w-4 h-4 text-black -scale-x-100" />
                <ArrowDownIcon
                  className={cx({
                    'w-4 h-4 text-black -ml-1 absolute -right-1.5 text-sm': true,
                    '-top-1 -rotate-180': sortOrder === 'asc',
                    '-bottom-1': sortOrder === 'desc',
                  })}
                />
              </>
            )}
            {theme === 'text' && (
              <>
                <span className="text-sm font-medium text-gray-700">
                  <FormattedMessage defaultMessage="Order" id="XPruqs" />:
                </span>
                <span className="ml-2 text-sm font-medium text-green-dark">
                  {sortOrder === 'asc'
                    ? intl.formatMessage({
                        defaultMessage: 'Ascending',
                        id: 'u7djqV',
                      })
                    : intl.formatMessage({
                        defaultMessage: 'Descending',
                        id: 'aleGqT',
                      })}
                </span>
              </>
            )}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default SortingButtons;
