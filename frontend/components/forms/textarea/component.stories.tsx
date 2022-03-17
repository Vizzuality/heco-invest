import React from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';

import Button from 'components/button';

import Textarea, { TextareaProps, TextareaResize } from '.';

export default {
  component: Textarea,
  title: 'Components/Forms/Textarea',
  argTypes: {
    register: { control: { disable: true } },
  },
} as Meta;

interface FormValues {
  details: string;
}

const Template: Story<TextareaProps<FormValues>> = (args: TextareaProps<FormValues>) => {
  const { register } = useForm<FormValues>();

  return (
    <>
      <Textarea register={register} {...args} />
      <p className="mt-2 text-xs text-gray-50">
        This textarea is not accessible. Either define <code>aria-label</code> or associate a label
        (see the “With Label” story).
      </p>
    </>
  );
};

export const Default: Story<TextareaProps<FormValues>> = Template.bind({});
Default.args = {
  id: 'form-details',
  name: 'details',
  placeholder: 'Details about your initiative',
  resize: TextareaResize.Vertically,
  registerOptions: {
    disabled: false,
  },
};

const TemplateWithLabel: Story<TextareaProps<FormValues>> = (args: TextareaProps<FormValues>) => {
  const { register } = useForm<FormValues>();

  return (
    <>
      <label htmlFor={args.id} className="mb-2">
        Details
      </label>
      <Textarea register={register} {...args} />
    </>
  );
};

export const WithLabel: Story<TextareaProps<FormValues>> = TemplateWithLabel.bind({});
WithLabel.args = {
  id: 'form-details',
  name: 'details',
  placeholder: 'Details about your initiative',
  registerOptions: {
    disabled: false,
  },
};

const TemplateWithForm: Story<TextareaProps<FormValues>> = (args: TextareaProps<FormValues>) => {
  const {
    register,
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
      <label htmlFor={args.id} className="mb-2">
        Details
      </label>
      <Textarea register={register} aria-describedby="form-error" {...args} />
      {errors.details?.message && (
        <p id="form-error" className="pl-2 mt-1 text-xs text-red">
          {errors.details?.message}
        </p>
      )}
      <Button type="submit" className="mt-2">
        Submit
      </Button>
      <p className="mt-2 text-xs text-gray-50">
        Submit the form to see the {"textareas's"} error state (the textarea is required).
      </p>
    </form>
  );
};

export const ErrorState: Story<TextareaProps<FormValues>> = TemplateWithForm.bind({});
ErrorState.args = {
  id: 'form-details',
  name: 'details',
  placeholder: 'Details about your initiative',
  registerOptions: {
    disabled: false,
    required: 'Details are required.',
  },
};
