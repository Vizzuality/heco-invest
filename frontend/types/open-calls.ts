import { Dayjs } from 'dayjs';

import { Languages } from 'enums';

export type OpenCall = {
  name: string;
  slug: string;
  description: string;
  ticket_size: string;
  instrument_type: string;
  sdgs: number[];
  money_distribution: string;
  impact_description: string;
  closing_at: string;
  language: Languages;
  created_at: string;
};

export type OpenCallForm = Omit<OpenCall, 'created_at'> & {
  created_at: Dayjs;
};
