import { ReactNode } from 'react';

import { UseFormRegister } from 'react-hook-form';

import { Legend } from '../types';

export interface LegendItemProps {
  legend: Legend;
  icon?: ReactNode;
  children?: ReactNode;
  handleCloseLegend: () => void;
}
