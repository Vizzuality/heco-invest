import { FC, useState, useRef } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import cx from 'classnames';

import Script from 'next/script';

import { useOutsideClick } from 'rooks';

import Button from 'components/button';
import Icon from 'components/icon';
import Loading from 'components/loading';

import SearchIcon from 'svgs/search.svg';
import CloseIcon from 'svgs/ui/close.svg';

import { LocationSearcherProps } from './types';

export const LocationSearcher: FC<LocationSearcherProps> = ({ className, onLocationSelected }) => {
  const intl = useIntl();
  const placesRef = useRef();
  const containerRef = useRef();
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleClickSearch = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current.focus(), 0);
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
                    'outline outline-green-dark outline-2 outline-offset-2': isFocused && isOpen,
                    'outline-none': !isFocused && isOpen,
                  })}
                  onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => {
                    if (!isFocused && !addressSetted) {
                      setIsOpen(false);
                    }
                  }}
                >
                  <Button
                    theme="naked"
                    className="max-h-full px-2 py-2 text-gray-800 transition-all bg-white rounded shadow-sm focus-visible:outline-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:text-green-dark"
                    onClick={handleClickSearch}
                    disabled={isOpen}
                  >
                    <span className="sr-only">
                      <FormattedMessage defaultMessage="Open location search" id="pzu2Hd" />
                    </span>
                    <Icon icon={SearchIcon} className="w-4 h-4" />
                  </Button>
                  <input
                    {...getInputProps({
                      placeholder: intl.formatMessage({
                        defaultMessage: 'Search location',
                        id: '5b8My7',
                      }),
                      onClick: () => setIsFocused(true),
                      onFocus: () => setIsFocused(true),
                      onBlur: () => setIsFocused(false),
                    })}
                    className={cx(
                      'transition-all duration-500 ease-in-out outline-none placeholder-gray-800 text-sm overflow-ellipsis overflow-hidden whitespace-nowrap',
                      {
                        'w-0 opacity-0': !isOpen,
                        'w-52 pr-6 opacity-100': isOpen || addressSetted,
                      }
                    )}
                    aria-label={intl.formatMessage({
                      defaultMessage: 'Search location',
                      id: '5b8My7',
                    })}
                    disabled={!isOpen}
                    ref={inputRef}
                  />
                  {loading ? (
                    <Loading
                      className="absolute flex items-center justify-center w-4 h-4 right-1"
                      visible
                    />
                  ) : (
                    <Button
                      className={cx(
                        'absolute right-1 transition-all cursor-pointer px-0 py-0 focus-visible:outline-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                        {
                          hidden: !isOpen || !address.length,
                          block: isOpen && !!address.length,
                        }
                      )}
                      onClick={handleClearSearch}
                      aria-label={intl.formatMessage({
                        defaultMessage: 'Clear search',
                        id: '4YJHut',
                      })}
                      theme="naked"
                      size="smallest"
                      disabled={!isOpen}
                    >
                      <Icon icon={CloseIcon} className="w-4 h-4" />
                    </Button>
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
