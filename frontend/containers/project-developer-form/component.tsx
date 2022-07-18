import { FC, useEffect } from 'react';
import { useState, useCallback } from 'react';

import { SubmitHandler, useForm, Path } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { useRouter } from 'next/router';

import { AxiosError } from 'axios';
import { entries, pick } from 'lodash-es';

import useInterests from 'hooks/useInterests';

import { getServiceErrors, useGetAlert, useLanguageNames } from 'helpers/pages';

import AccountPendingApproval from 'containers/account-pending-approval';
import ContentLanguageAlert from 'containers/forms/content-language-alert';
import SelectLanguageForm from 'containers/forms/select-language-form';
import LeaveFormModal from 'containers/leave-form-modal';
import MultiPageLayout, { Page, OutroPage } from 'containers/multi-page-layout';

import Head from 'components/head';
import { ProjectDeveloperSetupForm } from 'types/projectDeveloper';
import useProjectDeveloperValidation, { formPageInputs } from 'validations/project-developer';

import { useEnums } from 'services/enums/enumService';

import About from './pages/about';
import Profile from './pages/profile';
import { ProjectDeveloperFormProps } from './types';

export const ProjectDeveloperForm: FC<ProjectDeveloperFormProps> = ({
  title,
  leaveMessage,
  initialValues,
  mutation,
  isCreateForm,
  onComplete,
  onLeave,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showLeave, setShowLeave] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const resolver = useProjectDeveloperValidation(isCreateForm ? currentPage : currentPage + 1);
  const router = useRouter();
  const languageNames = useLanguageNames();

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
    getValues,
    clearErrors,
  } = useForm<ProjectDeveloperSetupForm>({
    resolver,
    defaultValues: { categories: [], impacts: [], mosaics: [] },
    shouldUseNativeValidation: true,
    shouldFocusError: true,
    reValidateMode: 'onChange',
  });
  const alert = useGetAlert(mutation.error);

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
          !isCreateForm ? onComplete() : setCurrentPage(currentPage + 1);
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

  useEffect(() => {
    if (initialValues) {
      const { picture, ...rest } = pick(initialValues, formPageInputs.flat());
      setValue('picture', picture?.original?.split('redirect/')[1].split('/')[0]);
      entries(rest).forEach(([key, value]) => {
        setValue(key as keyof ProjectDeveloperSetupForm, value);
      });
    }
  }, [initialValues, setValue]);

  const isOutroPage = isCreateForm && currentPage === totalPages;

  return (
    <>
      <Head title={title} />
      <MultiPageLayout
        getTotalPages={(pages) => setTotalPages(pages)}
        layout="narrow"
        title={title}
        locale={initialValues?.language || (currentPage !== 0 ? getValues('language') : null)}
        autoNavigation={false}
        page={currentPage}
        alert={alert}
        isSubmitting={mutation.isLoading}
        showOutro={isOutroPage}
        onNextClick={handleNextClick}
        onPreviousClick={() => setCurrentPage(currentPage - 1)}
        showProgressBar
        onCloseClick={() => (isOutroPage ? onLeave(true) : setShowLeave(true))}
        onSubmitClick={handleSubmit(onSubmit)}
      >
        {isCreateForm && (
          <Page hasErrors={!!errors?.language}>
            <SelectLanguageForm register={register} errors={errors} fieldName="language" />
          </Page>
        )}
        <Page hasErrors={getPageErrors(1)} className="relative">
          {!isCreateForm && initialValues?.language && (
            <ContentLanguageAlert className="mb-6">
              <FormattedMessage
                defaultMessage="<span>Note:</span>The content of this profile should be written in {language}"
                id="zINRAT"
                values={{
                  language: languageNames[initialValues?.language],
                  span: (chunks: string) => <span className="mr-2 font-semibold">{chunks}</span>,
                }}
              />
            </ContentLanguageAlert>
          )}
          <Profile
            setError={setError}
            setValue={setValue}
            register={register}
            clearErrors={clearErrors}
            errors={errors}
            control={control}
            projectDeveloperTypeEnums={projectDeveloperTypeEnums}
            enumsIsError={enums?.isError}
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
          />
        </Page>
        {isCreateForm && (
          <OutroPage>
            <AccountPendingApproval />
          </OutroPage>
        )}
      </MultiPageLayout>
      <LeaveFormModal
        title={leaveMessage}
        isOpen={showLeave}
        handleLeave={() => onLeave(isOutroPage)}
        close={() => setShowLeave(false)}
      />
    </>
  );
};

export default ProjectDeveloperForm;
