import { OpenCall } from 'types/open-calls';

export type OpenCallHeaderProps = {
  /** The open call */
  openCall: OpenCall;
  /** List of instrument type names */
  instrumentTypes: string[];
  /** function to apply to a open call */
  handleApply: () => void;
};
