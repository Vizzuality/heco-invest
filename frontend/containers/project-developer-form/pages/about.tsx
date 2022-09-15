import { FC } from 'react';

import { FieldError } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { InterestNames } from 'hooks/useInterests';

import { CategoryTagDot } from 'containers/category-tag';

import Button from 'components/button';
import ErrorMessage from 'components/forms/error-message';
import FieldInfo from 'components/forms/field-info';
import Tag from 'components/forms/tag';
import TagGroup from 'components/forms/tag-group';
import { CategoryType } from 'types/category';
import { Enum } from 'types/enums';
import { Locations } from 'types/locations';

import { AboutProps } from '../types';

export const About: FC<AboutProps> = ({
  interests,
  enumsIsError,
  register,
  setValue,
  errors,
  clearErrors,
}) => {
  const { formatMessage } = useIntl();

  const getInterestsErrorText = (interestName: string) => {
    if (enumsIsError) {
      return formatMessage({ defaultMessage: 'Unable to load the data', id: 'zniaka' });
    }
    return (errors[interestName] as unknown as FieldError)?.message;
  };

  const getItemsInfoText = (items) => {
    return (
      <ul>
        {items?.map(({ id, name, description }) => (
          <li key={id}>
            <p className="font-sans text-sm font-semibold text-white">{name}</p>
            <p className="mb-4 font-sans text-sm font-normal text-white">{description}</p>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <form className="flex flex-col justify-between" noValidate>
      <div className="mb-10">
        <h1 className="mb-2 font-serif text-3xl font-semibold">
          <FormattedMessage defaultMessage="About your work" id="kEXoaQ" />
        </h1>
        <p className="font-sans text-base text-gray-600">
          <FormattedMessage
            defaultMessage="Tell us about your work and impact priorities."
            id="ViF88C"
          />
        </p>
      </div>
      {interests.map(({ name, title, items, infoText }) => (
        <div key={name} className="mb-7">
          <fieldset name={name}>
            <div className="flex justify-between">
              <legend className="font-sans font-semibold text-sm text-gray-800 mb-4.5">
                <span className="mr-2.5">{title}</span>

                <FieldInfo content={infoText || getItemsInfoText(items)} />
              </legend>
              {name === InterestNames.PriorityLandscapes && (
                <Button
                  theme="naked"
                  className="py-0 px-0 text-green-dark font-normal text-small underline inline !items-start"
                  to="/images/mosaics.png"
                  target="_blank"
                  size="small"
                  external
                >
                  <FormattedMessage defaultMessage="Landscapes location" id="4HIQfn" />
                </Button>
              )}
            </div>
            <TagGroup name={name} setValue={setValue} errors={errors} clearErrors={clearErrors}>
              {items?.map((item: Enum | Locations) => (
                <Tag
                  key={item.id}
                  id={item.id}
                  name={name}
                  value={item.id}
                  aria-describedby={`${name}-error`}
                  register={register}
                >
                  {item.type === 'category' && (
                    <CategoryTagDot category={item.id as CategoryType} />
                  )}
                  {item.name}
                </Tag>
              ))}
            </TagGroup>
          </fieldset>
          <ErrorMessage id={`${name}-error`} errorText={getInterestsErrorText(name)} />
        </div>
      ))}
    </form>
  );
};

export default About;
