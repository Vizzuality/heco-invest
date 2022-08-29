import { FC, useMemo } from 'react';

import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import Link from 'next/link';

import { useGetAlert } from 'helpers/pages';

import Alert from 'components/alert';
import Button from 'components/button';
import Combobox, { Option } from 'components/forms/combobox';
import ErrorMessage from 'components/forms/error-message';
import FieldInfo from 'components/forms/field-info';
import Label from 'components/forms/label';
import Textarea from 'components/forms/textarea';
import Loading from 'components/loading';
import Modal from 'components/modal';
import { Paths } from 'enums';
import { OpenCallApplicationForm } from 'types/open-call-applications';
import { useApplyToOpenCallResolver } from 'validations/open-call-application';

import { useAccountProjectsList } from 'services/account';
import { useApplyToOpenCall } from 'services/open-call/applicationService';

import type { OpenCallApplicationModalProps } from './types';

export const OpenCallApplicationModal: FC<OpenCallApplicationModalProps> = ({
  openCallId,
  isOpen,
  onClose,
}: OpenCallApplicationModalProps) => {
  const { formatMessage } = useIntl();
  const applyToOpenCall = useApplyToOpenCall();
  const alert = useGetAlert(applyToOpenCall.error);
  const resolver = useApplyToOpenCallResolver();

  const { data: { data: projects } = { data: [] }, isLoading: isLoadingProjects } =
    useAccountProjectsList();

  const sortedProjects = useMemo(
    () => projects.sort((a, b) => a.name.localeCompare(b.name)),
    [projects]
  );

  const defaultValues = {
    project_id: null,
    message: '',
  };

  const {
    control,
    formState: { errors },
    clearErrors,
    handleSubmit,
    register,
    reset,
  } = useForm<OpenCallApplicationForm>({
    resolver,
    shouldFocusError: true,
    shouldUseNativeValidation: true,
    reValidateMode: 'onChange',
    defaultValues,
  });

  const closeModal = () => {
    applyToOpenCall.reset();
    reset(defaultValues);
    clearErrors();
    onClose();
  };

  const onSubmit = (values: OpenCallApplicationForm) => {
    const { project_id, message } = values;

    applyToOpenCall.mutate(
      { open_call_id: openCallId, project_id, message },
      { onSuccess: closeModal }
    );
  };

  return (
    <Modal
      onDismiss={closeModal}
      title={formatMessage({ defaultMessage: 'Apply to Open Call', id: 'vC2u0N' })}
      open={isOpen}
      size="narrow"
      scrollable={false}
    >
      <form className="flex flex-col" noValidate autoComplete="off">
        <p className="mb-2 font-serif text-3xl text-green-dark">
          <FormattedMessage defaultMessage="Apply" id="EWw/tK" />
        </p>

        <p className="mb-4">
          <FormattedMessage
            defaultMessage="Select one of your projects and tell the investor why your project should receive the funding to apply."
            id="iosznt"
          />
        </p>
        {isLoadingProjects ? (
          <div className="relative flex items-center justify-center h-20">
            <Loading visible={true} iconClassName="w-8 h-8" />
          </div>
        ) : (
          <>
            <div>
              <Label className="mr-2" htmlFor="project-id">
                <FormattedMessage defaultMessage="Select project to apply" id="3BlzQw" />
              </Label>
              <FieldInfo
                content={formatMessage({
                  defaultMessage: 'Choose one of your projects to apply to the open call.',
                  id: 'b6bipu',
                })}
              />
            </div>
            <Combobox
              control={control}
              controlOptions={{ disabled: false }}
              aria-required
              name="project_id"
              id="project-id"
              className="mt-2.5 w-full h-10 border border-beige rounded-lg px-4"
              height="small"
              placeholder={formatMessage({
                defaultMessage: 'select project',
                id: 'kRnyPA',
              })}
              aria-describedby="project-id-error project-id-note"
            >
              {sortedProjects.map(({ id, name }) => (
                <Option key={id}>{name}</Option>
              ))}
            </Combobox>
            <ErrorMessage id="project-id-error" errorText={errors?.project_id?.message} />

            <span id="project-id-note" className="mt-2">
              <Link href={Paths.ProjectCreation} passHref>
                <a className="inline text-sm text-gray-600 underline rounded-full focus-visible:outline focus-visible:outline-green-dark focus-visible:outline-2 focus-visible:outline-offset-2">
                  <FormattedMessage
                    defaultMessage="Don’t have a project yet? Create a project now"
                    id="SFCYg4"
                  />
                </a>
              </Link>
            </span>

            <div className="mt-4">
              <Label className="mr-2" htmlFor="message">
                <FormattedMessage defaultMessage="Type your message" id="HtMY9H" />
              </Label>
              <FieldInfo
                content={formatMessage({
                  defaultMessage: 'Tell the investor why your project should receive the funding.',
                  id: '3WLO/M',
                })}
              />
            </div>
            <Textarea
              id="message"
              name="message"
              className="mt-2.5"
              register={register}
              aria-describedby="message-error"
            />
            <ErrorMessage id="message-error" errorText={errors?.message?.message} />
          </>
        )}
        {alert && (
          <Alert type="warning" className="my-4 -mb-4 rounded">
            {/* useGetAlert returns an array, but the endpoint only sends one error message at a time. */}
            {alert[0]}
          </Alert>
        )}

        <div className="flex justify-end mt-8">
          <Button
            theme="secondary-green"
            size="small"
            className="flex-shrink-0 mr-5"
            onClick={closeModal}
          >
            <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
          </Button>
          <Button
            type="submit"
            className="flex-shrink-0 mr-5"
            theme="primary-green"
            size="small"
            disabled={applyToOpenCall.isLoading || isLoadingProjects}
            onClick={handleSubmit(onSubmit)}
          >
            <Loading className="mr-2" visible={applyToOpenCall.isLoading} />
            <FormattedMessage defaultMessage="Send application" id="qY71uO" />
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default OpenCallApplicationModal;
