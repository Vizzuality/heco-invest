import { useMemo } from 'react';

import { useBreakpoint } from 'hooks/use-breakpoint';

import { usePartners } from './data';

const DEFAULT_NUM_COLS = 3;

const BREAKPOINT_TO_COLS_MAPPING = {
  xl: 3,
  md: 2,
  xs: 1,
};

export const useNumCols = () => {
  const breakpoint = useBreakpoint();

  return useMemo(
    () =>
      BREAKPOINT_TO_COLS_MAPPING[
        Object.keys(BREAKPOINT_TO_COLS_MAPPING).find((key) => breakpoint(key))
      ] || DEFAULT_NUM_COLS,
    [breakpoint]
  );
};

export const usePartnersMatrix = () => {
  const partners = usePartners();
  const numCols = useNumCols();

  return useMemo(() => {
    return Array.from(Array(numCols)).map((_, colIdx) =>
      partners.filter((_, idx) => idx % numCols === colIdx)
    );
  }, [numCols, partners]);
};
