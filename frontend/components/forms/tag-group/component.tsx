import { ReactElement, Children, useMemo, cloneElement } from 'react';

import { FieldValues } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import { TagGroupProps } from './types';

export const TagGroup = <FormValues extends FieldValues>({
  className,
  name: nameProp,
  type: typeProp,
  thresholdToShowSelectAll = 4,
  children,
  errors,
  watch,
  clearErrors,
  setValue,
  setValueOptions = { shouldDirty: true },
}: TagGroupProps<FormValues>) => {
  const numChildren = useMemo(() => Children.count(children), [children]);

  const allValues = useMemo(
    () => Children.map(children, (child: ReactElement) => child.props.value),
    [children]
  );

  // Determining the tags name. If one has been passed, we'll use it and set all the children
  // to it. If not, we'll try to infer it from the first tag/child's props
  const tagName = nameProp || (Children.toArray(children)[0] as ReactElement)?.props.name;

  // Determining the tags type (checkbox or radio). If one has been passed, we'll use it
  // and set all the children to it. If not, we'll try to infer it from the first tag/child's
  // props. If none set, default to checkbox.
  const tagType =
    typeProp || (Children.toArray(children)[0] as ReactElement)?.props.type || 'checkbox';

  const handleSelectAllClick = () => {
    if (tagType !== 'checkbox') return;
    setValue(tagName, allValues, setValueOptions); // Set the values on react-hook-form
    // Setting `shouldValidate` in `setValueOptions` will trigger a whole form validation
    // which we don't want. Since we're simply selecting all values, we can clear
    // the errors manually
    clearErrors(tagName);
  };

  const tags = Children.map(children, (child: ReactElement) => {
    return cloneElement(child, {
      name: tagName,
      type: tagType,
      watch,
      invalid: errors && errors[tagName],
    });
  });

  const showSelectAllButton = tagType === 'checkbox' && numChildren >= thresholdToShowSelectAll;

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
