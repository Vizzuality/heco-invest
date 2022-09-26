import { ReactNode } from 'react';

import { UseFormRegister } from 'react-hook-form';

export interface LegendItemProps {
  id: string;
  name: string;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
  handleCloseLegend: () => void;
}
