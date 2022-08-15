import React, { useState } from 'react';

import { FieldError, SubmitHandler, useForm } from 'react-hook-form';

import { Story, Meta } from '@storybook/react/types-6-0';
import { Dayjs } from 'dayjs';

import Button from 'components/button';

import DatePickerCalendar, { DatePickerCalendarProps } from '.';

export default {
  component: DatePickerCalendar,
  title: 'Components/Forms/DatePickerCalendar',
  argTypes: {
    register: { control: { disable: true } },
  },
} as Meta;

interface FormValues {
  date_picker: Dayjs;
}

const Template: Story<DatePickerCalendarProps<FormValues>> = (
  args: DatePickerCalendarProps<FormValues>
) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [date, setDate] = useState<string>();
  const onSubmit: SubmitHandler<FormValues> = (values) => {
    setDate((values.date_picker as Dayjs).format('DD/MM/YYYY'));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DatePickerCalendar control={control} {...args} />
      <Button type="submit">Submit</Button>
      {errors.date_picker && (
        <p className="text-red-700">{(errors.date_picker as FieldError).message}</p>
      )}
      <p className="text-xl text-green-dark">{date}</p>
    </form>
  );
};

export const WithLabel: Story<DatePickerCalendarProps<FormValues>> = Template.bind({});
WithLabel.args = {
  name: 'date_picker',
  controlOptions: { disabled: false, required: 'Select a date' },
};
