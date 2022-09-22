import { FieldError } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import ErrorMessage from 'components/forms/error-message';
import FieldInfo from 'components/forms/field-info';
import Label from 'components/forms/label';
import Textarea from 'components/forms/textarea';
import { ProjectForm } from 'types/project';

import { ProjectFormPagesProps } from '..';

export const ProjectGrow = ({ register, errors }: ProjectFormPagesProps<ProjectForm>) => {
  const { formatMessage } = useIntl();
  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold mb-2.5">
        <FormattedMessage defaultMessage="How your project will grow" id="u87XOB" />
      </h1>
      <p className="mb-10 text-gray-900">
        <FormattedMessage
          defaultMessage="Tell us what how do you expect to grow your project , how will you measure progress and impact. This information will be <n>public</n>."
          id="W69F0D"
          values={{
            n: (chunk: string) => <span className="font-semibold">{chunk}</span>,
          }}
        />
      </p>
      <form noValidate>
        <div className="mb-6.5">
          <Label htmlFor="replicability" className="block mb-2.5">
            <span className="mr-2.5">
              <FormattedMessage defaultMessage="Replicability of the project" id="qoImFc" />
            </span>
            <FieldInfo
              content={formatMessage({
                defaultMessage:
                  'Explain how the solution or project can be replicated in other contexts and geographies. Think practically about the existing opportunities, the partners and allies needed as well as the barriers that this replication effort may face such as climate issues, regulations and legal frameworks, land tenure, institutional capacity, etc.',
                id: '6MoU6D',
              })}
            />
          </Label>
          <Textarea
            placeholder={formatMessage({
              defaultMessage: 'insert your answer (max 600 characters)',
              id: 'hPsrc0',
            })}
            id="replicability"
            name="replicability"
            register={register}
            aria-describedby="replicability-error"
          />
          <ErrorMessage id="replicability-error" errorText={errors?.replicability?.message} />
        </div>

        <div className="mb-6.5">
          <Label htmlFor="sustainability" className="block mb-2.5">
            <span className="mr-2.5">
              <FormattedMessage defaultMessage="Sustainability of the project" id="8MAKwj" />
            </span>
            <FieldInfo
              content={formatMessage({
                defaultMessage:
                  'Explain how the impact of the solution or project will be maintained after funding.  Try to be specific and not too vague. Is the solution or project will be financially viable? How? What are the key elements to ensure sustainability (business model, partners, partnerships with governments, etc.)?',
                id: 'oN8abW',
              })}
            />
          </Label>
          <Textarea
            placeholder={formatMessage({
              defaultMessage: 'insert your answer (max 600 characters)',
              id: 'hPsrc0',
            })}
            id="sustainability"
            name="sustainability"
            register={register}
            aria-describedby="sustainability-error"
          />
          <ErrorMessage id="sustainability-error" errorText={errors?.sustainability?.message} />
        </div>

        <div className="mb-6.5">
          <Label htmlFor="progress-impact-tracking" className="block mb-2.5">
            <span className="mr-2.5">
              <FormattedMessage defaultMessage="Progress and impact tracking" id="JJQfhh" />
            </span>
            <FieldInfo
              content={formatMessage({
                defaultMessage:
                  'How do you plan to measure the progress and impact of the project or solution? What would be the key indicators to be used for these measurements?',
                id: 'yb3Bot',
              })}
            />
          </Label>
          <Textarea
            placeholder={formatMessage({
              defaultMessage: 'insert your answer (max 600 characters)',
              id: 'hPsrc0',
            })}
            id="progress-impact-tracking"
            name="progress_impact_tracking"
            register={register}
            aria-describedby="progress-impact-tracking-error"
          />
          <ErrorMessage
            id="progress-impact-tracking-error"
            errorText={errors?.progress_impact_tracking?.message}
          />
        </div>
      </form>
    </div>
  );
};

export default ProjectGrow;
