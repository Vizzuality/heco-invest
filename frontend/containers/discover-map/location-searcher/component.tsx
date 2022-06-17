import { FC, useState } from 'react';

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import Script from 'next/script';

import { LocationSearcherProps } from './types';

export const LocationSearcher: FC<LocationSearcherProps> = () => {
  const [address, setAddress] = useState('');

  const handleChangeAddress = (newAddress) => {
    setAddress(newAddress);
  };

  const handleSelectAddress = (newAddress) => {
    setAddress(newAddress);
    geocodeByAddress(newAddress)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log('Success', latLng))
      .catch((error) => console.error('Error', error));
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
        onChange={handleChangeAddress}
        onSelect={handleSelectAddress}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                console.log(suggestion);
                return (
                  <div
                    key={suggestion.placeId}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
              {/* {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Find location',
                className: 'w-32 border border-red-500 absolute top-0 left-0 z-20',
              })}
              type="text"
            />
            <div className="absolute left-0 z-20 border top-6 border-green-light h-30">
              {loading && <div>Loading...</div>}
              {console.log('suggestions', suggestions)}
              {/* {suggestions.map((suggestion, i) => {
                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    key={i}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })} */}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </>
  );
};

export default LocationSearcher;
