export type PublicPageCardProps = {
  // The type of the card, displayed at the bottom next to the count.
  cardType: 'investors' | 'projects';
  // The enum type displayed by the card.
  enumType: 'category' | 'ticket_size' | 'mosaic';
  // The enum id.
  id: string;
  // The title of the card.
  name: string;
  // The description of the card.
  description: string;
  // The quantity displayed in the card.
  quantity: number;
  // The filter to add to the card link.
  filterName?: string;
  /** Callback executed when the cursor enters the card */
  onMouseEnter?: () => void;
  /** Callback executed when the cursor leaves the card */
  onMouseLeave?: () => void;
  /** Callback executed when the user clicks on the card's button */
  onClick?: () => void;
};
