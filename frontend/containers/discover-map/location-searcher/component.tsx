import { FC, useState } from 'react';

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import Script from 'next/script';

import { LocationSearcherProps } from './types';

export const LocationSearcher: FC<LocationSearcherProps> = () => {
  const [addressLocation, setAddressLocation] = useState('');

  const handleChange = (address) => {
    console.log('address', { address });
    setAddressLocation(address);
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log('Success', latLng))
      .catch((error) => console.error('Error', error));
  };

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="beforeInteractive"
      />
      <PlacesAutocomplete value={addressLocation} onChange={handleChange} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
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
