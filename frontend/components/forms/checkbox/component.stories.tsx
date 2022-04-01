import React from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';

import Button from 'components/button';

import { CheckboxProps } from './types';

import Checkbox from '.';

export default {
  component: Checkbox,
  title: 'Components/Forms/Checkbox',
  argTypes: {
    register: { control: { disable: true } },
  },
} as Meta;

interface FormValues {
  accept: string;
}

const Template: Story<CheckboxProps<FormValues>> = (args: CheckboxProps<FormValues>) => {
  const { register } = useForm<FormValues>();

  return (
    <div className="p-4">
      <Checkbox register={register} {...args} />
      <p className="mt-2 text-xs text-gray-50">
        This input is not accessible. Either define <code>aria-label</code> or associate a label
        (see the “With Label” story).
      </p>
    </div>
  );
};

export const Default: Story<CheckboxProps<FormValues>> = Template.bind({});
Default.args = {
  id: 'form-accept',
  name: 'accept',
  registerOptions: {
    disabled: false,
  },
};

const TemplateWithLabel: Story<CheckboxProps<FormValues>> = (args: CheckboxProps<FormValues>) => {
  const { register } = useForm<FormValues>();

  return (
    <div className="p-3">
      <label htmlFor="story-check">
        <Checkbox id="story-check" name="checkbox" register={register} {...args} />I accept the
        Terms and Privacy Policy
      </label>
    </div>
  );
};

export const WithLabel: Story<CheckboxProps<FormValues>> = TemplateWithLabel.bind({});
WithLabel.args = {
  id: 'story-check',
  name: 'accept',
  registerOptions: {
    disabled: false,
  },
};

const TemplateWithForm: Story<CheckboxProps<FormValues>> = (args: CheckboxProps<FormValues>) => {
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
    <div className="p-4">
      <form
        // `noValidate` here prevents the browser from not submitting the form if there's a validation
        // error. We absolutely want the form to be submitted so that React Hook Form is made aware of
        // the validation errors and we can display errors below inputs.
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="story-check">
          <Checkbox
            id="story-check"
            name="accept"
            register={register}
            aria-describedby="form-error"
            {...args}
          />
          I accept the Terms and Privacy Policy
        </label>
        {errors.accept?.message && (
          <p id="form-error" className="pl-2 mt-1 text-xs text-red-700">
            {errors.accept?.message}
          </p>
        )}

        <Button type="submit" className="mt-2">
          Submit
        </Button>
        <p className="mt-2 text-xs text-gray-50">
          Submit the form to see the {"input's"} error state (the input is required).
        </p>
      </form>
    </div>
  );
};

export const ErrorState: Story<CheckboxProps<FormValues>> = TemplateWithForm.bind({});
ErrorState.args = {
  id: 'story-check',
  name: 'accept',
  registerOptions: {
    disabled: false,
    required: 'Accept Terms and Privacy Policy is required.',
  },
};

const TemplateDisabled: Story<CheckboxProps<FormValues>> = (args: CheckboxProps<FormValues>) => {
  const {
    register,
    formState: { errors },
  } = useForm<FormValues>({
    // Using the native validation, we're able to style the inputs using the `valid` and `invalid`
    // pseudo class
    shouldUseNativeValidation: true,
  });

  return (
    <div className="p-4">
      <label htmlFor="story-check">
        <Checkbox
          id="story-check"
          name="accept"
          register={register}
          aria-describedby="form-error"
          {...args}
        />
        I accept the Terms and Privacy Policy
      </label>
      {errors.accept?.message && (
        <p id="form-error" className="pl-2 mt-1 text-xs text-red-700">
          {errors.accept?.message}
        </p>
      )}
    </div>
  );
};

export const Disabled: Story<CheckboxProps<FormValues>> = TemplateDisabled.bind({});
Disabled.args = {
  id: 'story-check',
  name: 'accept',
  registerOptions: {
    disabled: true,
    required: false,
  },
};
