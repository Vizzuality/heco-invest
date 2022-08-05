import { FC } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import FieldInfo from 'components/forms/field-info';
import Input from 'components/forms/input';
import Label from 'components/forms/label';

import { OpenCallInformationProps } from '../types';
import dynamic from 'next/dynamic';
import ProjectGallery from 'containers/forms/project-gallery';
// Import the uploader component only if is on th client because DirectUpload is not supported on server
const Uploader = dynamic(() => import('containers/forms/uploader'), { ssr: false });

export const OpenCallInformation: FC<OpenCallInformationProps> = ({
  register,
  errors,
  setError,
  control,
  clearErrors,
  setValue,
}) => {
  const { formatMessage } = useIntl();

  const handleDeleteImage = () => {};
  const handleSelectCover = () => {};

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
          />
          {errors.name && <FieldInfo infoText={errors.name?.message} />}
        </div>
        <div>
          <Label htmlFor="name">
            <FormattedMessage defaultMessage="Picture (optional)" id="8rdnTq" />
          </Label>
          <div className="flex flex-col sm:flex-row gap-4 sm:h-[176px]">
            <div className="w-full h-full">
              <Uploader
                id="project-images-attributes"
                aria-describedby="project-images-attributes-error"
                name="project_images_attributes"
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
            </div>
            <div className="w-full h-[176px]">
              <ProjectGallery
                images={images}
                name="project_images_attributes_cover"
                setValue={setValue}
                clearErrors={clearErrors}
                errors={errors}
                className="h-full"
                onDeleteImage={handleDeleteImage}
                onSelectCover={handleSelectCover}
                // defaultSelected={coverImage}
                control={control}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
