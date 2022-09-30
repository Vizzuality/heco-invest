import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react';

import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import omit from 'lodash-es/omit';

import { useRouter } from 'next/router';

import MapboxGLPlugin from '@vizzuality/layer-manager-plugin-mapboxgl';
import CartoProvider from '@vizzuality/layer-manager-provider-carto';
import { LayerManager, Layer } from '@vizzuality/layer-manager-react';

import { useLayers } from 'hooks/useLayers';

import Map from 'components/map';
import Controls from 'components/map/controls';
import ClusterLayer from 'components/map/layers/cluster';
import { Legend, LegendType } from 'components/map/legend/types';
import ProjectMapPin from 'components/project-map-pin';
import { ProjectMapParams } from 'types/project';

import { useProjectsMap } from 'services/projects/projectService';

import LayerLegend from './layer-legend';
import LocationSearcher from './location-searcher';
import MapHelp from './map-help';
import MapLayersSelector from './map-layers-selector';
import { MapLayersSelectorForm } from './map-layers-selector/types';
import MapPinCluster from './pin-cluster';
import { DiscoverMapProps } from './types';

const cartoProvider = new CartoProvider();

export const DiscoverMap: FC<DiscoverMapProps> = ({ onSelectProjectPin }) => {
  const { layers } = useLayers();
  const { query } = useRouter();

  const { projectsMap } = useProjectsMap({
    ...(omit(query, 'search') as ProjectMapParams),
    'filter[full_text]': query.search as string,
  });

  const [viewport, setViewport] = useState({});
  const [bounds, setBounds] = useState({
    bbox: [-81.99, -4.35, -65.69, 12.54],
    options: { padding: 0 },
  });

  const { register, watch, resetField, setValue } = useForm<MapLayersSelectorForm>();

  const layerInputs = watch();

  /** An array with the values of the selected layers */
  const visibleLayers: string[] = useMemo(
    () =>
      Object.values(layerInputs).reduce((prev, curr) => {
        return !!curr && curr.length ? [...prev, curr[0]] : prev;
      }, []),
    [layerInputs]
  );

  const handleViewportChange = useCallback((vw) => {
    setViewport(vw);
  }, []);

  const handleLocationSelected = ({ bbox }) => {
    setBounds({ ...bounds, bbox });
  };

  /** An array with the selected layers legends */
  const layerLegends: Legend[] = useMemo(
    () =>
      visibleLayers
        .map((layer) => {
          const {
            legend: { items, type },
            id,
            name,
            group,
            isResourceWatch,
          } = layers.find(({ id }) => layer === id);
          return { items, type: type as LegendType, id, name, group, isResourceWatch };
        })
        .reverse(),
    [layers, visibleLayers]
  );

  const displayResourceWatchCredits = useMemo(() => {
    return layerLegends.some((layer) => layer.isResourceWatch);
  }, [layerLegends]);

  const handleChangeVisibleLayer = (e: ChangeEvent<HTMLInputElement>) => {
    // The layer inputs are groups of checkboxes. To limit one value per group, the value is always updated to an array of one item with the last selected value. If the checkbox is already selected (the user unchecked the checkbox), the field is reseted.
    const { name, value } = e.currentTarget;
    if (visibleLayers.includes(value)) {
      resetField(name as keyof MapLayersSelectorForm);
    } else {
      setValue(name as keyof MapLayersSelectorForm, [value]);
    }
  };

  return (
    <>
      <div className="relative w-full h-full">
        <Map bounds={bounds} viewport={viewport} onMapViewportChange={handleViewportChange}>
          {(map) => (
            <>
              <LayerManager
                map={map}
                plugin={MapboxGLPlugin}
                providers={{
                  [cartoProvider.name]: cartoProvider.handleData,
                }}
              >
                {layers.map(({ specification: layerSpec }) => {
                  if (!layerSpec || !visibleLayers.includes(layerSpec.id)) return null;
                  return <Layer key={layerSpec.id} {...layerSpec} />;
                })}
              </LayerManager>

              <ClusterLayer
                data={projectsMap}
                map={map}
                MarkerComponent={ProjectMapPin}
                ClusterComponent={MapPinCluster}
                onSelectProjectPin={onSelectProjectPin}
              />
            </>
          )}
        </Map>

        <div
          // `bottom-12` ensures the layers menu doesn't overflow the map
          // `pointer-events-none` because this div covers the map, this class is necessary to ensure the user can
          // interact with the map; however children elements inside need the `pointer-events-auto` added to make them
          // interactable
          className="absolute flex items-start gap-2 inset-3.5 bottom-12 text-gray-800 text-sm pointer-events-none"
        >
          <MapLayersSelector
            className="pointer-events-auto"
            register={register}
            registerOptions={{
              onChange: handleChangeVisibleLayer,
            }}
          />
          <LocationSearcher
            className="pointer-events-auto"
            onLocationSelected={handleLocationSelected}
          />
        </div>

        <div className="absolute top-4 right-4">
          <MapHelp />
        </div>

        <div className="absolute px-2 text-xs text-gray-900 bg-gray-200 rounded bottom-2 left-4 bg-opacity-30">
          {displayResourceWatchCredits && (
            <span>
              <FormattedMessage
                defaultMessage="Powered by <a>Resource Watch</a>"
                id="vrCHpK"
                values={{
                  a: (chunk: string) => (
                    <a
                      className="hover:underline"
                      href="https://resourcewatch.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {chunk}
                    </a>
                  ),
                }}
              />
            </span>
          )}
        </div>

        <Controls className="absolute h-fit max-h-[45%] bottom-4 right-4 overflow-y-auto">
          <LayerLegend
            className="bg-white"
            onCloseLegend={(layerGroup) => resetField(layerGroup as keyof MapLayersSelectorForm)}
            layersLegends={layerLegends}
          />
        </Controls>
      </div>
    </>
  );
};

export default DiscoverMap;
