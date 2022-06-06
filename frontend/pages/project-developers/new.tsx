import { useState, useCallback } from 'react';

import { SubmitHandler, useForm, FieldError } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { dehydrate, QueryClient } from 'react-query';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { AxiosError } from 'axios';
import { InferGetStaticPropsType } from 'next';

import useInterests, { InterestNames } from 'hooks/useInterests';

import { loadI18nMessages } from 'helpers/i18n';

import LeaveFormModal from 'containers/leave-form-modal';
import MultiPageLayout, { Page } from 'containers/multi-page-layout';
import { About, Profile } from 'containers/project-developer-form-pages';

import ErrorMessage from 'components/forms/error-message';
import Label from 'components/forms/label';
import Head from 'components/head';
import { Queries } from 'enums';
import FormPageLayout, { FormPageLayoutProps } from 'layouts/form-page';
import languages from 'locales.config.json';
import { PageComponent } from 'types';
import { ProjectDeveloperSetupForm } from 'types/projectDeveloper';
import useProjectDeveloperValidation, { formPageInputs } from 'validations/projectDeveloper';

import { useCreateProjectDeveloper } from 'services/account';
import { getEnums, useEnums } from 'services/enums/enumService';

// Import the uploader component only if is on th client because DirectUpload is not supported on server
const ImageUploader = dynamic(() => import('components/forms/image-uploader'), { ssr: false });

export async function getStaticProps(ctx) {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery(Queries.EnumList, getEnums);
  return {
    props: {
      intlMessages: await loadI18nMessages(ctx),
      dehydratedState: dehydrate(queryClient),
    },
  };
}

type ProjectDeveloperProps = InferGetStaticPropsType<typeof getStaticProps>;

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

const ProjectDeveloper: PageComponent<ProjectDeveloperProps, FormPageLayoutProps> = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showLeave, setShowLeave] = useState(false);
  const { formatMessage } = useIntl();
  const resolver = useProjectDeveloperValidation(currentPage);
  const { push } = useRouter();
  const createProjectDeveloper = useCreateProjectDeveloper();
  const enums = useEnums();
  const { category, impact, project_developer_type, mosaic } = enums?.data;
  const interests = useInterests({ category, impact, mosaic });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
    setValue,
    clearErrors,
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
        onCloseClick={() => setShowLeave(true)}
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
          <Profile
            setError={setError}
            setValue={setValue}
            register={register}
            clearErrors={clearErrors}
            errors={errors}
            control={control}
            project_developer_type={project_developer_type}
            enumsIsError={enums?.isError}
            fetchError={fetchError}
          />
        </Page>
        <Page hasErrors={getPageErrors(2)}>
          <About
            interests={interests}
            enumsIsError={enums?.isError}
            register={register}
            setValue={setValue}
            errors={errors}
            clearErrors={clearErrors}
            fetchError={fetchError}
          />
        </Page>
      </MultiPageLayout>
      <LeaveFormModal
        title={formatMessage({ defaultMessage: 'Leave create project develop', id: 'jQfYef' })}
        isOpen={showLeave}
        handleLeave={() => push('/')}
        close={() => setShowLeave(false)}
      />
    </>
  );
};

ProjectDeveloper.layout = {
  Component: FormPageLayout,
};

export default ProjectDeveloper;
