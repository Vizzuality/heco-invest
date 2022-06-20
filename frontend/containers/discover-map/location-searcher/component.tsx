import { FC, useState, useRef } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { useDispatch } from 'react-redux';

import cx from 'classnames';

import Script from 'next/script';

import { setBbox } from 'store/projects';

import Icon from 'components/icon';

import SearchIcon from 'svgs/search.svg';
import CloseIcon from 'svgs/ui/close.svg';

import { LocationSearcherProps } from './types';

export const LocationSearcher: FC<LocationSearcherProps> = () => {
  const dispatch = useDispatch();
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
        ref={placesRef}
        value={address}
        searchOptions={searchOptions}
        onChange={handleChangeAddress}
        onSelect={handleSelectAddress}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading, clearSuggestions }) => (
          <div className="absolute top-3.5 left-3.5 z-10 w-60">
            <Icon
              icon={SearchIcon}
              className="absolute z-20 w-4.5 h-4.5 text-black bg-white rounded-full top-2 left-2"
            />
            <input
              {...getInputProps({
                placeholder: intl.formatMessage({
                  defaultMessage: 'Find location',
                  id: '0+CmKm',
                }),
                className:
                  'rounded shadow-sm block w-full px-8 text-base text-gray-900 placeholder-gray-700 py-1 placeholder-opacity-100 focus:border focus:border-green-dark focus:outline-none bg-white transition',
              })}
            />

            <button
              type="button"
              className={cx({
                'absolute z-20 cursor-pointer top-[9px] right-2': true,
                hidden: address === '',
              })}
              onClick={() => setAddress('')}
            >
              <Icon icon={CloseIcon} className="w-4 h-4" />
            </button>

            <div className="rounded-2xl">
              {loading && (
                <div className="p-4 mt-1 text-sm text-center text-gray-800 bg-white rounded shadow-2xl">
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
    </>
  );
};

export default LocationSearcher;
