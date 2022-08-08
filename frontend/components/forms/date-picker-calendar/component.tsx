import { FC } from 'react';

import { Path, PathValue, UnpackNestedValue, useController } from 'react-hook-form';

import cx from 'classnames';

import { useRouter } from 'next/router';

import DayjsUtils from '@date-io/dayjs';
import { TextField } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import { OpenCallForm } from 'types/open-calls';

import { themeOptions } from './theme';

import { OpenCallCalendarProps } from '.';

dayjs.extend(isBetween);

const materialTheme = createTheme(themeOptions);

export const OpenCallCalendar: FC<OpenCallCalendarProps> = ({ control, controlOptions, name }) => {
  const { locale } = useRouter();
  const today = dayjs();

  const {
    field: { ref, value, onChange, onBlur },
    fieldState,
  } = useController({
    name,
    control,
    rules: controlOptions,
    defaultValue: controlOptions.value as UnpackNestedValue<
      PathValue<OpenCallForm, Path<OpenCallForm>>
    >,
  });

  return (
    <MuiPickersUtilsProvider locale={locale} utils={DayjsUtils}>
      <ThemeProvider theme={materialTheme}>
        <DatePicker
          variant="static"
          openTo="date"
          value={value}
          onChange={onChange}
          renderDay={(day: Dayjs, selectedDate: dayjs.Dayjs, dayInCurrentMonth: boolean) => {
            const isToday = dayjs().isSame(day, 'date');
            const isOnRange = dayjs(day).isBetween(today, selectedDate, 'date', '[]');
            const isPastDate = day.isBefore(dayjs(), 'date');
            return (
              <div
                className={cx('w-full py-4 pl-4 border rounded-xl font-semibold text-xl', {
                  underline: isToday,
                  'text-green-dark border-green-dark': isOnRange,
                  'border-beige': !isOnRange,
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
            <TextField style={{ minWidth: '1000px' }} ref={inputRef} {...props} fullWidth={true} />
          )}
          disableToolbar
          leftArrowButtonProps={{ className: 'bg-red hover:bg-white border border-beige' }}
          rightArrowButtonProps={{ className: 'bg-red hover:bg-white border border-beige' }}
        />
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
};

export default OpenCallCalendar;
