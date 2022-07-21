export enum StatusTag {
  Draft = 'draft',
  Verified = 'verified',
  Unverified = 'unverified',
}

export type CellStatusProps = {
  value: StatusTag;
};
