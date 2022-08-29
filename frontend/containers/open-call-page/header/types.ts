import { OpenCall } from 'types/open-calls';

export type OpenCallHeaderProps = {
  /** The open call */
  openCall: OpenCall;
  /** List of instrument type names */
  instrumentTypes: string[];
};
