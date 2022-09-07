import { useMemo } from 'react';

import { pickBy } from 'lodash-es';

import { OpenCall, OpenCallForm } from 'types/open-calls';
import { formPageInputs } from 'validations/open-call';

export const useDefaultValues = (openCall: OpenCall): Partial<OpenCallForm> => {
  return useMemo(() => {
    if (!openCall) return null;

    const general = pickBy(openCall, (_, key: any) => formPageInputs.flat().includes(key));

    return {
      ...general,
      id: openCall.id,
      language: openCall.language,
      picture: openCall.picture?.original?.split('redirect/')[1].split('/')[0] ?? undefined,
      country_id: openCall.country?.id,
      department_id: openCall.department?.id,
      municipality_id: openCall.municipality?.id,
      closing_at: new Date(openCall.closing_at),
    };
  }, [openCall]);
};
