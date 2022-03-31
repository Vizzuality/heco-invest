import React from 'react';

import { SubmitHandler, useForm, NestedValue } from 'react-hook-form';

import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';

import Button from 'components/button';
import Tag, { TagProps } from 'components/forms/tag';

import TagGroup from '.';

export default {
  component: TagGroup,
  title: 'Components/Forms/TagGroup',
  argTypes: {
    register: { control: { disable: true } },
  },
} as Meta;

interface FormValues {
  categories: NestedValue<string[]>;
}

const Template: Story<TagProps<FormValues>> = (args: TagProps<FormValues>) => {
  const { register, setValue, watch } = useForm<FormValues>();

  return (
    <div className="p-4">
      <TagGroup name={args.name} setValue={setValue} watch={watch}>
        <Tag
          id="first-category"
          value="first-category"
          aria-describedby="categories-error"
          register={register}
          {...args}
        >
          First category
        </Tag>
        <Tag
          id="second-category"
          value="second-category"
          aria-describedby="categories-error"
          register={register}
          {...args}
        >
          Second category
        </Tag>
        <Tag
          id="third-category"
          value="third-category"
          aria-describedby="categories-error"
          register={register}
          {...args}
        >
          Third category
        </Tag>
        <Tag
          id="fourth-category"
          value="fourth-category"
          aria-describedby="categories-error"
          register={register}
          {...args}
        >
          Four category
        </Tag>
      </TagGroup>
    </div>
  );
};

export const Default: Story<TagProps<FormValues>> = Template.bind({});
Default.args = {
  name: 'categories',
};

const TemplateWithForm: Story<TagProps<FormValues>> = (args: TagProps<FormValues>) => {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    // We don't want to use the native validation here; the validation is specific to the group
    // and not each tag individually, so we don't want the inputs to have the `valid` or `invalid`
    // pseudo classes
    shouldUseNativeValidation: false,
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
        <TagGroup name={args.name} setValue={setValue} watch={watch}>
          <Tag
            id="first-category"
            value="first-category"
            aria-describedby="categories-error"
            register={register}
            {...args}
          >
            First category
          </Tag>
          <Tag
            id="second-category"
            value="second-category"
            aria-describedby="categories-error"
            register={register}
            {...args}
          >
            Second category
          </Tag>
          <Tag
            id="third-category"
            value="third-category"
            aria-describedby="categories-error"
            register={register}
            {...args}
          >
            Third category
          </Tag>
          <Tag
            id="fourth-category"
            value="fourth-category"
            aria-describedby="categories-error"
            register={register}
            {...args}
          >
            Four category
          </Tag>
        </TagGroup>
        {errors.categories?.message && (
          <p id="form-error" className="pl-2 mt-1 text-xs text-red-700">
            {errors.categories?.message}
          </p>
        )}

        <Button type="submit" className="mt-2">
          Submit
        </Button>
        <p className="mt-2 text-xs text-gray-50">
          Submit the form to see the {"tags'"} error state (selecting tags is required).
        </p>
      </form>
    </div>
  );
};

export const ErrorState: Story<TagProps<FormValues>> = TemplateWithForm.bind({});
ErrorState.args = {
  name: 'categories',
  registerOptions: {
    required: 'Selecting categories is required.',
  },
};
