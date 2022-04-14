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
  const { register, setValue } = useForm<FormValues>();

  return (
    <div className="p-4">
      <fieldset>
        <legend className="mb-2 font-sans font-semibold text-gray-800">Category</legend>
        <TagGroup name={args.name} setValue={setValue}>
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
      </fieldset>
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
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => action('onSubmit')(data);

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend className="mb-2 font-sans font-semibold text-gray-800">Category</legend>
          <TagGroup name={args.name} setValue={setValue}>
            <Tag
              id="first-category"
              value="first-category"
              aria-describedby="form-error"
              register={register}
              invalid={!!errors.categories}
              {...args}
            >
              First category
            </Tag>
            <Tag
              id="second-category"
              value="second-category"
              aria-describedby="form-error"
              register={register}
              invalid={!!errors.categories}
              {...args}
            >
              Second category
            </Tag>
            <Tag
              id="third-category"
              value="third-category"
              aria-describedby="form-error"
              register={register}
              invalid={!!errors.categories}
              {...args}
            >
              Third category
            </Tag>
            <Tag
              id="fourth-category"
              value="fourth-category"
              aria-describedby="form-error"
              register={register}
              invalid={!!errors.categories}
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
        </fieldset>

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
