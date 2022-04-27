import { useCallback, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { QueryClient, dehydrate } from 'react-query';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import MultiPageLayout, { Page } from 'containers/multi-page-layout';
import {
  GeneralInformation,
  ProjectDescription,
  Impact,
  Funding,
} from 'containers/project-form-pages';

import Head from 'components/head';
import FormPageLayout, { FormPageLayoutProps } from 'layouts/form-page';
import { PageComponent } from 'types';
import { ProjectForm } from 'types/project';
import useProjectValidation from 'validations/project';

import { useEnums } from 'services/enums/enumService';

export async function getStaticProps(ctx) {
  const queryClient = new QueryClient();

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
  // To use with the confirm leave modal
  const [showLeave, setShowLeave] = useState(false);
  const { formatMessage } = useIntl();
  const resolver = useProjectValidation(currentPage);
  //To use with handleCreate
  // const { push } = useRouter();
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
  } = useForm<ProjectForm>({
    resolver,
    shouldUseNativeValidation: true,
    shouldFocusError: true,
    reValidateMode: 'onChange',
    defaultValues: { target_groups: [] },
  });

  const handleCreate = useCallback(
    (data: ProjectForm) =>
      // TO DO!
      // createProject.mutate(data, {
      //   onError: handleServiceErrors,
      //   onSuccess: () => {
      //     push('/project-developers/pending');
      //   },
      // }),
      console.log(data),
    []
  );

  const onSubmit: SubmitHandler<ProjectForm> = (values) => {
    if (currentPage === 6) {
      // set involved_project_developer_not_listed to true if not listed is selected and removes this value from the involved_project_developer_ids
      const involved_project_developer_not_listed =
        !!values.involved_project_developer_ids.includes('not-listed');
      const involved_project_developer_ids = values.involved_project_developer_ids.filter(
        (id) => id !== 'not-listed'
      );
      handleCreate({
        ...values,
        involved_project_developer_not_listed,
        involved_project_developer_ids,
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
        // alert={getAlert()}
        // isSubmitting={createProject.isLoading}
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
        <Page key="impact">
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
        <Page>page</Page>
      </MultiPageLayout>
    </>
  );
};

Project.layout = {
  Component: FormPageLayout,
};

export default Project;
