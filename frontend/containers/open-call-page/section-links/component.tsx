import { FC } from 'react';

import { FormattedMessage } from 'react-intl';

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

  return (
    <LayoutContainer className="mt-20 lg:mt-4">
      <LayoutContainer>
        <div className="flex justify-center gap-4 lg:justify-start">
          <Button
            className="px-0 py-0"
            theme="naked"
            onClick={() => scrollToElement(overviewRef, 100)}
          >
            <span className="text-green-dark hover:text-gray-700">
              <FormattedMessage defaultMessage="Overview" id="9uOFF3" />
            </span>
          </Button>
          <Button
            className="px-0 py-0"
            theme="naked"
            onClick={() => scrollToElement(fundingRef, 100)}
          >
            <span className="text-green-dark hover:text-gray-700">
              <FormattedMessage defaultMessage="Funding information" id="mEYG82" />
            </span>
          </Button>
          <Button
            className="px-0 py-0"
            theme="naked"
            onClick={() => scrollToElement(impactRef, 100)}
          >
            <span className="text-green-dark hover:text-gray-700">
              <FormattedMessage defaultMessage="Impact" id="W2JBdp" />
            </span>
          </Button>
          <Button className="px-0 py-0" theme="naked" onClick={() => scrollToElement(investorRef)}>
            <span className="text-green-dark hover:text-gray-700">
              <FormattedMessage defaultMessage="Investor" id="nEvNJb" />
            </span>
          </Button>
        </div>
      </LayoutContainer>
    </LayoutContainer>
  );
};

export default OpenCallSectionLinks;
