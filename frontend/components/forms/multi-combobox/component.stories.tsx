import React from 'react';

import { NestedValue, SubmitHandler, useForm } from 'react-hook-form';

import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';

import Button from 'components/button';

import MultiCombobox, { MultiComboboxProps, Option } from '.';

export default {
  component: MultiCombobox,
  title: 'Components/Forms/MultiCombobox',
  argTypes: {
    control: { control: { disable: true } },
  },
} as Meta;

interface FormValues {
  // `NestedValue` is needed for arrays: https://react-hook-form.com/ts/#NestedValue
  sdgs: NestedValue<string[]>;
}

const OPTIONS = [
  { key: 'no-poverty', label: 'No poverty' },
  { key: 'zero-hunger', label: 'Zero hunger' },
  { key: 'good-health-and-well-being', label: 'Good health and well-being' },
  { key: 'quality-education', label: 'Quality education' },
  { key: 'gender-equality', label: 'Gender equality' },
  { key: 'clean-water-and-sanitation', label: 'Clean water and sanitation' },
  { key: 'affordable-and-clean-energy', label: 'Affordable and clean energy' },
  { key: 'decent-work-and-economic-growth', label: 'Decent work and economic growth' },
  {
    key: 'industry-innovation-and-infrastructure',
    label: 'Industry, innovation and infrastructure',
  },
  { key: 'reduced-inequalities', label: 'Reduced inequalities' },
  { key: 'sustainable-cities-and-communities', label: 'Sustainable cities and communities' },
  {
    key: 'responsible-consumption-and-production',
    label: 'Responsible consumption and production',
  },
  { key: 'climate-action', label: 'Climate action' },
  { key: 'life-below-water', label: 'Life below water' },
  { key: 'life-on-land', label: 'Life on land' },
  { key: 'peace-justice-and-strong-institutions', label: 'Peace, justice and strong institutions' },
  { key: 'partnerships-for-the-goals', label: 'Partnerships for the goals' },
];

const Template: Story<MultiComboboxProps<FormValues>> = (args: MultiComboboxProps<FormValues>) => {
  const { control } = useForm<FormValues>();

  return (
    <>
      <MultiCombobox control={control} {...args}>
        {OPTIONS.map(({ key, label }) => (
          <Option key={key}>{label}</Option>
        ))}
      </MultiCombobox>
      <p className="mt-2 text-xs text-gray-50">
        This input is not accessible. Either define <code>aria-label</code> or associate a label
        (see the “With Label” story).
      </p>
    </>
  );
};

export const Default: Story<MultiComboboxProps<FormValues>> = Template.bind({});
Default.args = {
  id: 'form-sdgs',
  name: 'sdgs',
  placeholder: 'Sustainable tourism',
  controlOptions: {
    disabled: false,
  },
  clearable: true,
};

export const DefaultValue: Story<MultiComboboxProps<FormValues>> = Template.bind({});
DefaultValue.args = {
  id: 'form-sdgs',
  name: 'sdgs',
  placeholder: 'Sustainable tourism',
  controlOptions: {
    // NOTE: couldn't find a way around casting here
    value: ['no-poverty', 'clean-water-and-sanitation'] as FormValues['sdgs'],
    disabled: false,
  },
};

export const DisabledOptions: Story<MultiComboboxProps<FormValues>> = Template.bind({});
DisabledOptions.args = {
  id: 'form-sdgs',
  name: 'sdgs',
  placeholder: 'Sustainable tourism',
  disabledKeys: ['industry-innovation-and-infrastructure', 'climate-action', 'life-on-land'],
  controlOptions: {
    disabled: false,
  },
};

export const OpenOnTop: Story<MultiComboboxProps<FormValues>> = Template.bind({});
OpenOnTop.args = {
  id: 'form-sdgs',
  name: 'sdgs',
  placeholder: 'Sustainable tourism',
  className: 'mt-80',
  direction: 'top',
  controlOptions: {
    disabled: false,
  },
};

const TemplateWithLabel: Story<MultiComboboxProps<FormValues>> = (
  args: MultiComboboxProps<FormValues>
) => {
  const { control } = useForm<FormValues>();

  return (
    <>
      <label htmlFor={args.id} className="mb-2">
        Sustainable Development Goals
      </label>
      <MultiCombobox control={control} {...args}>
        {OPTIONS.map(({ key, label }) => (
          <Option key={key}>{label}</Option>
        ))}
      </MultiCombobox>
    </>
  );
};

export const WithLabel: Story<MultiComboboxProps<FormValues>> = TemplateWithLabel.bind({});
WithLabel.args = {
  id: 'form-sdgs',
  name: 'sdgs',
  placeholder: 'Sustainable tourism',
  controlOptions: {
    disabled: false,
  },
};

const TemplateWithForm: Story<MultiComboboxProps<FormValues>> = (
  args: MultiComboboxProps<FormValues>
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

  console.log(errors);

  return (
    <form
      // `noValidate` here prevents the browser from not submitting the form if there's a validation
      // error. We absolutely want the form to be submitted so that React Hook Form is made aware of
      // the validation errors and we can display errors below inputs.
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor={args.id} className="mb-2">
        Sustainable Development Goals
      </label>
      <MultiCombobox control={control} aria-describedby="form-error" {...args}>
        {OPTIONS.map(({ key, label }) => (
          <Option key={key}>{label}</Option>
        ))}
      </MultiCombobox>
      {errors.sdgs?.message && (
        <p id="form-error" className="pl-2 mt-1 text-xs text-red">
          {errors.sdgs?.message}
        </p>
      )}
      <Button type="submit" className="mt-2">
        Submit
      </Button>
      <p className="mt-2 text-xs text-gray-50">
        Submit the form to see the {"combobox's"} error state (the combobox is required).
      </p>
    </form>
  );
};

export const ErrorState: Story<MultiComboboxProps<FormValues>> = TemplateWithForm.bind({});
ErrorState.args = {
  id: 'form-sdgs',
  name: 'sdgs',
  placeholder: 'Sustainable tourism',
  controlOptions: {
    disabled: false,
    required: 'At least a SDG is required.',
  },
};
