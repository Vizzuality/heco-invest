import { useState, useCallback } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import { decycle } from 'cycle';
import { groupBy, pickBy } from 'lodash-es';

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
import { Paths, UserRoles } from 'enums';
import FormPageLayout, { FormPageLayoutProps } from 'layouts/form-page';
import ProtectedPage from 'layouts/protected-page';
import { PageComponent } from 'types';
import { GroupedEnums as GroupedEnumsType } from 'types/enums';
import { Investor } from 'types/investor';
import { Project as ProjectType, ProjectForm, ProjectUpdatePayload } from 'types/project';
import { ProjectDeveloper } from 'types/projectDeveloper';
import { User } from 'types/user';
import useProjectValidation, { formPageInputs } from 'validations/project';

import { useUpdateProject } from 'services/account';
import { getEnums, useEnums } from 'services/enums/enumService';
import { getProject } from 'services/projects/projectService';

export const getServerSideProps = async ({ params: { id }, locale }) => {
  let project;

  // If getting the project fails, it's most likely because the record has not been found. Let's return a 404. Anything else will trigger a 500 by default.
  try {
    ({ data: project } = await getProject(id, {
      includes: [
        'project_images',
        'country',
        'municipality',
        'department',
        'involved_project_developers',
      ],
    }));
  } catch (e) {
    return { notFound: true };
  }

  const enums = await getEnums();

  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
      enums: groupBy(enums, 'type'),
      project: decycle(project),
    },
  };
};

type EditProjectProps = {
  project: ProjectType;
  enums: GroupedEnumsType;
};

const EditProject: PageComponent<EditProjectProps, FormPageLayoutProps> = ({ project }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showLeave, setShowLeave] = useState(false);
  const { formatMessage } = useIntl();
  const resolver = useProjectValidation(currentPage);
  const updateProject = useUpdateProject();
  const router = useRouter();
  const { data } = useEnums();
  const {
    category,
    project_development_stage,
    project_target_group,
    impact_area,
    ticket_size,
    instrument_type,
  } = data;

  const projectFormKeys = formPageInputs.flat();

  const getDefaultValues = useCallback((): Partial<ProjectForm> => {
    const general = pickBy(project, (value, key: any) => projectFormKeys.includes(key));
    return {
      ...general,
      municipality_id: project.municipality?.id,
      department_id: project.municipality.parent.id,
      country_id: project.country?.id,
      project_images_attributes: project.project_images?.map(({ cover, file, id }, index) => {
        const imageId = file.original.split('redirect/')[1].split('/')[0];
        return {
          file: imageId,
          cover,
          id,
          title: formatMessage(
            { defaultMessage: 'Project image {index}.', id: 'jj4ae3' },
            { index: index }
          ),
          src: file.original,
        };
      }),
      involved_project_developer: !!project.involved_project_developers.length ? 1 : 0,
      involved_project_developer_ids: project.involved_project_developers.map(({ id }) => id),
      involved_project_developer_not_listed: project.involved_project_developer_not_listed,
    };
  }, [formatMessage, project, projectFormKeys]);

  const defaultValues = getDefaultValues();

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
    defaultValues,
  });

  const handleCreate = useCallback(
    (formData: ProjectUpdatePayload) => {
      return updateProject.mutate(formData, {
        onError: (error) => {
          const { errorPages, fieldErrors } = getServiceErrors<ProjectForm>(error, formPageInputs);
          fieldErrors.forEach(({ fieldName, message }) => setError(fieldName, { message }));
          errorPages.length && setCurrentPage(errorPages[0]);
        },
        onSuccess: (result) => {
          router.push(
            decodeURIComponent(router.query?.returnPath as string) || {
              pathname: `${Paths.Project}/${project?.slug}`,
              search: `project=${result.data.slug}`,
            }
          );
        },
      });
    },
    [updateProject, setError, router, project?.slug]
  );

  const onSubmit: SubmitHandler<ProjectForm> = (values: ProjectForm) => {
    if (currentPage === 5) {
      const {
        involved_project_developer,
        project_gallery,
        project_images_attributes_cover,
        geometry,
        ...rest
      } = values;

      // set image_attributes cover from the project_images_attributes_cover value
      const project_images_attributes: any = values.project_images_attributes.map(
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
      handleCreate({
        ...rest,
        involved_project_developer_not_listed,
        involved_project_developer_ids,
        project_images_attributes,
        geometry,
        id: project?.id,
      });
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleNextClick = async () => {
    await handleSubmit(onSubmit)();
  };

  const getIsOwner = (user: User, userAccount: ProjectDeveloper | Investor) => {
    // The user must be a the creator of the project to be allowed to edit it.
    return (
      project?.project_developer?.id &&
      userAccount?.id &&
      project.project_developer.id === userAccount.id
    );
  };

  return (
    <ProtectedPage
      allowConfirmed
      ownership={{
        allowOwner: true,
        getIsOwner,
      }}
      permissions={[UserRoles.ProjectDeveloper]}
    >
      <Head title={formatMessage({ defaultMessage: 'Create project', id: 'VUN1K7' })} />
      <MultiPageLayout
        layout="narrow"
        title={formatMessage({ defaultMessage: 'Create project', id: 'VUN1K7' })}
        autoNavigation={false}
        page={currentPage}
        alert={useGetAlert(updateProject.error)}
        isSubmitting={updateProject.isLoading}
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
        handleLeave={() =>
          router.push(decodeURIComponent(router.query?.returnPath as string) || Paths.Dashboard)
        }
        title={formatMessage({ defaultMessage: 'Leave project creation form', id: 'vygPIS' })}
      />
    </ProtectedPage>
  );
};

EditProject.layout = {
  Component: FormPageLayout,
};

export default EditProject;
