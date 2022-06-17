import { FC, useEffect } from 'react';
import { useState, useCallback } from 'react';

import { SubmitHandler, useForm, Path } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import { AxiosError } from 'axios';
import { entries, pick } from 'lodash-es';

import useInterests from 'hooks/useInterests';

import { getServiceErrors } from 'helpers/pages';

import SelectLanguageForm from 'containers/forms/select-language-form';
import LeaveFormModal from 'containers/leave-form-modal';
import MultiPageLayout, { Page, OutroPage } from 'containers/multi-page-layout';
import { About, Profile, ProjectDeveloperOutro } from 'containers/project-developer-form-pages';

import Head from 'components/head';
import { Paths } from 'enums';
import { ProjectDeveloperSetupForm } from 'types/projectDeveloper';
import useProjectDeveloperValidation, { formPageInputs } from 'validations/project-developer';

import { useEnums } from 'services/enums/enumService';

import { ProjectDeveloperFormProps } from './types';

export const ProjectDeveloperForm: FC<ProjectDeveloperFormProps> = ({
  title,
  leaveMessage,
  initialValues,
  mutation,
  isCreateForm,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showLeave, setShowLeave] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const { formatMessage } = useIntl();
  const resolver = useProjectDeveloperValidation(isCreateForm ? currentPage : currentPage + 1);
  const { push, back } = useRouter();

  const enums = useEnums();
  const {
    category: categoryEnums,
    impact: impactEnums,
    project_developer_type: projectDeveloperTypeEnums,
    mosaic: mosaicEnums,
  } = enums?.data;
  const interests = useInterests({ categoryEnums, impactEnums, mosaicEnums });
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
      const { errorPages, fieldErrors } = getServiceErrors<ProjectDeveloperSetupForm>(
        error,
        formPageInputs as Path<ProjectDeveloperSetupForm>[][]
      );
      fieldErrors.forEach(({ fieldName, message }) => setError(fieldName, { message }));
      errorPages.length && setCurrentPage(errorPages[0]);
    },
    [setError]
  );

  const onSubmit: SubmitHandler<ProjectDeveloperSetupForm> = (values) => {
    if (currentPage === totalPages - 1) {
      mutation.mutate(values, {
        onError: handleServiceErrors,
        onSuccess: () => {
          !isCreateForm ? push(Paths.Dashboard) : setCurrentPage(currentPage + 1);
        },
      });
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleNextClick = async () => {
    await handleSubmit(onSubmit)();
  };

  const getPageErrors = (page: number) => {
    return formPageInputs[page].some((input) => errors.hasOwnProperty(input));
  };

  const getAlert = () => {
    if (mutation.error) {
      return Array.isArray(mutation.error?.message)
        ? mutation.error.message.map(({ title }: { title: string }) => title)
        : formatMessage({
            defaultMessage:
              'Something went wrong while submitting your form. Please correct the errors before submitting again.',
            id: 'WTuVeL',
          });
    }
  };

  const fetchError = formatMessage({ defaultMessage: 'Unable to load the data', id: 'zniaka' });

  useEffect(() => {
    if (initialValues) {
      const { picture, ...rest } = pick(initialValues, formPageInputs.flat());
      setValue('picture', picture?.original?.split('redirect/')[1].split('/')[0]);
      entries(rest).forEach(([key, value]) => {
        setValue(key as keyof ProjectDeveloperSetupForm, value);
      });
    }
  }, [initialValues, setValue]);

  return (
    <>
      <Head title={title} />
      <MultiPageLayout
        getTotalPages={(pages) => setTotalPages(pages)}
        layout="narrow"
        title={title}
        autoNavigation={false}
        page={currentPage}
        alert={getAlert()}
        isSubmitting={mutation.isLoading}
        showOutro={currentPage === totalPages}
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
            projectDeveloperTypeEnums={projectDeveloperTypeEnums}
            enumsIsError={enums?.isError}
            fetchError={fetchError}
            picture={initialValues?.picture?.original}
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
        {isCreateForm && (
          <OutroPage>
            <ProjectDeveloperOutro />
          </OutroPage>
        )}
      </MultiPageLayout>
      <LeaveFormModal
        title={leaveMessage}
        isOpen={showLeave}
        handleLeave={back}
        close={() => setShowLeave(false)}
      />
    </>
  );
};

export default ProjectDeveloperForm;
