import { FC } from 'react';
import { useState, useCallback } from 'react';

import { SubmitHandler, useForm, FieldError, Path } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import { AxiosError } from 'axios';

import useInterests, { InterestNames } from 'hooks/useInterests';

import { getServiceErrors } from 'helpers/pages';

import SelectLanguageForm from 'containers/forms/select-language-form';
import LeaveFormModal from 'containers/leave-form-modal';
import MultiPageLayout, { Page } from 'containers/multi-page-layout';
import { About, Profile } from 'containers/project-developer-form-pages';

import Head from 'components/head';
import { Paths } from 'enums';
import { ProjectDeveloper, ProjectDeveloperSetupForm } from 'types/projectDeveloper';
import useProjectDeveloperValidation, { formPageInputs } from 'validations/projectDeveloper';

import { useCreateProjectDeveloper, useUpdateProjectDeveloper } from 'services/account';
import { useEnums } from 'services/enums/enumService';
import { useCurrentProjectDeveloper } from 'services/project-developers/projectDevelopersService';

import { ProjectDeveloperFormProps } from './types';

export const ProjectDeveloperForm: FC<ProjectDeveloperFormProps> = ({
  title,
  leaveMessage,
  isCreateForm,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showLeave, setShowLeave] = useState(false);
  const { formatMessage } = useIntl();
  const resolver = useProjectDeveloperValidation(currentPage);
  const { push } = useRouter();
  const createProjectDeveloper = useCreateProjectDeveloper();
  const updateProjectDeveloper = useUpdateProjectDeveloper();
  const { projectDeveloper } = useCurrentProjectDeveloper(undefined, { enabled: !isCreateForm });
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

  const LAST_PAGE_INDEX = isCreateForm ? 2 : 1;

  const handleServiceErrors = useCallback(
    (
      error: AxiosError<{
        message: {
          title: string;
        }[];
      }>
    ) => {
      const { errorPages, fieldErrors } = getServiceErrors<ProjectDeveloperSetupForm>(
        error,
        formPageInputs as Path<ProjectDeveloperSetupForm>[][]
      );
      fieldErrors.forEach(({ fieldName, message }) => setError(fieldName, { message }));
      errorPages.length && setCurrentPage(errorPages[0]);
    },
    [setError]
  );

  const handleCreate = useCallback(
    (data: ProjectDeveloperSetupForm) =>
      createProjectDeveloper.mutate(data, {
        onError: handleServiceErrors,
        onSuccess: () => {
          push(Paths.PendingProjectDeveloper);
        },
      }),
    [createProjectDeveloper, handleServiceErrors, push]
  );

  const handleUpdate = useCallback(
    (data: ProjectDeveloperSetupForm) =>
      updateProjectDeveloper.mutate(data, {
        onError: handleServiceErrors,
        onSuccess: () => {
          push(`${Paths.ProjectDeveloper}/${(projectDeveloper as ProjectDeveloper)?.slug}`);
        },
      }),
    [updateProjectDeveloper, handleServiceErrors, push, projectDeveloper]
  );

  const onSubmit: SubmitHandler<ProjectDeveloperSetupForm> = (values) => {
    if (currentPage === LAST_PAGE_INDEX) {
      if (isCreateForm) {
        handleCreate(values);
      } else {
        handleUpdate(values);
      }
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
      <Head title={title} />
      <MultiPageLayout
        layout="narrow"
        title={title}
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
        {isCreateForm && (
          <Page hasErrors={!!errors?.language}>
            <SelectLanguageForm register={register} errors={errors} fieldName="language" />
          </Page>
        )}
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
        title={leaveMessage}
        isOpen={showLeave}
        handleLeave={() => push('/')}
        close={() => setShowLeave(false)}
      />
    </>
  );
};

export default ProjectDeveloperForm;
