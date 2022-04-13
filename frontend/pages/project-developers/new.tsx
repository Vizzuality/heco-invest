import { ChangeEvent, useState, useCallback } from 'react';

import { SubmitHandler, useForm, FieldError } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { dehydrate, QueryClient } from 'react-query';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { AxiosError } from 'axios';
import { InferGetStaticPropsType } from 'next';

import useInterests, { InterestNames } from 'hooks/useInterests';

import { loadI18nMessages } from 'helpers/i18n';

import { CategoryTagDot } from 'containers/category-tag';
import MultiPageLayout, { Page } from 'containers/multi-page-layout';
import SocialMediaImputs from 'containers/social-contact/inputs-social-contact/component';

import Combobox, { Option } from 'components/forms/combobox';
import ErrorMessage from 'components/forms/error-message';
import FieldInfo from 'components/forms/field-info';
import Input from 'components/forms/input';
import Label from 'components/forms/label';
import Tag from 'components/forms/tag';
import TagGroup from 'components/forms/tag-group';
import TextArea from 'components/forms/textarea';
import Head from 'components/head';
import { Queries } from 'enums';
import NakedPageLayout, { NakedPageLayoutProps } from 'layouts/naked-page';
import languages from 'locales.config.json';
import { PageComponent } from 'types';
import { CategoryType } from 'types/category';
import { Enum } from 'types/enums';
import { Locations } from 'types/locations';
import { ProjectDeveloperSetupForm } from 'types/projectDeveloper';
import useProjectDeveloperValidation, { formPageInputs } from 'validations/projectDeveloper';

import { useCreateProjectDeveloper } from 'services/account';
import { getEnums, useEnums } from 'services/enums/enumService';
import { getMosaics, useMosaics } from 'services/locations/localtionsService';

export async function getStaticProps(ctx) {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery(Queries.EnumList, getEnums);
  queryClient.prefetchQuery(Queries.Mosaics, getMosaics);
  return {
    props: {
      intlMessages: await loadI18nMessages(ctx),
      dehydratedState: dehydrate(queryClient),
    },
  };
}

type ProjectDeveloperProps = InferGetStaticPropsType<typeof getStaticProps>;

const getItemsInfoText = (items: Enum[] | Locations[]) => {
  return (
    <ul>
      {items?.map(({ attributes, id }) => (
        <li key={id}>
          <p className="font-sans text-sm font-semibold text-white">{attributes.name}</p>
          <p className="mb-4 font-sans text-sm font-normal text-white">{attributes.description}</p>
        </li>
      ))}
    </ul>
  );
};

const ProjectDeveloper: PageComponent<ProjectDeveloperProps, NakedPageLayoutProps> = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [imagePreview, setImagePreview] = useState('');
  const { formatMessage } = useIntl();
  const resolver = useProjectDeveloperValidation(currentPage);
  const { push } = useRouter();
  const createProjectDeveloper = useCreateProjectDeveloper();
  const enums = useEnums();
  const { category, impact, project_developer_type } = enums?.data;
  const mosaics = useMosaics();
  const interests = useInterests({ category, impact, mosaics: mosaics.data });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
    setValue,
  } = useForm<ProjectDeveloperSetupForm>({
    resolver,
    defaultValues: { categories: [], impacts: [], mosaics: [] },
    shouldUseNativeValidation: true,
    shouldFocusError: true,
    reValidateMode: 'onChange',
  });

  const handleServiceErrors = useCallback(
    (
      error: AxiosError<{
        message: {
          title: string;
        }[];
      }>
    ) => {
      const errors: string[] = Array.isArray(error.message)
        ? error.message.map(({ title }) => title)
        : [error.message];
      let errorPages: number[] = [];
      errors.forEach((errorMessage) => {
        formPageInputs.forEach((fields, index) => {
          return fields.forEach((field: any) => {
            const transformedFieldName = field.replace('_', ' ');

            if (errorMessage.toLowerCase().includes(transformedFieldName)) {
              if (!errorPages.includes(index)) {
                errorPages.push(index);
              }
              setError(field, { message: errorMessage, type: 'onChange' });
            }
          });
        });
      });
      if (errorPages.length) {
        setCurrentPage(errorPages[0]);
      }
    },
    [setError]
  );

  const handleCreate = useCallback(
    (data: ProjectDeveloperSetupForm) =>
      createProjectDeveloper.mutate(data, {
        onError: handleServiceErrors,
        onSuccess: () => {
          push('/project-developers/pending');
        },
      }),
    [createProjectDeveloper, push, handleServiceErrors]
  );

  const onSubmit: SubmitHandler<ProjectDeveloperSetupForm> = (values) => {
    if (currentPage === 2) {
      handleCreate(values);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleNextClick = async () => {
    await handleSubmit(onSubmit)();
    if (!errors) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files?.length) {
      const file = e.currentTarget.files[0];
      const src = URL.createObjectURL(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImagePreview(src);
      };
    }
  };

  const getPageErrors = (page: number) => {
    return formPageInputs[page].some((input) => errors.hasOwnProperty(input));
  };

  const getAlert = () => {
    if (createProjectDeveloper.error) {
      return Array.isArray(createProjectDeveloper.error?.message)
        ? createProjectDeveloper.error.message.map(({ title }: { title: string }) => title)
        : formatMessage({
            defaultMessage:
              'Something went wrong while submitting your form. Please correct the errors before submitting again.',
            id: 'WTuVeL',
          });
    }
  };

  const fetchError = formatMessage({ defaultMessage: 'Unable to load the data', id: 'zniaka' });

  const getInterestsErrorText = (interestName: InterestNames) => {
    if (interestName === InterestNames.Mosaics && mosaics.isError) {
      return fetchError;
    }
    if (enums.isError) {
      return fetchError;
    }
    return (errors[interestName] as unknown as FieldError)?.message;
  };

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
        alert={getAlert()}
        isSubmitting={createProjectDeveloper.isLoading}
        showOutro={false}
        onNextClick={handleNextClick}
        onPreviousClick={() => setCurrentPage(currentPage - 1)}
        showProgressBar
        onCloseClick={() => push('/')}
        onSubmitClick={handleSubmit(onSubmit)}
      >
        <Page hasErrors={!!errors?.language}>
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
                        {locale === 'es' && (
                          <FormattedMessage defaultMessage="Spanish" id="8WtyrD" />
                        )}
                        {locale === 'pt' && (
                          <FormattedMessage defaultMessage="Portuguese" id="A4UTjl" />
                        )}
                        {locale === 'en' && (
                          <FormattedMessage defaultMessage="English" id="WkrNSk" />
                        )}
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
              <div>
                <label
                  htmlFor="picture"
                  className="inline-block mb-4 mr-2.5 text-sm font-semibold text-gray-800 text-primary"
                >
                  <FormattedMessage defaultMessage="Picture" id="wvoA3H" />
                </label>
                <FieldInfo
                  infoText={formatMessage({
                    defaultMessage: 'Add your logo or a picture that indentifies the account.',
                    id: 'bjubNC',
                  })}
                />
              </div>
              <div className="flex items-center justify-start">
                <Image
                  src={imagePreview || '/images/avatar.svg'}
                  width={48}
                  height={48}
                  className="rounded-full"
                  alt={formatMessage({ defaultMessage: 'profile image', id: 'OX08fr' })}
                />
                <input
                  id="picture"
                  className="ml-5"
                  name="picture"
                  type="file"
                  accept="image/png, image/jpeg"
                  {...register('picture')}
                  onChange={handleUploadImage}
                  aria-describedby="picture-error"
                />
              </div>
              <ErrorMessage id="picture-error" errorText={errors?.picture?.message} />
            </div>
            <div className="md:flex gap-x-6 mb-6.5">
              <div className="md:w-1/2 mb-6.5 md:m-0">
                <Label htmlFor="profile">
                  <FormattedMessage defaultMessage="Profile name" id="s+n2ku" />
                  <Input
                    name="name"
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
                <ErrorMessage id="profile-error" errorText={errors?.name?.message} />
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
                    {project_developer_type?.map(({ attributes: { name }, id }) => (
                      <Option key={id}>{name}</Option>
                    ))}
                  </Combobox>
                </Label>
                <ErrorMessage
                  errorText={
                    (enums.isError && fetchError) || errors?.project_developer_type?.message
                  }
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
            <SocialMediaImputs errors={errors} register={register} />
          </form>
        </Page>
        <Page hasErrors={getPageErrors(2)}>
          <form className="flex flex-col justify-between" noValidate>
            <div className="mb-10">
              <h1 className="mb-2 font-serif text-3xl font-semibold">
                <FormattedMessage defaultMessage="About your work" id="kEXoaQ" />
              </h1>
              <p className="font-sans text-base text-gray-600">
                <FormattedMessage defaultMessage="Tell us about your work." id="Y6xIpg" />
              </p>
            </div>
            {interests.map(({ name, title, items, infoText }) => (
              <div key={name} className="mb-7">
                <fieldset name={name}>
                  <legend className="inline font-sans font-semibold text-sm text-gray-800 mb-4.5">
                    <span className="mr-2.5">{title}</span>
                    <FieldInfo infoText={infoText || getItemsInfoText(items)} />
                  </legend>
                  <TagGroup name={name} setValue={setValue}>
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
                        {item.attributes.name}
                      </Tag>
                    ))}
                  </TagGroup>
                </fieldset>
                <ErrorMessage id={`${name}-error`} errorText={getInterestsErrorText(name)} />
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
