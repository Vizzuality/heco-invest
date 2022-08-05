import { useMemo, useState } from 'react';

import { FieldValues } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { sortBy } from 'lodash-es';

import Combobox, { Option } from 'components/forms/combobox';
import ErrorMessage from 'components/forms/error-message';
import Label from 'components/forms/label';
import { LocationsTypes } from 'enums';

import { useGroupedLocations } from 'services/locations/locations';

import { LocationSelectorsTypes } from '.';

export const LocationSelectors = <FormValues extends FieldValues>({
  control,
  errors,
  resetField,
  fields,
}: LocationSelectorsTypes<FormValues>) => {
  const { country, state, municipality } = fields;
  const { formatMessage } = useIntl();
  const { locations } = useGroupedLocations({ includes: 'parent' });
  const [locationsFilter, setLocationsFilter] = useState<{ country: string; department: string }>({
    country: undefined,
    department: undefined,
  });

  const getOptions = useMemo(
    () => (locationType: LocationsTypes, filter: 'department' | 'country') => {
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

      return sortBy(filteredLocations, 'name').map(({ id, name }) => (
        <Option key={id}>{name}</Option>
      ));
    },
    [locations, locationsFilter]
  );

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
      if (locationType === LocationsTypes.Country) resetField(state.fieldName);
      resetField(municipality.fieldName);
    }
  };

  return (
    <div className="gap-8 md:flex">
      <div className="w-full">
        <Label htmlFor="country">
          <span className="mr-2.5">
            <FormattedMessage defaultMessage="Country" id="vONi+O" />{' '}
            {!country.required && <FormattedMessage defaultMessage="(optional)" id="d1OgED" />}
          </span>
        </Label>
        <Combobox
          id="country"
          name={country.fieldName}
          aria-describedby="country-error"
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
        <ErrorMessage id="country-error" errorText={errors[country.fieldName]?.message} />
      </div>
      <div className="w-full">
        <Label htmlFor="department">
          <span className="mr-2.5">
            <FormattedMessage defaultMessage="State" id="ku+mDU" />{' '}
            {!state.required && <FormattedMessage defaultMessage="(optional)" id="d1OgED" />}
          </span>
        </Label>
        <Combobox
          id="department"
          aria-describedby="department-error"
          name={state.fieldName}
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
        <ErrorMessage id="department-error" errorText={errors[state.fieldName]?.message} />
      </div>
      <div className="w-full">
        <Label htmlFor="municipality">
          <span className="mr-2.5">
            <FormattedMessage defaultMessage="Municipality" id="9I1zvK" />{' '}
            {!municipality.required && <FormattedMessage defaultMessage="(optional)" id="d1OgED" />}
          </span>
        </Label>
        <Combobox
          id="municipality"
          name={municipality.fieldName}
          aria-describedby="municipality-error"
          control={control}
          controlOptions={{
            disabled: false,
          }}
          className="mt-2.5"
          placeholder={formatMessage({ defaultMessage: 'select', id: 'J4SQjQ' })}
        >
          {getOptions(LocationsTypes.Municipality, LocationsTypes.Department)}
        </Combobox>
        <ErrorMessage id="municipality-error" errorText={errors[municipality.fieldName]?.message} />
      </div>
    </div>
  );
};

export default LocationSelectors;
