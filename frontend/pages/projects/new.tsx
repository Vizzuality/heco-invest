import { useCallback, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { QueryClient, dehydrate } from 'react-query';

import { useRouter } from 'next/router';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';
import { getServiceErrors, useGetAlert } from 'helpers/pages';

import LeaveFormModal from 'containers/leave-form-modal';
import MultiPageLayout, { Page } from 'containers/multi-page-layout';
import {
  GeneralInformation,
  ProjectDescription,
  Impact,
  Funding,
  ProjectGrow,
  OtherInformation,
} from 'containers/project-form-pages';

import Head from 'components/head';
import { Paths, Queries } from 'enums';
import FormPageLayout, { FormPageLayoutProps } from 'layouts/form-page';
import { PageComponent } from 'types';
import { ProjectCreationPayload, ProjectForm } from 'types/project';
import useProjectValidation from 'validations/project';
import { formPageInputs } from 'validations/project';

import { useCreateProject } from 'services/account';
import { getEnums, useEnums } from 'services/enums/enumService';
import { getLocations } from 'services/locations/locations';

export async function getStaticProps(ctx) {
  const queryClient = new QueryClient();
  // prefetch static data - enums and locations
  queryClient.prefetchQuery(Queries.EnumList, getEnums);
  queryClient.prefetchQuery(Queries.Locations, () => getLocations());
  return {
    props: {
      intlMessages: await loadI18nMessages(ctx),
      dehydratedState: dehydrate(queryClient),
    },
  };
}

type ProjectProps = InferGetStaticPropsType<typeof getStaticProps>;

const Project: PageComponent<ProjectProps, FormPageLayoutProps> = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showLeave, setShowLeave] = useState(false);
  const { formatMessage } = useIntl();
  const resolver = useProjectValidation(currentPage);
  const createProject = useCreateProject();
  const { push } = useRouter();
  const { data } = useEnums();
  const {
    category,
    project_development_stage,
    project_target_group,
    impact_area,
    ticket_size,
    instrument_type,
  } = data;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue,
    clearErrors,
    resetField,
    setError,
  } = useForm<ProjectForm>({
    resolver,
    shouldUseNativeValidation: true,
    shouldFocusError: true,
    reValidateMode: 'onChange',
    defaultValues: { target_groups: [] },
  });

  const handleCreate = useCallback(
    (data: ProjectCreationPayload) =>
      createProject.mutate(data, {
        onError: (error) => {
          const { errorPages, fieldErrors } = getServiceErrors<ProjectForm>(error, formPageInputs);
          fieldErrors.forEach(({ fieldName, message }) => setError(fieldName, { message }));
          errorPages.length && setCurrentPage(errorPages[0]);
        },
        onSuccess: (result) => {
          push({ pathname: '/projects/pending/', search: `project=${result.data.slug}` });
        },
      }),
    [createProject, push, setError]
  );

  const onSubmit: SubmitHandler<ProjectForm> = (values: ProjectForm) => {
    if (currentPage === 5) {
      const {
        involved_project_developer,
        project_gallery,
        project_images_attributes_cover,
        ...rest
      } = values;

      // set image_attributes cover from the project_images_attributes_cover value
      const project_images_attributes = values.project_images_attributes.map((image) =>
        image.file === project_images_attributes_cover ? { ...image, cover: true } : image
      );
      // set involved_project_developer_not_listed to true if not listed is selected and removes this value from the involved_project_developer_ids
      const involved_project_developer_not_listed =
        !!values.involved_project_developer_ids?.includes('not-listed');
      const involved_project_developer_ids = values.involved_project_developer_ids?.filter(
        (id) => id !== 'not-listed'
      );

      handleCreate({
        ...rest,
        involved_project_developer_not_listed,
        involved_project_developer_ids,
        project_images_attributes,
      });
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
        alert={useGetAlert(createProject.error)}
        isSubmitting={createProject.isLoading}
        showOutro={false}
        onNextClick={handleNextClick}
        onPreviousClick={() => setCurrentPage(currentPage - 1)}
        showProgressBar
        onCloseClick={() => setShowLeave(true)}
        onSubmitClick={handleSubmit(onSubmit)}
      >
        <Page key="general-information">
          <GeneralInformation
            register={register}
            control={control}
            controlOptions={{ disabled: false }}
            errors={errors}
            getValues={getValues}
            resetField={resetField}
            setValue={setValue}
            clearErrors={clearErrors}
            setError={setError}
          />
        </Page>
        <Page key="project-description">
          <ProjectDescription
            register={register}
            control={control}
            controlOptions={{ disabled: false }}
            setValue={setValue}
            errors={errors}
            clearErrors={clearErrors}
            category={category}
            project_development_stage={project_development_stage}
            target_group={project_target_group}
          />
        </Page>
        <Page key="impact">
          <Impact
            register={register}
            control={control}
            controlOptions={{ disabled: false }}
            errors={errors}
            getValues={getValues}
            impacts={impact_area}
            setValue={setValue}
            clearErrors={clearErrors}
          />
        </Page>
        <Page key="funding">
          <Funding
            register={register}
            control={control}
            controlOptions={{ disabled: false }}
            errors={errors}
            getValues={getValues}
            setValue={setValue}
            clearErrors={clearErrors}
            ticket_sizes={ticket_size}
            instrument_type={instrument_type}
          />
        </Page>
        <Page key="project-grow">
          <ProjectGrow
            register={register}
            control={control}
            controlOptions={{ disabled: false }}
            errors={errors}
          />
        </Page>
        <Page key="other">
          <OtherInformation
            register={register}
            control={control}
            controlOptions={{ disabled: false }}
            errors={errors}
          />
        </Page>
      </MultiPageLayout>
      <LeaveFormModal
        isOpen={showLeave}
        close={() => setShowLeave(false)}
        handleLeave={() => push(Paths.Dashboard)}
        title={formatMessage({ defaultMessage: 'Leave project creation form', id: 'vygPIS' })}
      />
    </>
  );
};

Project.layout = {
  Component: FormPageLayout,
};

export default Project;
