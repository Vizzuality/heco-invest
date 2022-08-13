import { Control, Path, UseControllerProps } from 'react-hook-form';

import { MuiPickersOverrides } from '@material-ui/pickers/typings/overrides';

export type DatePickerCalendarProps<FormValues> = {
  /**  field name */
  name: Path<FormValues>;
  /**  field id */
  id: string;
  /**  React-hook-form control */
  control: Control<FormValues>;
  /**  React-hook-form control options */
  controlOptions: UseControllerProps<FormValues>['rules'] & { disabled: boolean };
};

type overridesNameToClassKey = {
  [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
};

type CustomType = {
  MuiPickersBasePicker: {
    pickerView: {
      maxWidth?: string;
    };
  };
};

declare module '@material-ui/core/styles/overrides' {
  interface ComponentNameToClassKey extends overridesNameToClassKey {}
  export interface ComponentNameToClassKey extends CustomType {}
}
