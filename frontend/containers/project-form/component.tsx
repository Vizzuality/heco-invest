import { FC, useCallback, useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { getServiceErrors, useGetAlert, useLanguageNames } from 'helpers/pages';

import ContentLanguageAlert from 'containers/forms/content-language-alert';
import LeaveFormModal from 'containers/leave-form-modal';
import MultiPageLayout, { OutroPage, Page } from 'containers/multi-page-layout';

import Button from 'components/button';
import Head from 'components/head';
import { ProjectStatus } from 'enums';
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
  isLoading,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showLeave, setShowLeave] = useState(false);
  const [projectSlug, setProjectSlug] = useState<string>();
  const resolver = useProjectValidation(currentPage);
  const updateProject = useUpdateProject();
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
  const languageNames = useLanguageNames();
  const isLastPage = currentPage === totalPages - 1;

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
        onSuccess: ({
          data: {
            data: { slug, status, trusted },
          },
        }) => {
          // If the user is saving the project as a draft, they aren't publishing it and it won't
          // be visible in the administration area either. If they are publishing it now, we make
          // a check to verify whether the project has been verified before. If so, it's already been
          // verified and doesn't make sense to display the "Pending approval" screen. If not, then
          // we show the screen.
          if (status === ProjectStatus.Published && trusted !== true) {
            setCurrentPage(currentPage + 1);
            setProjectSlug(slug);
          } else {
            onComplete();
          }
        },
      });
    },
    [updateProject, setError, currentPage, onComplete]
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
        onSuccess: ({
          data: {
            data: { slug, status },
          },
        }) => {
          // If the user is publishing on creation, we have to display the
          // "Project pending approval" screen. If not we don't need to, because
          // the project is not published and the admins can't see it either.
          if (status === ProjectStatus.Published) {
            setCurrentPage(currentPage + 1);
            setProjectSlug(slug);
          } else {
            onComplete();
          }
        },
      });
    },
    [currentPage, mutation, onComplete, setError]
  );

  const onSubmit: SubmitHandler<ProjectFormType> = (values: ProjectFormType) => {
    if (isLastPage) {
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

  const handleSubmitDraft = async () => {
    setValue('status', ProjectStatus.Draft);
    await handleSubmit(onSubmit)();
  };

  const handleSubmitPublish = async () => {
    setValue('status', ProjectStatus.Published);
    await handleSubmit(onSubmit)();
  };

  const contentLocale = defaultValues?.language || userAccount?.language;
  const isOutroPage = currentPage === totalPages;

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
        showOutro={isOutroPage}
        siteHeader={isOutroPage}
        onNextClick={handleNextClick}
        onPreviousClick={() => setCurrentPage(currentPage - 1)}
        showProgressBar
        onCloseClick={() => (isOutroPage ? onComplete() : setShowLeave(true))}
        onSubmitClick={handleSubmitPublish}
        isLoading={isLoading}
        footerElements={
          isLastPage &&
          project?.status !== ProjectStatus.Published && (
            <Button
              className="px-3 py-2 leading-none md:px-8 md:py-4"
              theme="secondary-green"
              size="base"
              onClick={handleSubmitDraft}
            >
              <FormattedMessage defaultMessage="Save as draft" id="JHJJAH" />
            </Button>
          )
        }
      >
        <Page key="general-information">
          <ContentLanguageAlert className="mb-6">
            <FormattedMessage
              defaultMessage="<span>Note:</span>The content of this project should be written in {language}"
              id="S27Bu1"
              values={{
                language: languageNames[contentLocale],
                span: (chunks: string) => <span className="mr-2 font-semibold">{chunks}</span>,
              }}
            />
          </ContentLanguageAlert>
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
        handleLeave={onComplete}
        title={leaveMessage}
      />
    </>
  );
};

export default ProjectForm;
