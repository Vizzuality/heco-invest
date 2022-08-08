import { Control, Path, UseControllerProps } from 'react-hook-form';

import { MuiPickersOverrides } from '@material-ui/pickers/typings/overrides';

import { OpenCallForm } from 'types/open-calls';

export type OpenCallCalendarProps = {
  /**  field name */
  name: Path<OpenCallForm>;
  /**  field id */
  id: string;
  /**  React-hook-form control */
  control: Control<OpenCallForm>;
  /**  React-hook-form control options */
  controlOptions: UseControllerProps<OpenCallForm>['rules'] & { disabled: boolean };
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
