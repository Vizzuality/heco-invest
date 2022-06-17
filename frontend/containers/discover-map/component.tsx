import { FC, useCallback, useEffect, useState } from 'react';

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import { useRouter } from 'next/router';
import Script from 'next/script';

import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { LayerManager } from '@vizzuality/layer-manager-react';

import Map from 'components/map';
import Controls from 'components/map/controls';
import ClusterLayer from 'components/map/layers/cluster';
import ProjectLegend from 'components/map/project-legend';
import { ProjectMapParams } from 'types/project';

import { useProjectsMap } from 'services/projects/projectService';

import MapPin from './pin';
import MapPinCluster from './pin-cluster';
import { DiscoverMapProps } from './types';

export const DiscoverMap: FC<DiscoverMapProps> = () => {
  const [viewport, setViewport] = useState({});
  const [addressLocation, setAddressLocation] = useState('');
  const [bounds, setBounds] = useState({
    bbox: [-81.99, -4.35, -65.69, 12.54],
    options: { padding: 0 },
  });

  const { query } = useRouter();

  const { projectsMap } = useProjectsMap(query as ProjectMapParams);

  useEffect(() => {
    <Script
      src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
    />;
  }, []);

  const handleViewportChange = useCallback((vw) => {
    setViewport(vw);
  }, []);

  const handleChange = (address) => {
    // setAddressLocation({ address });
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log('Success', latLng))
      .catch((error) => console.error('Error', error));
  };

  return (
    <>
      {/* <PlacesAutocomplete value={addressLocation} onChange={handleChange} onSelect={handleSelect}>
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
              {suggestions.map((suggestion, i) => {
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
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete> */}
      <div className="relative w-full h-full">
        <Map bounds={bounds} viewport={viewport} onMapViewportChange={handleViewportChange}>
          {(map) => (
            <>
              {/* <label htmlFor="map-search" className="absolute flex left-5 top-5">
              <input
                id="map-search"
                placeholder="Find location"
                name="bbox"
                value={bounds.bbox.join(',')}
              />
            </label> */}
              <LayerManager map={map} plugin={PluginMapboxGl}></LayerManager>

              <ClusterLayer
                data={projectsMap}
                map={map}
                MarkerComponent={<MapPin />}
                ClusterComponent={<MapPinCluster />}
              />
            </>
          )}
        </Map>

        <Controls className="absolute bottom-10 xl:bottom-6 right-11">
          <ProjectLegend />
        </Controls>
      </div>
    </>
  );
};

export default DiscoverMap;
