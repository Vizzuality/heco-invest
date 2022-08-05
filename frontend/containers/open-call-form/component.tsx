import { FC, useState } from 'react';

import { useForm } from 'react-hook-form';

import MultiPageLayout, { Page } from 'containers/multi-page-layout';

import Head from 'components/head';
import { OpenCallForm as OpenFormType } from 'types/open-calls';

import {
  OpenCallClosingDate,
  OpenCallExpectedImpact,
  OpenCallFormTypes,
  OpenCallFundingInformation,
  OpenCallInformation,
} from '.';

export const OpenCallForm: FC<OpenCallFormTypes> = ({
  title,
  initialValues,
  mutation,
  handleNextClick,
  onLeave,
}) => {
  const {
    handleSubmit,
    register,
    control,
    getValues,
    formState: { errors },
    clearErrors,
    setValue,
    setError,
    resetField,
  } = useForm<OpenFormType>();
  const [isOutroPage, setIsOutroPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showLeave, setShowLeave] = useState(false);

  const onSubmit = () => {};

  console.log(getValues());

  return (
    <div>
      <Head title={title} />
      <MultiPageLayout
        getTotalPages={(pages) => setTotalPages(pages)}
        layout="narrow"
        title={title}
        // locale={initialValues?.language || (currentPage !== 0 ? getValues('language') : null)}
        autoNavigation={false}
        page={currentPage}
        // alert={alert}
        isSubmitting={mutation?.isLoading}
        showOutro={isOutroPage}
        siteHeader={isOutroPage}
        onNextClick={handleNextClick}
        onPreviousClick={() => setCurrentPage(currentPage - 1)}
        showProgressBar
        onCloseClick={() => (isOutroPage ? onLeave(true) : setShowLeave(true))}
        onSubmitClick={handleSubmit(onSubmit)}
      >
        <Page>
          <OpenCallInformation
            control={control}
            setError={setError}
            setValue={setValue}
            register={register}
            errors={errors}
            clearErrors={clearErrors}
            resetField={resetField}
          />
        </Page>
        <Page>
          <OpenCallClosingDate control={control} errors={errors} />
        </Page>
      </MultiPageLayout>
    </div>
  );
};

export default OpenCallForm;
