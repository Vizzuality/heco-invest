import React, { useRef } from 'react';

import { useSelect, HiddenSelect, useButton } from 'react-aria';
import { ChevronDown as ChevronDownIcon } from 'react-feather';
import { FieldValues, Path, PathValue, UnpackNestedValue, useController } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { useSelectState } from 'react-stately';

import cx from 'classnames';

import { AriaSelectProps } from '@react-types/select';

import { mergeRefs } from 'helpers/refs';

import Icon from 'components/icon';

import Listbox from './listbox';
import Popover from './popover';
import { SelectProps } from './types';

export const Select = <FormValues extends FieldValues, T extends object>({
  name,
  placeholder,
  className,
  direction = 'bottom',
  control,
  controlOptions,
  ...rest
}: SelectProps<FormValues, T>) => {
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

  const ariaSelectProps: AriaSelectProps<T> = {
    ...rest,
    name: name,
    selectedKey: value,
    isDisabled: controlOptions.disabled,
    isRequired: controlOptions.required === 'true' || typeof controlOptions.required === 'string',
    onSelectionChange: (key) => onChange({ type: 'change', target: { name: name, value: key } }),
    onBlur,
  };

  const state = useSelectState(ariaSelectProps);

  const triggerRef = useRef(null);
  const { triggerProps, valueProps, menuProps } = useSelect(ariaSelectProps, state, triggerRef);

  const { buttonProps } = useButton(
    { ...triggerProps, isDisabled: controlOptions.disabled },
    triggerRef
  );

  return (
    <div
      className={cx({
        'relative text-base text-gray-900': true,
        [className]: !!className,
      })}
    >
      <HiddenSelect
        state={state}
        triggerRef={triggerRef}
        label={ariaSelectProps.label}
        name={ariaSelectProps.name}
        isDisabled={controlOptions.disabled}
      />
      <button
        {...buttonProps}
        ref={mergeRefs([triggerRef, ref])}
        className={cx({
          'flex justify-between items-center w-full px-4 py-2 text-left border border-solid hover:shadow-sm focus:shadow-sm focus:border-green-dark outline-none bg-white rounded-lg disabled:opacity-60 transition':
            true,
          'border-beige': !state.isOpen,
          'shadow-sm': state.isOpen,
          'text-gray-900': state.selectedItem,
          'text-gray-400': !state.selectedItem,
          'border-green-dark': !invalid && state.isOpen,
          'border-red-700': invalid,
        })}
      >
        <span {...valueProps}>
          {(state.selectedItem ? state.selectedItem.rendered : placeholder) ?? (
            <FormattedMessage defaultMessage="Select an option" id="tGAYL2" />
          )}
        </span>
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
        <Popover isOpen={state.isOpen} onClose={state.close} direction={direction}>
          <Listbox {...menuProps} state={state} />
        </Popover>
      )}
    </div>
  );
};

export default Select;
