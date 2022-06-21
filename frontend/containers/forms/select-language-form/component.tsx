import { FieldValues } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { useLanguageNames } from 'helpers/pages';

import ErrorMessage from 'components/forms/error-message';
import Label from 'components/forms/label';
import languages from 'locales.config.json';

import { SelectLanguageFormProps } from './types';

export const SelectLanguageForm = <FormValues extends FieldValues>({
  errors,
  register,
  fieldName,
}: SelectLanguageFormProps<FormValues>) => {
  const languageNames = useLanguageNames();

  return (
    <form className="flex flex-col justify-between" noValidate>
      <h1 className="mb-6 font-serif text-3xl font-semibold text-green-dark">
        <FormattedMessage defaultMessage="I want to write my content in" id="APjPYs" />
      </h1>
      <div>
        <fieldset className="flex justify-center mt-2 gap-x-6">
          <legend>
            <p id="language-description" className="mb-20 font-sans text-base">
              <FormattedMessage
                defaultMessage="Select the account language in which you want to write the content of this account. This will avoid mixed content in the platform."
                id="5GLwZF"
              />
            </p>
          </legend>
          {languages.locales.map((lang) => {
            const { name, locale } = lang;
            return (
              <div key={locale} className="flex flex-col justify-center w-full text-center">
                <input
                  name={name}
                  required
                  id={locale}
                  type="radio"
                  className="appearance-none peer"
                  value={locale}
                  {...register(fieldName)}
                  aria-describedby="language-error"
                />
                <Label
                  htmlFor={locale}
                  className="flex flex-col justify-center w-full text-center border rounded-lg py-7 border-beige peer-checked:border-green-dark"
                >
                  <span className="block font-sans text-lg font-semibold text-green-dark">
                    {languageNames[locale]}
                  </span>
                  <span className="block font-normal">({name})</span>
                </Label>
              </div>
            );
          })}
        </fieldset>
      </div>
      <p className="text-red">
        <ErrorMessage id="language-error" errorText={errors?.language?.message} />
      </p>
    </form>
  );
};
export default SelectLanguageForm;
