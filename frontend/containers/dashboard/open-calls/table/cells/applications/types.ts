import { OpenCall } from 'types/open-calls';

export type CellApplicationsProps = {
  /** Number of open call applications */
  value: number;
  row: {
    /** Open call */
    original: OpenCall;
  };
};
