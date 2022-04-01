import React from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';

import Button from 'components/button';

import Input, { InputProps } from '.';

export default {
  component: Input,
  title: 'Components/Forms/Input',
  argTypes: {
    register: { control: { disable: true } },
  },
} as Meta;

interface FormValues {
  name: string;
}

const Template: Story<InputProps<FormValues>> = (args: InputProps<FormValues>) => {
  const { register } = useForm<FormValues>();

  return (
    <>
      <Input register={register} {...args} />
      <p className="mt-2 text-xs text-gray-50">
        This input is not accessible. Either define <code>aria-label</code> or associate a label
        (see the “With Label” story).
      </p>
    </>
  );
};

export const Default: Story<InputProps<FormValues>> = Template.bind({});
Default.args = {
  id: 'form-name',
  type: 'text',
  name: 'name',
  placeholder: 'Paul Smith',
  registerOptions: {
    disabled: false,
  },
};

const TemplateWithLabel: Story<InputProps<FormValues>> = (args: InputProps<FormValues>) => {
  const { register } = useForm<FormValues>();

  return (
    <>
      <label htmlFor={args.id} className="mb-2">
        Name
      </label>
      <Input register={register} {...args} />
    </>
  );
};

export const WithLabel: Story<InputProps<FormValues>> = TemplateWithLabel.bind({});
WithLabel.args = {
  id: 'form-name',
  type: 'text',
  name: 'name',
  placeholder: 'Paul Smith',
  registerOptions: {
    disabled: false,
  },
};

const TemplateWithForm: Story<InputProps<FormValues>> = (args: InputProps<FormValues>) => {
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
        Name
      </label>
      <Input register={register} aria-describedby="form-error" {...args} />
      {errors.name?.message && (
        <p id="form-error" className="pl-2 mt-1 text-xs text-red-700">
          {errors.name?.message}
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

export const ErrorState: Story<InputProps<FormValues>> = TemplateWithForm.bind({});
ErrorState.args = {
  id: 'form-name',
  type: 'text',
  name: 'name',
  placeholder: 'Paul Smith',
  registerOptions: {
    disabled: false,
    required: 'Your name is required.',
  },
};
