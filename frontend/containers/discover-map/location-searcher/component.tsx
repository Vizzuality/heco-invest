import { FC, useState, useRef } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import cx from 'classnames';

import Script from 'next/script';

import { useOutsideClick } from 'rooks';

import Icon from 'components/icon';
import Loading from 'components/loading';

import SearchIcon from 'svgs/search.svg';
import CloseIcon from 'svgs/ui/close.svg';

import { LocationSearcherProps } from './types';

export const LocationSearcher: FC<LocationSearcherProps> = ({ className, onLocationSelected }) => {
  const intl = useIntl();
  const placesRef = useRef();
  const containerRef = useRef();

  const [address, setAddress] = useState('');
  const [addressSetted, setAddressSetted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleClearSearch = () => {
    setIsError(false);
    setAddress('');
    setAddressSetted(false);
  };

  useOutsideClick(containerRef, () => {
    if (!isOpen || addressSetted) return;
    setIsOpen(false);
    handleClearSearch();
  });

  const handleChangeAddress = (newAddress: string) => {
    setIsError(false);
    setAddress(newAddress);
    setAddressSetted(false);
  };

  const handleSelectAddress = (newAddress: string) => {
    setIsFocused(false);
    setAddress(newAddress);
    setAddressSetted(true);

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
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=onGoogleMapsReady`}
      />
      <div
        className={cx({
          'relative z-10': true,
          [className]: !!className,
        })}
      >
        <PlacesAutocomplete
          ref={placesRef}
          value={address}
          searchOptions={searchOptions}
          onChange={handleChangeAddress}
          onSelect={handleSelectAddress}
          googleCallbackName="onGoogleMapsReady"
          onError={function (status, clearSuggestion) {
            if (status === 'ZERO_RESULTS') {
              setIsError(true);
              // If we don't clear the suggestions when is error, the results displayed will be the last matched results and we will not be able to show the 'No results found'
              clearSuggestion();
            }
          }}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
            return (
              <div ref={containerRef}>
                <div
                  className={cx('flex bg-white items-center rounded shadow', {
                    'border border-green-dark': isFocused,
                  })}
                  onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => {
                    if (!isFocused) {
                      setIsOpen(false);
                    }
                  }}
                >
                  <button
                    className="p-2 text-gray-800 transition-all bg-white rounded shadow-sm focus-visible:outline-green-dark hover:text-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:text-opacity-60 disabled:pointer-events-non"
                    onClick={() => setIsOpen(true)}
                  >
                    <span className="sr-only">
                      <FormattedMessage defaultMessage="Open location search" id="pzu2Hd" />
                    </span>
                    <Icon icon={SearchIcon} className="w-4 h-4" />
                  </button>
                  <input
                    {...getInputProps({
                      placeholder: intl.formatMessage({
                        defaultMessage: 'Find location',
                        id: '0+CmKm',
                      }),
                      onClick: () => setIsFocused(true),
                      onFocus: () => setIsFocused(true),
                      onBlur: () => setIsFocused(false),
                    })}
                    className={cx(
                      'transition-all duration-500 ease-in-out focus-visible:outline-none placeholder-gray-800 text-sm rounded-r overflow-ellipsis overflow-hidden whitespace-nowrap',
                      {
                        'w-0 opacity-0': !isOpen,
                        'w-[182px] opacity-100': isOpen || addressSetted,
                      }
                    )}
                    aria-label={intl.formatMessage({
                      defaultMessage: 'Find location',
                      id: '0+CmKm',
                    })}
                  />
                  {loading ? (
                    <Loading className="w-6 h-6 pr-1" visible />
                  ) : (
                    <button
                      type="button"
                      className={cx('cursor-pointer transition-opacity', {
                        'w-auto mx-1': isOpen,
                        'w-0': !isOpen,
                        'opacity-0': !address.length,
                      })}
                      onClick={handleClearSearch}
                      aria-label={intl.formatMessage({
                        defaultMessage: 'Clear search',
                        id: '4YJHut',
                      })}
                    >
                      <Icon icon={CloseIcon} className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div
                  className={cx(
                    'absolute w-60 rounded h-0 opacity-0 px-3 py-0 mt-0 shadow-none bg-white transition-all',
                    {
                      'h-auto py-2 mt-1 shadow-2xl opacity-100': isOpen && !!suggestions.length,
                    }
                  )}
                >
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
                <div
                  className={cx(
                    'absolute w-60 rounded h-0 opacity-0 shadow-none bg-white text-sm text-center text-gray-800 transition-all',
                    {
                      'h-auto p-4 mt-1 shadow-2xl opacity-100':
                        isOpen && isError && !suggestions.length,
                    }
                  )}
                >
                  <FormattedMessage defaultMessage="No results found" id="hX5PAb" />
                </div>
              </div>
            );
          }}
        </PlacesAutocomplete>
      </div>
    </>
  );
};

export default LocationSearcher;
