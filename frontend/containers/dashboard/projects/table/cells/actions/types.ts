import { ProjectStatus } from 'enums';
import { Project } from 'types/project';

import { StatusTag } from '../status';

export type CellActionsProps = {
  row: {
    original: {
      data: Project;
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
