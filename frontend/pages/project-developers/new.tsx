import { useState, useCallback } from 'react';

import { SubmitHandler, useForm, FieldError } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { dehydrate, QueryClient } from 'react-query';

import { useRouter } from 'next/router';

import { AxiosError } from 'axios';
import { InferGetStaticPropsType } from 'next';

import useInterests, { InterestNames } from 'hooks/useInterests';

import { loadI18nMessages } from 'helpers/i18n';

import SelectLanguageForm from 'containers/forms/select-language-form';
import LeaveFormModal from 'containers/leave-form-modal';
import MultiPageLayout, { Page } from 'containers/multi-page-layout';
import { About, Profile } from 'containers/project-developer-form-pages';

import Head from 'components/head';
import { Queries } from 'enums';
import FormPageLayout, { FormPageLayoutProps } from 'layouts/form-page';
import { PageComponent } from 'types';
import { ProjectDeveloperSetupForm } from 'types/projectDeveloper';
import useProjectDeveloperValidation, { formPageInputs } from 'validations/projectDeveloper';

import { useCreateProjectDeveloper } from 'services/account';
import { getEnums, useEnums } from 'services/enums/enumService';
import ProjectDeveloperForm from 'containers/project-developer-form';

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
    <ProjectDeveloperForm
      title={formatMessage({ defaultMessage: 'Setup project developer’s account', id: 'bhxvPM' })}
      leaveMessage={formatMessage({ defaultMessage: 'Leave create project develop', id: 'jQfYef' })}
    />
  );
};

ProjectDeveloper.layout = {
  Component: FormPageLayout,
};

export default ProjectDeveloper;
