import { MutableRefObject } from 'react';

import { OpenCall } from 'types/open-calls';

export type OpenCallOverviewTypes = {
  openCall: OpenCall;
  overviewRef: MutableRefObject<any>;
};
