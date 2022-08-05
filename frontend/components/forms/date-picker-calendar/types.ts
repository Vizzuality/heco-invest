import { Control, Path, UseControllerProps } from 'react-hook-form';

import { MuiPickersOverrides } from '@material-ui/pickers/typings/overrides';

import { OpenCall } from 'types/open-calls';

export type OpenCallCalendarProps = {
  control: Control<OpenCall>;
  name: Path<OpenCall>;
  controlOptions: UseControllerProps<OpenCall>['rules'] & { disabled: boolean };
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
