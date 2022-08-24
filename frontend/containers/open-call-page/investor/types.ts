import { OpenCall } from 'types/open-calls';

export type OpenCallInvestorProps = {
  /** The open call object we are displaying the banner for */
  openCall: OpenCall;
  /** Function to apply to a open call */
  handleApply: () => void;
};
