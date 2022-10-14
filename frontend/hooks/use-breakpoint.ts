import { useState, useEffect, useMemo, useCallback } from 'react';

import { debounce } from 'lodash-es';
import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from 'tailwind.config.js';

const config = resolveConfig(tailwindConfig);

export const useBreakpoint = (useOuterWidth: boolean = false) => {
  const { screens } = config?.theme;

  const breakpoints = Object.keys(screens);

  // The object coming from tailwindConfig has the breakpoint sizes as strings (and in px);
  // so here we prepare a similar object with the sizes as integers, to facilitate calculations
  // later on.
  const breakpointsObjArr = useMemo(
    () =>
      Object.entries(screens).reduce(
        (acc, [key, value]: [string, string]) => [
          ...acc,
          { [key]: parseInt(value.substring(0, value.length - 2)) },
        ],
        []
      ),
    [screens]
  );

  // Use the last breakpoint (largest screen) as the default one.
  const defaultBreakpointKey = Object.keys(breakpointsObjArr[breakpointsObjArr.length - 1])[0];

  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>(defaultBreakpointKey);

  // Here we compute the current breakpoint based on the window width.
  const computeBreakpoint = debounce(
    useCallback(() => {
      // If no window object we can't get the window width. Set the the default breakpoint as the current one.
      if (typeof window === undefined) {
        setCurrentBreakpoint(defaultBreakpointKey);
        return;
      }

      // We try to find the current matching endpoint. Note that if the window matches the largest
      // one, this will return `undefined`. That's why the default is set as the last one.
      const matchingBreakpoint = breakpointsObjArr.find((item) => {
        const [_key, value] = Object.entries(item)[0];

        const width = useOuterWidth ? window.outerWidth : window.innerWidth;
        return width < value;
      });

      // If we have a match we'll use it, if not the screen must be larger than the last breakpoint;
      // We set the default one then.
      const breakpoint = matchingBreakpoint
        ? Object.keys(matchingBreakpoint)[0]
        : defaultBreakpointKey;

      setCurrentBreakpoint(breakpoint);
    }, [breakpointsObjArr, defaultBreakpointKey, useOuterWidth]),
    250
  );

  // Adding window listener events to compute the current breakpoint when the window is resized.
  // We also need to compute it after the component is loaded.
  useEffect(() => {
    computeBreakpoint();
    window.addEventListener('resize', computeBreakpoint);

    return () => {
      window.removeEventListener('resize', computeBreakpoint);
    };
  }, [computeBreakpoint]);

  // Returned function that'll compare the target breakpoint to the current one, and return
  // whether the target breakpoint is "higher" than the current one.
  const breakpoint = (targetBreakpoint: string): boolean => {
    const currentBreakpointIndex = breakpoints.findIndex((bp) => bp === currentBreakpoint);
    const targetBreakpointIndex = breakpoints.findIndex((bp) => bp === targetBreakpoint);
    return currentBreakpointIndex > targetBreakpointIndex;
  };

  return breakpoint;
};
