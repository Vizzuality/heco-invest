export interface TagProps {
  /** Children to pass to the tag */
  children: React.ReactNode;
  /** Classes to apply to the container */
  className?: string | unknown;
  /** Size of the tag. Defaults to `small` */
  size?: 'small' | 'smallest';
  /** Whether to display a border. Defaults to `true` */
  border?: boolean;
}
