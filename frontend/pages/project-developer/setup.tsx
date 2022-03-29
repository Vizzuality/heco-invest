import { ChangeEvent, useState } from 'react';

import { Info } from 'react-feather';
import { SubmitErrorHandler, SubmitHandler, useForm, FieldError } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import Image from 'next/image';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';
import { languages, onlinePresence } from 'helpers/projectDevelopersConstants';

import MultiPageLayout, { Page, OutroPage } from 'containers/multi-page-layout';

import ErrorMessage from 'components/forms/errorMessage/component';
import Input from 'components/forms/input';
import Label from 'components/forms/label';
import TextArea from 'components/forms/textarea';
import Head from 'components/head';
import NakedPageLayout, { NakedPageLayoutProps } from 'layouts/naked-page';
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
import useProjectDeveloperValidation from 'validations/projectDeveloper';

export async function getStaticProps(ctx) {
  return {
    props: {
      intlMessages: await loadI18nMessages(ctx),
    },
  };
}

type ProjectDeveloperProps = InferGetStaticPropsType<typeof getStaticProps>;

const ProjectDeveloper: PageComponent<ProjectDeveloperProps, NakedPageLayoutProps> = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [imagePreview, setImagePreview] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [hasErrors, setHasErrors] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const { formatMessage } = useIntl();
  const resolver = useProjectDeveloperValidation(currentPage);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<ProjectDeveloperSetupForm>({
    resolver,
    defaultValues: { language: '', picture: '', categories: [], impacts: [], mosaics: [] },
    shouldUseNativeValidation: true,
    shouldFocusError: true,
    reValidateMode: 'onChange',
  });

  const interests: {
    name: keyof ProjectDeveloperSetupForm;
    title: string;
    items: { name: string; id: string; color?: string }[];
  }[] = [
    {
      title: formatMessage({
        defaultMessage: 'Select the categories that interests you',
        id: 'k5KxPA',
      }),
      name: 'categories',
      items: categories,
    },
    {
      title: formatMessage({ defaultMessage: 'Expect to have impact on', id: 'YB8bt5' }),
      name: 'impacts',
      items: impacts,
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
    if (currentPage === 2) {
      setIsFormComplete(true);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const onError: SubmitErrorHandler<ProjectDeveloperSetupForm> = (error) => {
    // handle errors
  };

  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, value, name } = e.currentTarget;
    if (checked) {
      const parsedValue = value.split(',') as Category[] | Mosaic[] | Impact[];
      setValue(name as keyof ProjectDeveloperSetupForm, parsedValue);
      trigger(name as keyof ProjectDeveloperSetupForm);
    }
  };

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files?.length) {
      const file = e.currentTarget.files[0];
      const src = URL.createObjectURL(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setValue('picture', reader.result.toString());
        setImageBase64(reader.result.toString());
      };
      setImagePreview(src);
    }
  };

  return (
    <>
      <Head title={formatMessage({ defaultMessage: 'Setup investor profile', id: '7Rh11y' })} />

      <MultiPageLayout
        layout="narrow"
        title={formatMessage({ defaultMessage: 'Setup investor profile', id: '7Rh11y' })}
        autoNavigation={false}
        outroButtonText={formatMessage({
          defaultMessage: 'See my profile',
          id: 'TH786p',
        })}
        page={currentPage}
        alert={
          hasErrors
            ? formatMessage({
                defaultMessage:
                  'Something went wrong while submitting your form. Please correct the errors before submitting again.',
                id: 'WTuVeL',
              })
            : null
        }
        isSubmitting={false}
        showOutro={isFormComplete}
        onNextClick={async () => {
          await handleSubmit(onSubmit, onError)();
          if (!errors) {
            setCurrentPage(currentPage + 1);
          }
        }}
        onPreviousClick={() => setCurrentPage(currentPage - 1)}
        showProgressBar
        // onPageClick={handlePageClick}
        // onCloseClick={handleCloseClick}
        onSubmitClick={handleSubmit(onSubmit, onError)}
        // onCompleteClick={handleCompleteClick}
      >
        <Page hasErrors={!!errors?.language}>
          <form className="flex flex-col justify-between" noValidate>
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
                    <Label
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
                        aria-describedby="language-error"
                      />
                      <span className="block">{name}</span>
                      <span>({nativeName})</span>
                    </Label>
                  );
                })}
              </div>
              <p className="text-red">
                <ErrorMessage id="language-error" errorText={errors?.language?.message} />
              </p>
            </div>
          </form>
        </Page>
        <Page>
          <form className="flex flex-col justify-between" noValidate>
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
                      {...register('picture')}
                      accept="image/png, image/jpeg"
                      onChange={handleUploadImage}
                      aria-describedby="picture-error"
                      // value={imageBase64}
                    />
                  </label>
                </div>
                <ErrorMessage id="picture-error" errorText={errors?.picture?.message} />
              </div>
              <div className="flex gap-x-6 mb-6.5">
                <div className="md:w-1/2">
                  <Label htmlFor="profile">
                    <FormattedMessage defaultMessage="Profile name" id="s+n2ku" />
                    <Input
                      name="profile"
                      className="mt-2.5"
                      id="profile"
                      type="text"
                      register={register}
                      placeholder={formatMessage({
                        defaultMessage: 'insert the profile name',
                        id: '0WHWA/',
                      })}
                      aria-describedby="profile-error"
                    />
                  </Label>
                  <ErrorMessage id="profile-error" errorText={errors?.profile?.message} />
                </div>
                <div className="md:w-1/2">
                  <Label htmlFor="profile">
                    <FormattedMessage defaultMessage="Type" id="+U6ozc" />
                    <select
                      name="projectDeveloperType"
                      id="profile"
                      className="mt-2.5 w-full h-10 border border-beige rounded-lg px-4"
                      {...register('projectDeveloperType')}
                      placeholder={formatMessage({
                        defaultMessage: 'select the project developer type',
                        id: 'N9+9Fi',
                      })}
                      aria-describedby="project-developer-type-error"
                    >
                      {projectDeveloperTypes.map(({ name, id }) => (
                        <option value={id} key={id}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </Label>
                  <ErrorMessage
                    errorText={errors?.projectDeveloperType?.message}
                    id="project-developer-type-error"
                  />
                </div>
              </div>
              <div className="mb-6.5">
                <Label htmlFor="entity-legal-registration">
                  <FormattedMessage
                    defaultMessage="Entity legal registration number (NIT or RUT)"
                    id="AiagLY"
                  />
                  <Input
                    type="text"
                    id="entity-legal-registration"
                    className="mt-2.5"
                    register={register}
                    name="entityLegalRegistrationNumber"
                    placeholder={formatMessage({
                      defaultMessage: 'insert the number',
                      id: 'tS6cAK',
                    })}
                    aria-describedby="entity-legal-registration-error"
                  />
                </Label>
                <ErrorMessage
                  id="entity-legal-registration-error"
                  errorText={errors?.entityLegalRegistrationNumber?.message}
                />
              </div>
              <div className="mb-6.5">
                <Label htmlFor="about">
                  <FormattedMessage defaultMessage="About" id="g5pX+a" />
                  <TextArea
                    name="about"
                    className="mt-2.5"
                    id="about"
                    register={register}
                    placeholder={formatMessage({
                      defaultMessage: 'insert your answer (max 500 characters)',
                      id: 'rBoq14',
                    })}
                    aria-describedby="about-error"
                  />
                </Label>
                <ErrorMessage errorText={errors?.about?.message} id="about-error" />
              </div>
              <div className="mb-6.5">
                <Label htmlFor="mission">
                  <FormattedMessage defaultMessage="What's your mission?" id="vaWFzs" />
                  <TextArea
                    name="mission"
                    className="mt-2.5"
                    id="mission"
                    register={register}
                    placeholder={formatMessage({
                      defaultMessage: 'insert your answer (max 500 characters)',
                      id: 'rBoq14',
                    })}
                    aria-describedby="mission-error"
                  />
                </Label>
                <ErrorMessage errorText={errors?.mission?.message} id="mission-error" />
              </div>
              <div>
                <p className="font-sans font-medium text-base text-gray-600 mb-4.5">
                  <FormattedMessage defaultMessage="Online presence" id="NjKSap" />
                </p>
                <div className="grid w-full grid-cols-2 gap-x-6">
                  {onlinePresence.map((item: keyof ProjectDeveloperSetupFormOnline) => (
                    <div key={item}>
                      <Label htmlFor={item}>
                        {item} (<FormattedMessage defaultMessage="optional" id="V4KNjk" />)
                        <Input
                          className="mt-2.5 mb-4.5"
                          name={item}
                          id={item}
                          type="text"
                          register={register}
                          placeholder={formatMessage({
                            defaultMessage: 'insert URL',
                            id: 'et2m37',
                          })}
                        />
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </Page>
        <Page>
          <form className="flex flex-col justify-between" noValidate>
            <div>
              <div className="mb-6">
                <h1 className="font-serif text-3xl font-semibold">
                  <FormattedMessage defaultMessage="About your work" id="kEXoaQ" />
                </h1>
                <p className="font-sans text-base text-gray-600">
                  <FormattedMessage defaultMessage="Tell us about your work." id="Y6xIpg" />
                </p>
              </div>
              {interests.map(({ name, title, items }) => (
                <div key={name} className="mb-7">
                  <p className="font-sans font-semibold text-sm text-gray-800 mb-4.5">
                    {title}
                    <Info className="inline ml-2.5 cursor-pointer" size={14.67} />
                  </p>
                  <div className="mb-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="inline-block px-4 py-2 mb-4 mr-4 border rounded-lg border-beige"
                      >
                        <Label htmlFor={item.id} className="flex align-middle">
                          <input
                            className={cx('appearance-none', {
                              [`w-4 h-4 mr-4 bg-category-${item.color} rounded-full`]:
                                name === 'categories',
                            })}
                            {...register(name)}
                            id={item.id}
                            name={name}
                            type="checkbox"
                            value={item.id}
                            aria-describedby={`${name}-error`}
                          />
                          <span>{item.name}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                  <ErrorMessage
                    id={`${name}-error`}
                    errorText={(errors[name] as FieldError)?.message}
                  />
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
          </form>
        </Page>
        <OutroPage>
          <h1 className="font-serif text-2xl font-light sm:text-3xl">
            What would you like to do next?
          </h1>
        </OutroPage>
      </MultiPageLayout>
    </>
  );
};

ProjectDeveloper.layout = {
  Component: NakedPageLayout,
};

export default ProjectDeveloper;
