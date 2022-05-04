export type BreadcrumbsProps = {
  /** Classes to apply to the container */
  className?: string;
  /**
   * Name/Link substitutions to make on the route segments
   * Eg:
   *  {
   *    id: 'Project name'
   *    'about-project': { name: 'Custom vreadcrumb name', link: 'http://www.example.com' }
   *  }
   **/
  substitutions?: Record<
    string,
    {
      name?: string;
      link?: string;
    }
  >;
};
