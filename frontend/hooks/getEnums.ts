import { useMemo } from 'react';

import { groupBy } from 'lodash-es';

import { Enum } from 'types/enums';

const useGroupedEnums = (enums: Enum[]) =>
  useMemo(() => {
    const grouped = groupBy(enums, 'type');
    return grouped;
  }, [enums]);

export default useGroupedEnums;
