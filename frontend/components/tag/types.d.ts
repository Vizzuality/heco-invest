export interface TagProps {
  /** Children to pass to the tag */
  children: React.ReactNode;
  /** Classes to apply to the container */
  className?: string | unknown;
  /** Size of the tag */
  size?: 'small' | 'smallest';
}
