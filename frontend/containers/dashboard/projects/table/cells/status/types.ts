export enum StatusTag {
  Draft = 'draft',
  Published = 'published',
  // VERIFICATION PROJECTS: HIDDEN
  // Verified = 'verified',
  // Unverified = 'unverified',
}

export type CellStatusProps = {
  value: StatusTag;
};
