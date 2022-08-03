import { FC, useMemo, useState } from 'react';

import cx from 'classnames';

import { useRouter } from 'next/router';

import DayjsUtils from '@date-io/dayjs';
import { TextField } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import { themeOptions } from './theme';

import { OpenCallCalendarProps } from '.';

dayjs.extend(isBetween);

const materialTheme = createTheme(themeOptions);

export const OpenCallCalendar: FC<OpenCallCalendarProps> = () => {
  const { locale } = useRouter();
  const [startDate, setStartDate] = useState<Dayjs>();
  const [endDate, setEndDate] = useState<Dayjs>();

  const handleChangeDate = (date: Dayjs) => {
    if (!startDate || !!endDate || startDate.isAfter(date)) {
      setStartDate(date);
      setEndDate(undefined);
    } else {
      setEndDate(date);
    }
  };

  const selectedDays = useMemo(() => {
    const selected = endDate?.diff(startDate, 'd', true);
    return selected ? selected + 1 : 0;
  }, [endDate, startDate]);

  return (
    <MuiPickersUtilsProvider locale={locale} utils={DayjsUtils}>
      <div className="flex flex-col items-center justify-center w-screen">
        <ThemeProvider theme={materialTheme}>
          <DatePicker
            variant="static"
            openTo="date"
            value={endDate || startDate}
            onChange={handleChangeDate}
            renderDay={(
              day: Dayjs,
              selectedDate: dayjs.Dayjs,
              dayInCurrentMonth: boolean,
              dayComponent: JSX.Element
            ) => {
              const isPastDate = day.isBefore(dayjs(), 'date');
              const isToday = dayjs().isSame(day, 'date');
              const isStartDate = startDate?.isSame(day, 'date');
              const isOnRange =
                startDate && endDate && dayjs(day).isBetween(startDate, endDate, 'date', '[]');
              return (
                <div
                  className={cx('w-[100px] py-4 pl-4 border rounded-xl font-semibold text-xl', {
                    underline: isToday,
                    'text-green-dark border-green-dark': isOnRange || isStartDate,
                    'border-beige': !day.isSame(startDate?.day()),
                    'text-gray-400': isPastDate || !dayInCurrentMonth,
                  })}
                >
                  {day.date()}
                </div>
              );
            }}
            disablePast
            disableFuture={false}
            TextFieldComponent={({ inputRef, ...props }) => (
              <TextField
                style={{ minWidth: '1000px' }}
                ref={inputRef}
                {...props}
                fullWidth={true}
              />
            )}
            disableToolbar
            leftArrowButtonProps={{ className: 'bg-red hover:bg-white border border-beige' }}
            rightArrowButtonProps={{ className: 'bg-red hover:bg-white border border-beige' }}
          />
          <p>{selectedDays} days selected</p>
        </ThemeProvider>
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default OpenCallCalendar;
