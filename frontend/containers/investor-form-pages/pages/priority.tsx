import { FC } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import ErrorMessage from 'components/forms/error-message';
import Label from 'components/forms/label';
import Textarea from 'components/forms/textarea';

import { PriorityProps } from '../types';

export const Priority: FC<PriorityProps> = ({ register, errors }) => {
  const { formatMessage } = useIntl();
  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold mb-2.5">
        <FormattedMessage
          defaultMessage="What type of projects are you prioritizing?"
          id="stKKFV"
        />
      </h1>

      <form noValidate>
        <div>
          <Label
            htmlFor="prioritized-projects-description"
            className="block mb-2 text-base font-normal text-gray-600"
          >
            <FormattedMessage
              defaultMessage="Tell us what you value in the projects you invest in / what will make you invest in projects"
              id="0DNR+D"
            />
          </Label>
          <Textarea
            id="prioritized-projects-description"
            name="prioritized_projects_description"
            aria-describedby="prioritized-projects-description-error"
            register={register}
            placeholder={formatMessage({
              defaultMessage: 'insert your answer (max 600 characters)',
              id: 'hPsrc0',
            })}
            className="min-h-[240px]"
          />
          <ErrorMessage
            id="prioritized-projects-description-error"
            errorText={errors?.prioritized_projects_description?.message}
          />
        </div>
      </form>
    </div>
  );
};

export default Priority;
