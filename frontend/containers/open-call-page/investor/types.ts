import { MutableRefObject } from 'react';

import { Investor } from 'types/investor';

export type OpenCallInvestorProps = {
  /** The open call investor */
  investor: Investor;
  /** The investor section ref */
  investorRef: MutableRefObject<any>;
  /** function to favorite/unfavorite open call */
  handleFavorite: () => void;
  /** function to apply to a open call */
  handleApply: () => void;
};
