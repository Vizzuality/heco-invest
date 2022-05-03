/** UseQueryOptions to use with static data. Ex: Enums, Locations. This will cause less refetchings */
export const staticDataQueryOptions = {
  staleTime: Infinity,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
};
