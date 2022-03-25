import { ChangeEvent, FC, LabelHTMLAttributes, useState } from 'react';

import { ArrowLeft, Info } from 'react-feather';
import { SubmitErrorHandler, SubmitHandler, useForm, FieldError } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import Image from 'next/image';

import { InferGetStaticPropsType } from 'next';

import useProjectDeveloperValidation from 'hooks/forms/useProjectDeveloperValidation';

import { loadI18nMessages } from 'helpers/i18n';
import { languages, onlinePresence } from 'helpers/projectDevelopersConstants';

import Button from 'components/button';
import Input from 'components/forms/input';
import TextArea from 'components/forms/textarea';
import { StaticPageLayoutProps } from 'layouts/static-page';
import categories from 'mockups/categories.json';
import impacts from 'mockups/impacts.json';
import mosaics from 'mockups/mosaics.json';
import projectDeveloperTypes from 'mockups/projectDeveloperTypes.json';
import { PageComponent } from 'types';
import {
  Category,
  Impact,
  Mosaic,
  ProjectDeveloperSetupForm,
  ProjectDeveloperSetupFormOnline,
} from 'types/projectDeveloper';

export async function getStaticProps(ctx) {
  return {
    props: {
      intlMessages: await loadI18nMessages(ctx),
    },
  };
}

type ProjectDeveloperProps = InferGetStaticPropsType<typeof getStaticProps>;

const Label: FC<LabelHTMLAttributes<HTMLLabelElement>> = (props) => {
  return (
    <label className="block font-sans text-sm font-semibold text-gray-800" htmlFor={props.htmlFor}>
      {props.children}
    </label>
  );
};

const ProjectDeveloper: PageComponent<ProjectDeveloperProps, StaticPageLayoutProps> = () => {
  const [section, setSection] = useState(0);
  const [imagePreview, setImagePreview] = useState('');
  const { formatMessage } = useIntl();
  const resolver = useProjectDeveloperValidation(section);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus,
    trigger,
  } = useForm<ProjectDeveloperSetupForm>({
    resolver,
    defaultValues: { language: '', categories: [], mosaics: [], impacts: [] },
    shouldUseNativeValidation: true,
    shouldFocusError: true,
  });

  const interests: {
    name: keyof ProjectDeveloperSetupForm;
    title: string;
    items: { name: string; id: string }[];
    required?: boolean;
  }[] = [
    {
      title: formatMessage({
        defaultMessage: 'Select the categories that interests you',
        id: 'k5KxPA',
      }),
      name: 'categories',
      items: categories,
      required: true,
    },
    {
      title: formatMessage({ defaultMessage: 'Expect to have mpact', id: 'vzQrlh' }),
      name: 'impacts',
      items: impacts,
      required: true,
    },
    {
      title: formatMessage({
        defaultMessage: 'Select HeCo priority landscapes on which you will have impact (optional)',
        id: 'piBsTx',
      }),
      name: 'mosaics',
      items: mosaics,
    },
  ];

  const onSubmit: SubmitHandler<ProjectDeveloperSetupForm> = (values) => {
    console.log(values);
    if (section === 2) {
      // Go to Pending approval page
    } else {
      setSection(section + 1);
    }
  };

  const onError: SubmitErrorHandler<ProjectDeveloperSetupForm> = (error) => {
    console.log(error);
    const firstError = Object.keys(error)[0] as keyof ProjectDeveloperSetupForm;
    console.log(firstError);
    setFocus(firstError);
  };

  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, value, name } = e.currentTarget;
    if (checked) {
      const parsedValue = value.split(',') as Category[] | Mosaic[] | Impact[];
      setValue(name as keyof ProjectDeveloperSetupForm, parsedValue);
      trigger(name as keyof ProjectDeveloperSetupForm);
    }
  };

  const FormSection = () => {
    switch (section) {
      case 0:
        return (
          <div>
            <h1 className="mb-6 font-serif text-3xl font-semibold text-green-dark">
              <FormattedMessage defaultMessage="I want to write my content in" id="APjPYs" />
            </h1>
            <p id="language-description" className="mb-20 font-sans text-base">
              <FormattedMessage
                defaultMessage="Select the account laguage in which you want to write the content of this account. This will avoid mixed content in the platform."
                id="/MHYS4"
              />
            </p>
            <div className="flex justify-center mt-2 gap-x-6">
              {languages.map((lang) => {
                const { name, code, nativeName } = lang;
                return (
                  <label
                    key={code}
                    htmlFor={code}
                    className="justify-center block w-64 text-center border rounded-lg py-7 border-beige"
                  >
                    <input
                      name={name}
                      id={code}
                      type="radio"
                      value={code}
                      {...register('language')}
                    />
                    <span className="block">{name}</span>
                    <span>({nativeName})</span>
                  </label>
                );
              })}
            </div>
            {errors.language && <p>{errors.language.message}</p>}
          </div>
        );
      case 1:
        return (
          <div>
            <div className="mb-6">
              <h1 className="mb-2 font-serif text-3xl font-semibold">
                <FormattedMessage defaultMessage="Project developer information" id="n2WWAj" />
              </h1>
              <p className="font-sans text-base text-gray-600">
                <FormattedMessage
                  defaultMessage="General information about the account profile."
                  id="aplkMy"
                />
              </p>
            </div>

            <div className="mb-6.5">
              <p className="font-sans font-medium text-base text-gray-600 mb-4.5">
                <FormattedMessage defaultMessage="General" id="1iEPTM" />
              </p>
              <p className="mb-4 text-sm font-semibold text-gray-800 text-primary">
                <FormattedMessage defaultMessage="Picture" id="wvoA3H" />
              </p>
              <div className="flex gap-x-4">
                <Image
                  src={imagePreview || '/images/avatar.svg'}
                  width={48}
                  height={48}
                  alt="profile image"
                />
                <label htmlFor="picture" className="bg-green-dark rounded-3xl pt-2.5 px-6">
                  <span className="text-white">
                    <FormattedMessage defaultMessage="Upload image" id="vMUomP" />
                  </span>
                  <input
                    id="picture"
                    className="w-0 h-0 opacity-0"
                    name="picture"
                    type="file"
                    {...register('picture', { required: true })}
                    accept="image/png, image/jpeg"
                    onChange={(e) => {
                      if (e.currentTarget.files?.length) {
                        const file = e.currentTarget.files[0];
                        const src = URL.createObjectURL(file);
                        setImagePreview(src);
                      }
                    }}
                  />
                </label>
              </div>
              {errors.picture && <p>{errors.picture.message}</p>}
            </div>
            <div className="flex gap-x-6 mb-6.5">
              <div className="md:w-1/2">
                <Label htmlFor="profile">
                  <span className="text-sm font-semibold text-gray-800 text-primary">
                    <FormattedMessage defaultMessage="Profile name" id="s+n2ku" />
                  </span>
                  <Input
                    name="profile"
                    className="mt-2.5"
                    id="profile"
                    type="text"
                    register={register}
                    registerOptions={{ required: true }}
                    placeholder={formatMessage({
                      defaultMessage: 'insert the profile name',
                      id: '0WHWA/',
                    })}
                  />
                </Label>
                {errors.profile && <p>{errors.profile.message}</p>}
              </div>
              <div className="md:w-1/2">
                <Label htmlFor="profile">
                  <span className="text-sm font-semibold text-gray-800 text-primary">
                    <FormattedMessage defaultMessage="Type" id="+U6ozc" />
                  </span>
                  <select
                    name="projectDeveloperType"
                    id="profile"
                    className="mt-2.5 w-full h-10 border border-beige rounded-lg px-4"
                    {...register('projectDeveloperType', { required: true })}
                    placeholder={formatMessage({
                      defaultMessage: 'select the project developer type',
                      id: 'N9+9Fi',
                    })}
                  >
                    {projectDeveloperTypes.map(({ name, id }) => (
                      <option value={id} key={id}>
                        {name}
                      </option>
                    ))}
                  </select>
                </Label>
                {errors.projectDeveloperType && <p>{errors.projectDeveloperType.message}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="entity-legal-registration">
                <span className="text-sm font-semibold text-gray-800 text-primary">
                  <FormattedMessage
                    defaultMessage="Entity legal registration number (NIT or RUT)"
                    id="AiagLY"
                  />
                </span>
                <Input
                  type="text"
                  id="entity-legal-registration"
                  register={register}
                  registerOptions={{ required: true }}
                  name="entityLegalRegistrationNumber"
                  placeholder={formatMessage({ defaultMessage: 'insert the number', id: 'tS6cAK' })}
                />
              </Label>
              {errors.entityLegalRegistrationNumber && (
                <p>{errors.entityLegalRegistrationNumber.message}</p>
              )}
            </div>
            <div className="mb-6.5">
              <Label htmlFor="about">
                <span className="text-sm font-semibold text-gray-800 text-primary">
                  <FormattedMessage defaultMessage="About" id="g5pX+a" />
                </span>
                <TextArea
                  name="about"
                  className="mt-2.5"
                  id="about"
                  register={register}
                  registerOptions={{ required: true }}
                  placeholder={formatMessage({
                    defaultMessage: 'insert your answer (max 500 characters)',
                    id: 'rBoq14',
                  })}
                />
              </Label>
              {errors.about && <p>{errors.about.message}</p>}
            </div>
            <div className="mb-6.5">
              <Label htmlFor="mission">
                <span className="text-sm font-semibold text-gray-800 text-primary">
                  <FormattedMessage defaultMessage="What's your mission?" id="vaWFzs" />
                </span>
                <TextArea
                  name="mission"
                  className="mt-2.5"
                  id="mission"
                  register={register}
                  registerOptions={{ required: true }}
                  placeholder={formatMessage({
                    defaultMessage: 'insert your answer (max 500 characters)',
                    id: 'rBoq14',
                  })}
                />
              </Label>
              {errors.mission && <p>{errors.mission.message}</p>}
            </div>
            <div>
              <p className="font-sans font-medium text-base text-gray-600 mb-4.5">
                <FormattedMessage defaultMessage="Online presence" id="NjKSap" />
              </p>
              <div className="grid w-full grid-cols-2 gap-x-6">
                {onlinePresence.map((item: keyof ProjectDeveloperSetupFormOnline) => (
                  <div key={item}>
                    <Label htmlFor={item}>
                      <span className="text-sm font-semibold text-gray-800 text-primary">
                        {item} (<FormattedMessage defaultMessage="optional" id="V4KNjk" />)
                      </span>
                      <Input
                        className="mt-2.5"
                        name={item}
                        id={item}
                        type="text"
                        register={register}
                        placeholder={formatMessage({ defaultMessage: 'insert URL', id: 'et2m37' })}
                      />
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <div className="mb-6">
              <h1 className="font-serif text-3xl font-semibold">
                <FormattedMessage defaultMessage="About your work" id="kEXoaQ" />
              </h1>
              <p className="font-sans text-base text-gray-600">
                <FormattedMessage defaultMessage="Tell us about your work." id="Y6xIpg" />
              </p>
            </div>
            {interests.map(({ name, title, items, required }) => (
              <div key={name} className="mb-7">
                <p className="font-sans font-semibold text-sm text-gray-800 mb-4.5">
                  {title}
                  <Info className="inline ml-2.5 cursor-pointer" size={14.67} />
                </p>
                <div className="flex gap-4 mb-4">
                  {items.map((item) => (
                    <div key={item.id}>
                      <label htmlFor={item.id}>
                        <input
                          {...register(name, { required })}
                          id={item.id}
                          name={name}
                          type="checkbox"
                          value={item.id}
                        />
                        {item.name}
                      </label>
                    </div>
                  ))}
                </div>
                {errors[name] && (
                  <p className="mt-2 font-sans text-xs text-red">
                    {(errors[name] as FieldError).message}
                  </p>
                )}
                <label htmlFor={`select-all-${name}`}>
                  <span className="font-sans text-sm underline cursor-pointer text-green-dark">
                    {formatMessage({ defaultMessage: 'Select all', id: '94Fg25' })}
                  </span>
                  <input
                    name={name}
                    id={`select-all-${name}`}
                    type="checkbox"
                    className="appearance-none"
                    value={items.map(({ id }) => id)}
                    {...register(name)}
                    onChange={handleSelectAll}
                  />
                </label>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="w-full min-h-screen m-auto">
      <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col justify-between">
        <div className="max-w-screen-lg m-auto">
          <FormSection />
        </div>
        <div className="flex justify-between h-full px-20 py-4 my-10 align-middle border-t border-t-gray-400">
          <div className="min-w-20 min-h-1">
            {section !== 0 && (
              <Button theme="primary-white" onClick={() => setSection(section - 1)}>
                <ArrowLeft size={16} className="mr-3" />
                Back
              </Button>
            )}
          </div>
          <div className="flex align-middle gap-x-4">
            {[0, 1, 2].map((item) => (
              <Button
                className="w-6 h-6 px-1.75 text-center round"
                key={item}
                theme={item < section ? 'primary-green' : 'secondary-green'}
              >
                {item + 1}
              </Button>
            ))}
          </div>
          <div>
            <Button type="submit" className="block">
              {section === 2 ? 'Submit' : 'Next'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProjectDeveloper;
