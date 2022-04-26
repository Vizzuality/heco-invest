import React, { useEffect, useState } from 'react';

import { FieldError } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import Combobox, { Option } from 'components/forms/combobox';
import ErrorMessage from 'components/forms/error-message';
import FieldInfo from 'components/forms/field-info';
import Input from 'components/forms/input';
import Label from 'components/forms/label';
import { ProjectForm } from 'types/project';

import { useGroupedLocations } from 'services/locations/locations';
import { useProjectDevelopersList } from 'services/project-developers/projectDevelopersService';

import { ProjectFormPagesProps } from '..';

const GeneralInformation = ({
  register,
  errors,
  control,
  getValues,
}: ProjectFormPagesProps<ProjectForm>) => {
  const [showInvolvedProjectDevelopers, setShowInvolvedProjectDevelopers] = useState(false);
  const { formatMessage } = useIntl();
  const { locations } = useGroupedLocations();
  // I don't know if there is a better way to get all items, since the default page size is 10. I'm assuming that there will not be more than 1000 locations.
  const { projectDevelopers } = useProjectDevelopersList({ 'page[size]': 1000 });

  useEffect(() => {
    // This is just for when the user get back to this page (the page mounts), it shows the select if there is any value selected
    if (getValues('involved_project_developer')) {
      setShowInvolvedProjectDevelopers(true);
    }
  }, [getValues]);

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold mb-2.5">
        <FormattedMessage defaultMessage="Project information" id="5c08Qp" />
      </h1>
      <p className="mb-10 text-gray-600">
        <FormattedMessage
          defaultMessage="This information will be visible in the project page when you launch it."
          id="avVMND"
        />
      </p>
      <form>
        <div className="mb-6.5">
          <Label htmlFor="name">
            <span className="mr-2.5">
              <FormattedMessage defaultMessage="Project name" id="D5RCKi" />
            </span>
            <FieldInfo
              infoText={formatMessage({
                defaultMessage: 'A great name is short, crisp, and easily understood.',
                id: 'rPwaWt',
              })}
            />
          </Label>
          <Input
            register={register}
            name="name"
            id="name"
            type="text"
            className="mt-2.5"
            placeholder={formatMessage({
              defaultMessage: 'insert the project name',
              id: 'iD2hRt',
            })}
          />
          <ErrorMessage id="name" errorText={errors?.name?.message} />
        </div>
        {/* Project gallery. The input will be replaced later. It is not a part of the form. It should be a direct upload */}
        <div className="mb-6.5">
          <Label htmlFor="project-gallery" className="block mb-2.5">
            <span className="mr-2.5">
              <FormattedMessage defaultMessage="Project gallery (optional)" id="7aTDQM" />
            </span>
            <FieldInfo
              infoText={formatMessage({
                defaultMessage:
                  'The project gallery will be the first thing other users will see on you page, it will help you to showcase you project.',
                id: 'c1m3Q7',
              })}
            />
          </Label>
          <input
            {...register('project_gallery')}
            className="block"
            type="file"
            accept="image/png,image/jpg"
            multiple
          />
          {/* https://vizzuality.atlassian.net/browse/LET-345 */}
          <ErrorMessage id="name" errorText={errors?.project_gallery?.message} />
        </div>
        <div className="mb-6.5">
          <p className="mb-2.5 text-gray-600">
            <FormattedMessage defaultMessage="Location" id="rvirM2" />
          </p>
          <div className="gap-8 md:flex">
            <div className="w-full">
              <Label htmlFor="country">
                <span className="mr-2.5">
                  <FormattedMessage defaultMessage="Country" id="vONi+O" />
                </span>
                <Combobox
                  id="country"
                  name="country_id"
                  control={control}
                  controlOptions={{ disabled: false }}
                  className="mt-2.5"
                  placeholder={formatMessage({ defaultMessage: 'select', id: 'J4SQjQ' })}
                >
                  {locations?.country?.map(({ id, attributes: { name } }) => (
                    <Option key={id}>{name}</Option>
                  ))}
                </Combobox>
                {/* https://vizzuality.atlassian.net/browse/LET-347 */}
                <ErrorMessage id="name" errorText={errors?.country_id?.message} />
              </Label>
            </div>
            <div className="w-full">
              <Label htmlFor="department">
                <span className="mr-2.5">
                  <FormattedMessage defaultMessage="State" id="ku+mDU" />
                </span>
                <Combobox
                  id="department"
                  name="department_id"
                  control={control}
                  controlOptions={{ disabled: false }}
                  className="mt-2.5"
                  placeholder={formatMessage({ defaultMessage: 'select', id: 'J4SQjQ' })}
                >
                  {locations?.department?.map(({ id, attributes: { name } }) => (
                    <Option key={id}>{name}</Option>
                  ))}
                </Combobox>
                {/* https://vizzuality.atlassian.net/browse/LET-347 */}
                <ErrorMessage id="name" errorText={errors?.department_id?.message} />
              </Label>
            </div>
            <div className="w-full">
              <Label htmlFor="municipality">
                <span className="mr-2.5">
                  <FormattedMessage defaultMessage="Municipality" id="9I1zvK" />
                </span>
              </Label>
              <Combobox
                id="municipality"
                name="municipality_id"
                control={control}
                controlOptions={{ disabled: false }}
                className="mt-2.5"
                placeholder={formatMessage({ defaultMessage: 'select', id: 'J4SQjQ' })}
              >
                {locations?.municipality?.map(({ id, attributes: { name } }) => (
                  <Option key={id}>{name}</Option>
                ))}
              </Combobox>
              {/* https://vizzuality.atlassian.net/browse/LET-347 */}
              <ErrorMessage id="name" errorText={errors?.municipality_id?.message} />
            </div>
          </div>
        </div>
        <div className="mb-6.5">
          <Label htmlFor="location">
            <span className="mr-2.5">
              <FormattedMessage defaultMessage="Draw or upload your location" id="MHwpc4" />
            </span>
            <FieldInfo
              infoText={formatMessage({
                defaultMessage:
                  'Draw on the map or upload a file with the geographical area your project will have an impact on.',
                id: 'YEYmEz',
              })}
            />
          </Label>
          {/* Shapefile button - location */}
          {/* Map - location */}
          <ErrorMessage id="name" errorText={errors?.location?.message} />
        </div>
        <div className="mb-6.5">
          <p className="mb-2.5 text-gray-600">
            <FormattedMessage defaultMessage="Project developers" id="0wBg9P" />
          </p>
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
                  infoText={formatMessage({
                    defaultMessage: 'Do you have a partnership with someone else?',
                    id: 'nbqoY2',
                  })}
                />
              </legend>
              <Label className="block font-normal">
                <input
                  id="involved-project-developer"
                  type="radio"
                  value={1}
                  className="mr-2"
                  {...register('involved_project_developer')}
                  onChange={() => setShowInvolvedProjectDevelopers(true)}
                />
                <FormattedMessage defaultMessage="Yes" id="a5msuh" />
              </Label>
              <Label className="block mt-4 font-normal">
                <input
                  id="involved-project-developer"
                  type="radio"
                  value={0}
                  className="mr-2"
                  {...register('involved_project_developer', {
                    onChange: () => setShowInvolvedProjectDevelopers(false),
                  })}
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
                hidden: !showInvolvedProjectDevelopers,
              })}
            >
              <Combobox
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
              >
                {[
                  ...projectDevelopers,
                  // The hardcoded option Not Listed
                  { id: 'not-listed', attributes: { name: 'not listed' } },
                ]?.map(({ id, attributes: { name } }) => (
                  <Option key={id}>{name}</Option>
                ))}
              </Combobox>
            </div>
          </div>
          <ErrorMessage id="name" errorText={errors?.involved_project_developer_ids?.[0].message} />
        </div>
      </form>
    </div>
  );
};

export default GeneralInformation;
