import { MutableRefObject } from 'react';

import { Enum } from 'types/enums';
import { OpenCall } from 'types/open-calls';

export type OpenCallFundingImpactProps = {
  openCall: OpenCall;
  instrumentTypes: string[];
  allSdgs: Enum[];
  fundingRef: MutableRefObject<any>;
  impactRef: MutableRefObject<any>;
};
