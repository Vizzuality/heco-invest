import { OpenCallApplication } from 'types/open-call-applications';
import { OpenCall } from 'types/open-calls';

export type CellActionsProps = {
  row: {
    original: {
      openCallApplication: OpenCallApplication;
      openCall: OpenCall;
    };
  };
};
