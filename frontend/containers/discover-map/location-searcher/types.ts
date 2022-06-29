export interface LocationSearcherProps {
  onLocationSelected: ({ bbox }: { bbox: number[] }) => void;
}
