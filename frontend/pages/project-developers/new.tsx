import { ChangeEvent, useState, useCallback } from 'react';

import { SubmitErrorHandler, SubmitHandler, useForm, FieldError } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import MultiPageLayout, { Page } from 'containers/multi-page-layout';
import SocialMediaImputs from 'containers/social-contact/inputs-social-contact/component';

import Combobox, { Option } from 'components/forms/combobox';
import ErrorMessage from 'components/forms/error-message';
import FieldInfo from 'components/forms/fieldInfo';
import Input from 'components/forms/input';
import Label from 'components/forms/label';
import TextArea from 'components/forms/textarea';
import Head from 'components/head';
import NakedPageLayout, { NakedPageLayoutProps } from 'layouts/naked-page';
import languages from 'locales.config.json';
import categories from 'mockups/categories.json';
import impacts from 'mockups/impacts.json';
import mosaics from 'mockups/mosaics.json';
import projectDeveloperTypes from 'mockups/projectDeveloperTypes.json';
import { PageComponent } from 'types';
import {
  Category,
  Impact,
  Interest,
  InterestItem,
  Mosaic,
  ProjectDeveloperSetupForm,
} from 'types/projectDeveloper';
import useProjectDeveloperValidation, { formPageInputs } from 'validations/projectDeveloper';

import { useCreateProjectDeveloper } from 'services/account';

export async function getStaticProps(ctx) {
  return {
    props: {
      intlMessages: await loadI18nMessages(ctx),
    },
  };
}

type ProjectDeveloperProps = InferGetStaticPropsType<typeof getStaticProps>;

const getItemsInfoText = (items: InterestItem[]) => {
  return (
    <ul>
      {items.map(({ name, infoText }) => (
        <li key={name}>
          <p className="font-sans text-sm font-semibold text-white">{name}</p>
          <p className="mb-4 font-sans text-sm font-normal text-white">{infoText}</p>
        </li>
      ))}
    </ul>
  );
};

const ProjectDeveloper: PageComponent<ProjectDeveloperProps, NakedPageLayoutProps> = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [imagePreview, setImagePreview] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [hasErrors, setHasErrors] = useState(false);
  const { formatMessage } = useIntl();
  const resolver = useProjectDeveloperValidation(currentPage);
  const { push } = useRouter();
  const createProjectDeveloper = useCreateProjectDeveloper();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    control,
  } = useForm<ProjectDeveloperSetupForm>({
    resolver,
    defaultValues: { picture: '', categories: [], impacts: [], mosaics: [] },
    shouldUseNativeValidation: true,
    shouldFocusError: true,
    reValidateMode: 'onChange',
  });

  const handleCreate = useCallback(
    (data: ProjectDeveloperSetupForm) =>
      createProjectDeveloper.mutate(data, {
        onError: (error) => {
          setHasErrors(true);
          // handle service errors
        },
        onSuccess: () => {
          push('/project-developer/pending');
        },
      }),
    [createProjectDeveloper, push]
  );

  const onSubmit: SubmitHandler<ProjectDeveloperSetupForm> = (values) => {
    if (currentPage === 2) {
      handleCreate(values);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const onError: SubmitErrorHandler<ProjectDeveloperSetupForm> = (error) => {
    // handle errors
  };

  const handleNextClick = async () => {
    await handleSubmit(onSubmit, onError)();
    if (!errors) {
      setCurrentPage(currentPage + 1);
    }
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
        setImageBase64(reader.result.toString());
        // send image to api
        setImagePreview(src);
      };
    }
  };

  const getPageErrors = (page: number) => {
    return formPageInputs[page].some((input) => errors.hasOwnProperty(input));
  };

  const interests: Interest[] = [
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
      title: formatMessage({ defaultMessage: 'Expect to have impact on', id: 'YB8bt5' }),
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
      infoText: formatMessage({
        defaultMessage:
          'Geographic spaces of unique biodiversity conditions with sustainability and management plans developed by Herencia Colombia to ensure the provisioning of quality ecosystem services.',
        id: 'whbx7G',
      }),
    },
  ];

  return (
    <>
      <Head
        title={formatMessage({ defaultMessage: 'Setup project developer’s account', id: 'bhxvPM' })}
      />
      <MultiPageLayout
        layout="narrow"
        title={formatMessage({ defaultMessage: 'Setup project developer’s account', id: 'bhxvPM' })}
        autoNavigation={false}
        page={currentPage}
        alert={
          hasErrors
            ? createProjectDeveloper.error.message ||
              formatMessage({
                defaultMessage:
                  'Something went wrong while submitting your form. Please correct the errors before submitting again.',
                id: 'WTuVeL',
              })
            : null
        }
        isSubmitting={createProjectDeveloper.isLoading}
        showOutro={false}
        onNextClick={handleNextClick}
        onPreviousClick={() => setCurrentPage(currentPage - 1)}
        showProgressBar
        onCloseClick={() => push('/')}
        onSubmitClick={handleSubmit(onSubmit, onError)}
      >
        <Page hasErrors={!!errors?.language}>
          <form className="flex flex-col justify-between" noValidate>
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
              {languages.locales.map((lang) => {
                const { name, locale } = lang;
                return (
                  <Label
                    key={locale}
                    htmlFor={locale}
                    className="justify-center block w-full text-center border rounded-lg py-7 border-beige"
                  >
                    <input
                      // className="appearance-none"
                      name={name}
                      required
                      id={locale}
                      type="radio"
                      value={locale}
                      {...register('language')}
                      aria-describedby="language-error"
                    />
                    <span className="block">{name}</span>
                  </Label>
                );
              })}
            </div>
            <p className="text-red">
              <ErrorMessage id="language-error" errorText={errors?.language?.message} />
            </p>
          </form>
        </Page>
        <Page hasErrors={getPageErrors(1)}>
          <form className="flex flex-col justify-between" noValidate>
            <div className="mb-10">
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
              <p className="inline-block mb-4 mr-2.5 text-sm font-semibold text-gray-800 text-primary">
                <FormattedMessage defaultMessage="Picture" id="wvoA3H" />
              </p>
              <FieldInfo
                infoText={formatMessage({
                  defaultMessage: 'Add your logo or a picture that indentifies the account.',
                  id: 'bjubNC',
                })}
              />
              <div className="flex gap-x-4">
                <Image
                  src={imagePreview || '/images/avatar.svg'}
                  width={48}
                  height={48}
                  className="rounded-full"
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
                    accept="image/png, image/jpeg"
                    required
                    {...register('picture')}
                    onChange={handleUploadImage}
                    aria-describedby="picture-error"
                    // value={imageName}
                  />
                </label>
              </div>
              <ErrorMessage id="picture-error" errorText={errors?.picture?.message} />
            </div>
            <div className="md:flex gap-x-6 mb-6.5">
              <div className="md:w-1/2 mb-6.5 md:m-0">
                <Label htmlFor="profile">
                  <FormattedMessage defaultMessage="Profile name" id="s+n2ku" />
                  <Input
                    name="profile"
                    className="mt-2.5"
                    aria-required
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
                <Label htmlFor="project-developer-type" id="project-developer-type-label">
                  <FormattedMessage defaultMessage="Type" id="+U6ozc" />
                  <Combobox
                    control={control}
                    controlOptions={{ disabled: false }}
                    aria-required
                    name="project_developer_type"
                    id="project-developer-type"
                    className="mt-2.5 w-full h-10 border border-beige rounded-lg px-4"
                    placeholder={formatMessage({
                      defaultMessage: 'select the project developer type',
                      id: 'N9+9Fi',
                    })}
                    aria-describedby="project-developer-type-error"
                    aria-labelledby="project-developer-type-label"
                  >
                    {projectDeveloperTypes.map(({ name, id }) => (
                      <Option key={id}>{name}</Option>
                    ))}
                  </Combobox>
                </Label>
                <ErrorMessage
                  errorText={errors?.project_developer_type?.message}
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
                <span className="ml-2.5">
                  <FieldInfo
                    infoText={formatMessage({
                      defaultMessage:
                        'Add your legal registration number so we can verify your legal entity . This information will not be publicaly available.',
                      id: '11hyS6',
                    })}
                  />
                </span>
                <Input
                  type="text"
                  id="entity-legal-registration"
                  className="mt-2.5"
                  register={register}
                  aria-required
                  name="entity_legal_registration_number"
                  placeholder={formatMessage({
                    defaultMessage: 'insert the number',
                    id: 'tS6cAK',
                  })}
                  aria-describedby="entity-legal-registration-error"
                />
              </Label>
              <ErrorMessage
                id="entity-legal-registration-error"
                errorText={errors?.entity_legal_registration_number?.message}
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
                  aria-required
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
                  aria-required
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
            </div>
            <SocialMediaImputs register={register} />
          </form>
        </Page>
        <Page hasErrors={getPageErrors(2)}>
          <form className="flex flex-col justify-between" noValidate>
            <div className="mb-6">
              <h1 className="font-serif text-3xl font-semibold">
                <FormattedMessage defaultMessage="About your work" id="kEXoaQ" />
              </h1>
              <p className="font-sans text-base text-gray-600">
                <FormattedMessage defaultMessage="Tell us about your work." id="Y6xIpg" />
              </p>
            </div>
            {interests.map(({ name, title, items, infoText, required }) => (
              <div key={name} className="mb-7">
                <p className="font-sans font-semibold text-sm text-gray-800 mb-4.5 mr-2.5 inline-block">
                  {title}
                </p>
                <FieldInfo infoText={infoText || getItemsInfoText(items)} />
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
          </form>
        </Page>
      </MultiPageLayout>
    </>
  );
};

ProjectDeveloper.layout = {
  Component: NakedPageLayout,
};

export default ProjectDeveloper;
