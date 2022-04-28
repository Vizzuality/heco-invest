import React from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';

import Button from 'components/button';

import GeometryInput, { GeometryInputProps } from '.';

export default {
  component: GeometryInput,
  title: 'Containers/Forms/GeometryInput',
  argTypes: {
    register: { control: { disable: true } },
  },
} as Meta;

interface FormValues {
  geometry: string;
}

const Template: Story<GeometryInputProps<FormValues>> = (args: GeometryInputProps<FormValues>) => {
  const { control } = useForm<FormValues>();

  return (
    <>
      <GeometryInput control={control} {...args} />
      <p className="mt-2 text-xs text-gray-50">
        This input is not accessible. Either define <code>aria-label</code> or associate a label
        (see the “With Label” story).
      </p>
    </>
  );
};

export const Default: Story<GeometryInputProps<FormValues>> = Template.bind({});
Default.args = {
  id: 'form-geometry',
  name: 'geometry',
  controlOptions: {
    disabled: false,
  },
};

const TemplateWithLabel: Story<GeometryInputProps<FormValues>> = (
  args: GeometryInputProps<FormValues>
) => {
  const { control } = useForm<FormValues>();

  return (
    <>
      <label htmlFor={args.id} className="block mb-2">
        Geometry
      </label>
      <GeometryInput control={control} {...args} />
    </>
  );
};

export const WithLabel: Story<GeometryInputProps<FormValues>> = TemplateWithLabel.bind({});
WithLabel.args = {
  id: 'form-geometry',
  name: 'geometry',
  controlOptions: {
    disabled: false,
  },
};

const TemplateWithForm: Story<GeometryInputProps<FormValues>> = (
  args: GeometryInputProps<FormValues>
) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    // Using the native validation, we're able to style the inputs using the `valid` and `invalid`
    // pseudo class
    shouldUseNativeValidation: true,
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => action('onSubmit')(data);

  return (
    <form
      // `noValidate` here prevents the browser from not submitting the form if there's a validation
      // error. We absolutely want the form to be submitted so that React Hook Form is made aware of
      // the validation errors and we can display errors below inputs.
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor={args.id} className="block mb-2">
        Geometry
      </label>
      <GeometryInput control={control} aria-describedby="form-error" {...args} />
      {errors.geometry?.message && (
        <p id="form-error" className="pl-2 mt-1 text-xs text-red-700">
          {errors.geometry?.message}
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

export const ErrorState: Story<GeometryInputProps<FormValues>> = TemplateWithForm.bind({});
ErrorState.args = {
  id: 'form-geometry',
  name: 'geometry',
  controlOptions: {
    disabled: false,
    required: 'A geometry is required.',
  },
};
