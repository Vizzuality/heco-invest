import React, { Children, ReactElement, useMemo } from 'react';

import { FieldValues, Path, PathValue, UnpackNestedValue, useController } from 'react-hook-form';
import { useIntl } from 'react-intl';
import ReactSelect from 'react-select';

import cx from 'classnames';

import DropdownIndicator from './dropdown-indicator';
import { getAriaLiveMessages } from './helpers';
import MenuOption from './menu-option';
import MultiValueRemove from './multi-value-remove';
import { OptionProps } from './option';
import { MultiComboboxProps } from './types';

export const Select = <FormValues extends FieldValues>({
  id,
  name,
  'aria-label': ariaLabel,
  placeholder,
  direction = 'bottom',
  className,
  control,
  controlOptions,
  disabledKeys = [],
  overflow = false,
  clearable = false,
  children,
}: MultiComboboxProps<FormValues>) => {
  const intl = useIntl();

  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid },
  } = useController({
    name,
    control,
    rules: controlOptions,
    defaultValue: controlOptions.value as UnpackNestedValue<
      PathValue<FormValues, Path<FormValues>>
    >,
  });

  const options = useMemo(
    () =>
      Children.map(children, (child: ReactElement<OptionProps<{}>>) => ({
        label: child.props.children,
        value: child.key as string,
        isDisabled: disabledKeys.includes(child.key as string),
      })),
    [children, disabledKeys]
  );

  const selectedOptions = useMemo(() => {
    if (!value) return [];

    return options.filter((option) => (value as string[]).includes(option.value));
  }, [options, value]);

  return (
    <div className={cx('relative w-full', className)}>
      <ReactSelect
        inputId={id}
        aria-label={ariaLabel}
        options={options}
        value={selectedOptions}
        onChange={(options) =>
          onChange({
            type: 'change',
            target: { name: name, value: options.map((option) => option.value) },
          })
        }
        onBlur={onBlur}
        className={cx({ 'c-select': true, invalid })}
        classNamePrefix="c-select-menu"
        isDisabled={controlOptions.disabled}
        isSearchable
        menuPosition={overflow ? 'fixed' : 'absolute'}
        placeholder={placeholder}
        isClearable={clearable}
        isMulti
        menuPlacement={direction}
        hideSelectedOptions={false}
        components={{
          DropdownIndicator,
          MultiValueRemove,
          ClearIndicator: null,
          Option: MenuOption,
        }}
        ariaLiveMessages={getAriaLiveMessages(intl)}
      />
    </div>
  );
};

export default Select;
