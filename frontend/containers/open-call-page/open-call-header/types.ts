import { Enum } from 'types/enums';
import { OpenCall } from 'types/open-calls';

export type OpenCallHeaderProps = {
  openCall: OpenCall;
  instrumentTypeEnums: Enum[];
};
