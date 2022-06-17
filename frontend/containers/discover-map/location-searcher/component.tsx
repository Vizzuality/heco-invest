import { FC, useState } from 'react';

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { useDispatch } from 'react-redux';

import cx from 'classnames';

import Script from 'next/script';

import { setBbox } from 'store/projects';

import { LocationSearcherProps } from './types';

export const LocationSearcher: FC<LocationSearcherProps> = () => {
  const [address, setAddress] = useState('');

  const dispatch = useDispatch();

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
            <input
              {...getInputProps({
                placeholder: 'Find location ...',
                className:
                  'rounded shadow-sm block w-full px-2 text-base text-gray-900 placeholder-gray-400 py-1 placeholder-opacity-100 border border-solid border-beige focus:border-green-dark outline-none bg-white transition',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = cx({
                  'bg-white cursor-pointer': true,
                  'text-red-600': suggestion.active,
                  'text-yellow-600 bg-red-600': !suggestion.active,
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
