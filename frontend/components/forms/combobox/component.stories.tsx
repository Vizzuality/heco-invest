import React from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';

import Button from 'components/button';

import Combobox, { ComboboxProps, Option } from '.';

export default {
  component: Combobox,
  title: 'Components/Forms/Combobox',
  argTypes: {
    register: { control: { disable: true } },
  },
} as Meta;

interface FormValues {
  sdg: string;
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

const Template: Story<ComboboxProps<FormValues, {}>> = (args: ComboboxProps<FormValues, {}>) => {
  const { control } = useForm<FormValues>();

  return (
    <>
      <Combobox control={control} {...args}>
        {OPTIONS.map(({ key, label }) => (
          <Option key={key}>{label}</Option>
        ))}
      </Combobox>
      <p className="mt-2 text-xs text-gray-50">
        This select is not accessible. Either define <code>aria-label</code> or associate a label
        (see the “With Label” story).
      </p>
    </>
  );
};

export const Default: Story<ComboboxProps<FormValues, {}>> = Template.bind({});
Default.args = {
  id: 'form-sdg',
  name: 'sdg',
  placeholder: 'Sustainable tourism',
  controlOptions: {
    disabled: false,
  },
};

export const DefaultValue: Story<ComboboxProps<FormValues, {}>> = Template.bind({});
DefaultValue.args = {
  id: 'form-sdg',
  name: 'sdg',
  placeholder: 'Sustainable tourism',
  controlOptions: {
    value: 'clean-water-and-sanitation',
    disabled: false,
  },
};

export const DisabledOptions: Story<ComboboxProps<FormValues, {}>> = Template.bind({});
DisabledOptions.args = {
  id: 'form-sdg',
  name: 'sdg',
  placeholder: 'Sustainable tourism',
  disabledKeys: ['industry-innovation-and-infrastructure', 'climate-action', 'life-on-land'],
  controlOptions: {
    disabled: false,
  },
};

export const OpenOnTop: Story<ComboboxProps<FormValues, {}>> = Template.bind({});
OpenOnTop.args = {
  id: 'form-sdg',
  name: 'sdg',
  placeholder: 'Sustainable tourism',
  className: 'mt-80',
  direction: 'top',
  controlOptions: {
    disabled: false,
  },
};

const TemplateWithLabel: Story<ComboboxProps<FormValues, {}>> = (
  args: ComboboxProps<FormValues, {}>
) => {
  const { control } = useForm<FormValues>();

  return (
    <>
      <label htmlFor={args.id} className="mb-2">
        Sustainable Development Goal
      </label>
      <Combobox control={control} {...args}>
        {OPTIONS.map(({ key, label }) => (
          <Option key={key}>{label}</Option>
        ))}
      </Combobox>
    </>
  );
};

export const WithLabel: Story<ComboboxProps<FormValues, {}>> = TemplateWithLabel.bind({});
WithLabel.args = {
  id: 'form-sdg',
  name: 'sdg',
  placeholder: 'Sustainable tourism',
  controlOptions: {
    disabled: false,
  },
};

const TemplateWithForm: Story<ComboboxProps<FormValues, {}>> = (
  args: ComboboxProps<FormValues, {}>
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
      <label htmlFor={args.id} className="mb-2">
        Sustainable Development Goal
      </label>
      <Combobox control={control} aria-describedby="form-error" {...args}>
        {OPTIONS.map(({ key, label }) => (
          <Option key={key}>{label}</Option>
        ))}
      </Combobox>
      {errors.sdg?.message && (
        <p id="form-error" className="pl-2 mt-1 text-xs text-red">
          {errors.sdg?.message}
        </p>
      )}
      <Button type="submit" className="mt-2">
        Submit
      </Button>
      <p className="mt-2 text-xs text-gray-50">
        Submit the form to see the {"select's"} error state (the select is required).
      </p>
    </form>
  );
};

export const ErrorState: Story<ComboboxProps<FormValues, {}>> = TemplateWithForm.bind({});
ErrorState.args = {
  id: 'form-sdg',
  name: 'sdg',
  placeholder: 'Sustainable tourism',
  controlOptions: {
    disabled: false,
    required: 'A SDG is required.',
  },
};
