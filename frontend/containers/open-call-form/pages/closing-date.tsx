import { FC, useState } from 'react';

import { FormattedMessage } from 'react-intl';

import dayjs, { Dayjs } from 'dayjs';

import ErrorMessage from 'components/forms/error-message';

import OpenCallCalendar from '../../../components/forms/date-picker-calendar';
import { OpenCallClosingDateProps } from '../types';

export const OpenCallClosingDate: FC<OpenCallClosingDateProps> = ({ control, errors }) => {
  const [totalDays, setTotalDays] = useState(0);

  const handleChangeDate = (event: any) => {
    const newDate: Dayjs = event.target.value;
    // total days between now and the closing_date (the selected date)
    // The 'true' on the last function param is to return a float value, so we use the Math.ceil to round up, and the + 1 is to add the current day
    const total = newDate?.diff(dayjs(), 'd', true);
    setTotalDays(total ? Math.ceil(total) + 1 : 0);
  };

  return (
    <div className="max-w-[814px] m-auto">
      <div className="mb-10">
        <h1 className="mb-2 font-serif text-3xl font-semibold">
          <FormattedMessage
            defaultMessage="How long will the open call be available?"
            id="BeVl3b"
          />
        </h1>
        <p className="text-gray-600">
          <FormattedMessage defaultMessage="Select the deadline for this open call." id="KcJ5IK" />
        </p>
      </div>
      <div>
        <OpenCallCalendar
          control={control}
          name="closing_at"
          id="closing_at"
          controlOptions={{
            disabled: false,
            required: 'This field is required',
            onChange: handleChangeDate,
          }}
        />
        <ErrorMessage id="closing_at-error" errorText={errors?.closing_at?.message} />
      </div>
      <div className="text-center font-lg mt-7">
        <p>
          <FormattedMessage
            defaultMessage="Starting today, this open call will be available for"
            id="i2oTer"
          />{' '}
          <span className="px-4 py-2 border rounded-lg border-beige">{totalDays}</span>{' '}
          <FormattedMessage defaultMessage="days" id="Bc20la" />
        </p>
      </div>
    </div>
  );
};
