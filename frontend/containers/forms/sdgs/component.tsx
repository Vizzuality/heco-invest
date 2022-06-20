import { useMemo } from 'react';

import { FieldValues } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import { SDGS_IMAGES } from 'containers/sdgs/constants';

import { useEnums } from 'services/enums/enumService';

import SDG from './sdg';
import { SDGsProps } from './types';

export const SDGs = <FormValues extends FieldValues>({
  className,
  name,
  errors,
  register,
  registerOptions,
  setValue,
  clearErrors,
  setValueOptions = { shouldDirty: true },
  defaultValues = [],
}: SDGsProps<FormValues>) => {
  const {
    data: { sdg: allSdgs = [] },
  } = useEnums();

  // Casting as any as a workaround for the following issue:
  // https://github.com/react-hook-form/react-hook-form/discussions/7246
  const allValues = useMemo(() => allSdgs.map(({ id }) => id) as any, [allSdgs]);

  const handleSelectAllClick = () => {
    // Set the values on react-hook-form
    setValue(name, allValues, setValueOptions);
    // Setting `shouldValidate` in `setValueOptions` will trigger a whole form validation
    // which we don't want. Since we're simply selecting all values, we can clear
    // the errors manually
    clearErrors(name);
  };

  return (
    <div
      className={cx({
        [className]: !!className,
      })}
    >
      <div role="group">
        <div className="flex flex-wrap items-center gap-2">
          {allSdgs.map(({ id, name: title }) => (
            <SDG
              key={id}
              id={id.toString()}
              name={name}
              image={SDGS_IMAGES[id]}
              title={title}
              defaultChecked={defaultValues && defaultValues.includes(Number(id))}
              register={register}
              registerOptions={registerOptions}
              invalid={errors && errors[name]}
            />
          ))}
        </div>
      </div>

      <button
        className="mt-6 text-sm font-light underline rounded cursor-pointer text-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark"
        type="button"
        onClick={handleSelectAllClick}
      >
        <FormattedMessage defaultMessage="Select all" id="94Fg25" />
      </button>
    </div>
  );
};

export default SDGs;
