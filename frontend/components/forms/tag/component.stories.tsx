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
        Tourism & Recreation
      </Tag>
      <p className="mt-2 text-xs text-gray-50">
        This input is not fully accessible. Wrap it in a <code>fieldset</code> tag.
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

const TemplateWithFieldset: Story<TagProps<FormValues>> = (args: TagProps<FormValues>) => {
  const { register } = useForm<FormValues>();

  return (
    <div className="p-4">
      <fieldset>
        <legend className="mb-2 font-sans font-semibold text-gray-800">Category</legend>
        <Tag register={register} {...args}>
          Tourism & Recreation
        </Tag>
      </fieldset>
    </div>
  );
};

export const WithFieldset: Story<TagProps<FormValues>> = TemplateWithFieldset.bind({});
WithFieldset.args = {
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
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => action('onSubmit')(data);

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend className="mb-2 font-sans font-semibold text-gray-800">Category</legend>
          <Tag
            id="story-check"
            name="category"
            register={register}
            invalid={!!errors.category}
            aria-describedby="form-error"
            {...args}
          >
            Tourism & Recreation
          </Tag>
          {errors.category?.message && (
            <p id="form-error" className="pl-2 mt-1 text-xs text-red-700">
              {errors.category?.message}
            </p>
          )}
        </fieldset>

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
  } = useForm<FormValues>();

  return (
    <div className="p-4">
      <fieldset>
        <legend className="mb-2 font-sans font-semibold text-gray-800">Category</legend>
        <Tag
          id="story-tag"
          name="category"
          register={register}
          aria-describedby="form-error"
          {...args}
        >
          Tourism & Recreation
        </Tag>
        {errors.category?.message && (
          <p id="form-error" className="pl-2 mt-1 text-xs text-red-700">
            {errors.category?.message}
          </p>
        )}
      </fieldset>
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
