import React from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import ErrorMessage from 'components/forms/error-message';
import FieldInfo from 'components/forms/field-info';
import Label from 'components/forms/label';
import Textarea from 'components/forms/textarea';
import { ProjectForm } from 'types/project';

import { ProjectFormPagesProps } from '..';

const OtherInformation = ({ register, errors }: ProjectFormPagesProps<ProjectForm>) => {
  const { formatMessage } = useIntl();
  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold mb-2.5">
        <FormattedMessage defaultMessage="Other information" id="kX7oGR" />
      </h1>
      <p className="mb-10 text-gray-900">
        <FormattedMessage
          defaultMessage="This description should sumarize your project in a few words. This information will be <n>public</n>."
          id="8SBW1H"
          values={{
            n: (chunk: string) => <span className="font-semibold">{chunk}</span>,
          }}
        />
      </p>
      <form noValidate>
        <div className="mb-6.5">
          <Label htmlFor="description" className="block mb-2.5">
            <span className="mr-2.5">
              <FormattedMessage defaultMessage="Short description of the project" id="YWQkk+" />
            </span>
            <FieldInfo
              content={formatMessage({
                defaultMessage:
                  "This description should succently explain your project. It should be a catching text since it's the first thing investors will read.",
                id: '5mkG4O',
              })}
            />
          </Label>
          <Textarea
            placeholder={formatMessage({
              defaultMessage: 'insert your answer (max 600 characters)',
              id: 'hPsrc0',
            })}
            id="description"
            name="description"
            register={register}
            aria-describedby="description-error"
          />
          <ErrorMessage id="description-error" errorText={errors?.description?.message} />
        </div>
        <div className="mb-6.5">
          <Label htmlFor="relevant-links" className="block mb-2.5">
            <span className="mr-2.5">
              <FormattedMessage defaultMessage="Relevant links (optional)" id="jKdvln" />
            </span>
            <FieldInfo
              content={formatMessage({
                defaultMessage:
                  'Use this space to share links to documents, videos and websites that support your pitch.',
                id: 'efZTBX',
              })}
            />
          </Label>
          <Textarea
            placeholder={formatMessage({
              defaultMessage: 'insert your answer (max 600 characters)',
              id: 'hPsrc0',
            })}
            id="relevant-links"
            name="relevant_links"
            register={register}
            aria-describedby="relevant-links-error"
          />
          <ErrorMessage id="relevant-links-error" errorText={errors?.relevant_links?.message} />
        </div>
      </form>
    </div>
  );
};

export default OtherInformation;
