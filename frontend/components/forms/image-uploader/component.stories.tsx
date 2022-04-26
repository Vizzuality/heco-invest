import React from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';

import Button from 'components/button';

import ImageUploader, { ImageUploaderProps } from '.';

export default {
  component: ImageUploader,
  title: 'Components/Forms/ImageUploader',
  argTypes: {
    register: { control: { disable: true } },
  },
} as Meta;

interface FormValues {
  picture: string;
}

const Template: Story<ImageUploaderProps<FormValues>> = (args: ImageUploaderProps<FormValues>) => {
  const { register } = useForm<FormValues>();

  return <ImageUploader register={register} {...args} />;
};

export const Default: Story<ImageUploaderProps<FormValues>> = Template.bind({});
Default.args = {
  id: 'picture',
  name: 'picture',
};

const TemplateWithLabel: Story<ImageUploaderProps<FormValues>> = (
  args: ImageUploaderProps<FormValues>
) => {
  const { register } = useForm<FormValues>();

  return (
    <>
      <label htmlFor={args.id} className="mb-2">
        Profile picture
      </label>
      <ImageUploader register={register} {...args} />
    </>
  );
};

export const WithLabel: Story<ImageUploaderProps<FormValues>> = TemplateWithLabel.bind({});
WithLabel.args = {
  id: 'form-name',
  name: 'picture',
  preview: true,
};

const TemplateWithForm: Story<ImageUploaderProps<FormValues>> = (
  args: ImageUploaderProps<FormValues>
) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    // Using the native validation, we're able to style the inputs using the `valid` and `invalid` pseudo class
    shouldUseNativeValidation: true,
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => action('onSubmit')(data);

  return (
    <form
      // `noValidate` here prevents the browser from not submitting the form if there's a validation error. We absolutely want the form to be submitted so that React Hook Form is made aware of the validation errors and we can display errors below inputs.
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor={args.id} className="mb-2">
        Profile image
      </label>
      <ImageUploader register={register} aria-describedby="form-error" {...args} />
      {errors.picture?.message && (
        <p id="form-error" className="pl-2 mt-1 text-xs text-red-700">
          {errors.picture?.message}
        </p>
      )}
      <Button type="submit" className="mt-2">
        Submit
      </Button>
      <p className="mt-2 text-xs text-gray-50">
        Submit the form to see the {"input's"} error state (the input is required).
      </p>
    </form>
  );
};

export const ErrorState: Story<ImageUploaderProps<FormValues>> = TemplateWithForm.bind({});
ErrorState.args = {
  id: 'picture',
  name: 'picture',
  preview: true,
  registerOptions: { required: 'The profile image is required' },
};
