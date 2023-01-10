export interface LocationSearcherProps {
  /** Classes to add to the container */
  className?: string;
  /** Callback to pass the bbox of a selected location */
  onLocationSelected: ({ bbox }: { bbox: number[] }) => void;
  /** Whether the search box should always be open. Defaults to 'false' */
  isAlwaysOpen?: boolean;
}
