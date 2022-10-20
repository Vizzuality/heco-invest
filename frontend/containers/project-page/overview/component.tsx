import React, { useCallback, useState } from 'react';

import { FormattedMessage } from 'react-intl';
import { Marker, ViewportProps } from 'react-map-gl';

import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { LayerManager, Layer } from '@vizzuality/layer-manager-react';

import { OverviewProps } from 'containers/project-page/overview/types';

import LayoutContainer from 'components/layout-container';
import Map from 'components/map';
import Controls from 'components/map/controls';
import ZoomControl from 'components/map/controls/zoom';
import ProjectMapPin from 'components/project-map-pin';

import { getLayer } from './helpers';

export const Overview: React.FC<OverviewProps> = ({
  project: {
    country,
    municipality,
    geometry,
    category,
    priority_landscape,
    latitude,
    longitude,
    problem,
    solution,
  },
}: OverviewProps) => {
  const layer = getLayer(geometry, category);

  const [viewport, setViewport] = useState<Partial<ViewportProps>>({
    zoom: 4,
    latitude,
    longitude,
  });

  const onViewportChange = useCallback((vw) => {
    setViewport(vw);
  }, []);

  const onZoomChange = useCallback(
    (zoom) => {
      setViewport({
        ...viewport,
        zoom,
        transitionDuration: 300,
      });
    },
    [viewport]
  );

  return (
    <LayoutContainer className="mb-14 lg:mb-20 pt-18 space-y-36">
      <section className="p-4 font-serif text-white mt-28 sm:p-6 lg:mt-28 lg:p-16 bg-green-dark rounded-2xl">
        <div className="relative grid w-full grid-cols-1 gap-x-10 gap-y-20 lg:grid-cols-2">
          <div className="relative z-10 -mb-32 border-8 border-white drop-shadow-xl h-96 -top-28 lg:-top-44 lg:-mb-44 lg:overflow-hidden rounded-xl">
            <Map
              onMapViewportChange={onViewportChange}
              viewport={viewport}
              scrollZoom={false}
              touchZoom={false}
              touchRotate={false}
              dragPan={false}
              dragRotate={false}
              getCursor={() => 'default'}
            >
              {(map) => (
                <LayerManager map={map} plugin={PluginMapboxGl}>
                  <Layer {...layer} />
                  {typeof latitude === 'number' && typeof longitude === 'number' && (
                    <Marker
                      latitude={latitude}
                      longitude={longitude}
                      offsetLeft={-10}
                      offsetTop={-23}
                    >
                      <ProjectMapPin category={category} interactive={false} />
                    </Marker>
                  )}
                </LayerManager>
              )}
            </Map>
            <Controls className="absolute top-2 right-2">
              <ZoomControl viewport={{ ...viewport }} onZoomChange={onZoomChange} />
            </Controls>
          </div>
          <div className="flex flex-col space-y-4 lg:col-start-2">
            <h2 className="text-2xl lg:text-3xl">
              <FormattedMessage defaultMessage="Location" id="rvirM2" />
            </h2>
            <div className="flex flex-col space-y-1">
              <div className="flex space-x-2 font-sans text-base">
                <h3 className="font-semibold">
                  <FormattedMessage defaultMessage="Country" id="vONi+O" />
                </h3>
                <p>{country.name}</p>
              </div>
              <div className="flex space-x-2 font-sans text-base">
                <h3 className="font-semibold">
                  <FormattedMessage defaultMessage="Municipality" id="9I1zvK" />
                </h3>
                <p>{municipality.name}</p>
              </div>

              {!!priority_landscape && (
                <div className="flex flex-wrap font-sans text-base sm:space-x-2 sm:flex-nowrap">
                  <h3 className="font-semibold whitespace-pre">
                    <FormattedMessage defaultMessage="HeCo priority landscape" id="kPq9Kx" />
                  </h3>
                  <p>{priority_landscape.name}</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl lg:text-3xl">
              <FormattedMessage defaultMessage="The problem we are solving" id="MXykbb" />
            </h2>
            <p className="font-sans text-base">{problem}</p>
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl lg:text-3xl">
              <FormattedMessage defaultMessage="The solution proposed" id="9CDBQg" />
            </h2>
            <p className="font-sans text-base">{solution}</p>
          </div>
        </div>
      </section>
    </LayoutContainer>
  );
};

export default Overview;
