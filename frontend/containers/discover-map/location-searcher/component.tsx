import { FC, useState } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { useDispatch } from 'react-redux';

import cx from 'classnames';

import Script from 'next/script';

import { setBbox } from 'store/projects';

import Icon from 'components/icon';

import SearchIcon from 'svgs/search.svg';

import { LocationSearcherProps } from './types';

export const LocationSearcher: FC<LocationSearcherProps> = () => {
  const dispatch = useDispatch();
  const intl = useIntl();

  const [address, setAddress] = useState('');

  const handleChangeAddress = (newAddress) => {
    setAddress(newAddress);
  };

  const handleSelectAddress = (newAddress) => {
    setAddress(newAddress);
    geocodeByAddress(newAddress)
      .then((results) => {
        getLatLng(results[0]);
        const { bounds } = results[0].geometry;
        const NELat = bounds.getNorthEast().lat();
        const NELng = bounds.getNorthEast().lng();
        const SWLat = bounds.getSouthWest().lat();
        const SWLng = bounds.getSouthWest().lng();
        dispatch(setBbox([NELng, NELat, SWLng, SWLat]));
      })
      .catch((error) => console.error('Error', error));
  };

  const searchOptions = {
    types: ['locality', 'sublocality'],
  };

  return (
    <>
      <Script
        // TODO: Activate key and remove mock one
        // src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="beforeInteractive"
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAwcOSQ6hnqoqiXX_1D1ykHOBAZZ2UorHE&libraries=places"
      />
      <PlacesAutocomplete
        value={address}
        searchOptions={searchOptions}
        onChange={handleChangeAddress}
        onSelect={handleSelectAddress}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="absolute top-0 left-0 z-10 w-32">
            <Icon
              icon={SearchIcon}
              className="absolute z-20 w-4.5 h-4.5 text-gray-700 bg-white rounded-full top-1.5 left-2"
            />
            <input
              {...getInputProps({
                placeholder: intl.formatMessage({
                  defaultMessage: 'Find location',
                  id: '0+CmKm',
                }),
                className:
                  'rounded shadow-sm block w-full pr-2 pl-8 text-base text-gray-900 placeholder-gray-700 py-1 placeholder-opacity-100 focus:border-green-dark outline-none bg-white transition',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && (
                <div>
                  <FormattedMessage defaultMessage="Loading..." id="gjBiyj" />
                </div>
              )}
              {suggestions.map((suggestion) => {
                const className = cx({
                  'bg-white cursor-pointer text-xs py-0.5': true,
                  'text-gray-800': suggestion.active,
                  'text-gray-600': !suggestion.active,
                });
                return (
                  <div
                    key={suggestion.placeId}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </>
  );
};

export default LocationSearcher;
