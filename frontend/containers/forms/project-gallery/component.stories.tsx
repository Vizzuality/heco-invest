import React from 'react';

import { useForm } from 'react-hook-form';

import { Story, Meta } from '@storybook/react/types-6-0';

import { ProjectImageGallery } from 'types/project';

import ProjectGallery, { ProjectGalleryProps } from '.';

export default {
  component: ProjectGallery,
  title: 'Containers/Forms/ProjectGallery',
  argTypes: {
    register: { control: { disable: true } },
  },
} as Meta;

interface FormValues {
  images: ProjectImageGallery[];
}

const Template: Story<ProjectGalleryProps<FormValues>> = (
  args: ProjectGalleryProps<FormValues>
) => {
  const {
    control,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      [args.name]: [...Array(4)].map((_, index) => ({
        file: `id-${index}`,
        title: `Image ${index + 1}`,
        src: 'https://placekitten.com/g/768/400',
        cover: false,
      })),
    },
  });

  return (
    <div className="p-4">
      <fieldset>
        <legend className="mb-2 font-sans font-semibold text-gray-800">Project Gallery</legend>
        <ProjectGallery
          className="h-96"
          setValue={setValue}
          clearErrors={clearErrors}
          errors={errors}
          control={control}
          {...args}
        />
      </fieldset>
    </div>
  );
};

export const Default: Story<ProjectGalleryProps<FormValues>> = Template.bind({});
Default.args = {
  name: 'images',
};

const DefaultTemplate: Story<ProjectGalleryProps<FormValues>> = (
  args: ProjectGalleryProps<FormValues>
) => {
  const {
    control,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      [args.name]: [...Array(4)].map((_, index) => ({
        file: `id-${index}`,
        title: `Image ${index + 1}`,
        src: 'https://placekitten.com/g/768/400',
        cover: index === 1,
      })),
    },
  });

  return (
    <div className="p-4">
      <fieldset>
        <legend className="mb-2 font-sans font-semibold text-gray-800">Project Gallery</legend>
        <ProjectGallery
          className="h-96"
          setValue={setValue}
          clearErrors={clearErrors}
          errors={errors}
          control={control}
          {...args}
        />
      </fieldset>
    </div>
  );
};

export const DefaultSelected: Story<ProjectGalleryProps<FormValues>> = DefaultTemplate.bind({});
DefaultSelected.args = {
  name: 'images',
};
