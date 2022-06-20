import React from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';

import Button from 'components/button';

import ProjectGallery, { ProjectGalleryProps } from '.';

export default {
  component: ProjectGallery,
  title: 'Containers/Forms/ProjectGallery',
  argTypes: {
    register: { control: { disable: true } },
  },
} as Meta;

interface FormValues {
  coverImage: string;
}

const Template: Story<ProjectGalleryProps<FormValues>> = (
  args: ProjectGalleryProps<FormValues>
) => {
  const {
    control,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>();

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
  name: 'coverImage',
  images: [...Array(4)].map((_, index) => ({
    id: `id-${index}`,
    title: `Image ${index + 1}`,
    src: 'https://placekitten.com/g/768/400',
    cover: false,
  })),
};

export const DefaultSelected: Story<ProjectGalleryProps<FormValues>> = Template.bind({});
DefaultSelected.args = {
  name: 'coverImage',
  images: [...Array(4)].map((_, index) => ({
    id: `id-${index}`,
    title: `Image ${index + 1}`,
    src: 'https://placekitten.com/g/768/400',
    cover: false,
  })),
  defaultSelected: 'id-1',
};

const TemplateWithForm: Story<ProjectGalleryProps<FormValues>> = (
  args: ProjectGalleryProps<FormValues>
) => {
  const {
    control,
    setValue,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    shouldUseNativeValidation: true,
    shouldFocusError: true,
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => action('onSubmit')(data);

  return (
    <div className="p-4">
      <form
        // `noValidate` here prevents the browser from not submitting the form if there's a validation
        // error. We absolutely want the form to be submitted so that React Hook Form is made aware of
        // the validation errors and we can display errors below inputs.
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset name={args.name}>
          <legend className="mb-2 font-sans font-semibold text-gray-800">Project Gallery</legend>
          <ProjectGallery
            className="h-96"
            setValue={setValue}
            clearErrors={clearErrors}
            errors={errors}
            control={control}
            {...args}
          />
          {errors[args.name]?.message && (
            <p id="form-error" className="pl-2 mt-1 text-xs text-red-700">
              {errors[args.name]?.message}
            </p>
          )}
        </fieldset>

        <Button type="submit" className="mt-2">
          Submit
        </Button>
        <p className="mt-2 text-xs text-gray-50">
          Submit the form to see the Gallery error state (selecting an image is required).
        </p>
      </form>
    </div>
  );
};

export const ErrorState: Story<ProjectGalleryProps<FormValues>> = TemplateWithForm.bind({});

// Issue: https://github.com/react-hook-form/react-hook-form/issues/4449
// Workaround: https://github.com/storybookjs/storybook/issues/12747
ErrorState.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
};

ErrorState.args = {
  name: 'coverImage',
  images: [...Array(4)].map((_, index) => ({
    id: `id-${index}`,
    title: `Image ${index + 1}`,
    src: 'https://placekitten.com/g/768/400',
    cover: false,
  })),
};
