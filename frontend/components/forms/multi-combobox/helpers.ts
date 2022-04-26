import { IntlShape } from 'react-intl';

// The orginal version of this code comes from:
// https://github.com/JedWatson/react-select/blob/54f9538e350bae4e11aa11311731cb95eb56d669/packages/react-select/src/accessibility/index.ts#L99
export const getAriaLiveMessages = (intl: IntlShape) => ({
  guidance: (props: any) => {
    const { isDisabled, context } = props;
    switch (context) {
      case 'menu':
        if (isDisabled) {
          return intl.formatMessage({
            defaultMessage:
              'Use up and down to choose options, press escape to exit the menu, press tab to select the option and exit the menu.',
            id: '/PlWea',
          });
        }

        return intl.formatMessage({
          defaultMessage:
            'Use up and down to choose options, press Enter to select the currently focused option, press escape to exit the menu, press tab to select the option and exit the menu.',
          id: 'QncmS+',
        });
      case 'input':
        return intl.formatMessage(
          {
            defaultMessage:
              '{inputName} is focused, type to refine list, press down to open the menu, press left to focus selected values',
            id: '4vn+6A',
          },
          {
            inputName:
              props['aria-label'] ||
              intl.formatMessage({ defaultMessage: 'Combobox', id: 'IXFPYD' }),
          }
        );
      case 'value':
        return intl.formatMessage({
          defaultMessage:
            'Use left and right to toggle between focused values, press backspace to remove the currently focused value',
          id: 'DWQSFT',
        });
      default:
        return '';
    }
  },

  onChange: (props: any) => {
    const { action, label = '', labels, isDisabled } = props;
    switch (action) {
      case 'deselect-option':
      case 'pop-value':
      case 'remove-value':
        return intl.formatMessage(
          {
            defaultMessage: 'option {optionName}, deselected.',
            id: 'rhAEk6',
          },
          { optionName: label }
        );
      case 'clear':
        return intl.formatMessage({
          defaultMessage: 'All selected options have been cleared.',
          id: 'x6wKw3',
        });
      case 'initial-input-focus':
        return intl.formatMessage(
          { defaultMessage: 'options {options}, selected.', id: 'U1OBY8' },
          { options: labels.join(', ') }
        );
      case 'select-option':
        return isDisabled
          ? intl.formatMessage(
              {
                defaultMessage: 'option {optionName} is disabled. Select another option.',
                id: 'KlHNih',
              },
              { optionName: label }
            )
          : intl.formatMessage(
              {
                defaultMessage: 'option {optionName}, selected.',
                id: 'ZaT/7W',
              },
              { optionName: label }
            );
      default:
        return '';
    }
  },

  onFocus: (props: any) => {
    const { context, focused, options, label = '', selectValue, isDisabled, isSelected } = props;

    const getArrayIndex = (arr, item) =>
      arr && arr.length
        ? intl.formatMessage(
            {
              defaultMessage: '{start} of {end}',
              id: '3dEg+E',
            },
            {
              start: arr.indexOf(item) + 1,
              end: arr.length,
            }
          )
        : '';

    if (context === 'value' && selectValue) {
      return intl.formatMessage(
        {
          defaultMessage: 'value {optionName} focused, {pagination}.',
          id: 'RDCAd6',
        },
        { optionName: label, pagination: getArrayIndex(selectValue, focused) }
      );
    }

    if (context === 'menu') {
      const disabled = isDisabled
        ? intl.formatMessage({
            defaultMessage: 'disabled',
            id: 'hkIfkj',
          })
        : '';
      const selected = isSelected
        ? intl.formatMessage({
            defaultMessage: 'selected',
            id: 'LtTjKV',
          })
        : '';
      const focused = !isSelected
        ? intl.formatMessage({
            defaultMessage: 'focused',
            id: 'Jwjqn/',
          })
        : '';
      return intl.formatMessage(
        {
          defaultMessage: 'option {optionName} {status}, {pagination}.',
          id: '1MTH/x',
        },
        {
          optionName: label,
          status: `${selected} ${focused} ${disabled}`,
          pagination: getArrayIndex(options, focused),
        }
      );
    }
    return '';
  },

  onFilter: (props: any) => {
    const { inputValue, resultsMessage } = props;

    if (inputValue) {
      return intl.formatMessage(
        {
          defaultMessage: '{message} for search term {term}',
          id: 'gpTOIc',
        },
        {
          message: resultsMessage,
          term: inputValue,
        }
      );
    }

    return resultsMessage;
  },
});
