import {
  Path,
  Control,
  UseControllerProps,
  FieldPath,
  UseFormSetError,
  UseFormClearErrors,
} from 'react-hook-form';

import { GeometryCollection, MultiPolygon, Polygon } from '@turf/turf';

export type GeometryInputProps<FormValues> = {
  /** ID of the file input. Required if `aria-label` is not provided. */
  id?: string;
  /** Label of the file input. Required `id` is not provided. */
  'aria-label'?: string;
  /** Name of the input */
  name: Path<FormValues>;
  /** React Hook Form's `control` function */
  control: Control<FormValues, FieldPath<FormValues>>;
  /** Options for React Hook Form's `control` function */
  controlOptions: UseControllerProps<FormValues, FieldPath<FormValues>>['rules'] & {
    /** Whether the input is disabled */
    disabled?: boolean;
  };
  /** String to attach to the container */
  className?: string;
};

export type ValidGeometryType = Polygon | MultiPolygon | GeometryCollection;
