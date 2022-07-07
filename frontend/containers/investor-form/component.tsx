import { FC, useCallback, useEffect, useState } from 'react';

import { Path, SubmitHandler, useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import { AxiosError } from 'axios';
import { entries, pick } from 'lodash-es';

import { getServiceErrors, useGetAlert } from 'helpers/pages';

import ContentLanguageAlert from 'containers/forms/content-language-alert';
import SelectLanguageForm from 'containers/forms/select-language-form';
import {
  Profile,
  InvestmentInformation,
  Impacts,
  Priority,
  OtherInformation,
} from 'containers/investor-form';
import LeaveFormModal from 'containers/leave-form-modal';
import MultiPageLayout, { Page } from 'containers/multi-page-layout';

import Head from 'components/head';
import { InvestorForm as InvestorFormType } from 'types/investor';
import useValidation, { formPageInputs } from 'validations/investor';

import { InvestorFormProps } from './types';

const InvestorForm: FC<InvestorFormProps> = ({
  title,
  leaveMessage,
  initialValues,
  mutation,
  isCreateForm,
  onComplete,
  enums,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showLeave, setShowLeave] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const resolver = useValidation(isCreateForm ? currentPage : currentPage + 1);
  const { back } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
    setValue,
    getValues,
    clearErrors,
  } = useForm<InvestorFormType>({
    resolver,
    defaultValues: { categories: [], impacts: [] },
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
      const { errorPages, fieldErrors } = getServiceErrors<InvestorFormType>(
        error,
        formPageInputs as Path<InvestorFormType>[][]
      );
      fieldErrors.forEach(({ fieldName, message }) => setError(fieldName, { message }));
      errorPages.length && setCurrentPage(errorPages[0]);
    },
    [setError]
  );

  const onSubmit: SubmitHandler<InvestorFormType> = (values) => {
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
        setValue(key as keyof InvestorFormType, value);
      });
    }
  }, [initialValues, setValue]);

  return (
    <div>
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
        showOutro={false}
        onNextClick={handleNextClick}
        onPreviousClick={() => setCurrentPage(currentPage - 1)}
        showProgressBar
        onCloseClick={() => setShowLeave(true)}
        onSubmitClick={handleSubmit(onSubmit)}
      >
        {isCreateForm && (
          <Page hasErrors={getPageErrors(0)}>
            <SelectLanguageForm fieldName="language" register={register} errors={errors} />
          </Page>
        )}
        <Page hasErrors={getPageErrors(1)}>
          {!isCreateForm && (
            <ContentLanguageAlert className="mb-6" locale={initialValues?.language} />
          )}
          <Profile
            register={register}
            control={control}
            setError={setError}
            setValue={setValue}
            errors={errors}
            investorTypes={enums?.investor_type}
            clearErrors={clearErrors}
            picture={initialValues?.picture?.original}
          />
        </Page>
        <Page hasErrors={getPageErrors(2)}>
          <InvestmentInformation
            register={register}
            setError={setError}
            setValue={setValue}
            errors={errors}
            categories={enums?.category}
            instrument_types={enums?.instrument_type}
            ticket_sizes={enums?.ticket_size}
            clearErrors={clearErrors}
          />
        </Page>
        <Page hasErrors={getPageErrors(3)}>
          <Impacts
            register={register}
            setError={setError}
            setValue={setValue}
            errors={errors}
            impacts={enums?.impact}
          />
        </Page>
        <Page hasErrors={getPageErrors(4)}>
          <Priority register={register} errors={errors} />
        </Page>
        <Page hasErrors={getPageErrors(5)}>
          <OtherInformation register={register} errors={errors} />
        </Page>
      </MultiPageLayout>

      <LeaveFormModal
        isOpen={showLeave}
        close={() => setShowLeave(false)}
        handleLeave={back}
        title={leaveMessage}
      />
    </div>
  );
};

export default InvestorForm;
