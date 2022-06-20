import React from 'react';

import { SubmitHandler, useForm, NestedValue } from 'react-hook-form';

import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';
import withMock from 'storybook-addon-mock';

import Button from 'components/button';
import apiEnumsMock from 'mockups/api/v1/enums.json';

import { apiBaseUrl } from 'services/api';

import SDGs, { SDGsProps } from '.';

const apiUrl = `${apiBaseUrl}/api/v1`;

const mockApiData = [
  {
    url: `${apiUrl}/enums`,
    method: 'GET',
    status: 200,
    response: apiEnumsMock,
  },
];

export default {
  component: SDGs,
  title: 'Containers/Forms/SDGs',
  argTypes: {
    register: { control: { disable: true } },
  },
  decorators: [withMock],
} as Meta;

interface FormValues {
  sdgs: NestedValue<string[]>;
}

const Template: Story<SDGsProps<FormValues>> = (args: SDGsProps<FormValues>) => {
  const {
    register,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <div className="p-4">
      <fieldset>
        <legend className="mb-2 font-sans font-semibold text-gray-800">
          Select the SDGs you are interested in
        </legend>
        <SDGs
          name={args.name}
          setValue={setValue}
          clearErrors={clearErrors}
          errors={errors}
          register={register}
        />
      </fieldset>
    </div>
  );
};

export const Default: Story<SDGsProps<FormValues>> = Template.bind({});
Default.args = {
  name: 'sdgs',
};
Default.parameters = {
  mockData: mockApiData,
};

const TemplateWithForm: Story<SDGsProps<FormValues>> = (args: SDGsProps<FormValues>) => {
  const {
    register,
    setValue,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    shouldUseNativeValidation: true,
    shouldFocusError: true,
    reValidateMode: 'onChange',
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
        <fieldset name={args.name}>
          <legend className="mb-2 font-sans font-semibold text-gray-800">
            Select the SDGs you are interested in
          </legend>
          <SDGs
            name={args.name}
            setValue={setValue}
            errors={errors}
            clearErrors={clearErrors}
            register={register}
            registerOptions={args.registerOptions}
          />
          {errors.sdgs?.message && (
            <p id="form-error" className="pl-2 mt-1 text-xs text-red-700">
              {errors.sdgs?.message}
            </p>
          )}
        </fieldset>

        <Button type="submit" className="mt-2">
          Submit
        </Button>
        <p className="mt-2 text-xs text-gray-50">
          Submit the form to see the {"SDGs'"} error state (selecting SDGs is required).
        </p>
      </form>
    </div>
  );
};

export const ErrorState: Story<SDGsProps<FormValues>> = TemplateWithForm.bind({});

// Issue: https://github.com/react-hook-form/react-hook-form/issues/4449
// Workaround: https://github.com/storybookjs/storybook/issues/12747
ErrorState.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
  mockData: mockApiData,
};

ErrorState.args = {
  name: 'sdgs',
  registerOptions: {
    required: 'Selecting SDGs is required.',
  },
};
