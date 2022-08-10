import { ProjectStatus } from 'enums';

import { StatusTag } from '../status';

export type CellActionsProps = {
  row: {
    original: {
      category: string;
      country: string;
      instrumentType: boolean;
      municipality: string;
      name: string;
      slug: string;
      status: ProjectStatus;
      ticketSize: string;
      statusTag: StatusTag;
    };
    index: number;
  };
  // Property that comes for each row
  rows: any[];
};
