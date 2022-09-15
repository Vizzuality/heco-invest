import React from 'react';

import { XCircle as XCircleIcon } from 'react-feather';
import { useIntl, FormattedMessage } from 'react-intl';

import cx from 'classnames';

import { noop } from 'lodash-es';

import Button from 'components/button';
import LayoutContainer from 'components/layout-container';
import Header from 'layouts/static-page/header';

import { MultiPageLayoutHeaderProps } from './types';

export const MultiPageLayoutHeader: React.FC<MultiPageLayoutHeaderProps> = ({
  className,
  title,
  siteHeader = false,
  locale,
  leaveButtonText,
  onCloseClick = noop,
}: MultiPageLayoutHeaderProps) => {
  const intl = useIntl();

  if (siteHeader) return <Header />;

  return (
    <header
      className={cx({
        'fixed top-0 w-full z-20 bg-background-light/90 backdrop-blur-sm border-b': true,
        [className]: !!className,
      })}
    >
      <LayoutContainer>
        <div className="flex items-center justify-between h-20 gap-x-8 md:gap-x-16">
          <div className="flex justify-start flex-1">
            <span className="font-semibold">HeCo Invest</span>
          </div>
          <LayoutContainer
            layout="narrow"
            className="flex flex-col items-center justify-between lg:flex-row"
          >
            <span>{title}</span>
            {locale && (
              <span className="px-2 py-1 text-sm text-black rounded-lg lg:py-2 bg-background-dark">
                <FormattedMessage defaultMessage="Content language" id="zetZX8" />
                <span className="mr-1">:</span>
                {locale.toUpperCase()}
              </span>
            )}
          </LayoutContainer>
          <div className="flex justify-end flex-1 whitespace-nowrap">
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
