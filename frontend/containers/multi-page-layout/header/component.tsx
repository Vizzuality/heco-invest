import React from 'react';

import { XCircle as XCircleIcon } from 'react-feather';
import { useIntl, FormattedMessage } from 'react-intl';

import cx from 'classnames';

import Link from 'next/link';

import { noop } from 'lodash-es';

import Button from 'components/button';
import LayoutContainer from 'components/layout-container';

import { MultiPageLayoutHeaderProps } from './types';

export const MultiPageLayoutHeader: React.FC<MultiPageLayoutHeaderProps> = ({
  className,
  title,
  leaveButtonText,
  onCloseClick = noop,
}: MultiPageLayoutHeaderProps) => {
  const intl = useIntl();

  return (
    <header
      className={cx({
        'fixed top-0 w-full z-10 bg-background-light/90 backdrop-blur-sm border-b': true,
        [className]: !!className,
      })}
    >
      <LayoutContainer>
        <div className="flex items-center justify-between h-20 gap-x-8 md:gap-x-16">
          <div className="flex justify-start flex-1 md:flex-none">
            <span className="font-semibold">HeCo Invest</span>
          </div>
          <div className="md:flex-1">{title}</div>
          <div className="flex justify-end flex-1 md:flex-none">
            <Button
              theme="naked"
              className="px-0 text-gray-400 md:px-6"
              title={intl.formatMessage({
                defaultMessage: 'Leave',
                id: 'fnihsY',
              })}
              onClick={onCloseClick}
            >
              <XCircleIcon className="w-10 h-10 stroke-1" />
              <span className="hidden ml-2 md:inline">
                {leaveButtonText ? (
                  leaveButtonText
                ) : (
                  <FormattedMessage defaultMessage="Leave" id="fnihsY" />
                )}
              </span>
            </Button>
          </div>
        </div>
      </LayoutContainer>
    </header>
  );
};

export default MultiPageLayoutHeader;
