import React, { useCallback, useState } from 'react';

import { FormattedMessage } from 'react-intl';

import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { LayerManager, Layer } from '@vizzuality/layer-manager-react';

import { OverviewProps } from 'containers/project-page/overview/types';

import LayoutContainer from 'components/layout-container';
import Map from 'components/map';

import { getLayer } from './helpers';

export const Overview: React.FC<OverviewProps> = ({ project, openCall }: OverviewProps) => {
  const { country, municipality, geometry, category, priority_landscape } = project;

  const layer = getLayer(geometry, category);

  const [bounds, setBounds] = useState({
    bbox: [-81.99, -4.35, -65.69, 12.54],
    options: { padding: 0 },
  });

  const [viewport, setViewport] = useState({});

  const handleViewportChange = useCallback((vw) => {
    setViewport(vw);
  }, []);

  return (
    <LayoutContainer className="mb-14 lg:mb-20 mt-18 space-y-36">
      <section className="p-4 mt-32 font-serif text-white sm:p-6 lg:mt-48 lg:p-16 bg-green-dark rounded-2xl">
        <div className="relative grid w-full grid-cols-1 gap-12 lg:grid-cols-2">
          <Map
            className="absolute z-10 -mb-32 border-8 border-white drop-shadow-xl h-96 -top-44 lg:overflow-hidden rounded-xl"
            onMapViewportChange={handleViewportChange}
            bounds={bounds}
            viewport={viewport}
          >
            {(map) => (
              <LayerManager map={map} plugin={PluginMapboxGl}>
                <Layer {...layer} />
              </LayerManager>
            )}
          </Map>
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
            <p className="font-sans text-base">{project.problem}</p>
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl lg:text-3xl">
              <FormattedMessage defaultMessage="The solution proposed" id="9CDBQg" />
            </h2>
            <p className="font-sans text-base">{project.solution}</p>
          </div>
        </div>
      </section>
    </LayoutContainer>
  );
};

export default Overview;
