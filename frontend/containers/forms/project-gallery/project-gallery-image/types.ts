import { Control, Path } from 'react-hook-form';

export type ProjectGalleryImageType = {
  /** Image ID */
  id: string;
  /** Title of the image */
  title: string;
  /** Source for the image */
  src: string;
};

export type ProjectGalleryImageProps<FormValues> = {
  /** Classes to apply to the container */
  className?: string;
  /** Image to display */
  image: ProjectGalleryImageType;
  /** Whether the image is the default checked one in the group. Defaults to `false` */
  defaultSelected?: boolean;
  /**
   * Name of the image group (will be assigned to each individual `<Tag />`)
   * Defaults to inferring it from the first Tag's name.
   **/
  name?: Path<FormValues>;
  /** React Hook Form's control */
  control: Control<FormValues>;
  /** Whether the input is invalid. Defaults to `false`. */
  invalid?: boolean;
  /** handle remove an an image from images array */
  onDeleteImage: () => void;
  /** Callback to handle selecting a cover image */
  onSelectCover: () => void;
};
