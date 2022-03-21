/**
 * Merge multiple refs together
 * @param refs List of refs to assign to an element
 */
export const mergeRefs = (refs: (React.MutableRefObject<any> | ((instance: any) => void))[]) => {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref !== null && ref !== undefined && 'current' in ref) {
        ref.current = value;
      }
    });
  };
};
