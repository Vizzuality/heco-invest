import { FC } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import { useScrollToElement } from 'hooks/useScrollToElement';

import Button from 'components/button';
import LayoutContainer from 'components/layout-container';

import { OpenCallSectionLinksProps } from './types';

export const OpenCallSectionLinks: FC<OpenCallSectionLinksProps> = ({
  investorRef,
  fundingRef,
  impactRef,
  overviewRef,
}) => {
  const scrollToElement = useScrollToElement();
  const { formatMessage } = useIntl();

  return (
    <LayoutContainer className="mt-20 lg:mt-4">
      <LayoutContainer>
        <nav
          aria-label={formatMessage({ defaultMessage: 'Quick links', id: 'S3SiEe' })}
          className="flex justify-center gap-4 lg:justify-start"
        >
          <Button
            className="text-green-dark hover:text-green-light"
            size="smallest"
            theme="naked"
            onClick={() => scrollToElement(overviewRef, 100)}
          >
            <FormattedMessage defaultMessage="Overview" id="9uOFF3" />
          </Button>
          <Button
            className="text-green-dark hover:text-green-light"
            size="smallest"
            theme="naked"
            onClick={() => scrollToElement(fundingRef, 100)}
          >
            <FormattedMessage defaultMessage="Funding information" id="mEYG82" />
          </Button>
          <Button
            className="text-green-dark hover:text-green-light"
            size="smallest"
            theme="naked"
            onClick={() => scrollToElement(impactRef, 100)}
          >
            <FormattedMessage defaultMessage="Impact" id="W2JBdp" />
          </Button>
          <Button
            className="text-green-dark hover:text-green-light"
            size="smallest"
            theme="naked"
            onClick={() => scrollToElement(investorRef)}
          >
            <FormattedMessage defaultMessage="Investor" id="nEvNJb" />
          </Button>
        </nav>
      </LayoutContainer>
    </LayoutContainer>
  );
};

export default OpenCallSectionLinks;
