import { FC, useEffect, useState } from 'react';

import { usePress } from 'react-aria';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { useGetAlert } from 'helpers/pages';

import Alert from 'components/alert';
import Switch from 'components/forms/switch';

import { useOpenCallApplicationFunding } from 'services/open-call/application-service';

import { FundingSwitchProps } from './types';

export const FundingSwitch: FC<FundingSwitchProps> = ({
  openCallApplication,
}: FundingSwitchProps) => {
  const [prevFunded, setPrevFunded] = useState<boolean>(null);

  const fundingOpenCallMutation = useOpenCallApplicationFunding();

  const { register, watch, setValue, getValues, reset } = useForm({
    defaultValues: {
      funding: null,
    },
  });

  const funding = !!watch('funding');

  useEffect(() => {
    if (!openCallApplication) return;

    if (openCallApplication.funded !== prevFunded) {
      setPrevFunded(openCallApplication.funded);
      setValue('funding', openCallApplication.funded);
    }
  }, [openCallApplication, prevFunded, setValue]);

  const { pressProps } = usePress({
    onPress: () => {
      fundingOpenCallMutation.mutate(
        { id: openCallApplication.id, isFunding: !funding },
        {
          onSuccess: () => {
            fundingOpenCallMutation.reset();
          },
          onError: () => {
            setValue('funding', openCallApplication.funded);
          },
        }
      );
    },
  });

  return (
    <form>
      <label
        htmlFor="funding"
        className="flex items-center gap-2 text-sm font-semibold text-gray-800 cursor-pointer"
      >
        <Switch
          id="funding"
          name="funding"
          switchSize="smallest"
          register={register}
          value={true}
          checked={funding}
          {...pressProps}
        />
        <FormattedMessage defaultMessage="I'm financing this project" id="kICTEM" />
      </label>
      {fundingOpenCallMutation.error && (
        <Alert type="warning" className="mt-4 rounded">
          <FormattedMessage
            defaultMessage="There was an error processing your request. Please try again."
            id="URkYUE"
          />
        </Alert>
      )}
    </form>
  );
};

export default FundingSwitch;
