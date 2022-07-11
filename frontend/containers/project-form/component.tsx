import { FC, useCallback, useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useRouter } from 'next/router';

import { getServiceErrors, useGetAlert, useQueryReturnPath } from 'helpers/pages';

import ContentLanguageAlert from 'containers/forms/content-language-alert';
import LeaveFormModal from 'containers/leave-form-modal';
import MultiPageLayout, { OutroPage, Page } from 'containers/multi-page-layout';

import Head from 'components/head';
import { Paths } from 'enums';
import {
  ProjectCreationPayload,
  ProjectForm as ProjectFormType,
  ProjectUpdatePayload,
} from 'types/project';
import useProjectValidation, { formPageInputs } from 'validations/project';

import { useAccount } from 'services/account';
import { useUpdateProject } from 'services/account';

import { useDefaultValues } from './helpers';

import {
  GeneralInformation,
  Funding,
  Impact,
  OtherInformation,
  PendingApproval,
  ProjectDescription,
  ProjectGrow,
  ProjectFormProps,
} from '.';

export const ProjectForm: FC<ProjectFormProps> = ({
  leaveMessage,
  mutation,
  onComplete,
  title,
  initialValues: project,
  isCreateForm,
  enums,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showLeave, setShowLeave] = useState(false);
  const [projectSlug, setProjectSlug] = useState<string>();
  const resolver = useProjectValidation(currentPage);
  const updateProject = useUpdateProject();
  const queryReturnPath = useQueryReturnPath();
  const router = useRouter();
  const { userAccount } = useAccount();
  const {
    category,
    project_development_stage,
    project_target_group,
    impact_area,
    ticket_size,
    instrument_type,
  } = enums;
  const defaultValues = useDefaultValues(project);

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
  } = useForm<ProjectFormType>({
    resolver,
    shouldUseNativeValidation: true,
    shouldFocusError: true,
    reValidateMode: 'onChange',
    defaultValues,
  });

  const handleUpdate = useCallback(
    (formData: ProjectUpdatePayload) => {
      return updateProject.mutate(formData, {
        onError: (error) => {
          const { errorPages, fieldErrors } = getServiceErrors<ProjectFormType>(
            error,
            formPageInputs
          );
          fieldErrors.forEach(({ fieldName, message }) => setError(fieldName, { message }));
          errorPages.length && setCurrentPage(errorPages[0]);
        },
        onSuccess: () => {
          onComplete?.();
        },
      });
    },
    [updateProject, onComplete, setError]
  );

  const handleCreate = useCallback(
    (formData: ProjectCreationPayload) => {
      const data = {
        ...formData,
        // Endpoint only expects `file` and `cover`. If for instance an `id` is passed, it'll
        // return an error. However, the frontend needs extra properties such as the `id` during
        // the form creation, so we're cleaning up the form data before POST'ing it to the endpoint.
        project_images_attributes: formData.project_images_attributes?.map(({ file, cover }) => ({
          file,
          cover,
        })),
      } as ProjectCreationPayload;

      return mutation.mutate(data, {
        onError: (error) => {
          const { errorPages, fieldErrors } = getServiceErrors<ProjectFormType>(
            error,
            formPageInputs
          );
          fieldErrors.forEach(({ fieldName, message }) => setError(fieldName, { message }));
          errorPages.length && setCurrentPage(errorPages[0]);
        },
        onSuccess: (result) => {
          setCurrentPage(currentPage + 1);
          setProjectSlug(result.data.data.slug);
        },
      });
    },
    [currentPage, mutation, setError]
  );

  const onSubmit: SubmitHandler<ProjectFormType> = (values: ProjectFormType) => {
    if (currentPage === totalPages - 1) {
      const {
        involved_project_developer,
        project_gallery,
        project_images_attributes_cover,
        geometry,
        ...rest
      } = values;

      // set image_attributes cover from the project_images_attributes_cover value
      const project_images_attributes: any = values.project_images_attributes?.map(
        ({ file, id, _destroy }) => {
          // If is an old image, send the image id, if is a new one, send the image file (direct-upload signed_id)
          if (id) {
            return { file, id, cover: file === project_images_attributes_cover, _destroy };
          } else {
            return { file, cover: file === project_images_attributes_cover };
          }
        }
      );
      // set involved_project_developer_not_listed to true if not listed is selected and removes this value from the involved_project_developer_ids
      const involved_project_developer_not_listed =
        !!values.involved_project_developer_ids?.includes('not-listed');
      const involved_project_developer_ids = values.involved_project_developer_ids?.filter(
        (id) => id !== 'not-listed'
      );
      if (isCreateForm) {
        handleCreate({
          ...rest,
          involved_project_developer_not_listed,
          involved_project_developer_ids,
          project_images_attributes,
          geometry,
        });
      } else {
        handleUpdate({
          ...rest,
          involved_project_developer_not_listed,
          involved_project_developer_ids,
          project_images_attributes,
          geometry,
          id: project?.id,
        });
      }
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleNextClick = async () => {
    await handleSubmit(onSubmit)();
  };

  const contentLocale = defaultValues?.language || userAccount?.language;

  return (
    <>
      <Head title={title} />
      <MultiPageLayout
        layout="narrow"
        getTotalPages={(pages) => setTotalPages(pages)}
        title={title}
        locale={contentLocale}
        autoNavigation={false}
        page={currentPage}
        alert={useGetAlert(updateProject.error)}
        isSubmitting={updateProject.isLoading}
        showOutro={currentPage === totalPages && !!projectSlug}
        onNextClick={handleNextClick}
        onPreviousClick={() => setCurrentPage(currentPage - 1)}
        showProgressBar
        onCloseClick={() => setShowLeave(true)}
        onSubmitClick={handleSubmit(onSubmit)}
      >
        <Page key="general-information">
          <ContentLanguageAlert className="mb-6" locale={contentLocale} />
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
        <OutroPage>
          <PendingApproval projectSlug={projectSlug} />
        </OutroPage>
      </MultiPageLayout>
      <LeaveFormModal
        isOpen={showLeave}
        close={() => setShowLeave(false)}
        handleLeave={() => router.push(queryReturnPath || Paths.Dashboard)}
        title={leaveMessage}
      />
    </>
  );
};

export default ProjectForm;
