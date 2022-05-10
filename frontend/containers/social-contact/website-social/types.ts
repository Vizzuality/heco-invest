export type SocialType = {
  id: 'facebook' | 'twitter' | 'linked-in' | 'instagram';
  url: string;
};

export type WebsiteSocialProps = {
  /** Classnames to apply to the wrapper */
  className?: string;
  /** Website url */
  website?: string;
  /** Array of SocialType's `id` and `url` to link to */
  social?: SocialType[];
};
