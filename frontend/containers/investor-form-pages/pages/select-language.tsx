import { FC } from 'react';

import { FormattedMessage } from 'react-intl';

import ErrorMessage from 'components/forms/error-message';
import Label from 'components/forms/label';
import languages from 'locales.config.json';

import { SelectLanguageProps } from '../types';

export const SelectLanguage: FC<SelectLanguageProps> = ({ errors, register }) => {
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
              <Label
                key={locale}
                htmlFor={locale}
                className="justify-center block w-full text-center border rounded-lg py-7 border-beige"
              >
                <input
                  name={name}
                  required
                  id={locale}
                  type="radio"
                  value={locale}
                  {...register('language')}
                  aria-describedby="language-error"
                />
                <span className="block font-sans text-lg font-semibold text-green-dark">
                  {locale === 'es' && <FormattedMessage defaultMessage="Spanish" id="8WtyrD" />}
                  {locale === 'pt' && <FormattedMessage defaultMessage="Portuguese" id="A4UTjl" />}
                  {locale === 'en' && <FormattedMessage defaultMessage="English" id="WkrNSk" />}
                </span>
                <span className="block font-normal">({name})</span>
              </Label>
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
export default SelectLanguage;
