import { FC } from 'react';

import { FieldError } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import dynamic from 'next/dynamic';

import WebsiteSocial from 'containers/forms/website-social';

import Combobox, { Option } from 'components/forms/combobox';
import ErrorMessage from 'components/forms/error-message';
import FieldInfo from 'components/forms/field-info';
import Input from 'components/forms/input';
import Label from 'components/forms/label';
import TextArea from 'components/forms/textarea';

import { ProfileProps } from '../types';

const ImageUploader = dynamic(() => import('components/forms/image-uploader'), { ssr: false });

export const Profile: FC<ProfileProps> = ({
  control,
  errors,
  register,
  investorTypes,
  setValue,
  setError,
}) => {
  const { formatMessage } = useIntl();

  return (
    <form className="flex flex-col justify-between" noValidate>
      <div className="mb-10">
        <h1 className="mb-2 font-serif text-3xl font-semibold">
          <FormattedMessage defaultMessage="Investor/Funder profile" id="BHJZyR" />
        </h1>
        <p className="font-sans text-base text-gray-600">
          <FormattedMessage
            defaultMessage="General information about the investor/funder."
            id="gjBW8J"
          />
        </p>
      </div>
      <div className="mb-6.5">
        <p className="font-sans font-medium text-base text-gray-600 mb-4.5">
          <FormattedMessage defaultMessage="General" id="1iEPTM" />
        </p>
        <div className="mb-3">
          <Label htmlFor="picture" className="mr-2.5">
            <FormattedMessage defaultMessage="Picture" id="wvoA3H" />
          </Label>
          <FieldInfo
            infoText={formatMessage({
              defaultMessage: 'Add your logo or a picture that indentifies the account.',
              id: 'bjubNC',
            })}
          />
        </div>
        <ImageUploader
          setError={setError}
          name="picture"
          id="picture"
          setValue={setValue}
          register={register}
          preview
          aria-describedby="picture-error"
        />
        <ErrorMessage id="picture-error" errorText={errors?.picture?.message} />
      </div>
      <div className="md:flex gap-x-6 mb-6.5">
        <div className="md:w-1/2 mb-6.5 md:m-0">
          <Label htmlFor="name">
            <FormattedMessage defaultMessage="Project developer name" id="Sv/Mtz" />
            <Input
              name="name"
              className="mt-2.5"
              aria-required
              id="name"
              type="text"
              register={register}
              placeholder={formatMessage({
                defaultMessage: 'insert the name',
                id: 'WAr33U',
              })}
              aria-describedby="name-error"
            />
          </Label>
          <ErrorMessage id="name-error" errorText={errors?.name?.message} />
        </div>
        <div className="md:w-1/2">
          <Label htmlFor="project-developer-type" id="project-developer-type-label">
            <FormattedMessage defaultMessage="Project developer type" id="3tWxy0" />
            <Combobox
              control={control}
              controlOptions={{ disabled: false }}
              aria-required
              name="investor_type"
              id="project-developer-type"
              className="mt-2.5 w-full h-10 border border-beige rounded-lg px-4"
              placeholder={formatMessage({
                defaultMessage: 'select the project developer type',
                id: 'N9+9Fi',
              })}
              aria-describedby="project-developer-type-error"
              aria-labelledby="project-developer-type-label"
            >
              {investorTypes?.map(({ id, name }) => (
                <Option key={id}>{name}</Option>
              ))}
            </Combobox>
          </Label>
          <ErrorMessage
            errorText={
              Array.isArray(errors?.instrument_types)
                ? errors?.instrument_types[0].message
                : (errors?.instrument_types as FieldError)?.message
            }
            id="project-developer-type-error"
          />
        </div>
      </div>
      <div className="mb-6.5">
        <Label htmlFor="about">
          <FormattedMessage defaultMessage="About" id="g5pX+a" />
          <TextArea
            name="about"
            className="mt-2.5"
            id="about"
            register={register}
            aria-required
            placeholder={formatMessage({
              defaultMessage: 'insert your answer (max 600 characters)',
              id: 'hPsrc0',
            })}
            aria-describedby="about-error"
          />
        </Label>
        <ErrorMessage errorText={errors?.about?.message} id="about-error" />
      </div>
      <div className="mb-10">
        <Label htmlFor="mission">
          <FormattedMessage defaultMessage="What's your mission?" id="vaWFzs" />
          <TextArea
            name="mission"
            className="mt-2.5"
            id="mission"
            aria-required
            register={register}
            placeholder={formatMessage({
              defaultMessage: 'insert your answer (max 600 characters)',
              id: 'hPsrc0',
            })}
            aria-describedby="mission-error"
          />
        </Label>
        <ErrorMessage errorText={errors?.mission?.message} id="mission-error" />
      </div>
      <div className="mb-10">
        <p className="font-sans font-medium text-base text-gray-600 mb-4.5">
          <FormattedMessage defaultMessage="Contact information" id="ITdmlJ" />
        </p>
        <div className="md:flex md:gap-x-6">
          <div className="mb-4.5 md:w-1/2 md:mb-0">
            <Label htmlFor="email">
              <FormattedMessage defaultMessage="Email" id="sy+pv5" />
              <span className="ml-2.5">
                <FieldInfo
                  infoText={formatMessage({
                    defaultMessage: 'Insert the email to receive the contact messages.',
                    id: 'Qmlx+T',
                  })}
                />
              </span>
              <Input
                name="contact_email"
                type="email"
                id="email"
                register={register}
                aria-required
                placeholder={formatMessage({
                  defaultMessage: 'insert email',
                  id: 'DkjIbR',
                })}
                className="mt-2.5"
                aria-describedby="email-error"
              />
            </Label>
            <ErrorMessage id="email-error" errorText={errors.contact_email?.message} />
          </div>
          <div className="md:w-1/2">
            <Label htmlFor="phone-number">
              <FormattedMessage defaultMessage="Phone number (optional)" id="JNTB42" />
              <span className="ml-2.5">
                <FieldInfo
                  infoText={formatMessage({
                    defaultMessage:
                      'Insert the phone number in case you would like to be contacted by phone.',
                    id: 'VkljLs',
                  })}
                />
              </span>
              <Input
                name="contact_phone"
                type="tel"
                id="phone-number"
                register={register}
                aria-required
                placeholder={formatMessage({
                  defaultMessage: 'insert phone number',
                  id: 'iiVhlC',
                })}
                className="mt-2.5"
                aria-describedby="phone-number-error"
              />
            </Label>
            <ErrorMessage id="phone-number-error" errorText={errors.contact_phone?.message} />
          </div>
        </div>
      </div>
      <div>
        <p className="font-sans font-medium text-base text-gray-600 mb-4.5">
          <FormattedMessage defaultMessage="Online presence" id="NjKSap" />
        </p>
      </div>
      <WebsiteSocial errors={errors} register={register} />
    </form>
  );
};

export default Profile;
