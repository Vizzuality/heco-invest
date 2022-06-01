import { FC, useState, useMemo } from 'react';

import {
  ChevronDown as ChevronDownIcon,
  List as ListIcon,
  ArrowDown as ArrowDownIcon,
} from 'react-feather';
import { useIntl, FormattedMessage } from 'react-intl';

import cx from 'classnames';

import { noop } from 'lodash-es';

import Button from 'components/button';
import Menu, { MenuItem, MenuSection } from 'components/menu';

import { SortingButtonsProps } from './types';

export const SortingButtons: FC<SortingButtonsProps> = ({
  className,
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

  return (
    <div className={className}>
      <div className="flex gap-3">
        <Menu
          Trigger={
            <Button
              className="whitespace-nowrap"
              size="small"
              theme="primary-white"
              aria-label={intl.formatMessage({
                defaultMessage: 'Choose the field to sort by',
                id: 'DCAMZh',
              })}
              aria-expanded={sortByMenuOpen}
            >
              <span className="py-0.5 -mx-2 flex items-center">
                <span className="text-gray-600">
                  <FormattedMessage defaultMessage="Sort by" id="hDI+JM" />
                </span>
                <span className="ml-2 text-black">{selectedSortByOption.label.toLowerCase()}</span>
                <ChevronDownIcon
                  className={cx({
                    'w-4 h-4 ml-2 text-black transition-transform': true,
                    '-rotate-180': sortByMenuOpen,
                  })}
                />
              </span>
            </Button>
          }
          align="start"
          onAction={(key: string) => onChange({ sortBy: key })}
          onOpen={() => setSortByMenuOpen(true)}
          onClose={() => setSortByMenuOpen(false)}
          className="min-w-fit"
          expandedKeys={[selectedSortByOption.key]}
        >
          <MenuSection>
            {options.map(({ key, label }) => (
              <MenuItem key={key}>{label}</MenuItem>
            ))}
          </MenuSection>
        </Menu>
        <Button
          theme="primary-white"
          className="!px-3"
          size="small"
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
        >
          <span className="relative mr-px -ml-px">
            <ListIcon className="w-4 h-4 text-black -scale-x-100" />
            <ArrowDownIcon
              className={cx({
                'w-4 h-4 text-black -ml-1 absolute -right-1.5': true,
                '-top-1 -rotate-180': sortOrder === 'asc',
                '-bottom-1': sortOrder === 'desc',
              })}
            />
          </span>
        </Button>
      </div>
    </div>
  );
};

export default SortingButtons;
