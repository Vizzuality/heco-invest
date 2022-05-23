export type NavigationProps = {
  /** Stats (number of each item) to show on the navigation tags */
  stats?: {
    /** Num projects */
    projects?: number;
    /** Num project developers */
    projectDevelopers?: number;
    /** Num investors */
    investors?: number;
    /** Num open calls */
    openCalls?: number;
  };
};
