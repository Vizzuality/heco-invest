import { OpenCall as OpenCallType } from 'types/open-calls';

export type OpenCallCardProps = {
  /** Classnames to apply to the wrapper */
  className?: string;
  /** The open call to display on the card */
  openCall: OpenCallType;
};
