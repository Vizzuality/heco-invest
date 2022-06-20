import { useCallback, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import { groupBy } from 'lodash-es';

import { loadI18nMessages } from 'helpers/i18n';
import { getServiceErrors, useGetAlert } from 'helpers/pages';

import SelectLanguageForm from 'containers/forms/select-language-form';
import {
  Profile,
  InvestmentInformation,
  Impacts,
  Priority,
  OtherInformation,
} from 'containers/investor-form-pages';
import LeaveFormModal from 'containers/leave-form-modal';
import MultiPageLayout, { Page } from 'containers/multi-page-layout';

import Head from 'components/head';
import { Paths } from 'enums';
import { UserRoles } from 'enums';
import FormPageLayout, { FormPageLayoutProps } from 'layouts/form-page';
import ProtectedPage from 'layouts/protected-page';
import { PageComponent } from 'types';
import { GroupedEnums } from 'types/enums';
import { InvestorForm } from 'types/investor';
import useValidation, { formPageInputs } from 'validations/investor';

import { useCreateInvestor } from 'services/account';
import { getEnums } from 'services/enums/enumService';

export async function getServerSideProps(ctx) {
  const enums = await getEnums();
  return {
    props: {
      intlMessages: await loadI18nMessages(ctx),
      enums: groupBy(enums, 'type'),
    },
  };
}

type NewInvestorServerSideProps = {
  enums: GroupedEnums;
};

const NewInvestorPage: PageComponent<NewInvestorServerSideProps, FormPageLayoutProps> = ({
  enums,
}) => {
  const intl = useIntl();
  const { formatMessage } = useIntl();
  const { push } = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [showLeave, setShowLeave] = useState(false);
  const createInvestor = useCreateInvestor();
  const resolver = useValidation(currentPage);

  const {
    register,
    formState: { errors },
    control,
    setError,
    setValue,
    clearErrors,
    handleSubmit,
  } = useForm<InvestorForm>({
    resolver,
    shouldFocusError: true,
    shouldUseNativeValidation: true,
  });

  const handleCreate = useCallback(
    (data: InvestorForm) =>
      createInvestor.mutate(data, {
        onError: (error) => {
          const { errorPages, fieldErrors } = getServiceErrors<InvestorForm>(error, formPageInputs);
          fieldErrors.forEach(({ fieldName, message }) => setError(fieldName, { message }));
          errorPages.length && setCurrentPage(errorPages[0]);
        },
        onSuccess: () => {
          push({ pathname: '/investors/pending/' });
        },
      }),
    [createInvestor, push, setError]
  );

  const onSubmit: SubmitHandler<InvestorForm> = (values: InvestorForm) => {
    if (currentPage === 5) {
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

  return (
    <ProtectedPage permissions={[UserRoles.Light]}>
      <Head title={formatMessage({ defaultMessage: 'Setup investor profile', id: '7Rh11y' })} />

      <MultiPageLayout
        layout="narrow"
        title={formatMessage({ defaultMessage: 'Setup investor profile', id: '7Rh11y' })}
        autoNavigation={false}
        page={currentPage}
        alert={useGetAlert(createInvestor.error)}
        isSubmitting={createInvestor.isLoading}
        showOutro={false}
        onNextClick={handleNextClick}
        onPreviousClick={() => setCurrentPage(currentPage - 1)}
        showProgressBar
        onCloseClick={() => setShowLeave(true)}
        onSubmitClick={handleSubmit(onSubmit)}
      >
        <Page hasErrors={getPageErrors(0)}>
          <SelectLanguageForm fieldName="language" register={register} errors={errors} />
        </Page>
        <Page hasErrors={getPageErrors(1)}>
          <Profile
            register={register}
            control={control}
            setError={setError}
            setValue={setValue}
            errors={errors}
            investorTypes={enums?.investor_type}
            clearErrors={clearErrors}
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
        close={() => setShowLeave(true)}
        handleLeave={() => push(Paths.Dashboard)}
        title={formatMessage({ defaultMessage: 'Leave investor creation form', id: 'QqpgJo' })}
      />
    </ProtectedPage>
  );
};

NewInvestorPage.layout = {
  Component: FormPageLayout,
};

export default NewInvestorPage;
