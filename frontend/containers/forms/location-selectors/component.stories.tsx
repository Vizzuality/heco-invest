import React, { useState } from 'react';

import { useForm } from 'react-hook-form';

import { Story, Meta } from '@storybook/react/types-6-0';

import Button from 'components/button';

import LocationSelectors, { LocationSelectorsTypes } from '.';

export default {
  component: LocationSelectors,
  title: 'Containers/Forms/LocationSelectors',
} as Meta;

type FormValues = {
  country_id: string;
  department_id: string;
  municipality_id: string;
};

const Template: Story<LocationSelectorsTypes<FormValues>> = ({ fields }) => {
  const {
    control,
    formState: { errors },
    resetField,
    handleSubmit,
  } = useForm<FormValues>();

  const [locations, setLocations] = useState<FormValues>();

  const onSubmit = (data: FormValues) => {
    setLocations(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <LocationSelectors
        control={control}
        errors={errors}
        fields={fields}
        resetField={resetField}
      />
      <Button className="my-4" type="submit">
        Submit
      </Button>
      <p>country id: {locations?.country_id}</p>
      <p>department id: {locations?.department_id}</p>
      <p>municipality id: {locations?.municipality_id}</p>
    </form>
  );
};

export const Default: Story<LocationSelectorsTypes<FormValues>> = Template.bind({});
Default.args = {
  fields: {
    country: {
      fieldName: 'country_id',
      required: true,
      controlOptions: { required: 'Country is required' },
    },
    state: {
      fieldName: 'department_id',
      required: true,
      controlOptions: { required: 'State is required' },
    },
    municipality: {
      fieldName: 'municipality_id',
      required: true,
      controlOptions: { required: 'Municipality is required' },
    },
  },
};
