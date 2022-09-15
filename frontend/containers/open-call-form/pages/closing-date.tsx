import { FC, useCallback, useState } from 'react';

import { FormattedMessage } from 'react-intl';

import dayjs, { Dayjs } from 'dayjs';

import OpenCallCalendar from 'components/forms/date-picker-calendar';
import ErrorMessage from 'components/forms/error-message';

import { OpenCallClosingDateProps } from '../types';

const getDaysCountFromToday = (targetDate: Dayjs) => {
  // In order to have a “ceil” value, we pass `true` as the last param to get a float
  return Math.ceil(targetDate.diff(dayjs(), 'd', true)) + 1;
};

export const OpenCallClosingDate: FC<OpenCallClosingDateProps> = ({
  control,
  errors,
  getValues,
}) => {
  const [totalDays, setTotalDays] = useState(
    getValues('closing_at') ? getDaysCountFromToday(dayjs(getValues('closing_at'))) : 0
  );

  const handleChangeDate = useCallback((event: any) => {
    const newDate: Dayjs = event.target.value;
    setTotalDays(newDate ? getDaysCountFromToday(newDate) : 0);
  }, []);

  return (
    <>
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
            defaultMessage="Starting today, this open call will be available for <total></total> days."
            id="A2bq3p"
            values={{
              total: () => (
                <span className="px-4 py-2 border rounded-lg border-beige">{totalDays}</span>
              ),
            }}
          />
        </p>
      </div>
    </>
  );
};
