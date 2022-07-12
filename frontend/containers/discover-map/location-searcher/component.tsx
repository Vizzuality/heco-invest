import { FC, useState, useRef } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { useDispatch } from 'react-redux';

import cx from 'classnames';

import Script from 'next/script';

import Icon from 'components/icon';
// import { GOOGLE_MAPS_API_KEY } from 'vars.config';

import SearchIcon from 'svgs/search.svg';
import CloseIcon from 'svgs/ui/close.svg';

import { LocationSearcherProps } from './types';

export const LocationSearcher: FC<LocationSearcherProps> = ({ onLocationSelected }) => {
  const intl = useIntl();
  const placesRef = useRef();

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

        onLocationSelected({
          bbox: [NELng, NELat, SWLng, SWLat],
        });
      })
      .catch((error) => console.error('Error', error));
  };

  const searchOptions = {
    types: ['locality', 'sublocality'],
  };

  return (
    <div className="relative">
      <Script
        // TODO: Activate key and remove mock one
        // src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="beforeInteractive"
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAwcOSQ6hnqoqiXX_1D1ykHOBAZZ2UorHE&amp;libraries=places"
      />
      <PlacesAutocomplete
        ref={placesRef}
        value={address}
        searchOptions={searchOptions}
        onChange={handleChangeAddress}
        onSelect={handleSelectAddress}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="w-60">
            <Icon
              icon={SearchIcon}
              className="absolute w-4 h-4 bg-white rounded-full top-1.5 left-2"
            />
            <input
              {...getInputProps({
                placeholder: intl.formatMessage({
                  defaultMessage: 'Find location',
                  id: '0+CmKm',
                }),
                className:
                  'rounded shadow-sm block w-full px-8 placeholder-gray-700 py-1 placeholder-opacity-100 focus:outline focus:outline-green-dark bg-white transition',
              })}
            />

            <button
              type="button"
              className={cx({
                'absolute cursor-pointer top-1.5 right-2': true,
                hidden: address === '',
              })}
              onClick={() => setAddress('')}
            >
              <Icon icon={CloseIcon} className="w-4 h-4" />
            </button>

            <div className="rounded-2xl">
              {loading && (
                <div className="p-4 mt-1 text-center bg-white rounded shadow-2xl">
                  <FormattedMessage defaultMessage="No results found" id="hX5PAb" />
                </div>
              )}
              {!!suggestions.length && !loading && (
                <div className="px-3 py-2 mt-1 bg-white rounded shadow-2xl">
                  {suggestions.map((suggestion) => {
                    const className = cx({
                      'bg-white cursor-pointer text-sm px-1.5 py-2 flex flex-col': true,
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
                        <p className="py-0 text-black">{suggestion.formattedSuggestion.mainText}</p>
                        <p className="text-gray-800">
                          {suggestion.formattedSuggestion.secondaryText}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default LocationSearcher;
