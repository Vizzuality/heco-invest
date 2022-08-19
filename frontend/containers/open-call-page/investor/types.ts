import { MutableRefObject } from 'react';

import { Investor } from 'types/investor';

export type OpenCallInvestorProps = {
  /** The open call investor */
  investor: Investor;
  /** Function to favorite/unfavorite open call */
  handleFavorite: () => void;
  /** Function to apply to a open call */
  handleApply: () => void;
  // /** Whether the open call is favourite */
  // favourite: boolean;
};
