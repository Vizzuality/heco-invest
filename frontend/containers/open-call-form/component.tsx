import { useCallback, useEffect, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { getServiceErrors, useGetAlert, useLanguageNames } from 'helpers/pages';

import ContentLanguageAlert from 'containers/forms/content-language-alert';
import LeaveFormModal from 'containers/leave-form-modal';
import MultiPageLayout, { OutroPage, Page } from 'containers/multi-page-layout';

import Button from 'components/button';
import Head from 'components/head';
import { OpenCallStatus } from 'enums';
import { OpenCallForm as OpenFormType, OpenCallCreationPayload } from 'types/open-calls';
import useOpenCallResolver, { formPageInputs } from 'validations/open-call';

import { useDefaultValues } from './helpers';
import { BasicMutationType } from './types';

import {
  OpenCallInformation,
  OpenCallExpectedImpact,
  OpenCallFundingInformation,
  OpenCallClosingDate,
  OpenCallFormTypes,
  PendingVerification,
} from '.';

export const OpenCallForm = <MutationType extends BasicMutationType>({
  title,
  initialValues: openCall,
  mutation,
  enums,
  locale,
  onComplete,
  leaveMessage,
  isLoading,
}: OpenCallFormTypes<MutationType>) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showLeave, setShowLeave] = useState(false);
  const [slug, setSlug] = useState<string>();
  const resolver = useOpenCallResolver(currentPage);

  const defaultValues = useDefaultValues(openCall);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    clearErrors,
    setValue,
    getValues,
    setError,
    resetField,
  } = useForm<OpenFormType>({
    resolver,
    shouldUseNativeValidation: true,
    shouldFocusError: true,
    reValidateMode: 'onChange',
    defaultValues,
  });

  const isLastPage = currentPage === totalPages - 1;
  const languageNames = useLanguageNames();
  const isOutroPage = currentPage === totalPages;

  const alert = useGetAlert(mutation.error);

  const handleMutate = useCallback(
    (data: OpenCallCreationPayload) => {
      return mutation.mutate(data, {
        onError: (error) => {
          const { errorPages, fieldErrors } = getServiceErrors<OpenFormType>(error, formPageInputs);
          fieldErrors.forEach(({ fieldName, message }) => setError(fieldName, { message }));
          if (errorPages.length) setCurrentPage(errorPages[0]);
        },
        onSuccess: (openCall) => {
          if (openCall.trusted || data.status === OpenCallStatus.Draft) {
            onComplete();
          } else {
            setCurrentPage(currentPage + 1);
            setSlug(openCall.slug);
          }
        },
      });
    },
    [currentPage, mutation, onComplete, setError]
  );

  const onSubmit: SubmitHandler<OpenFormType> = (values) => {
    if (isLastPage) {
      const closing_at = values.closing_at.toUTCString();
      handleMutate({ ...values, closing_at });
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleNextClick = async () => {
    await handleSubmit(onSubmit)();
  };

  const handleSubmitDraft = async () => {
    setValue('status', OpenCallStatus.Draft);
    await handleSubmit(onSubmit)();
  };

  const handleSubmitPublish = async () => {
    setValue('status', OpenCallStatus.Launched);
    await handleSubmit(onSubmit)();
  };

  // This component may be mounted when `openCall` has not resolved yet (`isLoading` will be
  // `true`). In that case, we want to make sure the form is populated with the default values.
  // `useForm`'s `defaultValues` attribute is only read on mount.
  useEffect(() => {
    if (!isLoading && defaultValues) {
      Object.entries(defaultValues).map(([key, value]) => {
        setValue(key as keyof OpenFormType, value);
      });
    }
  }, [isLoading, defaultValues, setValue]);

  return (
    <div>
      <Head title={title} />
      <MultiPageLayout
        getTotalPages={(pages) => setTotalPages(pages)}
        layout="narrow"
        title={title}
        locale={locale}
        autoNavigation={false}
        page={currentPage}
        alert={alert}
        isSubmitting={mutation?.isLoading}
        showOutro={isOutroPage}
        siteHeader={isOutroPage}
        onNextClick={handleNextClick}
        onPreviousClick={() => setCurrentPage(currentPage - 1)}
        showProgressBar
        onCloseClick={() => setShowLeave(true)}
        onSubmitClick={handleSubmitPublish}
        isLoading={isLoading}
        footerElements={
          isLastPage &&
          (!openCall?.status || openCall.status === OpenCallStatus.Draft) && (
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
        <Page>
          <ContentLanguageAlert className="mb-6">
            <FormattedMessage
              defaultMessage="<span>Note:</span>The content of this open call should be written in {language}"
              id="SUQqz6"
              values={{
                language: languageNames[locale],
                span: (chunks: string) => <span className="mr-2 font-semibold">{chunks}</span>,
              }}
            />
          </ContentLanguageAlert>
          <OpenCallInformation
            openCall={openCall}
            control={control}
            setError={setError}
            setValue={setValue}
            getValues={getValues}
            register={register}
            errors={errors}
            clearErrors={clearErrors}
            resetField={resetField}
          />
        </Page>
        <Page>
          <OpenCallExpectedImpact
            clearErrors={clearErrors}
            setValue={setValue}
            errors={errors}
            register={register}
            getValues={getValues}
          />
        </Page>
        <Page>
          <OpenCallFundingInformation
            clearErrors={clearErrors}
            setValue={setValue}
            errors={errors}
            register={register}
            instrument_types={enums?.instrument_type}
          />
        </Page>
        <Page>
          <OpenCallClosingDate control={control} errors={errors} getValues={getValues} />
        </Page>
        <OutroPage>
          <PendingVerification slug={slug} />
        </OutroPage>
      </MultiPageLayout>
      <LeaveFormModal
        isOpen={showLeave}
        close={() => setShowLeave(false)}
        handleLeave={onComplete}
        title={leaveMessage}
      />
    </div>
  );
};

export default OpenCallForm;
