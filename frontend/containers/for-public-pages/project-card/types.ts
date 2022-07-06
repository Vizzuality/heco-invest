import { CategoryType } from 'types/category';

export type ProjectCardProps = {
  id: string;
  name: string;
  description: string;
  projectsQuantity: number;
  category?: CategoryType;
};
