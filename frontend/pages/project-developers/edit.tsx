import { useState, useCallback, useEffect } from 'react';

import { Path, SubmitHandler, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { dehydrate, QueryClient } from 'react-query';

import { useRouter } from 'next/router';

import { entries } from 'lodash-es';
import { InferGetStaticPropsType } from 'next';

import useInterests from 'hooks/useInterests';

import { loadI18nMessages } from 'helpers/i18n';
import { getProjectDeveloperFormItems, getServiceErrors } from 'helpers/pages';

import LeaveFormModal from 'containers/leave-form-modal';
import MultiPageLayout, { Page } from 'containers/multi-page-layout';
import { About, Profile } from 'containers/project-developer-form-pages';

import Head from 'components/head';
import { Paths, Queries, UserRoles } from 'enums';
import FormPageLayout, { FormPageLayoutProps } from 'layouts/form-page';
import ProtectedPage from 'layouts/protected-page';
import { PageComponent } from 'types';
import { ProjectDeveloperSetupForm } from 'types/projectDeveloper';
import useProjectDeveloperValidation, { formPageInputs } from 'validations/projectDeveloper';

import { useUpdateProjectDeveloper } from 'services/account';
import { getEnums, useEnums } from 'services/enums/enumService';
import { useCurrentProjectDeveloper } from 'services/project-developers/projectDevelopersService';

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

const LAST_PAGE = 1;

type ProjectDeveloperProps = InferGetStaticPropsType<typeof getStaticProps>;

const ProjectDeveloper: PageComponent<ProjectDeveloperProps, FormPageLayoutProps> = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showLeave, setShowLeave] = useState(false);
  const { formatMessage } = useIntl();
  const resolver = useProjectDeveloperValidation(currentPage + 1);
  const { projectDeveloper } = useCurrentProjectDeveloper();
  const { push } = useRouter();
  const updateProjectDeveloper = useUpdateProjectDeveloper();
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
    shouldUseNativeValidation: true,
    shouldFocusError: true,
  });

  useEffect(() => {
    if (projectDeveloper) {
      const { picture, ...rest } = getProjectDeveloperFormItems(projectDeveloper);

      entries(rest).forEach(([key, value]) => {
        setValue(key as keyof ProjectDeveloperSetupForm, value as any, { shouldValidate: true });
      });
      setValue('picture', picture?.original?.split('redirect/')[1].split('/')[0]);
    }
  }, [projectDeveloper, setValue]);

  const handleCreate = useCallback(
    (data: ProjectDeveloperSetupForm) =>
      updateProjectDeveloper.mutate(data, {
        onError: (error) => {
          const { errorPages, fieldErrors } = getServiceErrors<ProjectDeveloperSetupForm>(
            error,
            formPageInputs as Path<ProjectDeveloperSetupForm>[][]
          );
          fieldErrors.forEach(({ fieldName, message }) => setError(fieldName, { message }));
          errorPages.length && setCurrentPage(errorPages[0]);
        },
        onSuccess: () => {
          push(`${Paths.ProjectDeveloper}/${projectDeveloper.slug}`);
        },
      }),
    [updateProjectDeveloper, setError, push, projectDeveloper]
  );

  const onSubmit: SubmitHandler<ProjectDeveloperSetupForm> = (values) => {
    if (currentPage === LAST_PAGE) {
      handleCreate(values);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleNextClick = async () => {
    await handleSubmit(onSubmit, console.log)();
  };

  const getPageErrors = (page: number) => {
    return formPageInputs[page].some((input) => errors.hasOwnProperty(input));
  };

  const getAlert = () => {
    if (updateProjectDeveloper?.error) {
      return Array.isArray(updateProjectDeveloper?.error?.message)
        ? updateProjectDeveloper?.error.message.map(({ title }: { title: string }) => title)
        : formatMessage({
            defaultMessage:
              'Something went wrong while submitting your form. Please correct the errors before submitting again.',
            id: 'WTuVeL',
          });
    }
  };

  const fetchError = formatMessage({ defaultMessage: 'Unable to load the data', id: 'zniaka' });

  return (
    <ProtectedPage permissions={[UserRoles.ProjectDeveloper]}>
      <Head
        title={formatMessage({ defaultMessage: 'Setup project developer’s account', id: 'bhxvPM' })}
      />
      <MultiPageLayout
        layout="narrow"
        title={formatMessage({ defaultMessage: 'Setup project developer’s account', id: 'bhxvPM' })}
        autoNavigation={false}
        page={currentPage}
        alert={getAlert()}
        isSubmitting={updateProjectDeveloper?.isLoading}
        showOutro={false}
        onNextClick={handleNextClick}
        onPreviousClick={() => setCurrentPage(currentPage - 1)}
        showProgressBar
        onCloseClick={() => setShowLeave(true)}
        onSubmitClick={handleSubmit(onSubmit)}
      >
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
            picture={projectDeveloper?.picture?.small}
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
        title={formatMessage({ defaultMessage: 'Leave project developer edition?', id: 'LFDgTb' })}
        isOpen={showLeave}
        handleLeave={() => push('/')}
        close={() => setShowLeave(false)}
      />
    </ProtectedPage>
  );
};

ProjectDeveloper.layout = {
  Component: FormPageLayout,
};

export default ProjectDeveloper;
