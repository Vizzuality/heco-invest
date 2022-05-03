import React, { ChangeEvent, useEffect, useState } from 'react';

import { FieldError } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import GeometryInput from 'containers/forms/geometry';
import Uploader from 'containers/forms/uploader';

import Combobox, { Option } from 'components/forms/combobox';
import ErrorMessage from 'components/forms/error-message';
import FieldInfo from 'components/forms/field-info';
import Input from 'components/forms/input';
import Label from 'components/forms/label';
import MultiCombobox from 'components/forms/multi-combobox';
import { LocationsTypes } from 'enums';
import { ProjectForm } from 'types/project';

import { useGroupedLocations } from 'services/locations/locations';
import { useProjectDevelopersList } from 'services/project-developers/projectDevelopersService';

import { ProjectFormPagesProps } from '..';

const GeneralInformation = ({
  register,
  errors,
  control,
  getValues,
  resetField,
}: ProjectFormPagesProps<ProjectForm>) => {
  const [showInvolvedProjectDevelopers, setShowInvolvedProjectDevelopers] = useState(false);
  const [locationsFilter, setLocationsFilter] = useState<{ country: string; department: string }>({
    country: undefined,
    department: undefined,
  });
  const { formatMessage } = useIntl();
  const { locations } = useGroupedLocations();

  const { projectDevelopers } = useProjectDevelopersList({
    'page[size]': 1000,
    fields: ['name'],
  });

  useEffect(() => {
    // This is just for when the user get back to this page (the page mounts), it shows the select if there is any value selected
    setShowInvolvedProjectDevelopers(!!Number(getValues('involved_project_developer')));
  }, [getValues]);

  const handleChangeInvolvedProjectDeveloper = (e: ChangeEvent<HTMLInputElement>) => {
    setShowInvolvedProjectDevelopers(!!Number(e.target.value));
  };

  const getOptions = (locationType: LocationsTypes, filter: 'department' | 'country') => {
    let filteredLocations = [];
    if (locations) {
      // If there is data on locations
      filteredLocations = locations[locationType];
      // If there is a filter for the field
      if (locationsFilter && locationsFilter[filter]) {
        filteredLocations = filteredLocations?.filter(
          (location) => !locationsFilter[filter] || location.parent.id === locationsFilter[filter]
        );
      }
    }

    return filteredLocations?.map(({ id, name }) => <Option key={id}>{name}</Option>);
  };

  const handleChangeLocation = (locationType: LocationsTypes, e: any) => {
    const { value } = e.target;
    // The Combobox component responds to onChange even if the value is the same as before, but the field is reseted only if the value changes
    if (!locationsFilter || value !== locationsFilter[locationType]) {
      // if the country changes, the department and the municipality are reseted (clear field error and set value to undefined) and their options are filtered.
      // if the departmnet changes, only the municipality is affected
      setLocationsFilter({
        country: locationType === LocationsTypes.Country ? value : locationsFilter.country,
        department: locationType === LocationsTypes.Department ? value : undefined,
      });
      if (locationType === LocationsTypes.Country) resetField('department_id');
      resetField('municipality_id');
    }
  };

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
      <form noValidate>
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
          {/* <input
            id="project-gallery"
            {...register('project_gallery')}
            className="block"
            type="file"
            accept="image/png,image/jpg"
            multiple
          /> */}
          <Uploader onUpload={console.log} />
          {/* https://vizzuality.atlassian.net/browse/LET-345 */}
          <ErrorMessage id="name" errorText={errors?.project_gallery?.message} />
        </div>
        <div className="mb-8">
          <h2 className="mb-2.5 text-gray-600">
            <FormattedMessage defaultMessage="Location" id="rvirM2" />
          </h2>
          <div className="gap-8 md:flex">
            <div className="w-full">
              <Label htmlFor="country">
                <span className="mr-2.5">
                  <FormattedMessage defaultMessage="Country" id="vONi+O" />
                </span>
              </Label>
              <Combobox
                id="country"
                name="country_id"
                control={control}
                controlOptions={{
                  disabled: false,
                  onChange: (e) => handleChangeLocation(LocationsTypes.Country, e),
                }}
                className="mt-2.5"
                placeholder={formatMessage({ defaultMessage: 'select', id: 'J4SQjQ' })}
              >
                {locations?.country?.map(({ id, name }) => (
                  <Option key={id}>{name}</Option>
                ))}
              </Combobox>
              <ErrorMessage id="name" errorText={errors?.country_id?.message} />
            </div>
            <div className="w-full">
              <Label htmlFor="department">
                <span className="mr-2.5">
                  <FormattedMessage defaultMessage="State" id="ku+mDU" />
                </span>
              </Label>
              <Combobox
                id="department"
                name="department_id"
                control={control}
                controlOptions={{
                  disabled: false,
                  onChange: (e) => handleChangeLocation(LocationsTypes.Department, e),
                }}
                className="mt-2.5"
                placeholder={formatMessage({ defaultMessage: 'select', id: 'J4SQjQ' })}
              >
                {getOptions(LocationsTypes.Department, LocationsTypes.Country)}
              </Combobox>
              <ErrorMessage id="name" errorText={errors?.department_id?.message} />
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
                controlOptions={{
                  disabled: false,
                }}
                className="mt-2.5"
                placeholder={formatMessage({ defaultMessage: 'select', id: 'J4SQjQ' })}
              >
                {getOptions(LocationsTypes.Municipality, LocationsTypes.Department)}
              </Combobox>
              <ErrorMessage id="name" errorText={errors?.municipality_id?.message} />
            </div>
          </div>
        </div>
        <div className="mb-6.5">
          <Label htmlFor="geometry">
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
                  infoText={formatMessage({
                    defaultMessage: 'Do you have a partnership with someone else?',
                    id: 'nbqoY2',
                  })}
                />
              </legend>
              <Label id="involved-project-developer-yes" className="block font-normal">
                <input
                  id="involved-project-developer-yes"
                  type="radio"
                  value={1}
                  className="mr-2"
                  {...register('involved_project_developer', {
                    onChange: handleChangeInvolvedProjectDeveloper,
                  })}
                />
                <FormattedMessage defaultMessage="Yes" id="a5msuh" />
              </Label>
              <Label htmlFor="involved-project-developer-no" className="block mt-4 font-normal">
                <input
                  id="involved-project-developer-no"
                  type="radio"
                  value={0}
                  className="mr-2"
                  {...register('involved_project_developer', {
                    onChange: handleChangeInvolvedProjectDeveloper,
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
                id="name"
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
