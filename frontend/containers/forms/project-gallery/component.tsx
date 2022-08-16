import { useMemo } from 'react';

import { Camera as CameraIcon } from 'react-feather';
import { FieldValues } from 'react-hook-form';

import ProjectGalleryImage from './project-gallery-image';
import type { ProjectGalleryProps } from './types';

export const ProjectGallery = <FormValues extends FieldValues>({
  className,
  name,
  images,
  defaultSelected,
  control,
  errors,
  onDeleteImage,
  onSelectCover,
  numImages = 6,
}: ProjectGalleryProps<FormValues>) => {
  // const images: ProjectGalleryImageType[] = getValues(name as unknown as Path<FormValues>);

  const imagesToShow = images?.filter(({ _destroy }) => !_destroy) || [];

  const numPlaceholders = useMemo(
    () => numImages - (imagesToShow?.length || 0),
    [imagesToShow?.length, numImages]
  );

  return (
    <div className={className}>
      <div className="grid flex-grow h-full grid-cols-3 auto-rows-fr gap-x-2 gap-y-4" role="group">
        {imagesToShow.map((image) => {
          return (
            <ProjectGalleryImage
              key={image.file}
              name={name}
              image={image}
              control={control}
              invalid={errors && errors[name]}
              defaultSelected={image.file === defaultSelected}
              onDeleteImage={() => onDeleteImage(image.file)}
              onSelectCover={() => onSelectCover(image.file)}
            />
          );
        })}
        {[...Array(numPlaceholders)].map((_, index) => (
          <div
            key={index}
            aria-hidden={true}
            className="relative flex items-center justify-center rounded bg-background-dark text-beige"
          >
            <CameraIcon className="w-2/12 h-2/12" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectGallery;
