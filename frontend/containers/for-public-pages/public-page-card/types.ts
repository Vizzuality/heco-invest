export type PublicPageCardProps = {
  cardType: 'investors' | 'projects';
  enumType: 'category' | 'ticket_size' | 'mosaic';
  id: string;
  name: string;
  description: string;
  quantity: number;
  filterName?: string;
};
