import { OpenCallStatus } from 'enums';

export type CellActionsProps = {
  row: {
    original: {
      country: string;
      instrumentTypes: string[];
      municipality: string;
      name: string;
      slug: string;
      status: OpenCallStatus;
      maximumFundingPerProject: string;
    };
    index: number;
  };
  // Property that comes for each row
  rows: any[];
};
