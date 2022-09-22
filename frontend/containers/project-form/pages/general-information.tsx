import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { Controller, FieldError } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import dynamic from 'next/dynamic';

import GeometryInput from 'containers/forms/geometry';
import LocationSelectors from 'containers/forms/location-selectors';
import ProjectGallery from 'containers/forms/project-gallery';

import ErrorMessage from 'components/forms/error-message';
import FieldInfo from 'components/forms/field-info';
import Input from 'components/forms/input';
import Label from 'components/forms/label';
import MultiCombobox, { Option } from 'components/forms/multi-combobox';
import { ProjectForm, ProjectImageGallery } from 'types/project';

import { useProjectDevelopersList } from 'services/project-developers/projectDevelopersService';

import { ProjectFormPagesProps } from '..';

// Import the uploader component only if is on th client because DirectUpload is not supported on server
const Uploader = dynamic(() => import('containers/forms/uploader'), { ssr: false });

const GeneralInformation = ({
  register,
  errors,
  control,
  getValues,
  watch,
  resetField,
  setValue,
  clearErrors,
  setError,
}: ProjectFormPagesProps<ProjectForm>) => {
  const { formatMessage } = useIntl();

  const [defaultInvolvedProjectDeveloper, setDefaultInvolvedProjectDeveloper] = useState<boolean>();

  const { projectDevelopers } = useProjectDevelopersList({
    perPage: 1000,
    fields: ['name'],
  });

  const watchedProjectImagesAttributes = watch('project_images_attributes');
  const watchedInvolvedProjectDeveloper = watch('involved_project_developer');

  const handleChangeInvolvedProjectDeveloper = (e: ChangeEvent<HTMLInputElement>) => {
    setDefaultInvolvedProjectDeveloper(!!Number(e.target.value));
    setValue('involved_project_developer', Number(e.target.value));
  };

  const handleSelectCover = useCallback(
    (imageFile: ProjectImageGallery['file']) => {
      setValue(
        'project_images_attributes',
        watchedProjectImagesAttributes?.map((image) => ({
          ...image,
          cover: image.file === imageFile,
        })) ?? []
      );
    },
    [setValue, watchedProjectImagesAttributes]
  );

  const handleUploadImages = useCallback(
    (newUploadedImages: ProjectImageGallery[]) => {
      const hasCover = watchedProjectImagesAttributes?.some((image) => image.cover) ?? false;

      setValue('project_images_attributes', [
        ...(watchedProjectImagesAttributes ?? []),
        ...newUploadedImages.map((image, index) => ({ ...image, cover: !hasCover && index === 0 })),
      ]);
    },
    [setValue, watchedProjectImagesAttributes]
  );

  const handleDeleteImage = useCallback(
    (imageFile: ProjectImageGallery['file']) => {
      const updatedImages =
        watchedProjectImagesAttributes?.map((image) => ({
          ...image,
          _destroy: image.file === imageFile ? true : image._destroy,
        })) ?? [];

      const remainingImages = updatedImages.filter((image) => !image._destroy);
      const coverImage = updatedImages.find((image) => image.cover);

      if (coverImage?._destroy === true && remainingImages.length > 0) {
        remainingImages[0].cover = true;
        coverImage.cover = false;
      }

      // Set images with the new images array
      setValue('project_images_attributes', updatedImages);
    },
    [setValue, watchedProjectImagesAttributes]
  );

  useEffect(() => {
    // If there is a value for involved_project_developer, it checks the corresponding radio button
    if (typeof watchedInvolvedProjectDeveloper === 'number') {
      setDefaultInvolvedProjectDeveloper(!!Number(watchedInvolvedProjectDeveloper));
    }
  }, [watchedInvolvedProjectDeveloper]);

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold mb-2.5">
        <FormattedMessage defaultMessage="Project information" id="5c08Qp" />
      </h1>
      <p className="mb-10 text-gray-900">
        <FormattedMessage
          defaultMessage="General information about your project. This information will be <n>public.</n>"
          id="DSzCPO"
          values={{
            n: (chunk: string) => <span className="font-semibold">{chunk}</span>,
          }}
        />
      </p>
      <form noValidate>
        <div className="mb-6.5">
          <Label htmlFor="name">
            <span className="mr-2.5">
              <FormattedMessage defaultMessage="Project name" id="D5RCKi" />
            </span>
            <FieldInfo
              content={formatMessage({
                defaultMessage: 'A great name is short, crisp, and easily understood.',
                id: 'rPwaWt',
              })}
            />
          </Label>
          <Input
            register={register}
            name="name"
            id="name"
            aria-describedby="name-error"
            type="text"
            className="mt-2.5"
            placeholder={formatMessage({
              defaultMessage: 'insert the project name',
              id: 'iD2hRt',
            })}
          />
          <ErrorMessage id="name-error" errorText={errors?.name?.message} />
        </div>
        {/* Project gallery. The input will be replaced later. It is not a part of the form. It should be a direct upload */}
        <div className="mb-6.5">
          <Label htmlFor="project-gallery" className="block mb-2.5">
            <span className="mr-2.5">
              <FormattedMessage defaultMessage="Project gallery (optional)" id="7aTDQM" />
            </span>
            <FieldInfo
              content={formatMessage({
                defaultMessage:
                  'The project gallery will be the first thing other users will see on you page, it will help you to showcase you project.',
                id: 'c1m3Q7',
              })}
            />
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
                onUpload={handleUploadImages}
              />
            </div>
            <div className="w-full h-[176px]">
              <ProjectGallery
                name="project_images_attributes"
                setValue={setValue}
                clearErrors={clearErrors}
                errors={errors}
                className="h-full"
                onDeleteImage={handleDeleteImage}
                onSelectCover={handleSelectCover}
                control={control}
              />
            </div>
          </div>
          <ErrorMessage
            id="project-images-attributes-error"
            errorText={
              Array.isArray(errors?.project_images_attributes)
                ? errors?.project_images_attributes[0].cover?.message
                : (errors?.project_images_attributes as FieldError)?.message
            }
          />
        </div>
        <div className="mb-8">
          <h2 className="mb-2.5 text-gray-600">
            <FormattedMessage defaultMessage="Location" id="rvirM2" />
          </h2>
          <LocationSelectors
            control={control}
            resetField={resetField}
            getValues={getValues}
            errors={errors}
            fields={{
              country: { fieldName: 'country_id', required: true },
              state: { fieldName: 'department_id', required: true },
              municipality: { fieldName: 'municipality_id', required: true },
            }}
          />
        </div>
        <div className="mb-6.5">
          <Label htmlFor="geometry">
            <span className="mr-2.5">
              <FormattedMessage defaultMessage="Draw or upload your location" id="MHwpc4" />
            </span>
            <FieldInfo
              content={
                <>
                  <p>
                    <FormattedMessage
                      defaultMessage="Draw on the map or upload a file with the geographical area your project will have an impact on."
                      id="YEYmEz"
                    />
                  </p>
                  <p className="mt-2">
                    <FormattedMessage
                      defaultMessage="To upload a Shapefile, you must upload the .shp, .shx, .dbf and .prj files all at once."
                      id="OxfymA"
                    />
                  </p>
                </>
              }
            />
          </Label>
          <GeometryInput
            id="geometry"
            name="geometry"
            control={control}
            controlOptions={{ disabled: false }}
            aria-describedby="geometry-error"
            className="-mt-7"
          />
          <ErrorMessage
            id="geometry-error"
            errorText={(errors?.geometry as unknown as FieldError)?.message}
          />
        </div>
        <div className="mb-6.5">
          <h2 className="mb-2.5 text-gray-600">
            <FormattedMessage defaultMessage="Project developers" id="0wBg9P" />
          </h2>
          <div>
            {/* This fieldset is not a part of the form, it is just to control the visibility of the project developers select. It will be removed from the payload */}
            <fieldset name="involved_project_developer">
              <legend className="inline font-sans font-semibold text-sm text-gray-800 mb-4.5">
                <span className="mr-2.5">
                  <FormattedMessage
                    defaultMessage="Are there other Project developers involved in the project?"
                    id="Xk8qys"
                  />
                </span>
                <FieldInfo
                  content={formatMessage({
                    defaultMessage: 'Do you have a partnership with someone else?',
                    id: 'nbqoY2',
                  })}
                />
              </legend>
              <Label id="involved-project-developer-yes" className="block font-normal">
                <Controller
                  control={control}
                  name="involved_project_developer"
                  render={(field) => (
                    <input
                      {...field}
                      id="involved-project-developer-yes"
                      type="radio"
                      value={1}
                      checked={defaultInvolvedProjectDeveloper}
                      className="mr-2"
                      name="involved_project_developer"
                      onChange={handleChangeInvolvedProjectDeveloper}
                    />
                  )}
                />
                <FormattedMessage defaultMessage="Yes" id="a5msuh" />
              </Label>
              <Label htmlFor="involved-project-developer-no" className="block mt-4 font-normal">
                <Controller
                  control={control}
                  name="involved_project_developer"
                  render={(field) => (
                    <input
                      {...field}
                      id="involved-project-developer-no"
                      type="radio"
                      value={0}
                      checked={defaultInvolvedProjectDeveloper === false}
                      className="mr-2"
                      name="involved_project_developer"
                      onChange={handleChangeInvolvedProjectDeveloper}
                    />
                  )}
                />
                <FormattedMessage defaultMessage="No" id="oUWADl" />
              </Label>
              <ErrorMessage
                id="involved-project-developer-error"
                errorText={(errors?.involved_project_developer as FieldError)?.message}
              />
            </fieldset>
            {/* Project developers selector */}
            <div
              className={cx('relative top-[-66px] left-16 w-[360px]', {
                hidden: !defaultInvolvedProjectDeveloper,
              })}
            >
              <MultiCombobox
                id="involved-project-developer-ids"
                aria-label={formatMessage({
                  defaultMessage: 'Project developers involved in the project',
                  id: 'SYPx2d',
                })}
                name="involved_project_developer_ids"
                control={control}
                controlOptions={{
                  disabled: false,
                }}
                placeholder={formatMessage({
                  defaultMessage: 'select project developers',
                  id: 'QESbGa',
                })}
                aria-describedby="involved-project-developer-ids-error"
              >
                {[
                  ...projectDevelopers,
                  // The hardcoded option Not Listed
                  {
                    id: 'not-listed',
                    name: formatMessage({ defaultMessage: 'Not listed', id: '8rAlFa' }),
                  },
                ]?.map(({ id, name }) => (
                  <Option key={id}>{name}</Option>
                ))}
              </MultiCombobox>
              <ErrorMessage
                id="involved-project-developer-ids-error"
                errorText={
                  Array.isArray(errors?.involved_project_developer_ids)
                    ? errors?.involved_project_developer_ids[0].message
                    : (errors?.involved_project_developer_ids as FieldError)?.message
                }
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GeneralInformation;
