export type CategoryType = 'tourism' | 'production' | 'agrosystems' | 'forestry';

export type CategoryTagProps = React.PropsWithChildren<{
  /** Identifier of the investment type so that the corresponding colored dot is displayed */
  category: CategoryType;
}>;
