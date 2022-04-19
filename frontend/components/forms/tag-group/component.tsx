import { ReactElement, Children, useMemo, cloneElement } from 'react';

import { UseFormSetValue, FieldValues, UseFormClearErrors } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import { noop } from 'lodash-es';

import { TagGroupProps } from './types';

export const TagGroup = <FormValues extends FieldValues>({
  className,
  name,
  thresholdToShowSelectAll = 4,
  children,
  errors,
  clearErrors = noop as UseFormClearErrors<any>,
  setValue = noop as UseFormSetValue<any>,
  setValueOptions = { shouldDirty: true },
}: TagGroupProps<FormValues>) => {
  const numChildren = useMemo(() => Children.count(children), [children]);

  const allValues = useMemo(
    () => Children.map(children, (child: ReactElement) => child.props.value),
    [children]
  );

  const handleSelectAllClick = () => {
    setValue(name, allValues, setValueOptions); // Set the values on react-hook-form
    // Setting `shouldValidate` in `setValueOptions` will trigger a whole form validation
    // which we don't want. Since we're simply selecting all values, we can clear
    // the errors manually
    clearErrors(name);
  };

  const tags = Children.map(children, (child: ReactElement) => {
    return cloneElement(child, { name, invalid: errors && errors[name] });
  });

  const showSelectAllButton = numChildren >= thresholdToShowSelectAll;

  return (
    <div
      className={cx({
        [className]: !!className,
      })}
    >
      <div role="group">
        <div className="flex flex-wrap gap-4">{tags}</div>
      </div>

      {showSelectAllButton && (
        <button
          className="mt-6 text-sm font-light underline cursor-pointer text-green-dark"
          type="button"
          onClick={handleSelectAllClick}
        >
          <FormattedMessage defaultMessage="Select all" id="94Fg25" />
        </button>
      )}
    </div>
  );
};

export default TagGroup;
