import React, { useRef } from 'react';

import { useComboBox, useFilter, useButton } from 'react-aria';
import { ChevronDown as ChevronDownIcon, X } from 'react-feather';
import { FieldValues, Path, PathValue, UnpackNestedValue, useController } from 'react-hook-form';
import { useComboBoxState } from 'react-stately';

import cx from 'classnames';

import type { ComboBoxProps } from '@react-types/combobox';

import { mergeRefs } from 'helpers/refs';

import Icon from 'components/icon';

import Listbox from '../select/listbox';
import Popover from '../select/popover';

import { ComboboxProps } from './types';

export const Combobox = <FormValues extends FieldValues, T extends object>({
  name,
  placeholder,
  className,
  direction = 'bottom',
  control,
  controlOptions,
  ...rest
}: ComboboxProps<FormValues, T>) => {
  const {
    field: { ref, value, onChange, onBlur },
    fieldState: { invalid },
  } = useController({
    name,
    control,
    rules: controlOptions,
    defaultValue: controlOptions.value as UnpackNestedValue<
      PathValue<FormValues, Path<FormValues>>
    >,
  });

  const ariaComboboxProps: ComboBoxProps<T> = {
    ...rest,
    selectedKey: value,
    isDisabled: controlOptions.disabled,
    isRequired: controlOptions.required === 'true' || typeof controlOptions.required === 'string',
    onSelectionChange: (key) => onChange({ type: 'change', target: { name: name, value: key } }),
    onBlur,
    placeholder,
  };

  const { contains } = useFilter({ sensitivity: 'base' });

  const state = useComboBoxState({ ...ariaComboboxProps, defaultFilter: contains });

  const triggerRef = useRef(null);
  const clearRef = useRef(null);
  const inputRef = React.useRef(null);
  const listboxRef = React.useRef(null);
  const popoverRef = React.useRef(null);
  const {
    buttonProps: triggerProps,
    inputProps,
    listBoxProps: listboxProps,
  } = useComboBox(
    { ...ariaComboboxProps, inputRef, buttonRef: triggerRef, listBoxRef: listboxRef, popoverRef },
    state
  );

  const { buttonProps } = useButton(
    { ...triggerProps, isDisabled: controlOptions.disabled },
    triggerRef
  );

  return (
    <div
      className={cx({
        'relative text-base text-gray-900 px-4 py-2 flex justify-between items-center w-full border border-solid hover:shadow-sm bg-white rounded-lg transition':
          true,
        'border-beige': !state.isOpen && !state.isFocused,
        'shadow-sm': state.isOpen || state.isFocused,
        'text-gray-900': state.selectedItem,
        'text-gray-400': !state.selectedItem,
        'border-green-dark': (!invalid && state.isOpen) || state.isFocused,
        'border-red-600': invalid && !state.isFocused,
        'opacity-60': controlOptions.disabled,
        [className]: !!className,
      })}
    >
      <input
        {...inputProps}
        ref={mergeRefs([ref, inputRef])}
        name={name}
        className="outline-none grow"
      />
      <button {...buttonProps} ref={triggerRef} className="shrink-0">
        <Icon
          aria-hidden={true}
          icon={ChevronDownIcon}
          className={cx({
            'inline-block w-5 h-5 ml-2 text-gray-600 shrink-0 transition': true,
            'rotate-180': state.isOpen,
          })}
        />
      </button>
      {state.isOpen && (
        <Popover
          popoverRef={popoverRef}
          isOpen={state.isOpen}
          onClose={state.close}
          direction={direction}
        >
          <Listbox {...listboxProps} listBoxRef={listboxRef} state={state} />
        </Popover>
      )}
    </div>
  );
};

export default Combobox;
