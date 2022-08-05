import { FC } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import dynamic from 'next/dynamic';

import LocationSelectors from 'containers/forms/location-selectors';
import ProjectGallery from 'containers/forms/project-gallery';

import ErrorMessage from 'components/forms/error-message';
import FieldInfo from 'components/forms/field-info';
import Input from 'components/forms/input';
import Label from 'components/forms/label';
import Textarea from 'components/forms/textarea';

import { OpenCallInformationProps } from '../types';
// Import the uploader component only if is on th client because DirectUpload is not supported on server
const Uploader = dynamic(() => import('containers/forms/uploader'), { ssr: false });

export const OpenCallInformation: FC<OpenCallInformationProps> = ({
  register,
  errors,
  setError,
  control,
  clearErrors,
  setValue,
  resetField,
}) => {
  const { formatMessage } = useIntl();

  const handleUploadImages = () => {};

  return (
    <div className="max-w-[814px] m-auto">
      <div className="mb-5">
        <h1 className="mb-2 font-serif text-3xl font-semibold">
          <FormattedMessage defaultMessage="Information about the open call" id="1pQoFr" />
        </h1>
        <p className="text-gray-600">
          <FormattedMessage
            defaultMessage="This information will be displayed in the open call page."
            id="Ac9oiY"
          />
        </p>
      </div>
      <form>
        <div>
          <Label htmlFor="name">
            <FormattedMessage defaultMessage="Open call name" id="8Gp8gS" />
          </Label>
          <Input
            className="mt-2.5"
            type="text"
            name="name"
            id="name"
            register={register}
            placeholder={formatMessage({
              defaultMessage: 'insert the open call name',
              id: '5oTICT',
            })}
            aria-describedby="name-error"
          />
          <ErrorMessage id="name-error" errorText={errors.name?.message} />
        </div>
        <div className="mt-6">
          <div className="mb-2.5">
            <Label htmlFor="picture" className="mr-2">
              <FormattedMessage defaultMessage="Picture (optional)" id="8rdnTq" />
            </Label>
            <FieldInfo
              infoText={formatMessage({
                defaultMessage: 'A picture can make your open call page more attractive.',
                id: 'iFQwyC',
              })}
            />
          </div>
          <Uploader
            id="picture"
            aria-describedby="picture-error"
            name="picture"
            setError={setError}
            clearErrors={clearErrors}
            controlOptions={{ disabled: false }}
            control={control}
            // See: Browser limitations section
            // https://react-dropzone.org/#section-accepting-specific-file-types
            fileTypes={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
            maxFiles={6}
            maxSize={5 * 1024 * 1025}
            onUpload={handleUploadImages}
          />
          <ErrorMessage id="picture-error" errorText={errors?.picture?.message} />
        </div>
        <div className="mt-7">
          <LocationSelectors
            control={control}
            resetField={resetField}
            errors={errors}
            fields={{
              country: { fieldName: 'country_id', required: true },
              state: { fieldName: 'department_id', required: false },
              municipality: { fieldName: 'municipality_id', required: false },
            }}
          />
        </div>
        <div className="mt-6">
          <div className="mb-2.5">
            <Label htmlFor="description" className="mr-2">
              <FormattedMessage defaultMessage="What is the open call about?" id="HcakU9" />
            </Label>
            {/* <FieldInfo
              infoText={formatMessage({
                defaultMessage: 'A picture can make your open call page more attractive.',
                id: 'iFQwyC',
              })}
            /> */}
          </div>
          <Textarea
            className="mt-2.5"
            name="description"
            id="description"
            register={register}
            placeholder={formatMessage({
              defaultMessage: 'insert your answer (max 600 characters)',
              id: 'hPsrc0',
            })}
            aria-describedby="description-error"
          />
          <ErrorMessage id="description-error" errorText={errors.description?.message} />
        </div>
      </form>
    </div>
  );
};
