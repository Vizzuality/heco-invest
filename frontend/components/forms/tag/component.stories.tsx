import React from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';

import Button from 'components/button';

import { TagProps } from './types';

import Tag from '.';

export default {
  component: Tag,
  title: 'Components/Forms/Tag',
  argTypes: {
    register: { control: { disable: true } },
  },
} as Meta;

interface FormValues {
  category: boolean;
}

const Template: Story<TagProps<FormValues>> = (args: TagProps<FormValues>) => {
  const { register } = useForm<FormValues>();

  return (
    <div className="p-4">
      <Tag register={register} {...args}>
        Category
      </Tag>
      <p className="mt-2 text-xs text-gray-50">
        This input is not accessible. Define <code>aria-label</code>.
      </p>
    </div>
  );
};

export const Default: Story<TagProps<FormValues>> = Template.bind({});
Default.args = {
  id: 'form-tag',
  name: 'category',
  registerOptions: {
    disabled: false,
  },
};

const TemplateWithForm: Story<TagProps<FormValues>> = (args: TagProps<FormValues>) => {
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
        <Tag
          id="story-check"
          name="category"
          register={register}
          aria-describedby="form-error"
          {...args}
        >
          Category
        </Tag>
        {errors.category?.message && (
          <p id="form-error" className="pl-2 mt-1 text-xs text-red-700">
            {errors.category?.message}
          </p>
        )}

        <Button type="submit" className="mt-2">
          Submit
        </Button>
        <p className="mt-2 text-xs text-gray-50">
          Submit the form to see the {"tag's"} error state (selecting the tag is required).
        </p>
      </form>
    </div>
  );
};

export const ErrorState: Story<TagProps<FormValues>> = TemplateWithForm.bind({});
ErrorState.args = {
  id: 'story-tag',
  name: 'category',
  registerOptions: {
    disabled: false,
    required: 'Selecting the category is required.',
  },
};

const TemplateDisabled: Story<TagProps<FormValues>> = (args: TagProps<FormValues>) => {
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
      <Tag
        id="story-tag"
        name="category"
        register={register}
        aria-describedby="form-error"
        {...args}
      >
        Category
      </Tag>
      {errors.category?.message && (
        <p id="form-error" className="pl-2 mt-1 text-xs text-red-700">
          {errors.category?.message}
        </p>
      )}
    </div>
  );
};

export const Disabled: Story<TagProps<FormValues>> = TemplateDisabled.bind({});
Disabled.args = {
  id: 'story-tag',
  name: 'category',
  registerOptions: {
    disabled: true,
    required: false,
  },
};
