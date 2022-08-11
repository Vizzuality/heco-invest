import { OpenCallStatus } from 'enums';

import { StatusTag } from '../status';

export type CellActionsProps = {
  row: {
    original: {
      country: string;
      instrumentType: boolean;
      municipality: string;
      name: string;
      slug: string;
      status: OpenCallStatus;
      statusTag: StatusTag;
      maximumFundingPerProject: string;
    };
    index: number;
  };
  // Property that comes for each row
  rows: any[];
};
