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
  register,
  registerOptions,
  errors,
}: ProjectGalleryProps<FormValues>) => {
  // Number of images to display. If not enough images are supplied, placeholders will be generated.
  const numImages = 6;

  const numPlaceholders = useMemo(
    () => numImages - (images?.length || 0),
    [images?.length, numImages]
  );

  return (
    <div className={className}>
      <div className="grid flex-grow h-full grid-cols-3 auto-rows-fr gap-x-2 gap-y-4" role="group">
        {images.map((image) => (
          <ProjectGalleryImage
            key={image.id}
            name={name}
            image={image}
            register={register}
            registerOptions={registerOptions}
            invalid={errors && errors[name]}
            defaultSelected={image.id === defaultSelected}
          />
        ))}
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
